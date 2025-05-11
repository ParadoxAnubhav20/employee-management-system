import React, { useState, useEffect } from "react";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setMessage({});
  };

  const validate = () => {
    const newErrors = {};
    if (!employee.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!employee.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!employee.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employee.email)) {
      newErrors.email = "Email is invalid";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (isEditing) {
      getEmployee(id)
        .then((response) => {
          setEmployee({
            firstName: response.data.firstName || "",
            lastName: response.data.lastName || "",
            email: response.data.email || "",
          });
        })
        .catch((error) => {
          console.error("Error fetching employee:", error);
          setMessage({ type: "danger", text: "Failed to load employee data." });
        });
    }
  }, [id, isEditing]);

  const saveEmployee = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (isEditing) {
        await updateEmployee(id, employee);
        setMessage({ type: "success", text: "Employee updated successfully!" });
      } else {
        await createEmployee(employee);
        setMessage({ type: "success", text: "Employee created successfully!" });
        setEmployee({ firstName: "", lastName: "", email: "" });
      }

      setTimeout(() => navigate("/employees"), 1500);
    } catch (error) {
      console.error("Error saving/updating employee:", error);
      setMessage({ type: "danger", text: "Failed to save employee." });
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-gradient bg-primary text-white text-center rounded-top-4">
              <h4 className="mb-0">
                {isEditing ? "Update Employee" : "Add New Employee"}
              </h4>
            </div>
            <div className="card-body p-4">
              {message.text && (
                <div
                  className={`alert alert-${message.type} alert-dismissible fade show`}
                  role="alert"
                >
                  {message.text}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setMessage({})}
                  ></button>
                </div>
              )}

              <form onSubmit={saveEmployee} noValidate>
                {["firstName", "lastName", "email"].map((field, index) => {
                  const isEmail = field === "email";
                  const label =
                    field === "firstName"
                      ? "First Name"
                      : field === "lastName"
                      ? "Last Name"
                      : "Email Address";
                  const placeholder =
                    field === "firstName"
                      ? "John"
                      : field === "lastName"
                      ? "Doe"
                      : "john.doe@example.com";

                  return (
                    <div className="form-floating mb-4" key={index}>
                      <input
                        type={isEmail ? "email" : "text"}
                        id={field}
                        name={field}
                        value={employee[field]}
                        onChange={handleChange}
                        className={`form-control ${
                          errors[field] ? "is-invalid" : ""
                        }`}
                        placeholder={placeholder}
                      />
                      <label htmlFor={field}>{label}</label>
                      {errors[field] && (
                        <div className="invalid-feedback">{errors[field]}</div>
                      )}
                    </div>
                  );
                })}

                <div className="d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/employees")}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary shadow-sm px-4"
                  >
                    {isEditing ? "Update Employee" : "Save Employee"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
