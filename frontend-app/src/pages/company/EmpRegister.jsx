import { useState } from "react";
import { dummyAPI } from "../../api/dummyApi";
import React from "react";

const EmpRegister = () => {
  const [form, setForm] = useState({
    company: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    await dummyAPI.register("company", form);
    alert("Company Registered Successfully!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
          Employer Register
        </h2>

        <input
          className="border p-3 w-full mt-2 rounded"
          placeholder="Company Name"
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />

        <input
          className="border p-3 w-full mt-3 rounded"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="border p-3 w-full mt-3 rounded"
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          className="w-full bg-blue-600 text-white p-3 rounded mt-4 hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default EmpRegister;
