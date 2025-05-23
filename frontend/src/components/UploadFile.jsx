// frontend/components/UploadFile.jsx
import React, { useState } from 'react';
import axios from 'axios';

const UploadFile = ({ setExcelData }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please choose a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/excel/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token if needed
        },
      });

      setExcelData(response.data.data); // Update state with the parsed data
      alert('File uploaded and data parsed successfully');
    } catch (error) {
      console.error('Error uploading file', error);
      alert('Error uploading file');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload File</button>
    </div>
  );
};

export default UploadFile;
