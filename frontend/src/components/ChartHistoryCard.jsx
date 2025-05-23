// components/ChartHistoryCard.jsx
import React from 'react';

const ChartHistoryCard = ({ chart }) => {
  return (
    <div className="bg-white p-4 shadow rounded-md hover:shadow-lg transition duration-300">
      <h2 className="text-lg font-bold mb-2 capitalize">{chart.chartType} Chart</h2>
      <p><strong>X-Axis:</strong> {chart.xAxis}</p>
      <p><strong>Y-Axis:</strong> {chart.yAxis}</p>
      <p><strong>Columns:</strong> {chart.selectedColumns.join(', ')}</p>
      <p className="text-sm text-gray-500 mt-2">Saved on: {new Date(chart.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default ChartHistoryCard;
