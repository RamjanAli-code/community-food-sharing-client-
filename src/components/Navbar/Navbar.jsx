import React, { useContext } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../AuthProvider/AuthProvider';
const Navbar = () => {
  const { user, setUser, loading } = useContext(AuthContext);
  const auth = getAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut().then(() => {
      setUser(null);
      toast.info("Logout successful");
      navigate("/");
    });
  };
  return (
    <div className="navbar shadow-sm w-11/12 mx-auto h-20 bg-gray-600 text-red-300 ">
      <div className="navbar-start  ">
        <div className="dropdown  ">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-purple-600 underline underline-offset-2" : ""}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/availableFood"
                className={({ isActive }) =>
                  isActive ? "text-purple-600 underline underline-offset-2 " : ""}>
                AvailableFood
              </NavLink>
            </li>
          </ul>
        </div>
        <Link to="/"><img src="/src/assets/16y.webp" alt="" className='h-10 w-10 rounded-xl' /></Link>
        <Link to="/" className="btn btn-ghost text-2xl">
          Food
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex gap-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-purple-600 underline underline-offset-2" : ""}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/availableFood"
              className={({ isActive }) =>
                isActive ? "text-purple-600 underline underline-offset-2" : ""}>
              AvailableFood
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end pr-5">
        {loading ? (
          <span className="text-green-500">Loading...</span>
        ) : user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user?.photoURL || "https://i.ibb.co/4pDNDk1/user.png"} alt="User" title={user?.displayName} />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[99] p-2 shadow bg-white rounded-box w-52 text-black">
              <li className="text-center font-semibold py-2 border-b">
                {user.displayName || "User"}
              </li>
              <li>
                <NavLink to="/addFood">
                  Add Food
                </NavLink>
              </li>
              <li>
                <NavLink to="/manageFood">
                  Manage My Foods
                </NavLink>
              </li>
              <li>
                <NavLink to="/foodRequest">
                  My Food Requests
                </NavLink>
              </li>
              <li>
                <button onClick={handleLogout} className="text-red-600 font-bold">Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/Login" className="btn btn-sm bg-green-500"> Login</Link>
        )}
        <ToastContainer position="top-center"/>
      </div>
    </div>
  );
};

export default Navbar;
