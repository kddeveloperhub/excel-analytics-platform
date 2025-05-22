import { parseExcel } from '../utils/parseExcel.js';
import ExcelData from '../models/ExcelData.js';

export const uploadExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const parsedData = parseExcel(req.file.buffer);

    const savedData = new ExcelData({
      uploadedBy: req.user._id,
      data: parsedData,
    });

    await savedData.save();

    res.status(200).json({ message: 'Excel uploaded successfully!', parsedData });
  } catch (error) {
    console.error('Upload error:', error.message);
    res.status(500).json({ message: `Error processing Excel file: ${error.message}` });
  }
};

export const getExcelData = async (req, res) => {
  try {
    const data = await ExcelData.findOne({ uploadedBy: req.user._id }).sort({ createdAt: -1 });
    if (!data || !data.data || data.data.length === 0) {
      return res.status(404).json({ message: 'No Excel data found' });
    }
    res.status(200).json({ data: data.data });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ message: 'Error fetching Excel data' });
  }
};

export const getUploadHistory = async (req, res) => {
  try {
    const uploads = await ExcelData.find({ uploadedBy: req.user._id })
      .sort({ createdAt: -1 })
      .select('createdAt _id');
    res.status(200).json({ history: uploads });
  } catch (error) {
    console.error('History fetch error:', error);
    res.status(500).json({ message: 'Error fetching upload history' });
  }
};

// Optional extra detail route if needed later
export const getUserUploadHistory = async (req, res) => {
  try {
    const files = await ExcelData.find({ uploadedBy: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ files });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch upload history' });
  }
};
