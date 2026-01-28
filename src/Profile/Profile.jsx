import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import Logout from "../Logout/Logout.jsx";
const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const navigate = useNavigate();
  const logout = () => {
    setUser(null);
    navigate("/");
  };
  const handleSave = async (e) => {
    e.preventDefault();
    if (!name || !photoURL) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });
      await user.reload();
      const updatedUser = user.auth.currentUser;
      setUser(updatedUser);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };
  return (
    <div className="bg-gray-200 w-11/12 mx-auto p-6 rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold items-center text-center">My Profile</h1>
      <img src={user?.photoURL || ""} alt="Profile" className="mx-auto w-32 h-32 mb-4 shadow rounded-full" />
      <h2 className="text-xl font-semibold mb-1">
        Name: {user?.displayName || ""}
      </h2>
      <p className="text-gray-600 mb-4">
        <span className="font-semibold">Email:</span> {user?.email}
      </p>
      <form
        onSubmit={handleSave}
        className="bg-white p-4 rounded-lg shadow-md mt-4">
        <h3 className="text-lg font-semibold mb-3">Edit Profile</h3>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name"
          className="input input-bordered w-full mb-3 bg-gray-400" />
        <input type="text" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} placeholder="Enter photo URL"
          className="input input-bordered w-full mb-3 bg-gray-400" />
        <button type="submit" className="btn btn-sm bg-blue-500 text-white w-full">
          Save Changes
        </button>
      </form>
      <Logout logout={logout} setUser={setUser} />
    </div>
  );
};

export default Profile;