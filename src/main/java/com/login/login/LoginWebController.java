package com.login.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LoginWebController {

    @Autowired
    private AuthService authService;

    @GetMapping("/login")
    public String showLogin() {
        return "login";
    }

    @PostMapping("/login")
    public String doLogin(@RequestParam String username, @RequestParam String password, Model model) {
        try {
            String token = authService.login(username, password);
            model.addAttribute("token", token);
            return "login-success";
        } catch (Exception ex) {
            model.addAttribute("error", ex.getMessage());
            return "login";
        }
    }
}
