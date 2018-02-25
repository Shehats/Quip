package com.evil.scheme.Quip.logging;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;

@Aspect
public class ViewLogger {
    @Before("execution (* com.evil.scheme.Quip.views.*.*(..))")
    public void beforeControllerMethod(JoinPoint joinPoint) {

    }
}
