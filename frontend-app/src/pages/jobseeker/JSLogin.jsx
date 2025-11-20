import { useState } from "react";
import { dummyAPI } from "../../api/dummyApi";
import { useAuth } from "../../context/AuthContext";
import React from "react";

const JSLogin = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const res = await dummyAPI.login("jobseeker", email, password);
    login(res);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded">
      <h2 className="text-xl font-bold mb-2">Jobseeker Login</h2>

      <input
        className="border p-2 w-full mt-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 w-full mt-2"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-blue-600 w-full text-white p-2 mt-3 rounded"
        onClick={handleSubmit}
      >
        Login
      </button>
    </div>
  );
};

export default JSLogin;
