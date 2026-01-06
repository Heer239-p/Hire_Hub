import Payment from "../models/Payment.js";
import User from "../models/User.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

/**
 * Handle PayPal IPN (Instant Payment Notification)
 * This endpoint receives payment notifications from PayPal
 */
export const handlePayPalIPN = async (req, res) => {
  try {
    // Verify the IPN notification is legitimate
    const verificationBody = Object.keys(req.body)
      .map(key => `${key}=${req.body[key]}`)
      .join('&') + '&cmd=_notify-validate';
      
    const verificationResponse = await fetch('https://ipnpb.paypal.com/cgi-bin/webscr', {
      method: 'POST',
      body: verificationBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    const verificationResult = await verificationResponse.text();
    
    // If verification failed, reject the notification
    if (verificationResult !== 'VERIFIED') {
      return res.status(400).send('Verification failed');
    }
    
    // Process the verified IPN notification
    const { txn_id, payment_status, custom, mc_gross, payer_email } = req.body;
    
    // Check if this is a duplicate notification
    const existingPayment = await Payment.findOne({ transactionId: txn_id });
    if (existingPayment) {
      return res.status(200).send('Duplicate notification');
    }
    
    // Parse custom data (should contain user ID and plan info)
    let userData;
    try {
      userData = JSON.parse(custom);
    } catch (parseError) {
      console.error('Error parsing custom data:', parseError);
      return res.status(400).send('Invalid custom data');
    }
    
    const { userId, planName, amount } = userData;
    
    // Validate the payment amount
    if (parseFloat(mc_gross) !== parseFloat(amount)) {
      return res.status(400).send('Payment amount mismatch');
    }
    
    // Create payment record
    const payment = await Payment.create({
      employer: userId,
      job: null, // Subscription payments are not tied to a specific job
      amount: parseFloat(mc_gross),
      paymentMethod: "PayPal",
      transactionId: txn_id,
      status: payment_status === 'Completed' ? 'Success' : 'Pending'
    });
    
    // If payment is completed, update user's subscription
    if (payment_status === 'Completed') {
      const user = await User.findById(userId);
      if (user) {
        // Store subscription info in user document
        user.subscription = {
          planName,
          startDate: new Date(),
          endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
          isActive: true
        };
        await user.save();
      }
    }
    
    return res.status(200).send('OK');
  } catch (error) {
    console.error('Error processing PayPal IPN:', error);
    return res.status(500).send('Internal Server Error');
  }
};

/**
 * Handle PayPal checkout completion webhook
 * This endpoint handles PayPal Checkout order completion events
 */
export const handlePayPalCheckoutWebhook = async (req, res) => {
  try {
    // In a real implementation, you would:
    // 1. Verify the webhook signature
    // 2. Parse the event data
    // 3. Process the payment based on the event type
    
    const { event_type, resource } = req.body;
    
    // Handle different event types
    switch (event_type) {
      case 'CHECKOUT.ORDER.APPROVED':
        // Process approved order
        console.log('PayPal Order Approved:', resource);
        break;
        
      case 'PAYMENT.CAPTURE.COMPLETED':
        // Process completed payment
        console.log('PayPal Payment Completed:', resource);
        break;
        
      case 'PAYMENT.CAPTURE.REFUNDED':
        // Process refunded payment
        console.log('PayPal Payment Refunded:', resource);
        break;
        
      default:
        console.log('Unhandled PayPal event:', event_type);
    }
    
    return res.status(200).send('OK');
  } catch (error) {
    console.error('Error processing PayPal webhook:', error);
    return res.status(500).send('Internal Server Error');
  }
};

export default {
  handlePayPalIPN,
  handlePayPalCheckoutWebhook
};