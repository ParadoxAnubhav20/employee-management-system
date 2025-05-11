package spring.backend.ems_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import spring.backend.ems_backend.dto.EmployeeDto;


public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);
    EmployeeDto getEmployeeById(Long employeeId);
    List<EmployeeDto> getAllEmployees();
    EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployeeDto);
    void deleteEmployee(Long employeeId);
}
