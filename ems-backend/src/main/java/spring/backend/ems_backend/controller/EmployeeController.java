package spring.backend.ems_backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spring.backend.ems_backend.dto.EmployeeDto;
import spring.backend.ems_backend.service.EmployeeService;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

	private EmployeeService employeeService;

	// Constructor
	public EmployeeController(EmployeeService employeeService) {
		this.employeeService = employeeService;
	}

	// Add Employee REST API
	@PostMapping
	public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto) {
		EmployeeDto savedEmployeeDto = employeeService.createEmployee(employeeDto);
		return new ResponseEntity<>(savedEmployeeDto, HttpStatus.CREATED);
	}

	// Get Employee REST API
	@GetMapping("{id}")
	public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") Long employeeId) {
		EmployeeDto employeeDto = employeeService.getEmployeeById(employeeId);
		return ResponseEntity.ok(employeeDto);
	}

	// Get All Employees REST API
	@GetMapping
	public ResponseEntity<List<EmployeeDto>> getAllEmployees() {
		List<EmployeeDto> allEmployees = employeeService.getAllEmployees();
		return ResponseEntity.ok(allEmployees);
	}

	// Build Update Employee REST API
	@PutMapping("{id}")
	public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long employeeId,
			@RequestBody EmployeeDto updatedEmployeeDto) {
		EmployeeDto updatedEmployee = employeeService.updateEmployee(employeeId, updatedEmployeeDto);
		return ResponseEntity.ok(updatedEmployee);
	}

	// Build Delete Employee REST API
	@DeleteMapping("{id}")
	public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeId) {
		employeeService.deleteEmployee(employeeId);
		return ResponseEntity.ok("Employee Deleted Successfully");
	}

}
