require("dotenv").config();

const app = require("./app");
const bookingService = require("./services/bookingService");
const cron = require("node-cron");

const PORT = process.env.PORT || 5000;

// Automatically expire unpaid booking holds every minute
cron.schedule("* * * * *", async () => {
  try {
    const expiredCount =
      await bookingService.releaseExpiredBookingHolds();

    if (expiredCount > 0) {
      console.log(`${expiredCount} expired booking hold(s) released.`);
    }
  } catch (error) {
    console.error("Booking hold expiration failed:", error.message);
  }
});

app.listen(PORT, () => {
  console.log(`FitPod Backend running on port ${PORT}`);
});
