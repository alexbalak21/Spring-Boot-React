package app.dto;

/**
 * DTO for user registration requests.
 * Carries the data needed to create a new user.
 */
public class RegisterRequest {

    private String name = "USER";   // default name
    private String email;
    private String password;
    private String role = "USER";   // default role

    public RegisterRequest() {}

    public RegisterRequest(String email, String password) {
        this.name = "USER";
        this.email = email;
        this.password = password;
        this.role = "USER";
    }

    // Getters and setters
    public String getName() {
        return name;
    }
    public void setName(String name) {
        // enforce default USER if blank
        this.name = (name == null || name.isBlank()) ? "USER" : name;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        // enforce default USER if blank
        this.role = (role == null || role.isBlank()) ? "USER" : role;
    }
}
