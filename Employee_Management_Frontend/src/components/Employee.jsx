import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllEmployee,
  deleteEmployee,
} from "../api/EmployeeAxios";

function Employee() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const data = await getAllEmployee();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h3>All Employees</h3>
        <Link to="/add" className="btn btn-dark">
          Add Employee
        </Link>
      </div>

      <table className="table table-bordered">
        <thead className="table-primary">
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Email</th>
            <th>Designation</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center">
                No employees found
              </td>
            </tr>
          ) : (
            employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.emp_Id}</td>
                <td>{employee.email}</td>
                <td>{employee.designation}</td>
                <td>{employee.department}</td>
                <td>{employee.salary}</td>
                <td>{employee.status}</td>
                <td>{employee.mobile}</td>
                <td>
                  <Link
                    to={`/update/${employee._id}`}
                    className="btn btn-dark btn-sm me-1"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => handleDelete(employee._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Employee;