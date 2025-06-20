import { NavLink } from 'react-router-dom';
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import './quality.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';

const ip = '192.168.0.105';

const QualityMaster = () => {
    const [data, setData] = useState([
        {
            id: 1,
            customer_name: 'ABC Motors',
            part_name: 'Engine Block',
            part_number: 'ENG-1234',
            grade: 'A356',
            entered_by: 'John Doe',
            req_si_min: '6.5',
            req_si_max: '7.5',
            req_fe_min: '0.12',
            req_fe_max: '0.20',
            req_cu_min: '0.05',
            req_cu_max: '0.10',
            status: 'pending'
        },
        {
            id: 2,
            customer_name: 'XYZ Automotive',
            part_name: 'Wheel Hub',
            part_number: 'WH-5678',
            grade: 'A380',
            entered_by: 'Jane Smith',
            req_si_min: '7.5',
            req_si_max: '9.5',
            req_fe_min: '0.8',
            req_fe_max: '1.2',
            req_mn_min: '0.35',
            req_mn_max: '0.65',
            status: 'pending'
        },
        {
            id: 3,
            customer_name: 'Global Parts',
            part_name: 'Transmission Case',
            part_number: 'TC-9012',
            grade: 'A413',
            entered_by: 'Mike Johnson',
            req_si_min: '11.0',
            req_si_max: '13.0',
            req_mg_min: '0.25',
            req_mg_max: '0.45',
            status: 'pending'
        }
    ]);
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const navigate = useNavigate();

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length); 
    const currentItem = data.slice(startIndex, endIndex);  
    const totalPage = Math.ceil(data.length / itemsPerPage);
    
    const handlePaginationChange = (event, page) => {
        setCurrentPage(page);
    };
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://${ip}:5002/quality/create`);
                setData(response.data);
            } catch(error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            if(window.confirm('Are you sure you want to delete this item?')) {
                await axios.delete(`http://${ip}:5002/quality/create/${id}`);
                const response = await axios.get(`http://${ip}:5002/quality/create`);
                setData(response.data);
                alert('Item deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('Error deleting item');
        }
    };

    const handleApprove = async (id) => {
    try {
        if (window.confirm('Are you sure you want to approve this item?')) {
            // Add the approved_by information (you might want to get this from your auth system)
            const approvedBy = "Current User"; // Replace with actual user from your auth system
            
            // Send both status and approved_by to the backend
            const response = await axios.put(
                `http://${ip}:5002/quality/create/${id}/status`,
                { 
                    status: 'approved',
                    approved_by: approvedBy
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Optimistically update the UI without refetching
            setData(data.map(item => 
                item.id === id ? { 
                    ...item, 
                    status: 'approved',
                    approved_by: approvedBy
                } : item
            ));
            
            alert('Item approved successfully');
        }
    } catch (error) {
        console.error('Error approving item:', error);
        alert(`Error approving item: ${error.response?.data?.message || error.message}`);
    }
};

    const handleReject = async (id) => {
        try {
            if(window.confirm('Are you sure you want to reject this item?')) {
                await axios.put(`http://${ip}:5002/quality/create/${id}/reject`);
                const response = await axios.get(`http://${ip}:5002/quality/create`);
                setData(response.data);
                alert('Item rejected successfully');
            }
        } catch (error) {
            console.error('Error rejecting item:', error);
            alert('Error rejecting item');
        }
    };

    return (
        <div className='quality-part-container'>
            <div className='quality-inside-part-contianer'> 
                <NavLink to="/createNew" className='nav-create'>
                    <div className='button-quality-container'>
                        <button className='create-button'>Create New</button>
                    </div>
                </NavLink>
                <div className='quality-inside-part-main-contianer'>
                    <div className='quality-table-master-container'>
                        <table style={{width: '75em'}}>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Customer Name</th>
                                    <th>Part Name</th>
                                    <th>Part Number</th>
                                    <th>Grade</th>
                                    <th>Entered By</th>
                                    <th>Approved By</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody> 
                               {currentItem.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{startIndex + index + 1}</td>
                                        <td>{item.customer_name}</td>
                                        <td>{item.part_name}</td>
                                        <td>{item.part_number}</td>
                                        <td>{item.grade}</td>
                                        <td>{item.entered_by}</td>
                                        <td><input className='approved-input'/></td>
                                        <td>{item.status || 'pending'}</td>
                                        <td>
                                            <div className='action-buttons-container'>
                                               <button 
    type='button' 
    className='action-button edit-button' 
    onClick={() => navigate('/createNew', { state: { data: item } })}
    title="Edit"
>
    <FaEdit className='action-icon'/>
</button>
                                                <button 
                                                    type='button' 
                                                    className='action-button delete-button' 
                                                    onClick={() => handleDelete(item.id)}
                                                    title="Delete"
                                                >
                                                    <FaTrash className='action-icon'/>
                                                </button>
                                                <button 
                                                    type='button' 
                                                    className='action-button accept-button' 
                                                    onClick={() => handleApprove(item.id)}
                                                    title="Approve"
                                                    disabled={item.status === 'approved'}
                                                >
                                                    <FaCheck className='action-icon'/>
                                                </button>
                                                <button 
                                                    type='button' 
                                                    className='action-button reject-button' 
                                                    onClick={() => handleReject(item.id)}
                                                    title="Reject"
                                                    disabled={item.status === 'rejected'}
                                                >
                                                    <FaTimes className='action-icon'/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {totalPage > 1 && (
                            <div className="pagination-container-part-master">
                                <Pagination
                                    count={totalPage}
                                    variant="outlined"
                                    shape="rounded"
                                    page={currentPage}
                                    onChange={handlePaginationChange}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QualityMaster;