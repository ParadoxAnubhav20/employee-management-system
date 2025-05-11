package spring.backend.ems_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import spring.backend.ems_backend.entity.Employee;


public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
