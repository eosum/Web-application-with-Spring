package com.lab4.services;

import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.Optional;

@Service
public class HeadersService {

    public Optional<String> getHeaderByName(HttpServletRequest request, String name) {
        Enumeration<String> headerNames = request.getHeaderNames();
        if (headerNames == null) return Optional.empty();

        String headerName;

        while (headerNames.hasMoreElements()) {
            headerName = headerNames.nextElement();

            if (headerName.equals(name))
                return Optional.of(request.getHeader(headerName));
        }

        return Optional.empty();
    }

    public Optional<String> getJWTFromHeader(HttpServletRequest request) {
        Optional<String> header = getHeaderByName(request, "authentication");

        return header.map(s -> s.split("Bearer ")[1]);

    }
}
