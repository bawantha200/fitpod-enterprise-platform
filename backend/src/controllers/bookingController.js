const bookingService = require('../services/bookingService');
const { successResponse } = require('../utils/apiResponse');

// Create a temporary booking hold
const createBooking = async (req, res, next) => {
  try {
    const userId =
  req.user?.id || '00000000-0000-0000-0000-000000000001';

    const {
      bookingType,
      startTime,
    } = req.body;

    const result = await bookingService.createBooking({
      userId,
      bookingType,
      startTime,
    });

    return successResponse(
      res,
      'Booking hold created successfully.',
      result,
      201
    );
  } catch (error) {
    next(error);
  }
};

// Get booking details
const getBookingById = async (req, res, next) => {
  try {
    const { bookingId } = req.params;

    const booking =
      await bookingService.getBookingById(bookingId);

    return successResponse(
      res,
      'Booking details retrieved successfully.',
      booking
    );
  } catch (error) {
    next(error);
  }
};

// Release expired booking holds
const releaseExpiredBookingHolds = async (req, res, next) => {
  try {
    const expiredCount =
      await bookingService.releaseExpiredBookingHolds();

    return successResponse(
      res,
      'Expired booking holds processed successfully.',
      { expiredCount }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getBookingById,
  releaseExpiredBookingHolds,
};
