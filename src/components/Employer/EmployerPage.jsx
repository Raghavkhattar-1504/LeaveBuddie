import React, { useEffect, useContext, useState } from 'react';
import './EmployerPage.scss';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

function EmployerPage() {
    const { empData, setempData } = useContext(UserContext);
    const navigate = useNavigate();

    const handleClick = (action, id, data) => {
        let updatedBalance = data.balance;

        if (action === "Approved") {
            updatedBalance = data.balance - data.days;
        }

        axios.put(`http://localhost:3000/users/${id}`, {
            ...data,
            status: action,
            balance: updatedBalance
        })
            .then(() => {
                setempData(prevData =>
                    prevData.map(emp =>
                        emp.id === id ? { ...emp, status: action, balance: updatedBalance } : emp
                    )
                );
            })
            .catch(error => console.error("Error updating status:", error));
    };

    useEffect(() => {
        axios.get('http://localhost:3000/users')
            .then(response => {
                setempData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className='main-container'>
            <button className='back-button' onClick={() => navigate('/')}>⬅ Go Back</button>

            <div className='main-title'><h1>Leave Buddie</h1></div>

            <div className='employer-table-container'>
                <div className='employer-title'><h2>Employees' Requests</h2></div>
                <table>
                    <thead className='table-heading'>
                        <tr>
                            <th className='table-heading-field'>Employee ID</th>
                            <th className='table-heading-field'>Employee Name</th>
                            <th className='table-heading-field'>Leave Date</th>
                            <th className='table-heading-field'>Leave Reason</th>
                            <th className='table-heading-field'>Leave Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empData.length > 0 ? (
                            empData.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.employeeId}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.date}</td>
                                    <td>{employee.reason}</td>
                                    <td>
                                        {employee.status === "Pending" ? (
                                            <>
                                                <button className="approved" onClick={() => handleClick("Approved", employee.id, employee)}>Approve</button>
                                                <button className="rejected" onClick={() => handleClick("Rejected", employee.id, employee)}>Reject</button>
                                            </>
                                        ) : (
                                            employee.status
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EmployerPage;
