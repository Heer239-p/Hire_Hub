import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthUser from "../../hooks/useAuthUser";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const user = useAuthUser();

  useEffect(() => {
    // Redirect to dashboard after 3 seconds
    const timer = setTimeout(() => {
      navigate('/company/dashboard');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto px-6 text-center">
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Subscription Activated!</h1>
          <p className="text-slate-600 mb-6">
            Thank you, {user?.firstName}. Your subscription is now active and you can post more jobs.
          </p>
          
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-800">
              You will be redirected to your dashboard shortly.
            </p>
          </div>
          
          <button
            onClick={() => navigate('/company/dashboard')}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-indigo-700 transition"
          >
            Go to Dashboard Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default PaymentSuccess;