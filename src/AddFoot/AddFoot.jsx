import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from '../AuthProvider/AuthProvider';
import { getAuth } from "firebase/auth";

const AddFoot = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    imageLink: '',
    quantity: '',
    pickupLocation: '',
    expireDate: '',
    additionalNotes: ''
  });
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        image: form.imageLink,
        quantity: form.quantity,
        pickupLocation: form.pickupLocation,
        expireDate: form.expireDate,
        additionalNotes: form.additionalNotes
      };
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        toast.error("User not logged in");
        return;
      }

      const idToken = await user.getIdToken();
      const response = await fetch('https://community-food-sharing-server-livid.vercel.app/foods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (response.ok) {
        toast.success('Food added successfully');
      setTimeout(() => {
     navigate('/manageFood');
     }, 1200);
} else {
        toast.error(result.message || 'Failed to add');
      }

    } catch (err) {
      console.error(err);
      toast.error('Error: ' + err.message);
    }
  };

  return (
    <div className="p-4 h-200 w-auto mx-auto">
      <ToastContainer position="top-center" />
      <h2 className="text-[30px] font-bold pt-3 text-center fond-4 mb-4">Add Food</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <h3 className=" flex gap-5 items-center justify-center">
          <p> Food Name</p>
          <input className="m-2 border-2" name="name" value={form.name} onChange={handleChange} placeholder="Food name" required />
        </h3>
        <h3 className=" flex gap-5 items-center justify-center">
          <p>Image </p>
          <input className="m-2 border-2" name="imageLink" value={form.imageLink} onChange={handleChange} placeholder='URL' />
        </h3>
        <h3 className=" flex gap-5 items-center justify-center">
          <p>Quantity </p>
          <input className="m-2 border-2" name="quantity" value={form.quantity} onChange={handleChange} placeholder='' required />
        </h3>
        <h3 className=" flex gap-5 items-center justify-center">
          <p>Location </p>
          <input className="m-2 border-2" name="pickupLocation" value={form.pickupLocation} onChange={handleChange} placeholder="Pickup location" required />
        </h3>
        <h3 className=" flex gap-5 items-center justify-center">
          <p>Date</p>
          <input className="m-2 border-2" type="date" name="expireDate" value={form.expireDate} onChange={handleChange} />
        </h3>
        <h3 className=" flex gap-5 items-center justify-center">
          <p>Date</p>
          <textarea className="m-2 border-2" name="additionalNotes" value={form.additionalNotes} onChange={handleChange} placeholder="Additional notes" />
        </h3>
        <button type="submit" className='bg-red-500 h-20 w-50 border-2 items-center justify-center text-center flex mx-auto'>Add Food</button>
      </form>
    </div>
  );
};

export default AddFoot;