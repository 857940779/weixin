package com.luohw.springboot.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

@Aspect
@Component
public class LogAop {

    //切点由正则改为注解，即如果使用此注解，将会被aop拦截
    @Pointcut("@annotation(com.luohw.springboot.annoation.LogAnnoation)")
    public void log() {
    }

    @Before("log()")
    public void doBefore(JoinPoint joinPoint) {
        System.out.println("-----AOP日志开始-----");
        //获取http请求
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();

    }

    @After("log()")
    public void doAfter() {
        System.out.println("-----AOP日志结束-----");

    }

}

