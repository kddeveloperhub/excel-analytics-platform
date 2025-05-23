import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // To toggle password visibility
  const [username, setUsername] = useState(''); // To store the username after login
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        setUsername(data.username); // Set username after login
        toast.success('Login successful!');
        navigate('/dashboard');
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error('An error occurred during login');
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden font-[Poppins] text-white">
      {/* Floating radial animation */}
      {[...Array(50)].map((_, i) => (
        <span
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            transformOrigin: '128px',
            transform: `scale(2.2) rotate(${(360 / 50) * i}deg)`,
            animationDelay: `${(3 / 50) * i}s`,
            animation: 'blink 1s linear infinite',
          }}
        ></span>
      ))}

      {/* Login Card */}
      <div className="absolute w-[90%] max-w-md bg-[#1f293a] p-8 rounded-2xl shadow-2xl z-10 backdrop-blur-sm">
        <h2 className="text-3xl font-semibold text-center text-cyan-400 mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 bg-transparent border-2 border-[#2c4766] text-white px-4 rounded-full outline-none peer focus:border-cyan-400"
              placeholder="Email"
            />
            <label className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-sm text-white peer-focus:top-1 peer-focus:text-xs peer-focus:text-cyan-400 transition-all bg-[#1f293a] px-1 ${email ? 'top-[-14px] text-xs' : ''}`}>
              Email
            </label>
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 bg-transparent border-2 border-[#2c4766] text-white px-4 rounded-full outline-none peer focus:border-cyan-400"
              placeholder="Password"
            />
            <label className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-sm text-white peer-focus:top-1 peer-focus:text-xs peer-focus:text-cyan-400 transition-all bg-[#1f293a] px-1 ${password ? 'top-[-14px] text-xs' : ''}`}>
              Password
            </label>

            {/* Eye Icon to Toggle Password Visibility */}
            <div
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right text-sm">
            <a href="/forgot-password" className="text-white hover:text-cyan-400">Forgot Password?</a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-cyan-400 text-[#1f293a] font-bold py-2 rounded-full hover:bg-cyan-300 transition"
          >
            Login
          </button>

          {/* Register Link */}
          <div className="text-center mt-4">
            <a href="/register" className="text-cyan-400 hover:underline font-medium">
              Don’t have an account? Register
            </a>
          </div>
        </form>

        {/* Show Username after login */}
        {username && (
          <div className="mt-4 text-center text-cyan-400">
            <p>Welcome, {username}!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
