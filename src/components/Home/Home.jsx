import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pic1 from "../../assets/ded-m.avif";
import pic2 from "../../download.jpeg";
import pic3 from "../../assets/american.avif";
const Home = () => {
  const [featuredFoods, setFeaturedFoods] = useState([]);
  const apiUrl = "https://community-food-sharing-server-livid.vercel.app/available-foods";

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const sortedFoods = data
          .sort((a, b) => b.quantity - a.quantity)
          .slice(0, 6);
        setFeaturedFoods(sortedFoods);
      });
  }, []);
  return (
    <div className="w-11/12 mx-auto mt-5">
      <div className="hero min-h-[50vh] bg-cover bg-center rounded-xl"
        style={{ backgroundImage: "url('https://i.postimg.cc/FKRS7gfp/cafe-hero.webp')" }}>
        <div className="hero-overlay bg-opacity-60 rounded-xl" ></div>
        <div className="hero-content text-center text-white">
          <div className="max-w-lg">
            <h1 className="text-4xl font-bold mb-4">Share Food, Spread Happiness</h1>
            <p className="mb-6">
              Help reduce food waste and support your community by sharing extra meals.
            </p>
            <Link to="/availableFood" className="btn bg-white text-black font-bold">
              View All Foods
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-6">Featured Foods</h2>

        {featuredFoods.length === 0 ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredFoods.map(food => (
              <div key={food._id} className="card bg-white shadow-xl p-4">
                <figure className="rounded-xl">
                  <img src={food.image} alt={food.name} className="h-48 w-full object-cover" />
                </figure>

                <div className="card-body">
                  <h2 className="card-title">{food.name}</h2>
                  <p>Quantity: {food.quantity} People</p>
                  <p className="text-sm text-gray-600">{food.additionalNotes?.slice(0, 60) || "No description available"}...</p>
                  <div className="card-actions justify-end">
                    <Link to={`/food/${food._id}`} className="btn btn-sm btn-primary">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="text-center mt-8">
          <Link to="/availableFood" className="btn btn-outline">
            Show All Foods
          </Link>
        </div>
      </div>
      <div className="mt-20 bg-gray-100 p-10 rounded-xl">
        <h2 className="text-3xl font-bold text-center mb-6">How It Works</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <img src={pic1} className="mx-auto h-20" />
            <h3 className="text-xl font-semibold mt-4">Post Food</h3>
            <p>Add leftover or extra food to help others in need.</p>
          </div>
          <div>
            <img src={pic2} className="mx-auto h-20" />
            <h3 className="text-xl font-semibold mt-4">Find Food</h3>
            <p>Browse available meals posted by the community.</p>
          </div>
          <div>
            <img src={pic3} className="mx-auto h-20" />
            <h3 className="text-xl font-semibold mt-4">Collect Food</h3>
            <p>Contact the donor and collect the food easily.</p>
          </div>
        </div>
      </div>
      <div className="mt-20 bg-white shadow-lg p-10 rounded-xl mb-20">
        <h2 className="text-3xl font-bold text-center mb-4">Our Mission</h2>
        <p className="text-center max-w-2xl mx-auto text-gray-700">
          Our mission is to reduce food waste, help the needy, and build a caring community.
          By sharing extra meals, together we can make a big difference.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 text-center ">
          <div className="p-5 rounded-xl shadow bg-green-400">
            <h3 className="text-2xl font-bold">500+</h3>
            <p>Meals Shared</p>
          </div>
          <div className="p-5 bg-pink-400 rounded-xl shadow">
            <h3 className="text-2xl font-bold">300+</h3>
            <p>Happy Families</p>
          </div>
          <div className="p-5  rounded-xl shadow bg-sky-400">
            <h3 className="text-2xl font-bold">50+</h3>
            <p>Active Volunteers</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
