import React, { useEffect, useState } from 'react';

const UploadHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch('http://localhost:5000/api/excel/history', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setHistory(data.history);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Failed to fetch upload history:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white p-8">
    <h1 className="text-3xl font-bold mb-6 text-center text-cyan-400 h-[8.25rem] flex items-center justify-center">
  Upload History 📁
</h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : history.length > 0 ? (
        <div className="max-w-3xl mx-auto">
          <ul className="space-y-4">
            {history.map((item, index) => (
              <li
                key={index}
                className="bg-[#1f293a] p-4 rounded-lg shadow-md hover:shadow-cyan-400/40 transition"
              >
                <p className="text-sm">
                  <span className="text-cyan-400">Uploaded At:</span>{' '}
                  {new Date(item.createdAt).toLocaleString()}
                </p>
                <p className="text-xs text-gray-400">ID: {item._id}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-gray-400">No uploads found yet. Upload an Excel file first.</p>
      )}
    </div>
  );
};

export default UploadHistory;
