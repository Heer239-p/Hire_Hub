import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthUser from "../../hooks/useAuthUser";
import { createSubscriptionPayment } from "../../services/api/paymentApi";
import { createPayPalOrder } from "../../services/paypalService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const plans = [
  {
    name: "Free",
    price: "₹0",
    duration: "Forever",
    description: "Perfect for trying out our platform.",
    perk: "3 Job Posts",
    cta: "Continue with Free",
    highlight: false,
    amount: 0,
  },
  {
    name: "Professional",
    price: "₹499",
    duration: "Per Job Posting",
    description: "Ideal for growing teams. Pay only when you post a job.",
    perk: "10 Job Posts",
    cta: "Choose Professional",
    highlight: true,
    amount: 499,
  },
  {
    name: "Enterprise",
    price: "₹1999",
    duration: "Per Job Posting",
    description: "Best for agencies & companies hiring at scale. Pay only when you post a job.",
    perk: "Unlimited Job Posts",
    cta: "Choose Enterprise",
    highlight: false,
    amount: 1999,
  },
];

const Subscription = () => {
  const user = useAuthUser();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelectPlan = async (plan) => {
    // Free plan doesn't require payment
    if (plan.amount === 0) {
      toast.success("Free plan selected successfully!");
      // Redirect to dashboard or another appropriate page
      setTimeout(() => {
        navigate('/company/dashboard');
      }, 1500);
      return;
    }

    setSelectedPlan(plan);
  };

  // PayPal payment handler using your credentials
  const handlePayPalPayment = async () => {
    if (!selectedPlan) return;

    setIsProcessing(true);
    
    try {
      // Create PayPal order using your credentials
      const paymentData = {
        planName: selectedPlan.name,
        amount: selectedPlan.amount,
        currency: "USD",
        description: `Subscription to ${selectedPlan.name} plan`
      };

      // Create PayPal order
      const paypalResponse = await createPayPalOrder(paymentData);
      
      if (paypalResponse.status === "success") {
        // Redirect user to PayPal approval URL
        window.location.href = paypalResponse.approvalUrl;
      } else {
        toast.error("Failed to create PayPal payment. Please try again.");
      }
    } catch (error) {
      console.error("PayPal payment error:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <ToastContainer />
      <div className="max-w-5xl mx-auto px-6 space-y-10">
        <div className="text-center space-y-3">
          <p className="text-sm uppercase text-blue-600 font-semibold tracking-wide">
            Plans for {user?.companyName || "your team"}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Choose the plan that fits your hiring needs
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Unlock more job posts with our flexible pricing. Pay only when you post a job.
          </p>
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg max-w-2xl mx-auto border border-blue-100">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Current Limit:</span> Free accounts can post up to 3 jobs. Upgrade to post more jobs.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl border p-6 space-y-5 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-2xl ${
                plan.highlight
                  ? "border-blue-500 shadow-xl bg-gradient-to-b from-blue-50 to-white hover:border-blue-600"
                  : "border-slate-200 bg-white shadow-sm hover:border-blue-400 hover:shadow-lg"
              }`}
            >
              <div>
                <p className="text-sm uppercase tracking-wider text-slate-600 font-semibold">{plan.name}</p>
                <h2 className="text-3xl font-bold text-slate-900 mt-1">{plan.price}</h2>
                <p className="text-xs text-blue-600 font-semibold mt-1">{plan.duration}</p>
                <p className="text-sm text-slate-600 mt-3">{plan.description}</p>
              </div>

              {/* Only ONE perk */}
              <ul className="text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span className="font-medium">{plan.perk}</span>
                </li>
              </ul>

              <button
                onClick={() => handleSelectPlan(plan)}
                className={`w-full py-3 rounded-full font-semibold transition-all duration-300 ${
                  plan.highlight
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md"
                    : "bg-slate-900 text-white hover:bg-slate-800 shadow-sm"
                }`}
              >
                {plan.cta}
              </button>

              {plan.highlight && (
                <p className="text-xs text-center text-blue-600 font-semibold">
                  Most Popular Plan
                </p>
              )}
            </div>
          ))}
        </div>

      
      </div>

      {/* Payment Modal - PayPal Only */}
      {selectedPlan && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4"style={{backgroundColor:"rgba(0,0,0,0.5)"}}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-900">Complete Payment with PayPal</h3>
              <button 
                onClick={() => setSelectedPlan(null)}
                className="text-slate-500 hover:text-slate-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-slate-600 mb-2">Selected Plan: <span className="font-semibold">{selectedPlan.name}</span></p>
              <p className="text-slate-600 mb-4">Amount: <span className="font-semibold text-lg">₹{selectedPlan.amount}</span></p>
              
              <p className="text-sm text-slate-500 mb-4">
                Click the PayPal button below to complete your payment
              </p>
              
              <div className="space-y-3">
                {/* PayPal Button Only */}
                <button
                  onClick={handlePayPalPayment}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition disabled:opacity-50 bg-blue-50"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path d="M7.75 0.25H16.25C16.8023 0.25 17.25 0.697715 17.25 1.25V22.75C17.25 23.3023 16.8023 23.75 16.25 23.75H7.75C7.19772 23.75 6.75 23.3023 6.75 22.75V1.25C6.75 0.697715 7.19772 0.25 7.75 0.25Z" fill="#253B80"/>
                    <path d="M11.25 3.25H7.75C7.19772 3.25 6.75 3.69772 6.75 4.25V20.75C6.75 21.3023 7.19772 21.75 7.75 21.75H11.25C11.8023 21.75 12.25 21.3023 12.25 20.75V4.25C12.25 3.69772 11.8023 3.25 11.25 3.25Z" fill="#179BD7"/>
                    <path d="M17.25 3.25H13.75C13.1977 3.25 12.75 3.69772 12.75 4.25V20.75C12.75 21.3023 13.1977 21.75 13.75 21.75H17.25C17.8023 21.75 18.25 21.3023 18.25 20.75V4.25C18.25 3.69772 17.8023 3.25 17.25 3.25Z" fill="#222D65"/>
                    <path d="M15.25 5.25H10.75C10.1977 5.25 9.75 5.69772 9.75 6.25V18.75C9.75 19.3023 10.1977 19.75 10.75 19.75H15.25C15.8023 19.75 16.25 19.3023 16.25 18.75V6.25C16.25 5.69772 15.8023 5.25 15.25 5.25Z" fill="#222D65"/>
                    <path d="M13.25 7.25H10.75C10.1977 7.25 9.75 7.69772 9.75 8.25V16.75C9.75 17.3023 10.1977 17.75 10.75 17.75H13.25C13.8023 17.75 14.25 17.3023 14.25 16.75V8.25C14.25 7.69772 13.8023 7.25 13.25 7.25Z" fill="#253B80"/>
                  </svg>
                  <span className="font-medium">Pay with PayPal</span>
                </button>
                
                <div className="text-center text-xs text-slate-500 mt-2">
                  Powered by your PayPal Developer Account
                </div>
              </div>
            </div>
            
            {isProcessing && (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Subscription;