import React, { useState, useEffect } from 'react';
import './spectro.css';
import Sidebar from './Sidebar';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import 'react-datepicker/dist/react-datepicker.css';

import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const Spectro = () => {
  const [heatNumber, setHeatNumber] = useState('');
  const [grade, setGrade] = useState('');
  const [part, setPart] = useState('');
  const [furnaceNumber, setFurnaceNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [remarksOpen, setRemarksOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteReason, setDeleteReason] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [currentEnteredBy, setCurrentEnteredBy] = useState('');

  // Sample data for spectro analysis
  const sampleData = [
    {
      id: 1,
      part: 'AX-123',
      heatNumber: 'HT2023001',
      furnaceNumber: '1',
      itemName: 'Flange',
      grade: '316L',
      customerName: 'ABC Manufacturing',
      c: '0.03',
      si: '0.45',
      mn: '1.25',
      p: '0.025',
      s: '0.015',
      cr: '16.5',
      zn: '0.05',
      ni: '10.2',
      spectroResult: 'Pass',
      remarks: 'Within specification limits',
      enteredBy: 'John Doe',
      date: '2023-06-15'
    },
    {
      id: 2,
      part: 'BY-456',
      heatNumber: 'HT2023002',
      furnaceNumber: '2',
      itemName: 'Valve Body',
      grade: '304',
      customerName: 'XYZ Industries',
      c: '0.05',
      si: '0.50',
      mn: '1.30',
      p: '0.030',
      s: '0.020',
      cr: '18.0',
      zn: '0.06',
      ni: '8.5',
      spectroResult: 'Pass',
      remarks: 'Good material quality',
      enteredBy: 'Jane Smith',
      date: '2023-06-16'
    },
    {
      id: 3,
      part: 'CZ-789',
      heatNumber: 'HT2023003',
      furnaceNumber: '3',
      itemName: 'Pipe Fitting',
      grade: 'Duplex',
      customerName: 'Global Pipes',
      c: '0.02',
      si: '0.40',
      mn: '1.20',
      p: '0.020',
      s: '0.010',
      cr: '22.0',
      zn: '0.04',
      ni: '5.5',
      spectroResult: 'Fail',
      remarks: 'Chromium content low',
      enteredBy: 'Mike Johnson',
      date: '2023-06-17'
    },
    {
      id: 4,
      part: 'DX-101',
      heatNumber: 'HT2023004',
      furnaceNumber: '1',
      itemName: 'Bracket',
      grade: '316',
      customerName: 'Metal Works Inc',
      c: '0.04',
      si: '0.55',
      mn: '1.35',
      p: '0.035',
      s: '0.025',
      cr: '17.0',
      zn: '0.07',
      ni: '12.0',
      spectroResult: 'Pass',
      remarks: '',
      enteredBy: 'Sarah Williams',
      date: '2023-06-18'
    },
    {
      id: 5,
      part: 'EY-202',
      heatNumber: 'HT2023005',
      furnaceNumber: '2',
      itemName: 'Gear Housing',
      grade: '410',
      customerName: 'Precision Parts',
      c: '0.08',
      si: '0.60',
      mn: '1.40',
      p: '0.040',
      s: '0.030',
      cr: '12.5',
      zn: '0.08',
      ni: '0.5',
      spectroResult: 'Fail',
      remarks: 'High carbon content',
      enteredBy: 'David Brown',
      date: '2023-06-19'
    }
  ];

  const [rows, setRows] = useState(sampleData);

  const [testCounts, setTestCounts] = useState({
    Total: rows.length,
    Passed: rows.filter(row => row.spectroResult === 'Pass').length,
    Failed: rows.filter(row => row.spectroResult === 'Fail').length,
    CastResult: rows.length > 0 ? rows[rows.length-1].heatNumber : 'N/A'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedDate(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update test counts whenever rows change
    setTestCounts({
      Total: rows.length,
      Passed: rows.filter(row => row.spectroResult === 'Pass').length,
      Failed: rows.filter(row => row.spectroResult === 'Fail').length,
      CastResult: rows.length > 0 ? rows[rows.length-1].heatNumber : 'N/A'
    });
  }, [rows]);

  const handleSelectRow = (id) => {
    const selectedIndex = selectedRows.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selectedRows, id];
    } else {
      newSelected = selectedRows.filter((rowId) => rowId !== id);
    }

    setSelectedRows(newSelected);
  };

  const handleSelectAllRows = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((row) => row.id);
      setSelectedRows(newSelected);
    } else {
      setSelectedRows([]);
    }
  };

  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      part: part || '',
      heatNumber: heatNumber || '',
      furnaceNumber: furnaceNumber || '',
      itemName: '',
      grade: grade || '',
      customerName: '',
      c: '',
      si: '',
      mn: '',
      p: '',
      s: '',
      cr: '',
      zn: '',
      ni: '',
      spectroResult: '',
      remarks: '',
      enteredBy: '',
      date: selectedDate.toLocaleDateString()
    };
    setRows([...rows, newRow]);
    setHeatNumber('');
    setPart('');
    setFurnaceNumber('');
    setGrade('');
  };

  const handleDeleteRow = () => {
    if (selectedRows.length > 0 && deleteReason) {
      const updatedRows = rows.filter(row => !selectedRows.includes(row.id));
      setRows(updatedRows);
      setDeleteOpen(false);
      setDeleteReason('');
      setSelectedRows([]);
    }
  };

  const handleSearch = () => {
    // Filter rows based on input values
    const filteredRows = sampleData.filter(row => {
      return (
        (!heatNumber || row.heatNumber.includes(heatNumber)) &&
        (!grade || row.grade.includes(grade)) &&
        (!part || row.part.includes(part)) &&
        (!furnaceNumber || row.furnaceNumber === furnaceNumber) &&
        (!dateFrom || new Date(row.date) >= new Date(dateFrom)) &&
        (!dateTo || new Date(row.date) <= new Date(dateTo))
      );
    });
    
    setRows(filteredRows);
  };

  const handleReset = () => {
    setHeatNumber('');
    setGrade('');
    setPart('');
    setFurnaceNumber('');
    setDateFrom('');
    setDateTo('');
    setRows(sampleData);
  };

  const handleCellEdit = (id, field, value) => {
    const updatedRows = rows.map(row => 
      row.id === id ? {...row, [field]: value} : row
    );
    setRows(updatedRows);
  };

  return (
    <div className="spectro-container">
      <Sidebar />
      
      <div className="spectro-content">
        <Card className="input-card">
          <div className="input-section">
            <div className="input-fields">
              <TextField
                label="Heat Number"
                value={heatNumber}
                onChange={(e) => setHeatNumber(e.target.value)}
                margin="normal"
                size="small"
                sx={{ width: 200 }}
              />
              <TextField
                label="Grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                margin="normal"
                size="small"
                sx={{ width: 200 }}
              />
              <TextField
                label="Part"
                value={part}
                onChange={(e) => setPart(e.target.value)}
                margin="normal"
                size="small"
                sx={{ width: 200 }}
              />
              <FormControl margin="normal" size="small" sx={{ width: 200 }}>
                <InputLabel>Furnace Number</InputLabel>
                <Select
                  value={furnaceNumber}
                  label="Furnace Number"
                  onChange={(e) => setFurnaceNumber(e.target.value)}
                >
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Date From"
                type="date"
                margin="normal"
                size="small"
                sx={{ width: 200 }}
                InputLabelProps={{ shrink: true }}
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
              <TextField
                label="Date To"
                type="date"
                margin="normal"
                size="small"
                sx={{ width: 200 }}
                InputLabelProps={{ shrink: true }}
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
            <div className="filter-buttons">
              <Button 
                variant="contained" 
                color="primary"
                onClick={handleSearch}
                sx={{ 
                  width: 200,
                  height: 40
                }}
              >
                Search
              </Button>
              <Button 
                variant="outlined" 
                color="secondary"
                onClick={handleReset}
                sx={{ 
                  width: 200,
                  height: 40
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </Card>

        <Card className="stats-card">
          <div className="test-counts">
            <div className="count-box total">
              <span>Total Tests:</span>
              <strong>{testCounts.Total}</strong>
            </div>
            <div className="count-box passed">
              <span>Passed:</span>
              <strong>{testCounts.Passed}</strong>
            </div>
            <div className="count-box failed">
              <span>Failed:</span>
              <strong>{testCounts.Failed}</strong>
            </div>
            <div className="count-box castres">
              <span>Last Result Heat No:</span>
              <strong>{testCounts.CastResult}</strong>
            </div>
          </div>
        </Card>

        <Card className="table-card">
          <div className="table-actions">
            <Button 
              variant="contained" 
              color="success" 
              onClick={handleAddRow}
              sx={{ fontWeight: 'bold' }}
            >
              Add Row
            </Button>
            <Button 
              variant="contained" 
              color="error" 
              onClick={() => selectedRows.length > 0 && setDeleteOpen(true)}
              disabled={selectedRows.length === 0}
              sx={{ fontWeight: 'bold' }}
            >
              Delete Selected ({selectedRows.length})
            </Button>
          </div>

          <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 400px)' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" sx={{ backgroundColor: '#e0e0e0' }}>
                    <Checkbox
                      color="primary"
                      indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                      checked={rows.length > 0 && selectedRows.length === rows.length}
                      onChange={handleSelectAllRows}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e0e0e0' }}>Part</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e0e0e0' }}>Heat Number</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e0e0e0' }}>Furnace Number</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e0e0e0' }}>Item Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e0e0e0' }}>Grade</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e0e0e0' }}>Customer Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e0e0e0' }}>C</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e0e0e0' }}>Si</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e0e0e0' }}>Mn</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e0e0e0' }}>P</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e0e0e0' }}>S</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e0e0e0' }}>Cr</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e0e0e0' }}>Zn</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e0e0e0' }}>Ni</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e0e0e0' }}>Spectro Result</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e0e0e0', width: 150 }}>Remarks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow 
                    key={row.id} 
                    hover
                    selected={selectedRows.indexOf(row.id) !== -1}
                    sx={{ 
                      '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                      '&:hover': { backgroundColor: '#f0f0f0' }
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={selectedRows.indexOf(row.id) !== -1}
                        onChange={() => handleSelectRow(row.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={row.part}
                        onChange={(e) => handleCellEdit(row.id, 'part', e.target.value)}
                        size="small"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={row.heatNumber}
                        onChange={(e) => handleCellEdit(row.id, 'heatNumber', e.target.value)}
                        size="small"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={row.furnaceNumber}
                        onChange={(e) => handleCellEdit(row.id, 'furnaceNumber', e.target.value)}
                        size="small"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={row.itemName}
                        onChange={(e) => handleCellEdit(row.id, 'itemName', e.target.value)}
                        size="small"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={row.grade}
                        onChange={(e) => handleCellEdit(row.id, 'grade', e.target.value)}
                        size="small"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={row.customerName}
                        onChange={(e) => handleCellEdit(row.id, 'customerName', e.target.value)}
                        size="small"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={row.c}
                        onChange={(e) => handleCellEdit(row.id, 'c', e.target.value)}
                        size="small"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={row.si}
                        onChange={(e) => handleCellEdit(row.id, 'si', e.target.value)}
                        size="small"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={row.mn}
                        onChange={(e) => handleCellEdit(row.id, 'mn', e.target.value)}
                        size="small"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={row.p}
                        onChange={(e) => handleCellEdit(row.id, 'p', e.target.value)}
                        size="small"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={row.s}
                        onChange={(e) => handleCellEdit(row.id, 's', e.target.value)}
                        size="small"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={row.cr}
                        onChange={(e) => handleCellEdit(row.id, 'cr', e.target.value)}
                        size="small"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={row.zn}
                        onChange={(e) => handleCellEdit(row.id, 'zn', e.target.value)}
                        size="small"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={row.ni}
                        onChange={(e) => handleCellEdit(row.id, 'ni', e.target.value)}
                        size="small"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <select
                        value={row.spectroResult}
                        onChange={(e) => handleCellEdit(row.id, 'spectroResult', e.target.value)}
                        style={{ 
                          width: '100%',
                          padding: '8px',
                          borderRadius: '4px',
                          border: '1px solid #ccc'
                        }}
                      >
                        <option value="">Select</option>
                        <option value="Pass">Ok</option>
                        <option value="Fail">Not Ok</option>
                      </select>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outlined"
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRows([row.id]);
                          setCurrentEnteredBy(row.enteredBy || '');
                          setRemarksOpen(true);
                        }}
                        sx={{ 
                          width: '100%',
                          padding: '8px',
                          fontSize: '0.875rem',
                          fontWeight: 'bold'
                        }}
                      >
                        {row.remarks ? 'Edit Remarks' : 'Add Remarks'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        <Dialog 
          open={remarksOpen} 
          onClose={() => setRemarksOpen(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle sx={{ backgroundColor: '#1976d2', color: 'white' }}>
            {rows.find(r => r.id === selectedRows[0])?.remarks ? 'Edit Remarks' : 'Add Remarks'}
          </DialogTitle>
          <DialogContent sx={{ padding: '20px' }}>
            <TextField
              autoFocus
              margin="dense"
              label="Remarks"
              type="text"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              value={rows.find(r => r.id === selectedRows[0])?.remarks || ''}
              onChange={(e) => handleCellEdit(selectedRows[0], 'remarks', e.target.value)}
            />
            <TextField
              margin="dense"
              label="Entered By"
              type="text"
              fullWidth
              variant="outlined"
              value={currentEnteredBy}
              onChange={(e) => setCurrentEnteredBy(e.target.value)}
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              {currentEnteredBy && (
                <span style={{ alignSelf: 'center', marginLeft: '16px' }}>
                  Entered by: {currentEnteredBy}
                </span>
              )}
              <div>
                <Button onClick={() => setRemarksOpen(false)}>Cancel</Button>
                <Button 
                  onClick={() => {
                    handleCellEdit(selectedRows[0], 'enteredBy', currentEnteredBy);
                    setRemarksOpen(false);
                  }}
                  variant="contained"
                  color="primary"
                  sx={{ ml: 1 }}
                >
                  Save Remarks
                </Button>
              </div>
            </div>
          </DialogActions>
        </Dialog>

        <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
          <DialogTitle sx={{ backgroundColor: '#d32f2f', color: 'white' }}>
            Confirm Row Deletion
          </DialogTitle>
          <DialogContent sx={{ padding: '20px' }}>
            <p>Are you sure you want to delete {selectedRows.length} selected row(s)?</p>
            <TextField
              autoFocus
              margin="dense"
              label="Reason for deletion"
              type="text"
              fullWidth
              variant="outlined"
              multiline
              rows={2}
              value={deleteReason}
              onChange={(e) => setDeleteReason(e.target.value)}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleDeleteRow} 
              disabled={!deleteReason}
              variant="contained"
              color="error"
            >
              Confirm Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Spectro;