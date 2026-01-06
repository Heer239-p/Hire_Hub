import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthUser from "../../hooks/useAuthUser";
import { createSubscriptionPayment } from "../../services/api/paymentApi";
import { capturePayPalPayment } from "../../services/paypalService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PayPalSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthUser();
  const [processing, setProcessing] = useState(true);
  const [showCompleteButton, setShowCompleteButton] = useState(false);

  useEffect(() => {
    const handlePayPalSuccess = async () => {
      try {
        // Extract payment details from URL parameters
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token'); // PayPal order ID
        const payerId = queryParams.get('PayerID');
        
        if (!token || !payerId) {
          toast.error("Invalid payment parameters");
          setProcessing(false);
          return;
        }
        
        // Capture the PayPal payment
        const captureResult = await capturePayPalPayment(token);
        
        if (captureResult.status === "success") {
          // Don't show toast here, wait until subscription is activated
          setShowCompleteButton(true);
        } else {
          toast.error("Payment capture failed");
        }
      } catch (error) {
        console.error("Error processing PayPal payment:", error);
        toast.error("Payment processing failed. Please contact support.");
      } finally {
        setProcessing(false);
      }
    };
    
    handlePayPalSuccess();
  }, [location]);

  const handleCompletePayment = async () => {
    try {
      // Retrieve payment metadata from localStorage
      const paymentMetadataStr = localStorage.getItem('paypal_payment_metadata');
      if (!paymentMetadataStr) {
        toast.error("Payment information not found");
        return;
      }
      
      let paymentMetadata;
      try {
        paymentMetadata = JSON.parse(paymentMetadataStr);
      } catch (parseError) {
        console.error("Error parsing payment metadata:", parseError);
        toast.error("Invalid payment information");
        return;
      }
      
      // Clean up localStorage
      localStorage.removeItem('paypal_payment_metadata');
      
      // Record payment in our system
      const paymentData = {
        planName: paymentMetadata.planName,
        amount: paymentMetadata.amount,
        paymentMethod: "PayPal"
      };
      
      const response = await createSubscriptionPayment(paymentData);
      
      if (response.status === "success") {
        // Show only one toast notification for the entire process
        toast.success("Payment successful! Subscription activated.");
        // Redirect to main payment success page
        setTimeout(() => {
          navigate('/company/payment-success');
        }, 2000);
      } else {
        toast.error(response.message || "Failed to activate subscription");
      }
    } catch (error) {
      console.error("Error completing payment:", error);
      toast.error("Failed to complete payment. Please try again.");
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="max-w-md mx-auto px-6 text-center">
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            {processing ? (
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            {processing ? "Processing Payment..." : "Payment Received!"}
          </h1>
          
          <p className="text-slate-600 mb-6">
            {processing 
              ? "We're processing your PayPal payment. Please wait..." 
              : `Thank you, ${user?.firstName}. We're activating your subscription.`}
          </p>
          
          {processing && (
            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-blue-800">
                Please do not close this window. Processing...
              </p>
            </div>
          )}
          
          {!processing && showCompleteButton && (
            <div className="space-y-4">
              <button
                onClick={handleCompletePayment}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-indigo-700 transition"
              >
                Activate Subscription
              </button>
              <p className="text-sm text-slate-500">
                Click to finalize your subscription
              </p>
            </div>
          )}
          
          {!processing && !showCompleteButton && (
            <button
              onClick={() => navigate('/company/dashboard')}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-indigo-700 transition"
            >
              Go to Dashboard
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default PayPalSuccess;