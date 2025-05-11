import React from "react";

const FooterComponent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white text-center py-4 mt-auto border-top">
      <div className="container">
        <div className="mb-2">
          <small>
            Made with <strong>React</strong> & <strong>Spring Boot</strong>
          </small>
        </div>
        <div>
          <small>
            All Rights Reserved © {currentYear} by <strong>Anubhav</strong>
          </small>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
