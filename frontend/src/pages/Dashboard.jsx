import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const playHoverSound = () => {
    const audio = new Audio('/hover.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {});
  };

  const cards = [
    {
      title: 'Upload Excel',
      preview: 'https://cdn-icons-png.flaticon.com/512/2991/2991125.png',
      animation: 'animate-bounce',
      link: '/upload-excel',
    },
    {
      title: 'Chart History',
      preview: 'https://cdn-icons-png.flaticon.com/512/411/411801.png',
      animation: 'animate-pulse',
      link: '/chart-history',
    },
    {
      title: 'Sales Insights',
      preview: 'https://cdn-icons-png.flaticon.com/512/1159/1159633.png',
      animation: 'animate-spin',
      link: '/sales-insights',
    },
    {
      title: 'Upload History',
      preview: 'https://cdn-icons-png.flaticon.com/512/137/137248.png',
      animation: 'animate-ping',
      link: '/upload-history',
    },
    {
      title: 'User Profile',
      preview: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
      animation: 'animate-wiggle', // Custom optional animation
      link: '/profile',
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white px-6 py-24 overflow-hidden">
      {/* Floating bubbles */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <span
            key={i}
            className="absolute w-6 h-6 rounded-full bg-cyan-400 opacity-20 animate-float blur-md"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 4}s`,
              animationDelay: `${Math.random()}s`,
            }}
          />
        ))}
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold text-center mb-16 text-cyan-300 z-10 relative"
      >
        Welcome to Excel Analytics Dashboard 🚀
      </motion.h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto z-10 relative">
        {cards.map((card, i) => (
          <Link to={card.link} key={i}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-[#1f293a] rounded-2xl shadow-xl p-6 hover:shadow-[0_0_20px_#00f2ff] transition cursor-pointer"
              onClick={playHoverSound}
            >
              <img
                src={card.preview}
                alt={card.title}
                className={`w-24 h-24 mx-auto mb-4 ${card.animation}`}
              />
              <h2 className="text-xl font-semibold text-center">{card.title}</h2>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
