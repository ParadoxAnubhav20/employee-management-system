package spring.backend.ems_backend.dto;

import org.springframework.stereotype.Service;

public class EmployeeDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;

    // No-argument constructor
    public EmployeeDto() {
    }

    // All-arguments constructor
    public EmployeeDto(Long id, String first_name, String last_name, String email) {
        this.id = id;
        this.firstName = first_name;
        this.lastName = last_name;
        this.email = email;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String first_name) {
        this.firstName = first_name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String last_name) {
        this.lastName = last_name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
