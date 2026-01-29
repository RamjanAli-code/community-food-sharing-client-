import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modals from "../Modals/Modals";
import FoodRequestsTable from "../FoodRequestsTable/FoodRequestsTable";
const FoodDetails = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  useEffect(() => {
    fetch(`https://community-food-sharing-server-livid.vercel.app/available-foods/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log("Single food:", data);
        setFood(data)
      });
  }, [id]);
  const [modalOpen, setModalOpen] = useState(false);
  if (!food) {
    return <div className="text-center mt-10">Loading...</div>;
  }
  return (
    <div className="w-11/12 mx-auto my-10">
      <h1 className="text-2xl font-bold text-center mb-5"> Food Details</h1>
      <div className="card card-side bg-base-100 shadow-sm">
        <figure>
          <img src={food.image} alt={food.name} className="w-40% h-40% object-cover" />
        </figure>
        <div className="card-body bg-gray-300">
          <h2 className="card-title text-2xl">{food.name}</h2>
          <h2 className="text-gray-500"> {food.donator?.name}</h2>
          <p>{food.description}</p>
            <p>Quantity: {food.quantity}</p>
            <p>Pickup: {food.pickupLocation}</p>
          <p>
            Expire:{" "}
            {food.expireDate ? new Date(food.expireDate).toLocaleDateString() : ""}
          </p>
          <p>Describtion:{food.additionalNotes}</p>
        </div>
      </div>

      <div className="card w-full mx-auto shadow-2xl mt-8">
        <div className="card-body">
          <label>Email</label>
          <input type="email" className="input bg-gray-200" />
          <label>Password</label>
          <input type="password" className="input bg-gray-200" />
          <button   onClick={() => setModalOpen(true)} className="btn bg-yellow-600 mt-4">
            Request Food
          </button>
          <ToastContainer />
        </div>
      </div>
      <Modals isOpen={modalOpen} onClose={() => setModalOpen(false)} foodId={food._id} />
        <div className="mt-6">
        <FoodRequestsTable foodId={food._id} />
      </div>
    </div>
  );
};

export default FoodDetails;