// backend/models/ExcelData.js

import mongoose from 'mongoose';

const excelDataSchema = new mongoose.Schema(
  {
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('ExcelData', excelDataSchema);
