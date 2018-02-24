package com.evil.scheme.Quip;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties
@EntityScan(basePackages = {"com.evil.scheme.Quip.entities"})
public class QuipApplication {
    public static void main(String[] args) {
        SpringApplication.run(QuipApplication.class, args);
    }
}
