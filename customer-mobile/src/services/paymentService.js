// src/services/paymentService.js
//
// 'demo'    -> fake payment (works in Expo Go, no money moves)
// 'payhere' -> real PayHere payment (needs a development build, see steps)
export const PAYMENT_MODE = 'payhere';

export const isDemoMode = PAYMENT_MODE === 'demo';

// Your backend's public URL (the same ngrok URL as PUBLIC_BASE_URL in backend .env)
// TODO: move this to your apiClient / config later. No "/" at the end.
const API_BASE_URL = 'https://hamstring-wobble-judo.ngrok-free.dev';

const POLL_INTERVAL_MS = 1500;
const POLL_MAX_TRIES = 20; // ~30 seconds

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
      ...(options.headers || {}),
    },
  });

  let json = null;
  try {
    json = await response.json();
  } catch (e) {
    // not JSON
  }

  if (!response.ok || !json?.success) {
    throw new Error(json?.message || `Request failed (${response.status})`);
  }

  return json.data;
};

/**
 * Starts a wallet top-up payment.
 * Resolves to:
 *   { status: 'success',   orderId, newBalance? }
 *   { status: 'cancelled', orderId }          user closed the PayHere screen
 *   { status: 'pending',   orderId }          paid, but backend not confirmed yet
 * Throws an Error when the payment fails.
 */
export const startPayment = async ({ amount }) => {
  if (PAYMENT_MODE === 'demo') {
    await wait(1200);
    return { status: 'success', orderId: `WT-${Date.now()}` };
  }

  return startPayHerePayment({ amount });
};

const openPayHere = (paymentObject) => {
  // PayHere is a native module and is unavailable in Expo Go. Load it only
  // when a real payment is started so demo mode can still run there.
  const { NativeModules } = require('react-native');
  const PayHere = require('@payhere/payhere-mobilesdk-reactnative').default;

  if (!NativeModules.PayhereOfficial || typeof PayHere?.startPayment !== 'function') {
    throw new Error(
      'PayHere is not available in this app build. Open the app in a PayHere-enabled development build, not Expo Go.'
    );
  }

  return new Promise((resolve) => {
    PayHere.startPayment(
      paymentObject,
      (paymentId) => resolve({ type: 'completed', paymentId }),
      (errorData) => resolve({ type: 'error', errorData }),
      () => resolve({ type: 'dismissed' })
    );
  });
};

const waitUntilPaid = async (orderId) => {
  for (let i = 0; i < POLL_MAX_TRIES; i += 1) {
    const topup = await request(`/api/wallet/topups/${orderId}`);

    if (topup.status === 'paid') {
      return { status: 'success', orderId, newBalance: topup.newBalance };
    }

    if (topup.status === 'failed' || topup.status === 'cancelled') {
      throw new Error('Payment was not completed.');
    }

    await wait(POLL_INTERVAL_MS);
  }

  return { status: 'pending', orderId };
};

const startPayHerePayment = async ({ amount }) => {
  // 1. Backend creates the pending order
  const order = await request('/api/wallet/topups', {
    method: 'POST',
    body: JSON.stringify({ amount }),
  });

  // 2. Open the PayHere payment screen
  const outcome = await openPayHere({
    sandbox: order.sandbox,
    merchant_id: order.merchantId,
    notify_url: order.notifyUrl,
    order_id: order.orderId,
    items: order.items,
    amount: order.amount,
    currency: order.currency,
    first_name: order.firstName,
    last_name: order.lastName,
    email: order.email,
    phone: order.phone,
    address: order.address,
    city: order.city,
    country: order.country,
  });

  if (outcome.type === 'dismissed') {
    return { status: 'cancelled', orderId: order.orderId };
  }

  if (outcome.type === 'error') {
    throw new Error(String(outcome.errorData || 'PayHere payment failed.'));
  }

  // 3. PayHere says "completed" -> wait for our backend to confirm (notify_url)
  return waitUntilPaid(order.orderId);
};
