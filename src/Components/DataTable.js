import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './DataTable.css'; // Import CSS file for styling

function DataTable({ data, setData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [editableRowIndex, setEditableRowIndex] = useState(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (rowIndex) => {
    setEditableRowIndex(rowIndex);
  };

  const handleUpdate = () => {
    setEditableRowIndex(null);
  };

  const handleCellChange = (e, rowIndex, columnName) => {
    const newData = [...data];
    newData[rowIndex][columnName] = e.target.value;
    setData(newData);
  };

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'updated_data.xlsx');
  };

  let filteredData = data;
  if (searchQuery) {
    filteredData = data.filter((row) => {
      return Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }

  return (
    <div className="data-table-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
      <button onClick={handleDownload} className="download-button">
        <i className="fa fa-download"></i> Download
      </button>
      <table className="data-table">
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((column) => (
                <th key={column}>{column}</th>
              ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(row).map((column, columnIndex) => (
                <td key={columnIndex}>
                  {editableRowIndex === rowIndex ? (
                    <input
                      type="text"
                      value={row[column]}
                      onChange={(e) => handleCellChange(e, rowIndex, column)}
                    />
                  ) : (
                    row[column]
                  )}
                </td>
              ))}
              <td>
                {editableRowIndex === rowIndex ? (
                  <button onClick={() => handleUpdate()}>Update</button>
                ) : (
                  <button onClick={() => handleEdit(rowIndex)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default DataTable;
