import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import { toast } from 'react-toastify';
import app from "../firebase.init.config";

  const Logout = ({ setUser }) => {
  const auth = getAuth(app);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        toast.info("Logged out successfully!");
      })
      .catch((e) => toast.error(e.message));
  };
  return (
    <button onClick={handleLogout} className="btn bg-red-500 hover:bg-red-600 text-white w-full hidden">
      Logout
    </button>
  );
};

export default Logout; 