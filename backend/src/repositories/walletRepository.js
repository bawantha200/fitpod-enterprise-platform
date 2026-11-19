// backend/src/repositories/walletRepository.js  (PostgreSQL)
const pool = require('../config/db');

// TODO: real login ekak awama meka ain karanna.
// Fixed UUID eka, 'demo-user' string eka UUID column ekata yanna baha.
const DEMO_USER_ID = '00000000-0000-0000-0000-000000000001';

// Controller eken enne 'paid' / 'failed' / 'cancelled' wage lowercase ewa.
// DB CHECK constraint ekata allow wenne PENDING / SUCCESS / FAILED witharai.
const STATUS_MAP = {
  pending: 'PENDING',
  paid: 'SUCCESS',
  success: 'SUCCESS',
  failed: 'FAILED',
  cancelled: 'FAILED',
  canceled: 'FAILED',
  charged_back: 'FAILED',
};

// DB status -> app/controller expect karana status
const STATUS_OUT = {
  PENDING: 'pending',
  SUCCESS: 'paid',
  FAILED: 'failed',
};

const toTopup = (row) =>
  row && {
    orderId: row.merchant_order_id,
    customerId: row.customer_id,
    userId: row.user_id, // customer_profiles join eken enne
    amount: Number(row.amount), // NUMERIC string widiyata enawa
    currency: 'LKR', // payments table eke currency column ekak naha
    status: STATUS_OUT[row.status] || String(row.status).toLowerCase(),
    paymentId: row.gateway_transaction_id,
    createdAt: row.created_at,
  };

// Demo user, customer profile, wallet eka thiyenawa kiyala ensure karanawa.
// Already thiyenawa nam kisima deyak wenne naha.
const ensureDemoCustomer = async (client) => {
  await client.query(
    `INSERT INTO users (id, name, email, password_hash, user_type)
     VALUES ($1, 'Demo Customer', 'demo@fitpod.lk', 'demo-hash', 'CUSTOMER')
     ON CONFLICT (id) DO NOTHING`,
    [DEMO_USER_ID]
  );

  await client.query(
    `INSERT INTO customer_profiles (user_id)
     VALUES ($1)
     ON CONFLICT (user_id) DO NOTHING`,
    [DEMO_USER_ID]
  );

  await client.query(
    `INSERT INTO wallets (customer_id, balance)
     SELECT id, 0 FROM customer_profiles WHERE user_id = $1
     ON CONFLICT (customer_id) DO NOTHING`,
    [DEMO_USER_ID]
  );
};

// userId = users.id. customer_profiles.id eka hoyaganna.
const getCustomerId = async (client, userId) => {
  if (userId === DEMO_USER_ID) {
    await ensureDemoCustomer(client);
  }

  const r = await client.query(
    'SELECT id FROM customer_profiles WHERE user_id = $1',
    [userId]
  );
  return r.rows[0]?.id || null;
};

const createTopup = async ({ orderId, userId, amount }) => {
  const customerId = await getCustomerId(pool, userId);
  if (!customerId) throw new Error('Customer profile not found');

  const result = await pool.query(
    `INSERT INTO payments
       (customer_id, payment_type, amount, payment_gateway, merchant_order_id, status)
     VALUES ($1, 'TOPUP', $2, 'PAYHERE', $3, 'PENDING')
     RETURNING *`,
    [customerId, amount, orderId]
  );

  // INSERT eke user_id naha, so methana add karanawa
  return toTopup({ ...result.rows[0], user_id: userId });
};

const findTopupByOrderId = async (orderId) => {
  const result = await pool.query(
    `SELECT p.*, cp.user_id
       FROM payments p
       JOIN customer_profiles cp ON cp.id = p.customer_id
      WHERE p.merchant_order_id = $1 AND p.payment_type = 'TOPUP'`,
    [orderId]
  );

  return toTopup(result.rows[0]) || null;
};

const getBalance = async (userId) => {
  if (userId === DEMO_USER_ID) {
    await ensureDemoCustomer(pool);
  }

  const result = await pool.query(
    `SELECT w.balance
       FROM wallets w
       JOIN customer_profiles cp ON cp.id = w.customer_id
      WHERE cp.user_id = $1`,
    [userId]
  );

  return result.rows[0] ? Number(result.rows[0].balance) : 0;
};

/**
 * PENDING -> SUCCESS ekata marukaranawa AND wallet eka credit karanawa, one transaction ekakin.
 * Palaweni parata { credited: true }, already process wela nam { credited: false }
 * (PayHere notify eka dekak enna puluwan).
 */
const markTopupPaid = async ({ orderId, paymentId }) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Eka request ekakata witharai PENDING -> SUCCESS karanna puluwan
    const paid = await client.query(
      `UPDATE payments
          SET status = 'SUCCESS', gateway_transaction_id = $2, paid_at = NOW()
        WHERE merchant_order_id = $1
          AND payment_type = 'TOPUP'
          AND status = 'PENDING'
        RETURNING id, customer_id, amount`,
      [orderId, paymentId || null]
    );

    if (paid.rowCount === 0) {
      await client.query('ROLLBACK');
      return { credited: false };
    }

    const { id: payId, customer_id: customerId, amount } = paid.rows[0];

    const wallet = await client.query(
      `INSERT INTO wallets (customer_id, balance)
       VALUES ($1, $2)
       ON CONFLICT (customer_id)
       DO UPDATE SET balance = wallets.balance + EXCLUDED.balance,
                     updated_at = NOW()
       RETURNING id`,
      [customerId, amount]
    );

    await client.query(
      `INSERT INTO wallet_transactions
         (wallet_id, payment_id, amount, transaction_type, reference_id, description)
       VALUES ($1, $2, $3, 'TOPUP', $2, 'Wallet top-up')`,
      [wallet.rows[0].id, payId, amount]
    );

    await client.query('COMMIT');
    return { credited: true };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

const markTopupStatus = async ({ orderId, status }) => {
  const dbStatus = STATUS_MAP[String(status).toLowerCase()] || 'FAILED';

  await pool.query(
    `UPDATE payments SET status = $2
      WHERE merchant_order_id = $1
        AND payment_type = 'TOPUP'
        AND status = 'PENDING'`,
    [orderId, dbStatus]
  );
};

module.exports = {
  DEMO_USER_ID,
  createTopup,
  findTopupByOrderId,
  getBalance,
  markTopupPaid,
  markTopupStatus,
};