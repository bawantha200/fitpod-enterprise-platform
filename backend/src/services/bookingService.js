const bookingRepository = require('../repositories/bookingRepository');

// Create an error with an HTTP status code
const createServiceError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

// Create a temporary booking hold
const createBooking = async ({
  userId,
  bookingType,
  startTime,
}) => {
  // 1. Validate required fields
  if (!userId) {
    throw createServiceError('User ID is required.', 401);
  }

  if (!['SOLO', 'SHARED'].includes(bookingType)) {
    throw createServiceError('Invalid booking type.', 400);
  }

  if (!startTime) {
    throw createServiceError(
      'Booking start time is required.',
      400
    );
  }

  // 2. Validate timezone
  const hasTimezone =
    /(?:Z|[+-]\d{2}:\d{2})$/i.test(startTime);

  if (!hasTimezone) {
    throw createServiceError(
      'Start time must include a timezone.',
      400
    );
  }

  // 3. Validate booking date and time
  const startDate = new Date(startTime);

  if (Number.isNaN(startDate.getTime())) {
    throw createServiceError(
      'Invalid booking date or time.',
      400
    );
  }

  if (startDate <= new Date()) {
    throw createServiceError(
      'Booking start time must be in the future.',
      400
    );
  }

  // 4. Calculate one-hour session end time
  const endDate = new Date(
    startDate.getTime() + 60 * 60 * 1000
  );

  const normalizedStartTime = startDate.toISOString();
  const normalizedEndTime = endDate.toISOString();

  // 5. Find customer profile
  const customerId =
    await bookingRepository.getCustomerProfileId(userId);

  if (!customerId) {
    throw createServiceError(
      'Customer profile not found.',
      404
    );
  }

  // 6. Find active gym pod
  const pod = await bookingRepository.getActivePod();

  if (!pod) {
    throw createServiceError(
      'No gym pod is currently available.',
      409
    );
  }

  // 7. Get applicable pricing rule
  const pricingRule =
    await bookingRepository.getPricingRuleForTime(
      normalizedStartTime
    );

  if (!pricingRule) {
    throw createServiceError(
      'Booking price has not been configured.',
      503
    );
  }

  const pricePerHour = Number(pricingRule.price_per_hour);

  if (
    !Number.isFinite(pricePerHour) ||
    pricePerHour <= 0
  ) {
    throw createServiceError(
      'Invalid booking price configuration.',
      500
    );
  }

  // 8. Calculate booking amount
  const totalAmount = pricePerHour;

  // 9. Create temporary booking hold
  let booking;

  try {
    booking = await bookingRepository.createBookingHold({
      customerId,
      podId: pod.id,
      bookingType,
      startTime: normalizedStartTime,
      endTime: normalizedEndTime,
      totalAmount,
    });
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }

    if (
      error.message ===
      'This time slot is no longer available.'
    ) {
      throw createServiceError(error.message, 409);
    }

    if (error.message === 'Pod is not available.') {
      throw createServiceError(error.message, 409);
    }

    throw error;
  }

  return {
    booking,
    pricing: {
      ruleName: pricingRule.rule_name,
      pricePerHour,
    },
  };
};

// Get booking details
const getBookingById = async (bookingId) => {
  if (!bookingId) {
    throw createServiceError(
      'Booking ID is required.',
      400
    );
  }

  const booking =
    await bookingRepository.findBookingById(bookingId);

  if (!booking) {
    throw createServiceError(
      'Booking not found.',
      404
    );
  }

  return booking;
};

// Release expired booking holds
const releaseExpiredBookingHolds = async () => {
  return await bookingRepository.expireBookingHolds();
};

module.exports = {
  createBooking,
  getBookingById,
  releaseExpiredBookingHolds,
};
