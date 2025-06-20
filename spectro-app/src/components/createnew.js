import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { IoMdAdd } from "react-icons/io";
import { TiMinus } from "react-icons/ti";
import axios from 'axios';
import './createnew.css';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from 'primereact/floatlabel';
import Sidebar from './Sidebar';

const ip = '192.168.0.105'

const CreateNew = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showChemicalButtons, setShowChemicalButtons] = useState(true);
  const [showPickupButtons, setShowPickupButtons] = useState(true);
  const [showRMButtons, setShowRMButtons] = useState(true);
  const [formData, setFormData] = useState({
    id: '',
    customers: 'ABC Manufacturing',
    grade: 'FC250',
    enteredBy: 'John Doe',
    partName: 'Engine Block',
    partNumber: 'EB-2024-001',
    Si: { min: '2.5', max: '3.2' },
    Fe: { min: '92.5', max: '94.0' },
    Cu: { min: '0.5', max: '0.8' },
    Mn: { min: '0.3', max: '0.5' },
    Mg: { min: '0.03', max: '0.05' },
    Cr: { min: '0.1', max: '0.2' },
    Ni: { min: '0.2', max: '0.4' },
    Zn: { min: '0.1', max: '0.2' },
    Ti: { min: '0.02', max: '0.04' },
    Ag: { min: '0.001', max: '0.002' },
    B: { min: '0.001', max: '0.002' },
    Be: { min: '0.001', max: '0.002' },
    Bi: { min: '0.001', max: '0.002' },
    Ca: { min: '0.01', max: '0.02' },
    Co: { min: '0.1', max: '0.2' },
    Li: { min: '0.001', max: '0.002' },
    Na: { min: '0.001', max: '0.002' },
    Pb: { min: '0.001', max: '0.002' },
    Sn: { min: '0.001', max: '0.002' },
    Sr: { min: '0.001', max: '0.002' },
    V: { min: '0.01', max: '0.02' },
    Zr: { min: '0.01', max: '0.02' },
    Al: { min: '0.1', max: '0.2' },
    Cd: { min: '0.001', max: '0.002' }
  });
  const [pickupData, setPickupData] = useState({
    carbonPickup: '3.2',
    carbonDate: '2024-03-15',
    carbonPercentage: '0.8',
    siliconPickup: '2.8',
    siliconDate: '2024-03-15',
    siliconPercentage: '0.7',
    copperPickup: '0.6',
    copperDate: '2024-03-15',
    copperPercentage: '0.5',
    sulphurPickup: '0.03',
    sulphurDate: '2024-03-15',
    sulphurPercentage: '0.02',
    manganesePickup: '0.4',
    manganeseDate: '2024-03-15',
    manganesePercentage: '0.3'
  });
  const [rmData, setRmData] = useState(Array(8).fill({
    grade: 'FC250',
    rm: '',
    customRm: '',
    weight: ''
  }).map((item, index) => {
    if (index === 0) return { ...item, rm: 'LMS', weight: '500' };
    if (index === 1) return { ...item, rm: 'HMS', weight: '300' };
    if (index === 2) return { ...item, rm: 'Pig iron', weight: '200' };
    if (index === 3) return { ...item, rm: 'Scrap', weight: '150' };
    return item;
  }));
  const [editedData, setEditedData] = useState({});

  const rmOptions = [
    'LMS', 'HMS', 'Pig iron', 'boring',
    'Scrap', 'Foundry Return', 'SG Return', 'others'
  ];

  const handleRmInputChange = (index, field, value) => {
    const updatedData = [...rmData];
    updatedData[index] = {
      ...updatedData[index],
      [field]: value
    };
    setRmData(updatedData);
  };

  const handleToggleRMButtons = () => {
    setShowRMButtons(!showRMButtons);
  };

  const handleHideRMButtons = () => {
    setShowRMButtons(false);
  };

  const loadEditData = (data) => {
    setFormData({
      id: data.id,
      customers: data.customer_name,
      grade: data.grade,
      enteredBy: data.entered_by,
      partName: data.part_name,
      partNumber: data.part_number,
      Si: { min: data.req_si_min, max: data.req_si_max },
      Fe: { min: data.req_fe_min, max: data.req_fe_max },
      Mn: { min: data.req_mn_min, max: data.req_mn_max },
      Be: { min: data.req_be_min, max: data.req_be_max },
      Sr: { min: data.req_sr_min, max: data.req_sr_max },
      Cr: { min: data.req_cr_min, max: data.req_cr_max },
      Na: { min: data.req_na_min, max: data.req_na_max },
      Ni: { min: data.req_ni_min, max: data.req_ni_max },
      Al: { min: data.req_al_min, max: data.req_al_max },
      Co: { min: data.req_co_min, max: data.req_co_max },
      Cu: { min: data.req_cu_min, max: data.req_cu_max },
      Bi: { min: data.req_bi_min, max: data.req_bi_max },
      Ti: { min: data.req_ti_min, max: data.req_ti_max },
      V: { min: data.req_v_min, max: data.req_v_max },
      Ag: { min: data.req_ag_min, max: data.req_ag_max },
      Pb: { min: data.req_pb_min, max: data.req_pb_max },
      Sn: { min: data.req_sn_min, max: data.req_sn_max },
      Mg: { min: data.req_mg_min, max: data.req_mg_max },
      Zr: { min: data.req_zr_min, max: data.req_zr_max },
      Cd: { min: data.req_cd_min, max: data.req_cd_max },
      B: { min: data.req_b_min, max: data.req_b_max },
      Zn: { min: data.req_zn_min, max: data.req_zn_max },
      Li: { min: data.req_li_min, max: data.req_li_max },
      Ca: { min: data.req_ca_min, max: data.req_ca_max },
    });
  };

  useEffect(() => {
    if (location.state && location.state.data) {
      const editData = location.state.data;
      loadEditData(editData);
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const [element, field] = name.split('.');
    
    if (field) {
      // Handle min/max fields
      setEditedData({
        ...editedData,
        [element]: {
          ...editedData[element],
          [field]: value
        }
      });
      setFormData({
        ...formData,
        [element]: {
          ...formData[element],
          [field]: value
        }
      });
    } else {
      // Handle regular fields
      setEditedData({ ...editedData, [name]: value });
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePickupInputChange = (e) => {
    const { name, value } = e.target;
    setPickupData({ ...pickupData, [name]: value });
  };

  const handleReset = () => {
    setFormData({
      id: formData.id,
      customers: '',
      grade: '',
      enteredBy: '',
      partName: '',
      partNumber: '',
      Si: { min: '', max: '' },
      Fe: { min: '', max: '' },
      Mn: { min: '', max: '' },
      Be: { min: '', max: '' },
      Sr: { min: '', max: '' },
      Cr: { min: '', max: '' },
      Na: { min: '', max: '' },
      Ni: { min: '', max: '' },
      Al: { min: '', max: '' },
      Co: { min: '', max: '' },
      Cu: { min: '', max: '' },
      Bi: { min: '', max: '' },
      Ti: { min: '', max: '' },
      V: { min: '', max: '' },
      Ag: { min: '', max: '' },
      Pb: { min: '', max: '' },
      Sn: { min: '', max: '' },
      Mg: { min: '', max: '' },
      Zr: { min: '', max: '' },
      Cd: { min: '', max: '' },
      B: { min: '', max: '' },
      Zn: { min: '', max: '' },
      Li: { min: '', max: '' },
      Ca: { min: '', max: '' },
    });
    setPickupData({
      carbonPickup: '',
      carbonDate: '',
      carbonPercentage: '',
      siliconPickup: '',
      siliconDate: '',
      siliconPercentage: '',
      copperPickup: '',
      copperDate: '',
      copperPercentage: ''
    });
    setRmData(Array(8).fill({
      grade: '',
      rm: '',
      customRm: '',
      weight: ''
    }));
    setEditedData({});
  }

  const handleToggleChemicalButtons = () => {
    setShowChemicalButtons(!showChemicalButtons);
  };

  const handleHideChemicalButtons = () => {
    setShowChemicalButtons(false);
  };

  const handleTogglePickupButtons = () => {
    setShowPickupButtons(!showPickupButtons);
  };

  const handleHidePickupButtons = () => {
    setShowPickupButtons(false);
  };

  const handleBackButton = () => {
    navigate(-1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isEmpty = Object.values(formData).some(value => value.trim === '');
      if (isEmpty) {
        window.alert('Please fill in all the fields');
        return;
      }
      let response;

      if (formData.id) {
        response = await axios.put(`http://${ip}:5002/qualityMaster/${formData.id}, formData`);
        console.log('Data updated successfully:', response.data);
      } else {
        const response = await axios.post(`http://${ip}:5002/qualityMaster, formData`);
        console.log('Response:', response.data);

      } navigate(-1);
    } catch (error) {
      console.error('Error submitting data:', error.message);
      console.error('Error:', error)
    }
  };

  return (
    <div className='create-container'>
      <button onClick={handleBackButton} className='back-button-chart'>Back</button>
      
      {/* Basic Info Card */}
      <div className='basic-info-card'>
        <h2 className='section-title'>Basic Information</h2>
        <div className='create-input-container'>
          <FloatLabel>
            <InputText id="username" className='create-customer' name='customers' value={formData.customers} onChange={handleInputChange} />
            <label htmlFor="username" className='label-float'>Customer Name</label>
          </FloatLabel>

          <FloatLabel>
            <InputText id="partName" className='create-customer' name='partName' value={formData.partName} onChange={handleInputChange} />
            <label htmlFor="partName" className='label-float'>Part Name</label>
          </FloatLabel>

          <FloatLabel>
            <InputText id="partNumber" className='create-customer' name='partNumber' value={formData.partNumber} onChange={handleInputChange} />
            <label htmlFor="partNumber" className='label-float'>Part Number</label>
          </FloatLabel>

          <FloatLabel>
            <InputText id="grade" className='create-customer' name='grade' value={formData.grade} onChange={handleInputChange} />
            <label htmlFor="grade" className='label-float'>Grade</label>
          </FloatLabel>

          <FloatLabel>
            <InputText id="enteredBy" className='create-customer' name='enteredBy' value={formData.enteredBy} onChange={handleInputChange} />
            <label htmlFor="enteredBy" className='label-float'>Entered By</label>
          </FloatLabel>
          
          <FloatLabel>
            <InputText id="supplier" className='create-customer' name='supplier' value={formData.supplier} onChange={handleInputChange} />
            <label htmlFor="supplier" className='label-float'>Supplier</label>
          </FloatLabel>
        </div>
      </div>

      {/* Compositions Card */}
      <div className='composition-card'>
        <h2 className='section-title'>Composition Details</h2>
        
        {/* Chemical Composition Section */}
        <div className='create-chemical-container'>
          <div className='inside-create-chemicals'>
            <h1 className='enter-heading'>Chemical Composition</h1>
            {showChemicalButtons ? (
              <button type="button" className='minus-button' onClick={handleHideChemicalButtons}>
                <TiMinus />
              </button>
            ) : (
              <button type="button" className='plus-button' onClick={handleToggleChemicalButtons}>
                <IoMdAdd />
              </button>
            )}
          </div>

          {showChemicalButtons && (
            <div className='inside-chemicals-buttons'>
              <div className='c-inside'>
                <div className='c-chemical'>
                  <p>Si:</p>
                  <div className='min-max-container'>
                    <input className='input-chemical' name='Si.min' value={formData.Si.min} onChange={handleInputChange} placeholder="Min" />
                    <input className='input-chemical' name='Si.max' value={formData.Si.max} onChange={handleInputChange} placeholder="Max" />
                  </div>
                </div>
              </div>

              <div className='c-inside'>
                <div className='c-chemical'>
                  <p>Fe:</p>
                  <div className='min-max-container'>
                    <input className='input-chemical' name='Fe.min' value={formData.Fe.min} onChange={handleInputChange} placeholder="Min" />
                    <input className='input-chemical' name='Fe.max' value={formData.Fe.max} onChange={handleInputChange} placeholder="Max" />
                  </div>
                </div>
              </div>

              <div className='c-inside'>
                <div className='c-chemical'>
                  <p>Cu:</p>
                  <div className='min-max-container'>
                    <input className='input-chemical' name='Cu.min' value={formData.Cu.min} onChange={handleInputChange} placeholder="Min" />
                    <input className='input-chemical' name='Cu.max' value={formData.Cu.max} onChange={handleInputChange} placeholder="Max" />
                  </div>
                </div>
              </div>

              <div className='c-inside'>
                <div className='c-chemical'>
                  <p>Mn:</p>
                  <div className='min-max-container'>
                    <input className='input-chemical' name='Mn.min' value={formData.Mn.min} onChange={handleInputChange} placeholder="Min" />
                    <input className='input-chemical' name='Mn.max' value={formData.Mn.max} onChange={handleInputChange} placeholder="Max" />
                  </div>
                </div>
              </div>

              <div className='c-inside'>
                <div className='c-chemical'>
                  <p>Mg:</p>
                  <div className='min-max-container'>
                    <input className='input-chemical' name='Mg.min' value={formData.Mg.min} onChange={handleInputChange} placeholder="Min" />
                    <input className='input-chemical' name='Mg.max' value={formData.Mg.max} onChange={handleInputChange} placeholder="Max" />
                  </div>
                </div>
              </div>

              <div className='c-inside'>
                <div className='c-chemical'>
                  <p>Cr:</p>
                  <div className='min-max-container'>
                    <input className='input-chemical' name='Cr.min' value={formData.Cr.min} onChange={handleInputChange} placeholder="Min" />
                    <input className='input-chemical' name='Cr.max' value={formData.Cr.max} onChange={handleInputChange} placeholder="Max" />
                  </div>
                </div>
              </div>

              <div className='c-inside'>
                <div className='c-chemical'>
                  <p>Ni:</p>
                  <div className='min-max-container'>
                    <input className='input-chemical' name='Ni.min' value={formData.Ni.min} onChange={handleInputChange} placeholder="Min" />
                    <input className='input-chemical' name='Ni.max' value={formData.Ni.max} onChange={handleInputChange} placeholder="Max" />
                  </div>
                </div>
              </div>

              <div className='c-inside'>
                <div className='c-chemical'>
                  <p>Zn:</p>
                  <div className='min-max-container'>
                    <input className='input-chemical' name='Zn.min' value={formData.Zn.min} onChange={handleInputChange} placeholder="Min" />
                    <input className='input-chemical' name='Zn.max' value={formData.Zn.max} onChange={handleInputChange} placeholder="Max" />
                  </div>
                </div>
              </div>

              <div className='c-inside'>
                <div className='c-chemical'>
                  <p>Ti:</p>
                  <div className='min-max-container'>
                    <input className='input-chemical' name='Ti.min' value={formData.Ti.min} onChange={handleInputChange} placeholder="Min" />
                    <input className='input-chemical' name='Ti.max' value={formData.Ti.max} onChange={handleInputChange} placeholder="Max" />
                  </div>
                </div>
              </div>

              <div className='c-inside'>
                <div className='c-chemical'>
                  <p>Ag:</p>
                  <div className='min-max-container'>
                    <input className='input-chemical' name='Ag.min' value={formData.Ag.min} onChange={handleInputChange} placeholder="Min" />
                    <input className='input-chemical' name='Ag.max' value={formData.Ag.max} onChange={handleInputChange} placeholder="Max" />
                  </div>
                </div>
              </div>

              <div className='c-inside'>
                <div className='c-chemical'>
                  <p>B:</p>
                  <div className='min-max-container'>
                    <input className='input-chemical' name='B.min' value={formData.B.min} onChange={handleInputChange} placeholder="Min" />
                    <input className='input-chemical' name='B.max' value={formData.B.max} onChange={handleInputChange} placeholder="Max" />
                  </div>
                </div>
              </div>

              <div className='c-inside'>
                <div className='c-chemical'>
                  <p>Be:</p>
                  <div className='min-max-container'>
                    <input className='input-chemical' name='Be.min' value={formData.Be.min} onChange={handleInputChange} placeholder="Min" />
                    <input className='input-chemical' name='Be.max' value={formData.Be.max} onChange={handleInputChange} placeholder="Max" />
                  </div>
                </div>
              </div>

              <div className='c-inside'>
                <div className='c-chemical'>
                  <p>Bi:</p>
                  <div className='min-max-container'>
                    <input className='input-chemical' name='Bi.min' value={formData.Bi.min} onChange={handleInputChange} placeholder="Min" />
                    <input className='input-chemical' name='Bi.max' value={formData.Bi.max} onChange={handleInputChange} placeholder="Max" />
                  </div>
                </div>
              </div>

              <div className='c-inside'>
                <div className='c-chemical'>
                  <p>Ca:</p>
                  <div className='min-max-container'>
                    <input className='input-chemical' name='Ca.min' value={formData.Ca.min} onChange={handleInputChange} placeholder="Min" />
                    <input className='input-chemical' name='Ca.max' value={formData.Ca.max} onChange={handleInputChange} placeholder="Max" />
                  </div>
                </div>
              </div>

              <div className='c-inside'>
                <div className='c-chemical'>
                  <p>Co:</p>
                  <div className='min-max-container'>
                    <input className='input-chemical' name='Co.min' value={formData.Co.min} onChange={handleInputChange} placeholder="Min" />
                    <input className='input-chemical' name='Co.max' value={formData.Co.max} onChange={handleInputChange} placeholder="Max" />
                  </div>
                </div>
              </div>

              <div className='c-inside'>
                <div className='c-chemical'>
                  <p>Li:</p>
                  <div className='min-max-container'>
                    <input className='input-chemical' name='Li.min' value={formData.Li.min} onChange={handleInputChange} placeholder="Min" />
                    <input className='input-chemical' name='Li.max' value={formData.Li.max} onChange={handleInputChange} placeholder="Max" />
                  </div>
                </div>
              </div>

              <div className='c-inside'>
                <div className='c-chemical'>
                  <p>Na:</p>
                  <div className='min-max-container'>
                    <input className='input-chemical' name='Na.min' value={formData.Na.min} onChange={handleInputChange} placeholder="Min" />
                    <input className='input-chemical' name='Na.max' value={formData.Na.max} onChange={handleInputChange} placeholder="Max" />
                  </div>
                </div>
              </div>

              <div className='c-inside'>
                <div className='c-chemical'>
                  <p>Pb:</p>
                  <div className='min-max-container'>
                    <input className='input-chemical' name='Pb.min' value={formData.Pb.min} onChange={handleInputChange} placeholder="Min" />
                    <input className='input-chemical' name='Pb.max' value={formData.Pb.max} onChange={handleInputChange} placeholder="Max" />
                  </div>
                </div>
              </div>

              <div className='c-inside'>
                <div className='c-chemical'>
                  <p>Sn:</p>
                  <div className='min-max-container'>
                    <input className='input-chemical' name='Sn.min' value={formData.Sn.min} onChange={handleInputChange} placeholder="Min" />
                    <input className='input-chemical' name='Sn.max' value={formData.Sn.max} onChange={handleInputChange} placeholder="Max" />
                  </div>
                </div>
              </div>

              <div className='c-inside'>
                <div className='c-chemical'>
                  <p>Sr:</p>
                  <div className='min-max-container'>
                    <input className='input-chemical' name='Sr.min' value={formData.Sr.min} onChange={handleInputChange} placeholder="Min" />
                    <input className='input-chemical' name='Sr.max' value={formData.Sr.max} onChange={handleInputChange} placeholder="Max" />
                  </div>
                </div>
              </div>

              <div className='c-inside'>
                <div className='c-chemical'>
                  <p>V:</p>
                  <div className='min-max-container'>
                    <input className='input-chemical' name='V.min' value={formData.V.min} onChange={handleInputChange} placeholder="Min" />
                    <input className='input-chemical' name='V.max' value={formData.V.max} onChange={handleInputChange} placeholder="Max" />
                  </div>
                </div>
              </div>

              <div className='c-inside'>
                <div className='c-chemical'>
                  <p>Zr:</p>
                  <div className='min-max-container'>
                    <input className='input-chemical' name='Zr.min' value={formData.Zr.min} onChange={handleInputChange} placeholder="Min" />
                    <input className='input-chemical' name='Zr.max' value={formData.Zr.max} onChange={handleInputChange} placeholder="Max" />
                  </div>
                </div>
              </div>

              <div className='c-inside'>
                <div className='c-chemical'>
                  <p>Al:</p>
                  <div className='min-max-container'>
                    <input className='input-chemical' name='Al.min' value={formData.Al.min} onChange={handleInputChange} placeholder="Min" />
                    <input className='input-chemical' name='Al.max' value={formData.Al.max} onChange={handleInputChange} placeholder="Max" />
                  </div>
                </div>
              </div>

              <div className='c-inside'>
                <div className='c-chemical'>
                  <p>Cd:</p>
                  <div className='min-max-container'>
                    <input className='input-chemical' name='Cd.min' value={formData.Cd.min} onChange={handleInputChange} placeholder="Min" />
                    <input className='input-chemical' name='Cd.max' value={formData.Cd.max} onChange={handleInputChange} placeholder="Max" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pickup Composition Section */}
<div className='create-chemical-container'>
  <div className='inside-create-chemicals'>
    <h1 className='enter-heading'>Pickup Composition</h1>
    {showPickupButtons ? (
      <button type="button" className='minus-button' onClick={handleHidePickupButtons}>
        <TiMinus />
      </button>
    ) : (
      <button type="button" className='plus-button' onClick={handleTogglePickupButtons}>
        <IoMdAdd />
      </button>
    )}
  </div>

  {showPickupButtons && (
    <div className='inside-chemicals-buttons'>
      {/* Carbon Pickup Table */}
      <h3 className='pickup-subheading'>Carbon Pickup</h3>
      <table className='pickup-table'>
        <thead>
          <tr>
            <th>Pickup Value</th>
            <th>Date</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type='text'
                className='input-chemical'
                name='carbonPickup'
                value={pickupData.carbonPickup}
                onChange={handlePickupInputChange}
              />
            </td>
            <td>
              <input
                type='date'
                className='input-chemical'
                name='carbonDate'
                value={pickupData.carbonDate}
                onChange={handlePickupInputChange}
              />
            </td>
            <td>
              <div className='percentage-input-container'>
                <input
                  type='text'
                  className='input-chemical percentage-input'
                  name='carbonPercentage'
                  value={pickupData.carbonPercentage}
                  onChange={handlePickupInputChange}
                />
                <span className='percentage-symbol'>%</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Sulphur Pickup Table */}
      <h3 className='pickup-subheading' style={{ marginTop: '20px' }}>Sulphur Pickup</h3>
      <table className='pickup-table'>
        <thead>
          <tr>
            <th>Pickup Value</th>
            <th>Date</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type='text'
                className='input-chemical'
                name='sulphurPickup'
                value={pickupData.sulphurPickup}
                onChange={handlePickupInputChange}
              />
            </td>
            <td>
              <input
                type='date'
                className='input-chemical'
                name='sulphurDate'
                value={pickupData.sulphurDate}
                onChange={handlePickupInputChange}
              />
            </td>
            <td>
              <div className='percentage-input-container'>
                <input
                  type='text'
                  className='input-chemical percentage-input'
                  name='sulphurPercentage'
                  value={pickupData.sulphurPercentage}
                  onChange={handlePickupInputChange}
                />
                <span className='percentage-symbol'>%</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Manganese Pickup Table */}
      <h3 className='pickup-subheading' style={{ marginTop: '20px' }}>Manganese Pickup</h3>
      <table className='pickup-table'>
        <thead>
          <tr>
            <th>Pickup Value</th>
            <th>Date</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type='text'
                className='input-chemical'
                name='manganesePickup'
                value={pickupData.manganesePickup}
                onChange={handlePickupInputChange}
              />
            </td>
            <td>
              <input
                type='date'
                className='input-chemical'
                name='manganeseDate'
                value={pickupData.manganeseDate}
                onChange={handlePickupInputChange}
              />
            </td>
            <td>
              <div className='percentage-input-container'>
                <input
                  type='text'
                  className='input-chemical percentage-input'
                  name='manganesePercentage'
                  value={pickupData.manganesePercentage}
                  onChange={handlePickupInputChange}
                />
                <span className='percentage-symbol'>%</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Silicon Pickup Table */}
      <h3 className='pickup-subheading' style={{ marginTop: '20px' }}>Silicon Pickup</h3>
      <table className='pickup-table'>
        <thead>
          <tr>
            <th>Pickup Value</th>
            <th>Date</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type='text'
                className='input-chemical'
                name='siliconPickup'
                value={pickupData.siliconPickup}
                onChange={handlePickupInputChange}
              />
            </td>
            <td>
              <input
                type='date'
                className='input-chemical'
                name='siliconDate'
                value={pickupData.siliconDate}
                onChange={handlePickupInputChange}
              />
            </td>
            <td>
              <div className='percentage-input-container'>
                <input
                  type='text'
                  className='input-chemical percentage-input'
                  name='siliconPercentage'
                  value={pickupData.siliconPercentage}
                  onChange={handlePickupInputChange}
                />
                <span className='percentage-symbol'>%</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Copper Pickup Table */}
      <h3 className='pickup-subheading' style={{ marginTop: '20px' }}>Copper Pickup</h3>
      <table className='pickup-table'>
        <thead>
          <tr>
            <th>Pickup Value</th>
            <th>Date</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type='text'
                className='input-chemical'
                name='copperPickup'
                value={pickupData.copperPickup}
                onChange={handlePickupInputChange}
              />
            </td>
            <td>
              <input
                type='date'
                className='input-chemical'
                name='copperDate'
                value={pickupData.copperDate}
                onChange={handlePickupInputChange}
              />
            </td>
            <td>
              <div className='percentage-input-container'>
                <input
                  type='text'
                  className='input-chemical percentage-input'
                  name='copperPercentage'
                  value={pickupData.copperPercentage}
                  onChange={handlePickupInputChange}
                />
                <span className='percentage-symbol'>%</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )}
</div>

        {/* RM Composition Section */}
<div className='create-chemical-container'>
  <div className='inside-create-chemicals'>
    <h1 className='enter-heading'>RM Composition</h1>
    {showRMButtons ? (
      <button type="button" className='minus-button' onClick={handleHideRMButtons}>
        <TiMinus />
      </button>
    ) : (
      <button type="button" className='plus-button' onClick={handleToggleRMButtons}>
        <IoMdAdd />
      </button>
    )}
  </div>

  {showRMButtons && (
    <div className='inside-chemicals-buttons'>
      {/* Grade input moved outside the table */}
      <div className='rm-grade-input-container'>
        <label className='rm-grade-label'>Grade:</label>
        <input
          type='text'
          className='input-chemical rm-grade-input'
          value={rmData[0]?.grade || ''}
          onChange={(e) => {
            // Update grade for all rows
            const updatedData = rmData.map(row => ({
              ...row,
              grade: e.target.value
            }));
            setRmData(updatedData);
          }}
        />
      </div>

      <table className='rm-table'>
        <thead>
          <tr>
            <th>RM</th>
            <th>Custom RM</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {rmData.map((row, index) => (
            <tr key={index}>
              <td>
                <select
                  className='input-chemical rm-dropdown'
                  value={row.rm}
                  onChange={(e) => handleRmInputChange(index, 'rm', e.target.value)}
                >
                  <option value="">Select RM</option>
                  {rmOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </td>
              <td>
                {row.rm === 'others' && (
                  <input
                    type='text'
                    className='input-chemical'
                    value={row.customRm}
                    onChange={(e) => handleRmInputChange(index, 'customRm', e.target.value)}
                    placeholder="Enter custom RM"
                  />
                )}
              </td>
              <td>
                <div className='weight-input-container'>
                  <input
                    type='text'
                    className='input-chemical weight-input'
                    value={row.weight}
                    onChange={(e) => handleRmInputChange(index, 'weight', e.target.value)}
                  />
                  <span className='weight-symbol'>kg</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>
        {/* Buttons Container */}
        <div className='create-button-container'>
          <button className='create-submit-button' onClick={handleSubmit}>Submit</button>
          <button className='create-reset-button' onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  )
}

export default CreateNew;