// src/pages/UploadExcel.jsx

import React, { useState } from 'react';
import { toast } from 'react-toastify';

const UploadExcel = () => {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error('Please select an Excel file!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('authToken'); // Important for protected route!

      const response = await fetch('http://localhost:5000/api/excel/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('File uploaded and parsed successfully!');
        setParsedData(data.parsedData);  // 🛠 Save parsedData
      } else {
        toast.error(data.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload Error:', error);
      toast.error('An error occurred while uploading.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] p-8 text-white">
     <h1 className="text-3xl font-bold mb-6 text-center text-cyan-400 h-[8.25rem] flex items-center justify-center">
     Upload Excel File 📄
</h1>
      <form onSubmit={handleUpload} className="flex flex-col items-center space-y-4">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="text-white"
        />
        <button
          type="submit"
          className="bg-cyan-400 text-black font-semibold px-6 py-2 rounded-md hover:bg-cyan-300 transition"
        >
          Upload & Preview
        </button>
      </form>

      {/* Table Preview */}
      {parsedData.length > 0 && (
        <div className="mt-10 overflow-x-auto">
          <table className="min-w-full bg-[#1f293a] rounded-lg overflow-hidden shadow-md">
            <thead className="bg-cyan-500 text-black">
              <tr>
                {Object.keys(parsedData[0]).map((key, idx) => (
                  <th key={idx} className="py-2 px-4 text-sm text-left">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {parsedData.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-700 hover:bg-[#2c3e50]">
                  {Object.values(row).map((val, i) => (
                    <td key={i} className="py-2 px-4 text-sm">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UploadExcel;
