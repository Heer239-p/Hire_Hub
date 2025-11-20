import { useState } from "react";
import { dummyAPI } from "../../api/dummyApi";
import React from "react";

const JSRegister = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async () => {
    await dummyAPI.register("jobseeker", form);
    alert("Registered!");
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded">
      <h2 className="text-xl font-bold mb-2">Jobseeker Register</h2>

      <input className="border p-2 w-full mt-2" placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })} />

      <input className="border p-2 w-full mt-2" placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })} />

      <input className="border p-2 w-full mt-2" placeholder="Password" type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })} />

      <button className="bg-blue-600 w-full text-white p-2 mt-3 rounded"
        onClick={handleSubmit}>
        Register
      </button>
    </div>
  );
};

export default JSRegister;
