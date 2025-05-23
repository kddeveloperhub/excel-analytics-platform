import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      toast.error('All fields are required!');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Registration successful!');
        navigate('/login');
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (err) {
      toast.error('Server error during registration');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#141e30] to-[#243b55] font-sans">
      <div className="w-[400px] p-10 bg-black/50 rounded-xl shadow-2xl backdrop-blur-md">
        <h2 className="text-white text-3xl font-semibold mb-8 text-center">Register</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* Username */}
          <div className="relative">
            <input
              type="text"
              required
              className="w-full text-white bg-transparent border-b border-white outline-none px-0 py-3 peer placeholder-transparent"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className={`absolute left-0 top-3 text-white text-base transition-all peer-placeholder-shown:top-3 peer-focus:top-[-14px] peer-focus:text-sm peer-focus:text-cyan-400 ${username ? 'top-[-14px] text-sm' : ''}`}>
              Username
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              required
              className="w-full text-white bg-transparent border-b border-white outline-none px-0 py-3 peer placeholder-transparent"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className={`absolute left-0 top-3 text-white text-base transition-all peer-placeholder-shown:top-3 peer-focus:top-[-14px] peer-focus:text-sm peer-focus:text-cyan-400 ${email ? 'top-[-14px] text-sm' : ''}`}>
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              className="w-full text-white bg-transparent border-b border-white outline-none px-0 py-3 peer placeholder-transparent"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className={`absolute left-0 top-3 text-white text-base transition-all peer-placeholder-shown:top-3 peer-focus:top-[-14px] peer-focus:text-sm peer-focus:text-cyan-400 ${password ? 'top-[-14px] text-sm' : ''}`}>
              Password
            </label>
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              required
              className="w-full text-white bg-transparent border-b border-white outline-none px-0 py-3 peer placeholder-transparent"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label className={`absolute left-0 top-3 text-white text-base transition-all peer-placeholder-shown:top-3 peer-focus:top-[-14px] peer-focus:text-sm peer-focus:text-cyan-400 ${confirmPassword ? 'top-[-14px] text-sm' : ''}`}>
              Confirm Password
            </label>
            <div
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
            >
              {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </div>
          </div>

          <button
            type="submit"
            className="relative inline-block px-8 py-3 text-cyan-400 border border-cyan-400 uppercase font-bold tracking-wide transition-all hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_10px_#03e9f4,0_0_40px_#03e9f4,0_0_80px_#03e9f4]"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
