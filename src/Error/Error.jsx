import React from 'react';
import error from'../assets/error-404.png';
import { Link } from 'react-router-dom';
const Error = () => {
   return (
       <div className=' flex flex-col items-center justify-center mt-10 '>
    <img className='w-1/2 mx-auto' src={error} alt="Error" />
    <h1 className='text-3xl text-black font-bold'>Oops, page not found!</h1>
    <p className='text-gray-400 p-4'>The page you are looking for is not available.</p>
    <Link to="/"  className="  bg-[linear-gradient(125.07deg,rgba(99,46,227,1)_0%,rgba(159,98,242,1)_100%)] text-white border-0 p-2 w-1/5 text-center"><span>Go Back</span></Link>
    </div>
    );
};

export default Error;