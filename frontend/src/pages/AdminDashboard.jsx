import React from 'react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white px-6 py-24">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-center mb-12 text-purple-400"
      >
        Admin Control Panel 🛡️
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {[
          { title: 'Manage Users', icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828479.png' },
          { title: 'View Upload Logs', icon: 'https://cdn-icons-png.flaticon.com/512/861/861342.png' },
          { title: 'System Settings', icon: 'https://cdn-icons-png.flaticon.com/512/2099/2099058.png' },
        ].map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-[#1f293a] p-6 rounded-2xl shadow-md hover:shadow-purple-400/40 transition"
          >
            <img src={card.icon} alt={card.title} className="w-20 h-20 mx-auto mb-4 animate-pulse" />
            <h2 className="text-xl font-semibold text-center">{card.title}</h2>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
