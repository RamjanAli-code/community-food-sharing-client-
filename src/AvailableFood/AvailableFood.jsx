import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AvailableFood = () => {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://community-food-sharing-server-livid.vercel.app/available-foods")
      .then(res => res.json())
      .then(data => {
        console.log("Available Foods:", data);
        setFoods(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="w-11/12 mx-auto my-10">
      <h2 className="text-3xl font-bold mb-6">Available Foods</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map(food => (
          <div key={food._id} className="p-5 border rounded-xl shadow-lg bg-white">

            <img src={food.image} alt={food.name} className="h-48 w-full object-cover rounded-xl"/>
            <h3 className="text-xl font-semibold mt-3">{food.name}</h3>
            <div className="flex items-center gap-2 mt-2">
              <img src={food.donator?.photoURL} className="w-8 h-8 rounded-full" alt="donator"/>
              <span>{food.donator?.name}</span>
            </div>
            <p className="text-gray-600 mt-1"> Quantity: {food.quantity}</p>
            <p className="text-sm text-gray-700">Pickup: {food.pickupLocation}</p>
            <p className="text-sm text-gray-700"> Expire: {food.expireDate ? new Date(food.expireDate).toLocaleDateString() : ""} </p>
           
            <p className="text-sm text-gray-700">Food Status: {food. food_status}</p>

            <button onClick={() => navigate(`/food/${food._id}`)} className="mt-3 px-4 py-2 bg-green-600 text-white rounded">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableFood;
