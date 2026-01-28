import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { toast } from "react-toastify";

  const FoodRequestsTable = ({ foodId }) => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      const res = await fetch(`http://localhost:3000/food-requests/${foodId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch requests");
    }
  };
  useEffect(() => {
    if (user && foodId) {
    fetchRequests();
    }
  }, [foodId, user]);
  const handleAction = async (id, action) => {
    try {
      if (!user) return;
      const token = await user.getIdToken();
      const res = await fetch(`http://localhost:3000/food-requests/${id}/${action}`,{
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Request ${action}ed successfully`);
        fetchRequests();
      }
    } catch (err) {
      console.error(err);
      toast.error("Action failed");
    }
  };
  if (!requests.length) return <p>No requests</p>;
  return (
      <div className="">
      <p className="font-bold text-2xl items-center flex justify-center ">Food Request Table</p>
          <table className="w-full border mt-4 flex sm:flex-row md:flex-col  gap-20  items-center justify-center ">
      <thead >

        <tr className="bg-gray-200 flex flex-col md:flex-row md:gap-40 lg:flex-row lg:gap-40 ">
          <th>Requester</th>
          <th>Location</th>
          <th>Reason</th>
          <th>Contact</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((r) => (
          <tr key={r._id} className="border-b flex flex-col md:flex-row md:gap-40 lg:flex-row lg:gap-40">
            <td>{r.user.name}</td>
            <td>{r.location}</td>
            <td>{r.reason}</td>
            <td>{r.contact}</td>
            <td>{r.status}</td>
            <td>
              {r.status === "pending" && (
                <>
                  <button onClick={() => handleAction(r._id, "accept")} className="bg-green-500 text-white px-2 py-1 mr-2 rounded">
                    Accept
                  </button>
                  <button onClick={() => handleAction(r._id, "reject")} className="bg-red-500 text-white px-2 py-1 rounded">
                    Reject
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
</div>
  );
};

export default FoodRequestsTable;
