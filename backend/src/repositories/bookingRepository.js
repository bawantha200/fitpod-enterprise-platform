const pool = require('../config/db');

const HOLD_DURATION_MINUTES = 5;
const CLEANING_BUFFER_MINUTES = 15;

// Get the active gym pod
const getActivePod = async () => {
  const result = await pool.query(
    `SELECT id, name, location, status, tuya_device_id
       FROM pods
      WHERE deleted_at IS NULL
        AND status != 'MAINTENANCE'
      ORDER BY created_at ASC
      LIMIT 1`
  );

  return result.rows[0] || null;
};

// Find customer profile using users.id
const getCustomerProfileId = async (userId) => {
  const result = await pool.query(
    `SELECT id
       FROM customer_profiles
      WHERE user_id = $1`,
    [userId]
  );

  return result.rows[0]?.id || null;
};

// Get the active default pricing rule
const getDefaultPricingRule = async () => {
  const result = await pool.query(
    `SELECT id,
            rule_name,
            start_time,
            end_time,
            price_per_hour,
            is_default,
            is_active
       FROM booking_pricing_rules
      WHERE is_default = TRUE
        AND is_active = TRUE
      LIMIT 1`
  );

  return result.rows[0] || null;
};

// Get an applicable pricing rule for a specific time
const getPricingRuleForTime = async (startTime) => {
  const result = await pool.query(
    `SELECT id,
            rule_name,
            start_time,
            end_time,
            price_per_hour,
            is_default,
            is_active
       FROM booking_pricing_rules
      WHERE is_active = TRUE
        AND (
          is_default = TRUE
          OR (
            start_time IS NOT NULL
            AND end_time IS NOT NULL
            AND (
              CASE
                WHEN start_time < end_time
                  THEN ($1::timestamptz AT TIME ZONE 'Asia/Colombo')::time >= start_time
                   AND ($1::timestamptz AT TIME ZONE 'Asia/Colombo')::time < end_time
                ELSE ($1::timestamptz AT TIME ZONE 'Asia/Colombo')::time >= start_time
                  OR ($1::timestamptz AT TIME ZONE 'Asia/Colombo')::time < end_time
              END
            )
          )
        )
      ORDER BY
        CASE WHEN is_default = FALSE THEN 0 ELSE 1 END,
        created_at DESC
      LIMIT 1`,
    [startTime]
  );

  return result.rows[0] || null;
};

// Check whether a pod has an overlapping booking
const hasBookingConflict = async ({
  podId,
  startTime,
  endTime,
}) => {
  const result = await pool.query(
    `SELECT EXISTS (
       SELECT 1
         FROM bookings
        WHERE pod_id = $1
          AND status = 'ACTIVE'
          AND deleted_at IS NULL
          AND (
            hold_expires_at IS NULL
            OR hold_expires_at > NOW()
          )
          AND start_time < $3::timestamptz
                            + ($4 * INTERVAL '1 minute')
          AND end_time > $2::timestamptz
                            - ($4 * INTERVAL '1 minute')
     ) AS conflict`,
    [
      podId,
      startTime,
      endTime,
      CLEANING_BUFFER_MINUTES,
    ]
  );

  return result.rows[0].conflict;
};

// Create a temporary booking hold
const createBookingHold = async ({
  customerId,
  podId,
  bookingType,
  startTime,
  endTime,
  totalAmount,
}) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Lock the pod row to prevent simultaneous booking conflicts
    const pod = await client.query(
      `SELECT id
         FROM pods
        WHERE id = $1
          AND deleted_at IS NULL
          AND status != 'MAINTENANCE'
        FOR UPDATE`,
      [podId]
    );

    if (pod.rowCount === 0) {
      throw new Error('Pod is not available.');
    }

    // Expire old unpaid holds
    await client.query(
        `UPDATE bookings
        SET status = 'EXPIRED',
            updated_at = NOW()
        WHERE pod_id = $1
        AND status = 'ACTIVE'
        AND payment_status = 'PENDING'
        AND deleted_at IS NULL
        AND hold_expires_at <= NOW()`,
      [podId]
    );

    // Check existing bookings including cleaning buffer
    const conflict = await client.query(
      `SELECT EXISTS (
         SELECT 1
           FROM bookings
          WHERE pod_id = $1
            AND status = 'ACTIVE'
            AND deleted_at IS NULL
            AND (
              hold_expires_at IS NULL
              OR hold_expires_at > NOW()
            )
            AND start_time < $3::timestamptz
                              + ($4 * INTERVAL '1 minute')
            AND end_time > $2::timestamptz
                              - ($4 * INTERVAL '1 minute')
       ) AS conflict`,
      [
        podId,
        startTime,
        endTime,
        CLEANING_BUFFER_MINUTES,
      ]
    );

    if (conflict.rows[0].conflict) {
      throw new Error(
        'This time slot is no longer available.'
      );
    }

    // Create temporary booking hold
    const result = await client.query(
      `INSERT INTO bookings (
         customer_id,
         pod_id,
         booking_type,
         start_time,
         end_time,
         hold_expires_at,
         total_amount,
         payment_status,
         status
       )
       VALUES (
         $1, $2, $3, $4, $5,
         NOW() + ($6 * INTERVAL '1 minute'),
         $7, 'PENDING', 'ACTIVE'
       )
       RETURNING *`,
      [
        customerId,
        podId,
        bookingType,
        startTime,
        endTime,
        HOLD_DURATION_MINUTES,
        totalAmount,
      ]
    );

    await client.query('COMMIT');

    return result.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

// Get booking details
const findBookingById = async (bookingId) => {
  const result = await pool.query(
    `SELECT b.*,
            p.name AS pod_name
       FROM bookings b
       JOIN pods p ON p.id = b.pod_id
      WHERE b.id = $1
        AND b.deleted_at IS NULL`,
    [bookingId]
  );

  return result.rows[0] || null;
};

// Expire unpaid booking holds
const expireBookingHolds = async () => {
  const result = await pool.query(
    `UPDATE bookings
        SET status = 'EXPIRED', updated_at = NOW()
      WHERE status = 'ACTIVE'
        AND payment_status = 'PENDING'
        AND hold_expires_at IS NOT NULL
        AND hold_expires_at <= NOW()
      RETURNING id`
  );
  return result.rowCount;
};

module.exports = {
  HOLD_DURATION_MINUTES,
  CLEANING_BUFFER_MINUTES,
  getActivePod,
  getCustomerProfileId,
  getDefaultPricingRule,
  getPricingRuleForTime,
  hasBookingConflict,
  createBookingHold,
  findBookingById,
  expireBookingHolds,
};
