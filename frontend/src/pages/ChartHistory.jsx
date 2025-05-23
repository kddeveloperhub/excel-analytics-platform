import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'react-toastify';
import ThreeDColumnChart from '../components/ThreeDColumnChart';
import ChartHistoryCard from '../components/ChartHistoryCard';

ChartJS.register(...registerables);

const ChartHistory = () => {
  const [excelData, setExcelData] = useState([]);
  const [savedCharts, setSavedCharts] = useState([]);
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [chartType, setChartType] = useState('bar');
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    fetchExcelData();
    fetchChartHistory();
  }, []);

  const fetchExcelData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch('http://localhost:5000/api/excel/data', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();

      if (!res.ok || !result.data || result.data.length === 0) {
        toast.warning(result.message || 'No valid Excel data found.');
        return;
      }

      setExcelData(result.data);
    } catch (error) {
      console.error(error);
      toast.error('Error fetching Excel data');
    }
  };

  const fetchChartHistory = async () => {
    try {
      const token = localStorage.getItem('authToken');
      console.log('Auth Token:', token); // Debugging

      const res = await fetch('http://localhost:5000/api/charts/history', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      console.log('Chart History Response:', result); // Debugging

      if (res.ok && result.history) {
        setSavedCharts(result.history);
      } else {
        console.error('Failed to fetch chart history:', result.message);
      }
    } catch (err) {
      console.error('Error fetching chart history:', err);
    }
  };

  const handleGenerate = () => {
    if (!xAxis || !yAxis) {
      toast.warn('Please select both X and Y axis');
      return;
    }
    setShowChart(true);
  };

  const handleSaveToHistory = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const body = {
        chartType,
        xAxis,
        yAxis,
        selectedColumns: [xAxis, yAxis],
      };
      console.log('Save Chart Request Body:', body); // Debugging
      const res = await fetch('http://localhost:5000/api/charts/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const result = await res.json();
      console.log('Save Chart Response:', result); // Debugging
      if (res.ok) {
        toast.success('Chart saved to history');
        fetchChartHistory();
      }
    } catch (error) {
      console.error(error);
      toast.error('Error saving chart');
    }
  };

  const handleDownloadPNG = async () => {
    const canvas = await html2canvas(document.getElementById('chartCanvas'));
    const link = document.createElement('a');
    link.download = 'chart.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleDownloadPDF = async () => {
    const canvas = await html2canvas(document.getElementById('chartCanvas'));
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 190, 100);
    pdf.save('chart.pdf');
  };

  const chartData = {
    labels: excelData.map(item => item[xAxis]),
    datasets: [
      {
        label: `${yAxis}`,
        data: excelData.map(item => item[yAxis]),
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
      case '3d':
        return <ThreeDColumnChart data={excelData.map(item => item[yAxis])} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] p-10 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center text-cyan-400 h-[8.25rem] flex items-center justify-center">
      Chart History 📈
</h1>
      {/* Chart Generation */}
      {excelData.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 max-w-6xl mx-auto">
            <select value={xAxis} onChange={(e) => setXAxis(e.target.value)} className="p-3 bg-gray-700 rounded-lg">
              <option value="">Select X-Axis</option>
              {Object.keys(excelData[0]).map((key, idx) => (
                <option key={idx} value={key}>{key}</option>
              ))}
            </select>

            <select value={yAxis} onChange={(e) => setYAxis(e.target.value)} className="p-3 bg-gray-700 rounded-lg">
              <option value="">Select Y-Axis</option>
              {Object.keys(excelData[0]).map((key, idx) => (
                <option key={idx} value={key}>{key}</option>
              ))}
            </select>

            <select value={chartType} onChange={(e) => setChartType(e.target.value)} className="p-3 bg-gray-700 rounded-lg">
              <option value="bar">Bar Chart</option>
              <option value="line">Line Chart</option>
              <option value="pie">Pie Chart</option>
              <option value="3d">3D Column Chart</option>
            </select>

            <button
              onClick={handleGenerate}
              className="bg-cyan-500 px-4 py-2 rounded-md hover:bg-cyan-400 transition mt-1"
            >
              Generate Chart
            </button>
          </div>

          {showChart && (
            <>
              <div id="chartCanvas" className="bg-[#1f293a] p-8 rounded-xl shadow-xl min-h-[400px]">
                {renderChart()}
              </div>

              <div className="flex justify-center gap-4 mt-6 flex-wrap">
                <button onClick={handleDownloadPNG} className="bg-cyan-400 px-6 py-2 rounded-md hover:bg-cyan-300 transition">
                  Download PNG 📥
                </button>
                <button onClick={handleDownloadPDF} className="bg-pink-400 px-6 py-2 rounded-md hover:bg-pink-300 transition">
                  Download PDF 📄
                </button>
                <button onClick={handleSaveToHistory} className="bg-green-400 px-6 py-2 rounded-md hover:bg-green-300 transition">
                  Save to History 💾
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <p className="text-center text-gray-400">⚠ No data available. Please upload an Excel file first.</p>
      )}

      {/* Saved History */}
      <div className="mt-10">
        <h2 className="text-2xl text-cyan-300 font-semibold mb-4">📚 Saved Chart History</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedCharts.length > 0 ? (
            savedCharts.map((chart, index) => (
              <ChartHistoryCard key={index} chart={chart} />
            ))
          ) : (
            <p className="text-gray-400">No saved charts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartHistory;
