import React, { useEffect, useState } from "react";
import { listEmployees, deleteEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    setLoading(true);
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch employees.");
        setLoading(false);
        console.error(error);
      });
  };

  const addNewEmployee = () => navigate("/add-employee");
  const updateEmployee = (id) => navigate(`/edit-employee/${id}`);
  const viewEmployee = (id) => navigate(`/view-employee/${id}`);

  const deleteEmployeeHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployee(id);
        setEmployees(employees.filter((emp) => emp.id !== id));
        setSuccessMessage("Employee deleted successfully");

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } catch (error) {
        console.error("Failed to delete employee:", error);
        setError("Failed to delete employee.");
      }
    }
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid py-4 bg-white min-vh-100">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          {/* Page Title */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <button
              className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2"
              onClick={addNewEmployee}
            >
              <i className="bi bi-plus-circle-fill"></i>
              <span>Add Employee</span>
            </button>
          </div>

          {/* Alerts Container */}
          <div className="mb-4">
            {/* Success message */}
            {successMessage && (
              <div
                className="alert alert-success alert-dismissible fade show shadow-sm"
                role="alert"
              >
                <div className="d-flex align-items-center">
                  <i className="bi bi-check-circle-fill fs-4 me-2"></i>
                  <strong>{successMessage}</strong>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSuccessMessage("")}
                ></button>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div
                className="alert alert-danger alert-dismissible fade show shadow-sm"
                role="alert"
              >
                <div className="d-flex align-items-center">
                  <i className="bi bi-exclamation-triangle-fill fs-4 me-2"></i>
                  <strong>{error}</strong>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setError("")}
                ></button>
              </div>
            )}
          </div>

          {/* Main Card */}
          <div className="card border-0 shadow-lg rounded-3 overflow-hidden">
            {/* Card Header */}
            <div className="card-header bg-white p-4 border-bottom">
              <div className="row g-3 align-items-center">
                {/* Search Input */}
                <div className="col-12 col-md-8 col-lg-6">
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <i className="bi bi-search text-muted"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0 py-2"
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      aria-label="Search employees"
                    />
                    {searchTerm && (
                      <button
                        className="btn btn-outline-secondary border-start-0"
                        type="button"
                        onClick={() => setSearchTerm("")}
                        aria-label="Clear search"
                      >
                        <i className="bi bi-x"></i>
                      </button>
                    )}
                  </div>
                </div>

                {/* Refresh Button */}
                <div className="col-12 col-md-4 col-lg-6 text-md-end">
                  <button
                    className="btn btn-outline-secondary d-inline-flex align-items-center gap-2"
                    onClick={fetchEmployees}
                  >
                    <i className="bi bi-arrow-clockwise"></i>
                    <span>Refresh List</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="card-body p-0">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3 text-muted">Loading employees data...</p>
                </div>
              ) : employees.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-inbox fs-1 text-muted"></i>
                  <h5 className="mt-3 mb-2">No employees found</h5>
                  <p className="text-muted mb-4">
                    Get started by adding your first employee record
                  </p>
                  <button
                    className="btn btn-primary px-4"
                    onClick={addNewEmployee}
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    Add Your First Employee
                  </button>
                </div>
              ) : filteredEmployees.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-search fs-1 text-muted"></i>
                  <h5 className="mt-3 mb-2">No matching results</h5>
                  <p className="text-muted mb-4">
                    No employees match your search criteria
                  </p>
                  <button
                    className="btn btn-secondary px-4"
                    onClick={() => setSearchTerm("")}
                  >
                    <i className="bi bi-x-circle me-2"></i>
                    Clear Search
                  </button>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover table-striped mb-0">
                    <thead>
                      <tr className="bg-light">
                        <th className="px-4 py-3" style={{ width: "70px" }}>
                          ID
                        </th>
                        <th className="px-4 py-3">First Name</th>
                        <th className="px-4 py-3">Last Name</th>
                        <th className="px-4 py-3">Email</th>
                        <th
                          className="px-4 py-3 text-center"
                          style={{ width: "180px" }}
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEmployees.map((employee) => (
                        <tr key={employee.id}>
                          <td className="px-4 py-3 fw-bold text-muted">
                            {employee.id}
                          </td>
                          <td className="px-4 py-3">{employee.firstName}</td>
                          <td className="px-4 py-3">{employee.lastName}</td>
                          <td className="px-4 py-3">
                            <a
                              href={`mailto:${employee.email}`}
                              className="text-decoration-none"
                            >
                              {employee.email}
                            </a>
                          </td>
                          <td className="px-4 py-3">
                            <div className="d-flex gap-2 justify-content-center">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => viewEmployee(employee.id)}
                                title="View employee details"
                              >
                                <i className="bi bi-eye-fill"></i>
                                <span className="d-none d-lg-inline ms-1">
                                  View
                                </span>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-info"
                                onClick={() => updateEmployee(employee.id)}
                                title="Edit employee"
                              >
                                <i className="bi bi-pencil-fill"></i>
                                <span className="d-none d-lg-inline ms-1">
                                  Edit
                                </span>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() =>
                                  deleteEmployeeHandler(employee.id)
                                }
                                title="Delete employee"
                              >
                                <i className="bi bi-trash-fill"></i>
                                <span className="d-none d-lg-inline ms-1">
                                  Delete
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {!loading && employees.length > 0 && (
              <div className="card-footer bg-white p-3 d-flex justify-content-between align-items-center">
                <span className="text-muted">
                  Showing <strong>{filteredEmployees.length}</strong> of{" "}
                  <strong>{employees.length}</strong> employees
                </span>
                <div className="text-end"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListEmployeeComponent;
