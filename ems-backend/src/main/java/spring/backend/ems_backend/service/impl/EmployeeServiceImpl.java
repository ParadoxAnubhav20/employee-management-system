package spring.backend.ems_backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import spring.backend.ems_backend.dto.EmployeeDto;
import spring.backend.ems_backend.entity.Employee;
import spring.backend.ems_backend.exception.ResourceNotFoundException;
import spring.backend.ems_backend.mapper.EmployeeMapper;
import spring.backend.ems_backend.repository.EmployeeRepository;
import spring.backend.ems_backend.service.EmployeeService;

@Service
public class EmployeeServiceImpl implements EmployeeService {

	private final EmployeeRepository employeeRepository;

	public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
		this.employeeRepository = employeeRepository;
	}

	@Override
	public EmployeeDto createEmployee(EmployeeDto employeeDto) {
		Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
		Employee savedEmployee = employeeRepository.save(employee);
		return EmployeeMapper.mapToEmployeeDto(savedEmployee);
	}

	@Override
	public EmployeeDto getEmployeeById(Long employeeId) {
		Employee employee = employeeRepository.findById(employeeId)
				.orElseThrow(() -> new ResourceNotFoundException("No Employee Found With the given id: " + employeeId));
		return EmployeeMapper.mapToEmployeeDto(employee);
	}

	@Override
	public List<EmployeeDto> getAllEmployees() {
		List<Employee> allEmployees = employeeRepository.findAll();
		return allEmployees.stream().map(employee -> EmployeeMapper.mapToEmployeeDto(employee)).toList();
	}

	@Override
	public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployeeDto) {
		Employee existingEmployee = employeeRepository.findById(employeeId)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + employeeId));

		// Map updated DTO fields into existing entity
		existingEmployee.setFirstName(updatedEmployeeDto.getFirstName());
		existingEmployee.setLastName(updatedEmployeeDto.getLastName());
		existingEmployee.setEmail(updatedEmployeeDto.getEmail());

		Employee updatedEmployee = employeeRepository.save(existingEmployee);
		return EmployeeMapper.mapToEmployeeDto(updatedEmployee);
	}

	@Override
	public void deleteEmployee(Long employeeId) {
		Employee existingEmployee = employeeRepository.findById(employeeId)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + employeeId));
		employeeRepository.deleteById(employeeId);
	}
}
