package com.login.login;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

@RestController
@RequestMapping("/debug")
public class MappingsDebugController {

    @Autowired
    private RequestMappingHandlerMapping mapping;

    @GetMapping("/mappings")
    public List<String> mappings() {
        return mapping.getHandlerMethods().entrySet().stream()
                .map(e -> {
                    RequestMappingInfo info = e.getKey();
                    return info.toString() + " -> " + e.getValue().getMethod().getName();
                })
                .collect(Collectors.toList());
    }
}
