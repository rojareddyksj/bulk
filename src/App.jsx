

import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function App() {
  // Column definitions for the grid
  const columnDefs = [
    { headerName: "ID", field: "id" },
    { headerName: "Name", field: "name" },
    { headerName: "Age", field: "age" },
    { headerName: "Country", field: "country" }
  ];

  // Dummy row data
  const rowData = [
    { id: 1, name: "John Doe", age: 28, country: "USA" },
    { id: 2, name: "Jane Smith", age: 34, country: "Canada" },
    { id: 3, name: "Michael Johnson", age: 45, country: "UK" },
    { id: 4, name: "Emily Davis", age: 22, country: "Australia" },
    { id: 5, name: "David Wilson", age: 38, country: "Germany" }
  ];

  return (
    <div className="App">
      <h2>AG-Grid Dummy Table</h2>
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
        />
      </div>
    </div>
  );
}

export default App;








