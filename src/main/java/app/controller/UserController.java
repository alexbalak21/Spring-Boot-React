package app.controller;

import app.dto.UserInfo;
import app.security.CustomUserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

   @GetMapping("/user")
public ResponseEntity<UserInfo> currentUser(Authentication authentication) {
    System.out.println("Fetching current user information...");
    if (authentication == null || !authentication.isAuthenticated()) {
        return ResponseEntity.status(403).build();
    }

    // Print the whole Authentication object
    System.out.println("Authentication: " + authentication);

    // Print the principal specifically
    Object principal = authentication.getPrincipal();
    System.out.println("Principal class: " + principal.getClass().getName());
    System.out.println("Principal: " + principal);

    // If you expect CustomUserDetails
    if (principal instanceof CustomUserDetails user) {
        System.out.println("User ID: " + user.getId());
        System.out.println("User Email: " + user.getEmail());
        System.out.println("User Name: " + user.getUsername());
        System.out.println("User Role: " + user.getAuthorities());
        return ResponseEntity.ok(new UserInfo(user));
    }

    return ResponseEntity.status(500).build();
}
}
