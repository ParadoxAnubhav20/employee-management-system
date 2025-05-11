import React from "react";
import { Link } from "react-router-dom";

const HeaderComponent = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-primary navbar-dark shadow-sm py-3">
        <div className="container">
          <Link
            to="/"
            className="navbar-brand fw-semibold fs-4 d-flex align-items-center"
          >
            <i className="bi bi-people-fill me-2 fs-3"></i>
            Employee Management System
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;
