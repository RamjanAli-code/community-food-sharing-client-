import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const FoodRequest = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    if (!user) return;
    user.getIdToken().then(token => {
      fetch("http://localhost:3000/my-food-requests", {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => setRequests(data));
    });
  }, [user]);
  return (
    <div className="w-11/12 mx-auto my-10">
      <h2 className="text-3xl font-bold mb-6"> My Food Requests</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {requests.map(req => (
          <div key={req._id} className="p-5 border rounded-xl shadow bg-white">
            <h3 className="text-xl font-semibold">{req.food.name}</h3>
            <p> Donator: {req.food.donator.name}</p>
            <p> Pickup: {req.food.pickupLocation}</p>
            <p> Contact: {req.contact}</p>
            <p> Reason: {req.reason}</p>
            <p className="mt-2">
              Status:
              <span className={`ml-2 px-2 py-1 rounded text-white text-sm
                ${req.status === "pending" && "bg-yellow-500"}
                ${req.status === "accepted" && "bg-green-600"}
                ${req.status === "rejected" && "bg-red-600"}`}>
                {req.status}
              </span>
            </p>
            <p className="text-sm text-gray-500 mt-2"> Requested on: {new Date(req.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodRequest;