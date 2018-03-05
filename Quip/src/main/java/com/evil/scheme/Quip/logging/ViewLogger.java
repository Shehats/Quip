package com.evil.scheme.Quip.logging;

import org.apache.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;

import com.evil.scheme.Quip.test.UnitTestAuth;

@Aspect
public class ViewLogger {
	final static Logger logger = Logger.getLogger(ViewLogger.class);
	
    @Before("execution (* com.evil.scheme.Quip.views.*.*(..))")
    public void beforeControllerMethod(JoinPoint joinPoint) {
    	logger.info(joinPoint.getClass());
    	logger.info(joinPoint.getSignature().toString());
    	logger.info(joinPoint.getTarget().toString());
    }
}
