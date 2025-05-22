// models/ChartHistory.js
import mongoose from 'mongoose';

const chartHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  chartType: String,
  xAxis: String,
  yAxis: String,
  selectedColumns: [String]
}, { timestamps: true });

const ChartHistory = mongoose.model('ChartHistory', chartHistorySchema);
export default ChartHistory;
