package app.controller;

import app.dto.LoginRequest;
import app.dto.RegisterRequest;
import app.model.User;
import app.model.UserRole;
import app.repository.UserRepository;
import app.security.CustomUserDetails;
import app.security.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager,
            JwtService jwtService,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            var authentication = authenticationManager.authenticate(
                    new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(
                            request.getEmail(), request.getPassword()));

            CustomUserDetails principal = (CustomUserDetails) authentication.getPrincipal();
            String token = jwtService.generateToken(principal);
            String refreshToken = jwtService.generateRefreshToken(principal.getId());

            // Wrap both token and user info
            return ResponseEntity.ok(Map.of(
                    "access_token", token,
                    "refresh_token", refreshToken,
                    "user", new app.dto.UserInfo(principal)));

        } catch (org.springframework.security.core.AuthenticationException e) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        // Check if email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already in use"));
        }

        // Create new user entity
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(UserRole.USER);

        // Save user
        userRepository.save(user);

        // Optionally generate JWT immediately after registration
        // String token = jwtService.generateToken(user);

        return ResponseEntity.ok(Map.of(
                "message", "User registered successfully"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // JWT is stateless, so logout is handled client-side by removing the token
        // Server-side can optionally invalidate token in a blacklist if needed
        return ResponseEntity.ok(Map.of(
                "message", "Logged out successfully"));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> request) {

        String refreshToken = request.get("refreshToken");
        if (refreshToken == null || refreshToken.isEmpty()) {
            return ResponseEntity.badRequest().body("Refresh token is required");
        }

        // 1. Validate refresh token
        if (!jwtService.validateRefreshToken(refreshToken)) {
            return ResponseEntity.status(401).body("Invalid or expired refresh token");
        }

        // 2. Extract user ID
        Long userId = jwtService.getUserIdFromRefreshToken(refreshToken);

        // 3. Load user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 4. Generate new tokens
        String newAccessToken = jwtService.generateToken(user);
        String newRefreshToken = jwtService.generateRefreshToken(user.getId());

        Map<String, String> response = new HashMap<>();
        response.put("access_token", newAccessToken);
        response.put("refresh_token", newRefreshToken);

        return ResponseEntity.ok(response);
    }

}
