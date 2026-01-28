import React, { useState } from 'react';
const PasswordLogin = ({ password, setPassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className='flex items-center justify-end'>
      <input type={showPassword ? "text" : "password"} placeholder="Password" className="input bg-gray-400 input-bordered w-full mb-3 "
        value={password} onChange={(e) => setPassword(e.target.value)} required
        pattern="(?=.*[a-z])(?=.*[A-Z]).{6,}" />
      <button
        type="button" onClick={() => setShowPassword(!showPassword)}
        className="absolute  items-center  transform -translate-y-1/2 text-gray-700 mt-2 mr-3">
        {showPassword ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd" d="M3.98 8.223a8.983 8.983 0 0112.04 0A10.477 10.477 0 0119 10c-.868 1.556-2.193 2.975-3.98 4.223a8.983 8.983 0 01-12.04 0A10.477 10.477 0 011 10c.868-1.556 2.193-2.975 3.98-4.223zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        ) : (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-4-7-9-7zM10 15a5 5 0 110-10 5 5 0 010 10z" />
          <circle cx="10" cy="10" r="3" fill="white" />
        </svg>
        )}
      </button>
    </div>
  );
};

export default PasswordLogin;