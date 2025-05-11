import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FooterComponent from "./component/FooterComponent";
import HeaderComponent from "./component/HeaderComponent";
import ListEmployeeComponent from "./component/ListEmployeeComponent";
import EmployeeComponent from "./component/EmployeeComponent";
import ViewEmployeeComponent from "./component/ViewEmployeeComponent";
import "./App.css";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <BrowserRouter>
        <HeaderComponent />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<ListEmployeeComponent />} />
            <Route path="/employees" element={<ListEmployeeComponent />} />
            <Route path="/add-employee" element={<EmployeeComponent />} />
            <Route path="/edit-employee/:id" element={<EmployeeComponent />} />
            <Route
              path="/view-employee/:id"
              element={<ViewEmployeeComponent />}
            />
          </Routes>
        </main>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
