package com.lab4.filters;

import com.lab4.services.AuthService;
import com.lab4.services.HeadersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Component
public class SecureFilter extends GenericFilterBean {

    private final AuthService authService;
    private final HeadersService headersService;

    @Autowired
    public SecureFilter(AuthService authService, HeadersService headersService) {
        this.authService = authService;
        this.headersService = headersService;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {

        var request = (HttpServletRequest) servletRequest;
        var response = (HttpServletResponse) servletResponse;

        if (request.getMethod().equals("OPTIONS")) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }

        Optional<String> jwt = headersService.getJWTFromHeader(request);

        if (jwt.isEmpty()) {
            System.out.println("No jwt request");

            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Ошибка авторизации на сервере");
            return;
        }

        if (!authService.isJWTValid(jwt.get())) {
            System.out.println("Request with invalid jwt");

            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Ошибка авторизации на сервере");
            return;
        }

        filterChain.doFilter(servletRequest, servletResponse);
    }
}
