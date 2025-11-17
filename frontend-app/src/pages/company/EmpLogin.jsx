import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { dummyAPI } from "../../api/dummyApi";
import React from "react";

const EmpLogin = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const res = await dummyAPI.login("company", email, password);
    login(res);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
          Employer Login
        </h2>

        <input
          className="border p-3 w-full mt-2 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-3 w-full mt-3 rounded"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white p-3 rounded mt-4 hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default EmpLogin;
