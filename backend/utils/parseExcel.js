// backend/utils/parseExcel.js

import * as XLSX from 'xlsx';

export const parseExcel = (buffer) => {
  try {
    const workbook = XLSX.read(buffer, { type: 'buffer' });

    const sheetName = workbook.SheetNames[0];
    if (!sheetName) throw new Error('No sheets found');

    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

    if (!jsonData || jsonData.length === 0) {
      throw new Error('Sheet is empty');
    }

    return jsonData;
  } catch (error) {
    console.error('Excel Parsing Error:', error.message);
    throw error;
  }
};
