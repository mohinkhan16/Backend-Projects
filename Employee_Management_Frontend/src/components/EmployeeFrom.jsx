import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import {
  addEmployee,
  UpdateEmployee,
  getEmpById,
} from "../api/EmployeeAxios";

const initialForm = {
  name: "",
  emp_Id: "",
  email: "",
  designation: "",
  department: "HR",
  salary: "",
  status: "active",
  mobile: "",
};

function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editId = id || null;

  const [formData, setFormData] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingEmployee, setLoadingEmployee] = useState(false);

  useEffect(() => {
    if (!id) {
      setFormData(initialForm);
      setMessage("");
      return;
    }

    const loadEmployee = async () => {
      try {
        setLoadingEmployee(true);
        const employee = await getEmpById(id);

        setFormData({
          name: employee.name ?? "",
          emp_Id: employee.emp_Id ?? "",
          email: employee.email ?? "",
          designation: employee.designation ?? "",
          department: employee.department ?? "HR",
          salary: employee.salary ?? "",
          status: employee.status ?? "active",
          mobile: employee.mobile ?? "",
        });
      } catch (error) {
        console.error("Load employee error:", error);
        setMessage("Failed to load employee details.");
      } finally {
        setLoadingEmployee(false);
      }
    };

    loadEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (editId) {
        const updateData = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          mobile: formData.mobile.trim(),
        };

        await UpdateEmployee(editId, updateData);
      } else {
        const newEmployee = {
          ...formData,
          name: formData.name.trim(),
          emp_Id: Number(formData.emp_Id),
          email: formData.email.trim(),
          designation: formData.designation.trim(),
          salary: Number(formData.salary),
          mobile: formData.mobile.trim(),
        };

        await addEmployee(newEmployee);
      }

      navigate("/");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loadingEmployee) {
    return <div className="container mt-4">Loading employee details...</div>;
  }

  return (
    <div className="container mt-4 mb-4">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">
              {editId ? "Update Employee" : "Add Employee"}
            </h2>
          </div>

          {message && (
            <div className="alert alert-danger">{message}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Employee ID</label>
              <input
                className="form-control"
                name="emp_Id"
                type="number"
                value={formData.emp_Id}
                onChange={handleChange}
                placeholder="Enter your Employee ID"
                disabled={Boolean(editId)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Designation</label>
              <input
                className="form-control"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                disabled={Boolean(editId)}
                placeholder="Enter your designation"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Department</label>
              <select
                className="form-select"
                name="department"
                value={formData.department}
                onChange={handleChange}
                disabled={Boolean(editId)}
              >
                <option value="HR">HR</option>
                <option value="finance">Finance</option>
                <option value="it">IT</option>
                <option value="security">Security</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Salary</label>
              <input
                className="form-control"
                name="salary"
                type="number"
                min="0"
                value={formData.salary}
                onChange={handleChange}
                disabled={Boolean(editId)}
                placeholder="Enter your salary"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={Boolean(editId)}
              >
                <option value="active">Active</option>
                <option value="terminated">Terminated</option>
                <option value="suspend">Suspend</option>
                <option value="hold">Hold</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label">Mobile</label>
              <input
                className="form-control"
                name="mobile"
                type="tel"
                minLength={10}
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary me-2"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : editId
                  ? "Update Employee"
                  : "Add Employee"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default EmployeeForm;