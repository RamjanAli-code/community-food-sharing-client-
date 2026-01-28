import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { Outlet, useNavigation } from 'react-router-dom';
const Root = () => {
      const navigation = useNavigation();
  if (navigation.state === "loading") {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer></Footer>
        </div>
    );
};
export default Root;