package app.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.dto.MessageRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api")
public class ApiController {

    @GetMapping("/message")
    public String hello() {
        return "\"message\": \"Hello from Spring Boot! & Welcome\"";
    }

    @PostMapping("/message")
    public String postMessage(@RequestBody MessageRequest request) {
        return request.getMessage();
    }
}
