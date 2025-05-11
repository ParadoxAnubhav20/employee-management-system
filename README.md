# Employee Management System Fullstack - Spring Boot, Java, React, JavaScript, MySQL 

## Contents
1. [Brief Summary](#summary)
2. [Aims and Motivation](#aims)
3. [Technologies, Requirements and Software Tools](#tech)
4. [Configuration Instructions](#config)
5. [Design](#design)
6. [Application Screenshots](#demo)
7. [Installation & Setup](#setup)
8. [API Endpoints](#api)

<a name="summary"></a>
## 📄 Brief Summary
- Developed a **RESTful API** using **Spring Boot 3.4.5** and **MySQL** for the backend, tested endpoints with **Postman**, and integrated them into a **React 19** frontend using **Axios** for HTTP requests.
- Implements complete **CRUD (Create, Read, Update, Delete)** functionality.
- This repository contains the **backend component** of a **full-stack personal project**, designed to **store and manage employee information** using the **Spring Boot Java framework** as the primary backend web framework.
- The application enables users to **view, add, update, and delete** employee records within the management system.

<a name="aims"></a>
## 🎯 Aims and Motivation
- The primary goal of this project was to design and build a robust **Full Stack Application**, utilizing **Spring Boot** and **MySQL** for the backend, and **React** for the frontend.
- As a **Full Stack Developer**, this project serves as a hands-on demonstration of my ability to integrate modern backend and frontend technologies to create a complete and functional system.
- Motivated by a strong passion for **continuous learning and self-improvement**, I dedicated my personal time to carefully **develop, structure, and optimize** this application as part of my professional growth.

<a name="tech"></a>
## ⚙️ Technologies, Requirements and Software Tools

### 🧠 Programming & Scripting Languages
- **Java 21** — Backend logic and API development
- **JavaScript** — Frontend functionality
- **HTML** & **CSS** — UI structure and styling
- **JSON** — Data exchange format between frontend and backend

### 📚 Frameworks & Libraries
- **Spring Boot 3.4.5** — Backend framework for RESTful API development
- **React 19** — Frontend library for building interactive UIs
- **Bootstrap** — Styling framework used across both frontend and backend for responsive design

### 📦 npm Packages (React)
- `axios` — For making HTTP requests to the backend
- `react-router-dom` — For client-side routing and navigation

### 🛠️ Software Tools
- **MySQL Workbench** — Used for designing and managing the MySQL database for backend storage
- **Postman** — Used to test backend API endpoints (GET, POST, PUT, DELETE)

<a name="config"></a>
## ⚙️ Configuration Instructions
To run this project locally, you'll need to configure the backend and frontend to communicate correctly.

### 🔧 Backend (`Spring Boot 3.4.5`)
1. Navigate to `src/main/resources/`.
2. Copy the example config:
   ```bash
   cp application-example.properties application.properties
   ```
3. Edit `application.properties` with your local database and server settings. Example:
   ```properties
   # Server runs on localhost:8080
   server.port=8080
   
   # Database configuration
   spring.datasource.url=jdbc:mysql://localhost:3306/your_database
   spring.datasource.username=your_db_username
   spring.datasource.password=your_db_password
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   
   # JPA settings
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
   ```

### 🌐 Frontend (React 19 + Vite)
The frontend is served at http://localhost:5173 by default.

Make sure your frontend app is configured to send API requests to the backend URL:

Inside `vite.config.js` (or a proxy config file), add:
```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      secure: false,
    }
  }
}
```

Or, inside your API calls in React (using Axios):
```javascript
axios.get('http://localhost:8080/api/employees');
```

<a name="design"></a>
## ✏️ Design – Back-end

### 🔧 Back-end Technology Stack

- **Java 21** was used as the core programming language for backend development, with the **Spring Boot 3.4.5** framework facilitating the creation of RESTful APIs and overall backend structure.
- **Spring Boot** enabled the creation of **user models** to represent employee data. These models were defined using **Jakarta Persistence (JPA)** annotations such as `@Entity`, `@Id`, and `@GeneratedValue`, allowing seamless integration with the database layer.
- **MySQL Workbench** was used to manage and visualize the **MySQL database**, which stores employee information. The backend was fully configured to interact with this database, while the **React 19-based frontend** retrieved and displayed the data.
- Custom exception handling was implemented using **Spring Boot**, with tailored exceptions to gracefully handle cases such as **missing user IDs** or other backend errors.

#### 🖼️ React & Spring Boot Architecture Diagram

<img src="https://github.com/user-attachments/assets/d56cbdad-fd1a-4929-9d4b-6502341be444" alt="spring-boot-react-crud-example-rest-api-architecture" width="600" />

### Postman and Testing Screenshots
- **Postman** was used as an **API platform** to **design, build, test and iterate** the **RESTful API** built using Spring Boot.
- Requests were handled in **JSON** and **SQL**.

#### GET Request (All Employees) 
<img src="https://github.com/user-attachments/assets/d724fd16-d740-423a-9e90-ac0b0eca7aac" alt="GET All Employees" width="600" />

#### GET Request (Particular Employee) 
<img src="https://github.com/user-attachments/assets/6ec3296b-400a-4823-8f2f-b8131c7b732d" alt="GET Particular Employee" width="600" />

#### DELETE Request 
<img src="https://github.com/user-attachments/assets/b14de7bc-0c7f-481c-bb49-4116583c84c7" alt="DELETE Request" width="600" />

#### POST Request
<img src="https://github.com/user-attachments/assets/a89125bf-701f-4716-9767-f21a5d40d74d" alt="POST Request" width="600" />

<a name="demo"></a>
## Application Screenshots

### Home Page 
<img src="https://github.com/user-attachments/assets/59d96211-7e9d-4b96-9bbb-8d12a996cff3" alt="Home Page" width="600" />

### Register User Page
<img src="https://github.com/user-attachments/assets/d3ff4179-cd1c-439b-bbf4-64876d82f888" alt="Register User Page" width="600" />

### View User Details Page
<img src="https://github.com/user-attachments/assets/4c10ede3-6d18-459a-9d4d-8e4756a3c9e8" alt="View User Details Page" width="600" />

### Edit User Page
<img src="https://github.com/user-attachments/assets/0a8136e3-5245-4bf2-8530-95f47c566e53" alt="Edit User Page" width="600" />

<a name="setup"></a>
## 📥 Installation & Setup

### Prerequisites
- **Java 21** or higher
- **Node.js** and **npm**
- **MySQL** server installed and running

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/ParadoxAnubhav20/employee-management-system
   cd ems-backend
   ```

2. Configure your database connection in `application.properties` as described in the [Configuration Instructions](#config).

3. Build and run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```
   Or using Maven directly:
   ```bash
   mvn spring-boot:run
   ```

4. The backend will be available at `http://localhost:8080`.

### Frontend Setup
1. Clone the frontend repository:
   ```bash
   git clone https://github.com/ParadoxAnubhav20/employee-management-system
   cd ems-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The frontend will be available at `http://localhost:5173`.

<a name="api"></a>
## 🔌 API Endpoints

The following RESTful API endpoints are available:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/employees` | Fetch all employees |
| GET    | `/api/employees/{id}` | Get a specific employee by ID |
| POST   | `/api/employees` | Create a new employee |
| PUT    | `/api/employees/{id}` | Update an existing employee |
| DELETE | `/api/employees/{id}` | Delete an employee |

### Example Request/Response

#### Create Employee (POST)
Request:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "emailId": "john.doe@example.com"
}
```

Response:
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "emailId": "john.doe@example.com"
}
```
