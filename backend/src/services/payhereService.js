// backend/src/services/payhereService.js
const crypto = require('crypto');

const md5Upper = (text) =>
  crypto.createHash('md5').update(String(text)).digest('hex').toUpperCase();

const getConfig = () => ({
  merchantId: process.env.PAYHERE_MERCHANT_ID,
  merchantSecret: process.env.PAYHERE_MERCHANT_SECRET,
  sandbox: String(process.env.PAYHERE_SANDBOX).toLowerCase() !== 'false',
  notifyUrl: `${process.env.PUBLIC_BASE_URL}/api/wallet/payhere/notify`,
});

// Order ids look like: WT-261114-A3F9C1
const generateOrderId = () => {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const rand = crypto.randomBytes(3).toString('hex').toUpperCase();

  return `WT-${yy}${mm}${dd}-${rand}`;
};

// PayHere wants "2000.00"
const formatAmount = (amount) => Number(amount).toFixed(2);

/**
 * Verifies the notification PayHere sends to notify_url:
 * md5sig = UPPER( md5( merchant_id + order_id + payhere_amount +
 *                      payhere_currency + status_code + UPPER(md5(merchant_secret)) ) )
 */
const verifyNotification = (body = {}) => {
  const { merchantId, merchantSecret } = getConfig();

  const {
    merchant_id,
    order_id,
    payhere_amount,
    payhere_currency,
    status_code,
    md5sig,
  } = body;

  if (!merchantSecret || !md5sig) return false;
  if (String(merchant_id) !== String(merchantId)) return false;

  const local = md5Upper(
    `${merchant_id}${order_id}${payhere_amount}${payhere_currency}${status_code}${md5Upper(
      merchantSecret
    )}`
  );

  const a = Buffer.from(local);
  const b = Buffer.from(String(md5sig).toUpperCase());

  return a.length === b.length && crypto.timingSafeEqual(a, b);
};

module.exports = {
  getConfig,
  generateOrderId,
  formatAmount,
  verifyNotification,
};