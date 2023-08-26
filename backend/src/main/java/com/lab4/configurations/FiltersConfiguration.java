package com.lab4.configurations;

import com.lab4.filters.SecureFilter;
import com.lab4.services.AuthService;
import com.lab4.services.HeadersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FiltersConfiguration {

    @Autowired
    @Bean
    public FilterRegistrationBean<SecureFilter> createSecureFilter(AuthService authService, HeadersService headersService) {
        var filter = new FilterRegistrationBean<SecureFilter>();

        filter.setFilter(new SecureFilter(authService, headersService));

        filter.addUrlPatterns("/api/secure/*");
        filter.addUrlPatterns("/api/secure/**");

        return filter;
    }
}
