// controllers/chartController.js
import ChartHistory from '../models/ChartHistory.js';

export const getChartHistory = async (req, res) => {
  try {
    const charts = await ChartHistory.find({ user: req.user.id }).sort({ createdAt: -1 });
    console.log('Fetched Charts:', charts); // Debugging

    if (!charts.length) {
      return res.status(404).json({ message: 'No saved charts found' });
    }

    res.status(200).json({ history: charts });
  } catch (err) {
    console.error('Error fetching chart history:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const saveChart = async (req, res) => {
  const { chartType, xAxis, yAxis, selectedColumns } = req.body;

  if (!chartType || !xAxis || !yAxis || !selectedColumns) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Save the new chart with the logged-in user
    const newChart = new ChartHistory({
      chartType,
      xAxis,
      yAxis,
      selectedColumns,
      user: req.user.id, // Associate the chart with the logged-in user
    });

    await newChart.save();
    res.status(201).json({ message: 'Chart saved successfully', chart: newChart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save chart' });
  }
};
