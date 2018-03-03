package com.evil.scheme.Quip.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable().authorizeRequests()
                .antMatchers(HttpMethod.POST, "/signin").permitAll()
                .antMatchers(HttpMethod.POST, "/signup").permitAll()
                .antMatchers(HttpMethod.POST, "/exists").permitAll()
                .antMatchers(HttpMethod.POST, "/uploadProfile").permitAll()
                .antMatchers(HttpMethod.POST, "/uploadMedia").permitAll()
                .antMatchers(HttpMethod.PUT, "/uploadMedia/{id}").permitAll()
                .antMatchers(HttpMethod.GET, "/forget-password/**").permitAll()
                .antMatchers(HttpMethod.POST, "/accounts/forget-password").permitAll()
                .antMatchers(HttpMethod.GET, "/profile/{username}").permitAll()
                .anyRequest().authenticated().and().apply(new JwtTokenFilterConfigurer(jwtTokenProvider))
                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.httpBasic();
    }
}

