

import React from "react";
import useAuthUser from "../../../hooks/useAuthUser";

const plans = [
  {
    name: "Starter",
    price: "₹0",
    description: "Perfect for testing the waters with a few roles per month.",
    perks: [
      "2 active job slots",
      "Basic applicant inbox",
      "Email updates",
      "Community support",
    ],
    cta: "Keep Free Plan",
    highlight: false,
  },
  {
    name: "Growth",
    price: "₹299",
    description: "Best for scaling teams that need more visibility.",
    perks: [
      "10 active job slots",
      "Boosted listings on user homepage",
      "Shortlisted applicant insights",
      "Priority email + chat support",
      "Featured employer badge",
    ],
    cta: "Upgrade to Growth",
    highlight: true,
  },
  {
    name: "Elite",
    price: "₹11,999",
    description: "End-to-end hiring ops for large teams and agencies.",
    perks: [
      "Unlimited jobs",
      "Dedicated talent partner",
      "Custom branding on user feed",
      "Advanced analytics and ATS export",
      "Slack + WhatsApp alerts",
    ],
    cta: "Talk to Sales",
    highlight: false,
  },
];

const Subscription = () => {
  const user = useAuthUser();

  const handleSelectPlan = (planName) => {
    alert(`Plan "${planName}" selected. Connect API to process payment.`);
  };

  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-6 space-y-10">
        <div className="text-center space-y-3">
          <p className="text-sm uppercase text-blue-500 font-semibold tracking-wide">
            Plans for {user?.companyName || "your team"}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Spotlight your jobs at the top of the user feed
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Employers with active subscriptions appear in curated job rows on the candidate homepage,
            with boosted visibility inside the hero section and category carousels.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl border p-6 space-y-5 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl ${

                plan.highlight
                ? "border-blue-500 shadow-xl bg-gradient-to-b from-blue-50 to-white hover:border-blue-600"
                : "border-slate-200 bg-white shadow-sm hover:border-blue-400"
            }`}
            >
              <div>
                <p className="text-sm uppercase tracking-wider text-slate-500">{plan.name}</p>
                <h2 className="text-3xl font-bold text-slate-900 mt-1">{plan.price}</h2>
                <p className="text-sm text-slate-500 mt-1">{plan.description}</p>
              </div>

              <ul className="space-y-3 text-sm text-slate-600">
                {plan.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(plan.name)}
                className={`w-full py-3 rounded-full font-semibold transition ${
                  plan.highlight
                    ? "bg-blue-600 text-white hover:bg-blue-500"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {plan.cta}
              </button>
              {plan.highlight && (
                <p className="text-xs text-center text-blue-500 font-semibold">
                  Most popular · Includes hero placement
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-dashed border-blue-300 bg-blue-50 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm uppercase text-blue-500 font-semibold">Need something custom?</p>
            <p className="text-slate-700">
              We can tailor seat counts, integration support, and featured categories for your brand.
            </p>
          </div>
          <button className="px-6 py-3 rounded-full bg-white text-blue-600 font-semibold shadow hover:bg-blue-100">
            Book a demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default Subscription;
