import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";

  const Modals = ({ isOpen, onClose, foodId }) => {
  const [location, setLocation] = useState("");
  const [reason, setReason] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        toast.error("User not logged in!");
        setLoading(false);
        return;
      }
      const token = await user.getIdToken();
      const body = {
        foodId,
        location,
        reason,
        contact,
      };
      const res = await fetch("https://community-food-sharing-server-livid.vercel.app/food-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.status === 401) {
        toast.error("Unauthorized! Token invalid or expired");
      } else if (!res.ok) {
        toast.error(data.message ||"Failed to submit request");
      } else {
        toast.success("Food request submitted successfully");
        setLocation("");
        setReason("");
        setContact("");
        onClose();
      }
    } catch (error) {
      console.error("Request Error:", error);
      toast.error("Server error");
    }
    setLoading(false);
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
       <ToastContainer position="top-center" />
      <div className="bg-white p-6 rounded-lg w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          Cancel
        </button>
        <h2 className="text-xl font-semibold mb-4">Request Food</h2>
        <form onSubmit={handleSubmitRequest} className="space-y-4">
          <div>
            <label className="block mb-1">Location</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required className="w-full border px-2 py-1 rounded"/>
          </div>
          <div>
            <label className="block mb-1">Reason</label>
            <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} required className="w-full border px-2 py-1 rounded"/>
          </div>
          <div>
            <label className="block mb-1">Contact</label>
            <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} required className="w-full border px-2 py-1 rounded" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modals;