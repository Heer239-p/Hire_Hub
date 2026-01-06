// PayPal integration service using your actual credentials
const PAYPAL_CLIENT_ID = "Ac-0ZibD1-vm2n9vIeaeD0_da59mrHrvzCZp1XLcSehujlbNDNuG7z4hJuZV8U0gd9md8h1gJe2bN7WY";
const PAYPAL_SECRET = "EH8WZpJTFbmcPhBPlVSQArBG8Z2DR1qUxON_xGtBeZBAXubpoZOwcv2XiZULE5B52jvZ4Yr1ke4aR5p_";
const PAYPAL_API_URL = "https://api-m.sandbox.paypal.com"; // Sandbox for testing

/**
 * Get PayPal access token
 * @returns {Promise<string>} Access token
 */
const getAccessToken = async () => {
  try {
    const credentials = btoa(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`);
    
    const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });
    
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error getting PayPal access token:", error);
    throw new Error("Failed to authenticate with PayPal");
  }
};

/**
 * Create a PayPal order
 * @param {Object} paymentData - Payment details
 * @returns {Promise<Object>} PayPal order response
 */
export const createPayPalOrder = async (paymentData) => {
  try {
    const accessToken = await getAccessToken();
    
    // Store payment data in localStorage for retrieval after PayPal redirect
    const paymentMetadata = {
      planName: paymentData.planName,
      amount: paymentData.amount,
      timestamp: Date.now()
    };
    
    localStorage.setItem('paypal_payment_metadata', JSON.stringify(paymentMetadata));
    
    const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: paymentData.currency || 'USD',
            value: paymentData.amount.toString()
          },
          description: paymentData.description || 'Subscription payment'
        }],
        application_context: {
          return_url: `${window.location.origin}/company/paypal-success`,
          cancel_url: `${window.location.origin}/company/subscription`
        }
      })
    });
    
    const order = await response.json();
    
    if (response.ok && order.status === 'CREATED') {
      return {
        status: 'success',
        orderId: order.id,
        approvalUrl: order.links.find(link => link.rel === 'approve').href
      };
    } else {
      throw new Error(order.message || 'Failed to create PayPal order');
    }
  } catch (error) {
    console.error("Error creating PayPal order:", error);
    throw new Error("Failed to create PayPal order: " + error.message);
  }
};

/**
 * Capture a PayPal payment
 * @param {string} orderId - PayPal order ID
 * @returns {Promise<Object>} Payment capture result
 */
export const capturePayPalPayment = async (orderId) => {
  try {
    const accessToken = await getAccessToken();
    
    const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    const capture = await response.json();
    
    if (response.ok && capture.status === 'COMPLETED') {
      return {
        status: 'success',
        transactionId: capture.purchase_units[0].payments.captures[0].id,
        payer: capture.payer
      };
    } else {
      throw new Error(capture.message || 'Failed to capture PayPal payment');
    }
  } catch (error) {
    console.error("Error capturing PayPal payment:", error);
    throw new Error("Failed to capture PayPal payment: " + error.message);
  }
};

export default {
  createPayPalOrder,
  capturePayPalPayment
};