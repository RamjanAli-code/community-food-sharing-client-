import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const ManageFood = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.email || !user?.accessToken) return;
    fetch("https://community-food-sharing-server-livid.vercel.app/my-foods", {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log("My Foods:", data);
        setFoods(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error(err));
  }, [user]);
  return (
    <div className="w-11/12 mx-auto my-10">
      <h2 className="text-3xl font-bold mb-6">My Added Foods</h2>
      {foods.length === 0 && (
        <p className="text-center text-gray-500">
          You have not added any food yet.
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map(food => (
          <div key={food._id} className="p-5 border rounded-xl shadow-lg bg-white">
            <img src={food.image} alt={food.name} className="h-48 w-full object-cover rounded-xl" />
            <h3 className="text-xl font-semibold mt-3">{food.name}</h3>
            <p className="text-gray-600 mt-1">
              Quantity: {food.quantity}
            </p>
            <p className="text-sm text-gray-700">
              Pickup: {food.pickupLocation}
            </p>
            <p className="text-sm text-gray-700">
              Expire:{" "}
              {food.expireDate
                ? new Date(food.expireDate).toLocaleDateString()
                : ""}
            </p>
            <button onClick={() => navigate(`/food/${food._id}`)} className="mt-4 w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded">
              View Details
            </button>
            <div className="w-11/12 pt-10 flex justify-between ">
              <Link to={`/update-food/${food._id}`}><button className="bg-amber-600 border-2 text-white items-center h-10 w-[130%] "> Update Food</button> </Link>
              <Link to={`/delete-food/${food._id}`}><button className="bg-red-800 border-2 text-white items-center h-10 w-[130%] ">Delete Food</button></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageFood;
