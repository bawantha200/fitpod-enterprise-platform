// backend/src/controllers/walletController.js
const walletRepository = require('../repositories/walletRepository');
const payhere = require('../services/payhereService');

// TODO: replace with the logged-in user (e.g. req.user.id) once auth exists
const getUser = (req) => ({
  id: req.user?.id || walletRepository.DEMO_USER_ID,
  firstName: req.user?.firstName || 'Nethmi',
  lastName: req.user?.lastName || 'Perera',
  email: req.user?.email || 'nethmi@example.com',
  phone: req.user?.phone || '0771234567',
  address: req.user?.address || 'Colombo',
  city: req.user?.city || 'Colombo',
});

const MAX_TOPUP = 1000000; // sanity limit, change as you like

/**
 * GET /api/wallet
 * Wallet screen eke balance eka.
 */
const getWallet = async (req, res, next) => {
  try {
    const user = getUser(req);
    const balance = await walletRepository.getBalance(user.id);
    return res.json({ success: true, data: { balance, currency: 'LKR' } });
  } catch (error) {
    return next(error);
  }
};

/**
 * POST /api/wallet/topups   body: { amount }
 * Creates a pending top-up and returns what the app needs for PayHere.
 */
const createTopup = async (req, res, next) => {
  try {
    const amount = Number(req.body?.amount);

    if (!Number.isFinite(amount) || amount <= 0 || amount > MAX_TOPUP) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid top-up amount.' });
    }

    const user = getUser(req);
    const config = payhere.getConfig();
    const orderId = payhere.generateOrderId();

    await walletRepository.createTopup({
      orderId,
      userId: user.id,
      amount,
      currency: 'LKR',
    });

    return res.status(201).json({
      success: true,
      data: {
        orderId,
        merchantId: config.merchantId,
        notifyUrl: config.notifyUrl,
        sandbox: config.sandbox,
        amount: payhere.formatAmount(amount),
        currency: 'LKR',
        items: 'FitPod wallet top-up',
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        country: 'Sri Lanka',
      },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * GET /api/wallet/topups/:orderId
 * The app polls this after PayHere says "completed".
 */
const getTopupStatus = async (req, res, next) => {
  try {
    const user = getUser(req);
    const topup = await walletRepository.findTopupByOrderId(req.params.orderId);

    if (!topup || topup.userId !== user.id) {
      return res
        .status(404)
        .json({ success: false, message: 'Top-up not found.' });
    }

    const balance = await walletRepository.getBalance(user.id);

    return res.json({
      success: true,
      data: {
        orderId: topup.orderId,
        status: topup.status,
        amount: topup.amount,
        newBalance: topup.status === 'paid' ? balance : null,
      },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * POST /api/wallet/payhere/notify
 * Called by PayHere's servers (form-urlencoded). NOT called by the app.
 */
const payhereNotify = async (req, res, next) => {
  try {
    const body = req.body || {};

    if (!payhere.verifyNotification(body)) {
      console.warn('PayHere notify: invalid signature', body.order_id);
      return res.status(400).send('Invalid signature');
    }

    const topup = await walletRepository.findTopupByOrderId(body.order_id);

    if (!topup) {
      return res.status(404).send('Unknown order');
    }

    // Amount + currency must match what WE created
    if (
      Number(body.payhere_amount) !== Number(topup.amount) ||
      body.payhere_currency !== topup.currency
    ) {
      console.warn('PayHere notify: amount mismatch', body.order_id);
      return res.status(400).send('Amount mismatch');
    }

    const statusCode = Number(body.status_code);

    if (statusCode === 2) {
      await walletRepository.markTopupPaid({
        orderId: topup.orderId,
        paymentId: body.payment_id,
      });
    } else if (statusCode === -1) {
      await walletRepository.markTopupStatus({
        orderId: topup.orderId,
        status: 'cancelled',
      });
    } else if (statusCode === -2 || statusCode === -3) {
      await walletRepository.markTopupStatus({
        orderId: topup.orderId,
        status: 'failed',
      });
    }
    // statusCode 0 = pending -> do nothing yet

    return res.status(200).send('OK');
  } catch (error) {
    return next(error);
  }
};

module.exports = { getWallet, createTopup, getTopupStatus, payhereNotify };