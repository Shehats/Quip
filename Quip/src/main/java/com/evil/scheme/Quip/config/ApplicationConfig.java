package com.evil.scheme.Quip.config;

import com.evil.scheme.Quip.QuipApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.convert.ConversionService;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.format.support.DefaultFormattingConversionService;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.regex.Pattern;

@Configuration
@EnableWebMvc
@ComponentScan("com.evil.scheme.Quip")
@PropertySource(value = {"classpath:application.properties",
                         "classpath:persistence.properties",
                         "classpath:security.properties",
                         "classpath:email.properties"})
//@PropertySource("classpath:persistence.properties")
//@PropertySource("classpath:security.properties")
@EnableJpaRepositories("com.evil.scheme.Quip.repositories")
class ApplicationConfig {
    @Bean
    public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
        return new PropertySourcesPlaceholderConfigurer();
    }

//    @Bean
//    public JavaMailSender getJavaMailSender () {
//        return null;
//    }


    @Bean
    public static ConversionService conversionService () {
        DefaultFormattingConversionService service = new DefaultFormattingConversionService();
        service.addConverter(String.class, Pattern.class, (Converter<String, Pattern>) Pattern::compile);
        return service;
    }
}