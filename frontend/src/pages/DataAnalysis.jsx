// src/pages/DataAnalysis.jsx

import React, { useState, useRef } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import html2canvas from 'html2canvas';

Chart.register(...registerables);

const DataAnalysis = ({ parsedData }) => {
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [chartType, setChartType] = useState('bar');
  const [showChart, setShowChart] = useState(false);

  const chartRef = useRef(null); // Create a reference for chart div

  if (!parsedData || parsedData.length === 0) {
    return (
      <div className="text-center text-white mt-10">
        No data uploaded yet! 📄
      </div>
    );
  }

  const keys = Object.keys(parsedData[0]);

  const chartData = {
    labels: parsedData.map((item) => item[xAxis]),
    datasets: [
      {
        label: `${yAxis}`,
        data: parsedData.map((item) => item[yAxis]),
        backgroundColor: 'rgba(0, 255, 255, 0.5)',
        borderColor: '#00ffff',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <Bar data={chartData} options={chartOptions} />;
      case 'line':
        return <Line data={chartData} options={chartOptions} />;
      case 'pie':
        return <Pie data={chartData} options={chartOptions} />;
      default:
        return null;
    }
  };

  const handleDownload = async () => {
    if (!chartRef.current) return;
    const canvas = await html2canvas(chartRef.current);
    const link = document.createElement('a');
    link.download = 'chart.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] p-10 text-white">
      <h1 className="text-3xl font-bold mb-8 text-cyan-400 text-center">Analyze Your Data 📈</h1>

      {/* Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
        {/* Select X-Axis */}
        <select
          value={xAxis}
          onChange={(e) => setXAxis(e.target.value)}
          className="p-3 rounded bg-[#1f293a] border border-cyan-400"
        >
          <option value="">Select X-Axis</option>
          {keys.map((key, idx) => (
            <option key={idx} value={key}>{key}</option>
          ))}
        </select>

        {/* Select Y-Axis */}
        <select
          value={yAxis}
          onChange={(e) => setYAxis(e.target.value)}
          className="p-3 rounded bg-[#1f293a] border border-cyan-400"
        >
          <option value="">Select Y-Axis</option>
          {keys.map((key, idx) => (
            <option key={idx} value={key}>{key}</option>
          ))}
        </select>

        {/* Chart Type */}
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="p-3 rounded bg-[#1f293a] border border-cyan-400"
        >
          <option value="bar">Bar Chart</option>
          <option value="line">Line Chart</option>
          <option value="pie">Pie Chart</option>
        </select>
      </div>

      {/* Generate + Download */}
      <div className="flex justify-center gap-6 mb-8">
        <button
          onClick={() => setShowChart(true)}
          className="bg-cyan-400 text-black font-bold px-6 py-2 rounded hover:bg-cyan-300 transition"
        >
          Generate Chart
        </button>
        {showChart && (
          <button
            onClick={handleDownload}
            className="bg-green-400 text-black font-bold px-6 py-2 rounded hover:bg-green-300 transition"
          >
            Download Chart
          </button>
        )}
      </div>

      {/* Chart Preview */}
      <div ref={chartRef} className="bg-[#1f293a] rounded-lg shadow-lg p-6 h-[500px]">
        {showChart ? renderChart() : (
          <div className="text-center text-gray-400 mt-24">
            Select X, Y Axis and Chart Type 🚀
          </div>
        )}
      </div>
    </div>
  );
};

export default DataAnalysis;
