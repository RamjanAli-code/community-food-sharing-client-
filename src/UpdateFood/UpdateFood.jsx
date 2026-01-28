import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const UpdateFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [food, setFood] = useState({
    name: "",
    image: "",
    quantity: "",
    pickupLocation: "",
    expireDate: "",
    notes: "",
  });
  useEffect(() => {
    fetch(`http://localhost:3000/foods/${id}`)
      .then(res => res.json())
      .then(data => setFood(data))
      .catch(err => console.error(err));
  }, [id]);
  console.log(user);
  console.log(user?.accessToken);
  const handleChange = e => {
    const { name, value } = e.target;
    setFood(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (!user?.accessToken) {
      alert("You must be logged in to update food");
      return;
    }
    const payload = {
      ...food,
      expireDate: food.expireDate ? new Date(food.expireDate) : null
    };
    fetch(`http://localhost:3000/foods/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(payload),
    })
      .then(res => {
        if (!res.ok) {
          return res.text().then(text => {
            throw new Error(`Server Error ${res.status}: ${text}`);
          });
        }
        return res.json();
      })
      .then(data => {
        console.log("Update response:", data);
        alert("Food updated successfully");
        navigate("/manageFood");
      })
      .catch(err => console.error("Fetch error:", err));
  };

  return (
    <div className="w-11/12 max-w-xl mx-auto my-10">
      <h2 className="text-3xl font-bold mb-6">Update Food</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input type="text" name="name" value={food.name || ""} onChange={handleChange} placeholder="Food Name" className="w-full border p-2 rounded" />

        <input type="text" name="image" value={food.image || ""} onChange={handleChange} placeholder="Image URL" className="w-full border p-2 rounded" />

        <input type="text" name="quantity" value={food.quantity || ""} onChange={handleChange} placeholder="Quantity" className="w-full border p-2 rounded" />

        <input type="text" name="pickupLocation" value={food.pickupLocation || ""} onChange={handleChange} placeholder="Pickup Location" className="w-full border p-2 rounded" />

        <input type="date" name="expireDate" value={food.expireDate ? food.expireDate.slice(0, 10) : ""} onChange={handleChange} className="w-full border p-2 rounded" />

        <textarea name="notes" value={food.notes} onChange={handleChange || ""} placeholder="Additional Notes" className="w-full border p-2 rounded" />

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Update Food
        </button>
      </form>
    </div>
  );
};

export default UpdateFood;