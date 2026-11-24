// backend/src/routes/walletRoutes.js
const express = require('express');
const walletController = require('../controllers/walletController');

const router = express.Router();

// App -> backend
router.get('/', walletController.getWallet);
router.post('/topups', walletController.createTopup);
router.get('/topups/:orderId', walletController.getTopupStatus);

// PayHere -> backend (server-to-server, form-urlencoded)
router.post(
  '/payhere/notify',
  express.urlencoded({ extended: false }),
  walletController.payhereNotify
);

module.exports = router;