import React from 'react';
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const DeleteFood = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:3000/foods/${id}`)
      .then(res => res.json())
      .then(data => setFood(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleDelete = () => {
    if (!user?.accessToken) {
      alert("You must be logged in to delete food");
      return;
    }
    fetch(`http://localhost:3000/foods/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${user.accessToken}`,
      },
    })
      .then(res => {
        if (!res.ok) return res.text().then(text => { throw new Error(text); });
        return res.json();
      })
      .then(data => {
        alert("Food deleted successfully ");
        navigate("/manageFood");
      })
      .catch(err => console.error("Delete error:", err));
  };
  if (!food) return <p>Loading food...</p>;

  return (
    <div className="w-11/12 max-w-xl mx-auto my-10 p-5 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Delete Food</h2>
      <p>Are you sure you want to delete? <strong>{food.name}</strong>?</p>
      <div className="mt-4 flex gap-4">
        <button
          onClick={handleDelete}
          className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
        >
          Yes, Delete
        </button>
        <button onClick={() => navigate("/manageFood")}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteFood;
