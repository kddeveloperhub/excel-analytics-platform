import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full bg-[#0f172a] text-white shadow-md py-4 px-8 flex justify-between items-center fixed top-0 z-50">
      <h1 className="text-2xl font-bold text-cyan-400 tracking-wider animate-pulse">ExcelAnalytics</h1>
      <div className="flex gap-6 text-lg">
        <Link to="/" className="hover:text-cyan-400 transition duration-300">Dashboard</Link>
        <Link to="/login" className="hover:text-cyan-400 transition duration-300">Login</Link>
        <Link to="/register" className="hover:text-cyan-400 transition duration-300">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
