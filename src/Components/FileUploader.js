import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './FileUploader.css'; // Import CSS file for styling

function FileUploader({ setData }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setData(jsonData);
    };
    reader.readAsArrayBuffer(uploadedFile);
  };

  return (
    <div className="file-upload-container">
      <label htmlFor="file-upload" className="upload-button">
        <input type="file" id="file-upload" onChange={handleFileChange} />
        <span className="upload-icon">📂</span>
        Select File
      </label>
      {file && <div className="file-name">{file.name}</div>}
    </div>
  );
}

export default FileUploader;
