import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeePage.scss';
import EmployeeTable from './EmployeeTable';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';

function EmployeePage() {
    const navigate = useNavigate();
    const { empData, setempData } = useContext(UserContext);

    const [name, setName] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [date, setDate] = useState('');
    const [reason, setReason] = useState('');
    const [status, setStatus] = useState('Pending');
    const [days, setDays] = useState(0);
    const [balance, setBalance] = useState(22);
    const [tableFilterEmp, setTableFilterEmp] = useState([]);

    function filterEmployee(empID) {
        axios.get('http://localhost:3000/users')
            .then((res) => {
                setTableFilterEmp(
                    res.data.filter((emp) => emp.employeeId.includes(empID))
                );
            });
    }

    useEffect(() => {
        axios.get('http://localhost:3000/users')
            .then((response) => {
                setempData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    useEffect(() => {
        if (employeeId) {
            const existingEmployee = empData.find(emp => emp.employeeId === employeeId);
            setBalance(existingEmployee ? existingEmployee.balance : 22);
        }
    }, [employeeId, empData]);

    const handleSubmit = () => {

        if (!name.trim() || !employeeId.trim() || !date.trim() || !reason.trim() || days <= 0) {
            alert("Please enter all the required details correctly.");
            return;
        }


        const newEmployee = { name, employeeId, date, days, reason, status, balance };

        axios.post('http://localhost:3000/users', newEmployee)
            .then(() => {
                setempData([...empData, newEmployee]);
            })
            .catch((error) => {
                console.error("Error submitting data: ", error);
            });
    };

    return (
        <div className='main-container'>
            <button className='top-right-button' onClick={() => navigate('/employer')}>
                Employer Page
            </button>

            <div className='main-title'><h1>Leave Buddie</h1></div>
            <div className='employee-form-container'>
                <label>Name:
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter Name" />
                </label>
                <label>Employee-ID:
                    <input type="text" onChange={(e) => {
                        setEmployeeId(e.target.value);
                        filterEmployee(e.target.value);
                    }} value={employeeId} placeholder="Enter Employee ID" />
                </label>
                <label>Leave Date:
                    <input type="date" onChange={(e) => setDate(e.target.value)} value={date} />
                </label>
                <label>No. of Days:
                    <input type="number" onChange={(e) => {
                        e.target.value <= balance
                            ? setDays(e.target.value)
                            : alert("Enter Valid Leave Days!");
                    }} value={days} />
                </label>
                <label>Leave Reason:
                    <input type="text" onChange={(e) => setReason(e.target.value)} value={reason} placeholder="Enter Reason" />
                </label>
                <button className='form-submit-button' onClick={handleSubmit}>Submit</button>
            </div>

            <EmployeeTable data={empData} filterEmployee={tableFilterEmp} />
        </div>
    );
}

export default EmployeePage;