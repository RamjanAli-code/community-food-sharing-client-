// import React, { useEffect, useState } from 'react';
// const FeaturedFood = () => {
//  const [foods, setFoods] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:3000/featured-products") 
//       .then((res) => res.json())
//       .then((data) => setFoods(data));
//   }, []);

//   return (
//     <div className="w-11/12 mx-auto my-10">
//       <h2 className="text-3xl font-bold mb-6">Featured Products</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {foods.map((food) => (
//           <div key={food._id} className="p-5 border rounded-xl shadow-lg bg-white">
//             <img
//               src={food.image}
//               alt={food.name}
//               className="h-48 w-full object-cover rounded-xl"
//             />

//             <h3 className="text-xl font-semibold mt-3">{food.name}</h3>
//             <p className="text-gray-600 mt-1">
//               {food.description?.slice(0, 60)}...
//             </p>

//             <p className="font-bold mt-2">
//               Quantity: <span className="text-green-600">{food.quantity}</span>
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FeaturedFood;
