import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(location.state?.email || "");
  const Reset = (e) => {
    e.preventDefault(); window.location.href = "https://mail.google.com";
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-80">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
        <form onSubmit={Reset}>
          <input type="email" className="input input-bordered w-full mb-3 bg-gray-200"
            placeholder="Enter your email" value={email}
            onChange={(e) => setEmail(e.target.value)} required />
          <button type="submit" className="btn btn-primary w-full">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
