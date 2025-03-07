import React from 'react';
import './EmployeeTable.scss';

function EmployeeTable({filterEmployee}) {
    console.log("Filtere EMP tbale: ", filterEmployee)
    return (
        <div>
            <div className='employee-table-container'>
                <table>
                    <thead className='table-heading'>
                        <tr>
                            <th className='table-heading-field'>Employee ID</th>
                            <th className='table-heading-field'>Employee Name</th>
                            <th className='table-heading-field'>Leave Date</th>
                            <th className='table-heading-field'>Leave Days</th>
                            <th className='table-heading-field'>Leave Reason</th>
                            <th className='table-heading-field'>Leave Status</th>
                            <th className='table-heading-field'>Leaves Left</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterEmployee.length > 0 ? (
                            filterEmployee.reverse().map((employee) => (
                                <tr key={employee.id} style={{
                                    borderBottom: '1px solid black'
                                }}>
                                    <td>{employee.employeeId}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.date}</td>
                                    <td>{employee.days}</td>
                                    <td>{employee.reason}</td>
                                    <td>{employee.status}</td>
                                    <td>{employee.balance}</td>
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

export default EmployeeTable;
