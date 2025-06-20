import React, { useState, useEffect } from 'react';
import './dashboard.css';
import axios from 'axios';

const Dashboard = () => {
    const [formData1, setFormData1] = useState({
        heatNo: '',
        grade: '',
        furnace: '',
        part: '',
        date: '',
        spectroResult: '',
        remarks: '',
        composition: {
            C: '',
            Si: '',
            Mn: '',
            P: '',
            S: '',
            Cr: '',
            Zn: '',
            Ni: '',
            Cu: '',
            Mg: '',
            Sn: ''
        },
        pickup: {
            carbon: {
                value: '',
                date: '',
                percentage: ''
            },
            silicon: {
                value: '',
                date: '',
                percentage: ''
            },
            copper: {
                value: '',
                date: '',
                percentage: ''
            }
        }
    });

    const [formData2, setFormData2] = useState({
        heatNo: '',
        grade: '',
        furnace: '',
        part: '',
        date: '',
        spectroResult: '',
        remarks: '',
        composition: {
            C: '',
            Si: '',
            Mn: '',
            P: '',
            S: '',
            Cr: '',
            Zn: '',
            Ni: '',
            Cu: '',
            Mg: '',
            Sn: ''
        },
        pickup: {
            carbon: {
                value: '',
                date: '',
                percentage: ''
            },
            silicon: {
                value: '',
                date: '',
                percentage: ''
            },
            copper: {
                value: '',
                date: '',
                percentage: ''
            }
        }
    });

    const [formData3, setFormData3] = useState({
        heatNo: '',
        grade: '',
        furnace: '',
        part: '',
        date: '',
        spectroResult: '',
        remarks: '',
        composition: {
            C: '',
            Si: '',
            Mn: '',
            P: '',
            S: '',
            Cr: '',
            Zn: '',
            Ni: '',
            Cu: '',
            Mg: '',
            Sn: ''
        },
        pickup: {
            carbon: {
                value: '',
                date: '',
                percentage: ''
            },
            silicon: {
                value: '',
                date: '',
                percentage: ''
            },
            copper: {
                value: '',
                date: '',
                percentage: ''
            }
        }
    });

    const [dashboardData, setDashboardData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://192.168.0.101:3000/api/dashboard');
            setDashboardData(response.data);
            setError(null);
        } catch (err) {
            setError('Error fetching dashboard data');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const handleInputChange = (formNumber) => (e) => {
        const { name, value } = e.target;
        const setFormData = [setFormData1, setFormData2, setFormData3][formNumber - 1];
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCompositionChange = (formNumber) => (e) => {
        const { name, value } = e.target;
        const setFormData = [setFormData1, setFormData2, setFormData3][formNumber - 1];
        setFormData(prev => ({
            ...prev,
            composition: {
                ...prev.composition,
                [name]: value
            }
        }));
    };

    const handlePickupChange = (formNumber, type, field, value) => {
        const setFormData = [setFormData1, setFormData2, setFormData3][formNumber - 1];
        setFormData(prev => ({
            ...prev,
            pickup: {
                ...prev.pickup,
                [type]: {
                    ...prev.pickup[type],
                    [field]: value
                }
            }
        }));
    };

    const handleSubmit = async (formNumber, e) => {
        e.preventDefault();
        const formData = [formData1, formData2, formData3][formNumber - 1];
        try {
            setLoading(true);
            await axios.post('http://192.168.0.101:3000/api/dashboard', formData);
            
            const resetForm = {
                heatNo: '',
                grade: '',
                furnace: '',
                part: '',
                date: '',
                spectroResult: '',
                remarks: '',
                composition: {
                    C: '',
                    Si: '',
                    Mn: '',
                    P: '',
                    S: '',
                    Cr: '',
                    Zn: '',
                    Ni: '',
                    Cu: '',
                    Mg: '',
                    Sn: ''
                },
                pickup: {
                    carbon: {
                        value: '',
                        date: '',
                        percentage: ''
                    },
                    silicon: {
                        value: '',
                        date: '',
                        percentage: ''
                    },
                    copper: {
                        value: '',
                        date: '',
                        percentage: ''
                    }
                }
            };

            if (formNumber === 1) setFormData1(resetForm);
            if (formNumber === 2) setFormData2(resetForm);
            if (formNumber === 3) setFormData3(resetForm);

            fetchDashboardData();
            setError(null);
        } catch (err) {
            setError('Error saving dashboard data');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const renderDashboardCard = (formNumber, title) => {
        const formData = [formData1, formData2, formData3][formNumber - 1];
        
        return (
            <div className="dashboard-card">
                <div className="dashboard-header">
                    <h2 className="dashboard-title">{title}</h2>
                </div>

                <form onSubmit={(e) => handleSubmit(formNumber, e)}>
                    <div className="filter-section">
                        <div className="filter-group">
                            <label className="filter-label">Heat No</label>
                            <input
                                type="text"
                                className="filter-input"
                                name="heatNo"
                                value={formData.heatNo}
                                onChange={handleInputChange(formNumber)}
                                required
                            />
                        </div>
                        <div className="filter-group">
                            <label className="filter-label">Grade</label>
                            <input
                                type="text"
                                className="filter-input"
                                name="grade"
                                value={formData.grade}
                                onChange={handleInputChange(formNumber)}
                                required
                            />
                        </div>
                        <div className="filter-group">
                            <label className="filter-label">Furnace</label>
                            <input
                                type="text"
                                className="filter-input"
                                name="furnace"
                                value={formData.furnace}
                                onChange={handleInputChange(formNumber)}
                                required
                            />
                        </div>
                        <div className="filter-group">
                            <label className="filter-label">Part</label>
                            <input
                                type="text"
                                className="filter-input"
                                name="part"
                                value={formData.part}
                                onChange={handleInputChange(formNumber)}
                                required
                            />
                        </div>
                        <div className="filter-group">
                            <label className="filter-label">Date</label>
                            <input
                                type="date"
                                className="filter-input"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange(formNumber)}
                                required
                            />
                        </div>
                    </div>

                    <div className="table-container">
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>Carbon Pickup</th>
                                    <th>Silicon Pickup</th>
                                    <th>Copper Pickup</th>
                                    <th>C</th>
                                    <th>Si</th>
                                    <th>Mn</th>
                                    <th>P</th>
                                    <th>S</th>
                                    <th>Cr</th>
                                    <th>Zn</th>
                                    <th>Ni</th>
                                    <th>Cu</th>
                                    <th>Mg</th>
                                    <th>Sn</th>
                                    <th>Spectro Result</th>
                                    <th>Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="pickup-inputs">
                                            <input
                                                type="number"
                                                step="0.0001"
                                                placeholder="Value"
                                                value={formData.pickup.carbon.value}
                                                onChange={(e) => handlePickupChange(formNumber, 'carbon', 'value', e.target.value)}
                                            />
                                            <input
                                                type="date"
                                                value={formData.pickup.carbon.date}
                                                onChange={(e) => handlePickupChange(formNumber, 'carbon', 'date', e.target.value)}
                                            />
                                            <input
                                                type="number"
                                                step="0.01"
                                                placeholder="%"
                                                value={formData.pickup.carbon.percentage}
                                                onChange={(e) => handlePickupChange(formNumber, 'carbon', 'percentage', e.target.value)}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="pickup-inputs">
                                            <input
                                                type="number"
                                                step="0.0001"
                                                placeholder="Value"
                                                value={formData.pickup.silicon.value}
                                                onChange={(e) => handlePickupChange(formNumber, 'silicon', 'value', e.target.value)}
                                            />
                                            <input
                                                type="date"
                                                value={formData.pickup.silicon.date}
                                                onChange={(e) => handlePickupChange(formNumber, 'silicon', 'date', e.target.value)}
                                            />
                                            <input
                                                type="number"
                                                step="0.01"
                                                placeholder="%"
                                                value={formData.pickup.silicon.percentage}
                                                onChange={(e) => handlePickupChange(formNumber, 'silicon', 'percentage', e.target.value)}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="pickup-inputs">
                                            <input
                                                type="number"
                                                step="0.0001"
                                                placeholder="Value"
                                                value={formData.pickup.copper.value}
                                                onChange={(e) => handlePickupChange(formNumber, 'copper', 'value', e.target.value)}
                                            />
                                            <input
                                                type="date"
                                                value={formData.pickup.copper.date}
                                                onChange={(e) => handlePickupChange(formNumber, 'copper', 'date', e.target.value)}
                                            />
                                            <input
                                                type="number"
                                                step="0.01"
                                                placeholder="%"
                                                value={formData.pickup.copper.percentage}
                                                onChange={(e) => handlePickupChange(formNumber, 'copper', 'percentage', e.target.value)}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            step="0.0001"
                                            name="C"
                                            value={formData.composition.C}
                                            onChange={handleCompositionChange(formNumber)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            step="0.0001"
                                            name="Si"
                                            value={formData.composition.Si}
                                            onChange={handleCompositionChange(formNumber)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            step="0.0001"
                                            name="Mn"
                                            value={formData.composition.Mn}
                                            onChange={handleCompositionChange(formNumber)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            step="0.0001"
                                            name="P"
                                            value={formData.composition.P}
                                            onChange={handleCompositionChange(formNumber)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            step="0.0001"
                                            name="S"
                                            value={formData.composition.S}
                                            onChange={handleCompositionChange(formNumber)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            step="0.0001"
                                            name="Cr"
                                            value={formData.composition.Cr}
                                            onChange={handleCompositionChange(formNumber)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            step="0.0001"
                                            name="Zn"
                                            value={formData.composition.Zn}
                                            onChange={handleCompositionChange(formNumber)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            step="0.0001"
                                            name="Ni"
                                            value={formData.composition.Ni}
                                            onChange={handleCompositionChange(formNumber)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            step="0.0001"
                                            name="Cu"
                                            value={formData.composition.Cu}
                                            onChange={handleCompositionChange(formNumber)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            step="0.0001"
                                            name="Mg"
                                            value={formData.composition.Mg}
                                            onChange={handleCompositionChange(formNumber)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            step="0.0001"
                                            name="Sn"
                                            value={formData.composition.Sn}
                                            onChange={handleCompositionChange(formNumber)}
                                        />
                                    </td>
                                    <td>
                                        <select
                                            name="spectroResult"
                                            value={formData.spectroResult}
                                            onChange={handleInputChange(formNumber)}
                                            required
                                        >
                                            <option value="">Select</option>
                                            <option value="Ok">Ok</option>
                                            <option value="Not Ok">Not Ok</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="remarks"
                                            value={formData.remarks}
                                            onChange={handleInputChange(formNumber)}
                                            placeholder="Add remarks"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="form-actions">
                        <button 
                            type="submit" 
                            className="submit-button" 
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>

                    {error && <div className="error-message">{error}</div>}
                </form>
            </div>
        );
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-cards-container">
                {renderDashboardCard(1, 'Furnace 1')}
                {renderDashboardCard(2, 'Furnace 2')}
                {renderDashboardCard(3, 'Furnace 3')}
            </div>

            {/* Display saved data */}
            {dashboardData.length > 0 && (
                <div className="saved-data">
                    <h3>Saved Entries</h3>
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Heat No</th>
                                <th>Grade</th>
                                <th>Furnace</th>
                                <th>Part</th>
                                <th>Date</th>
                                <th>Spectro Result</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.map((entry) => (
                                <tr key={entry.id}>
                                    <td>{entry.heatNo}</td>
                                    <td>{entry.grade}</td>
                                    <td>{entry.furnace}</td>
                                    <td>{entry.part}</td>
                                    <td>{new Date(entry.date).toLocaleDateString()}</td>
                                    <td className={`spectro-result-${entry.spectroResult.toLowerCase().replace(' ', '-')}`}>
                                        {entry.spectroResult}
                                    </td>
                                    <td className="remarks-cell">{entry.remarks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Dashboard;