import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployee } from "../services/EmployeeService";

const ViewEmployeeComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = () => {
    getEmployee(id)
      .then((response) => {
        setEmployee(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employee:", error);
        setError("Failed to load employee data");
        setLoading(false);
      });
  };

  const goBack = () => {
    navigate("/employees");
  };

  const handleEdit = () => {
    navigate(`/edit-employee/${id}`);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-primary text-white text-center rounded-top-4">
              <h4 className="mb-0">Employee Details</h4>
            </div>

            <div className="card-body p-4">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status" />
                  <p className="mt-3">Loading employee details...</p>
                </div>
              ) : error ? (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <p className="text-muted mb-1">Employee ID</p>
                    <h5>{employee.id}</h5>
                  </div>
                  <div className="mb-4">
                    <p className="text-muted mb-1">First Name</p>
                    <h5>{employee.firstName}</h5>
                  </div>
                  <div className="mb-4">
                    <p className="text-muted mb-1">Last Name</p>
                    <h5>{employee.lastName}</h5>
                  </div>
                  <div className="mb-4">
                    <p className="text-muted mb-1">Email Address</p>
                    <h5>{employee.email}</h5>
                  </div>

                  <div className="d-flex justify-content-between mt-4">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={goBack}
                    >
                      Back to List
                    </button>
                    <button
                      className="btn btn-primary shadow-sm px-4"
                      onClick={handleEdit}
                    >
                      Edit Employee
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployeeComponent;
