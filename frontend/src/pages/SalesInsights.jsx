// src/pages/SalesInsights.jsx

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const SalesInsights = () => {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('http://localhost:5000/api/excel/data', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        const rawData = data.data || [];

        // Transform your raw Excel data into performance insights
        const insightsData = rawData.map((item, index) => {
          const workHours = parseFloat(item['Work Hours'] || item['workHours'] || 0);
          const workQuality = parseFloat(item['Work Quality'] || item['workQuality'] || 0);

          let performance = 'Average';
          if (workQuality > 80 && workHours > 40) {
            performance = 'High';
          } else if (workQuality < 50 || workHours < 20) {
            performance = 'Low';
          }

          return {
            employeeId: item['Employee ID'] || item['employeeId'] || (index + 1),
            workHours,
            workQuality,
            performance,
          };
        });

        setInsights(insightsData);
      } catch (error) {
        console.error('Error fetching sales insights:', error);
        toast.error('Failed to fetch sales insights!');
      }
    };

    fetchInsights();
  }, []);

  if (insights.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white">
        <p>No insights available. Please upload Excel first.</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white px-6 py-24">
      <h2 className="text-4xl font-bold text-center text-cyan-300 mb-8">Sales Insights 📈</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-center table-auto">
          <thead>
            <tr className="border-b bg-gray-800">
              <th className="px-4 py-2 text-cyan-300">Employee ID</th>
              <th className="px-4 py-2 text-cyan-300">Work Hours</th>
              <th className="px-4 py-2 text-cyan-300">Work Quality (%)</th>
              <th className="px-4 py-2 text-cyan-300">Performance</th>
            </tr>
          </thead>
          <tbody>
            {insights.map((item, index) => (
              <tr key={index} className="border-b bg-gray-700">
                <td className="px-4 py-2">{item.employeeId}</td>
                <td className="px-4 py-2">{item.workHours}</td>
                <td className="px-4 py-2">{item.workQuality}</td>
                <td className="px-4 py-2 font-bold">{item.performance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesInsights;
