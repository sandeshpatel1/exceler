import React, { useState } from 'react';
import './App.css';
import FileUploader from './Components/FileUploader';
import DataTable from './Components/DataTable';

function App() {

  const [data, setData] = useState([]);

  return (
    <div className="App">
      <div className='head'>
        <h1>Upload the excel file below</h1>
        <FileUploader setData={setData} />
        <DataTable data={data} setData={setData} />
      </div>
    </div>
  );
}

export default App;
