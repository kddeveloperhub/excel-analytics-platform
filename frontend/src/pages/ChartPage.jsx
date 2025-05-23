// pages/ChartPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChartHistoryCard from '../components/ChartHistoryCard';
import { toast } from 'react-toastify';

const ChartPage = () => {
  const [chartHistory, setChartHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchChartHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/chart-history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setChartHistory(data);
    } catch (err) {
      console.error('Error fetching chart history:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveChart = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        '/api/chart-history',
        {
          chartType: 'bar',
          xAxis: 'Work Hours',
          yAxis: 'Performance',
          selectedColumns: ['Work Hours', 'Performance']
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      toast.success('Chart saved to history!');
      fetchChartHistory(); // Refresh
    } catch (error) {
      console.error('Error saving chart:', error);
      toast.error('Failed to save chart');
    }
  };

  useEffect(() => {
    fetchChartHistory();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">📊 Chart History</h1>

      <div className="flex justify-center mb-6">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition duration-200"
          onClick={saveChart}
        >
          ➕ Save Dummy Chart
        </button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : chartHistory.length === 0 ? (
        <p className="text-center text-gray-500">No chart history found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {chartHistory.map((chart) => (
            <ChartHistoryCard key={chart._id} chart={chart} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChartPage;
