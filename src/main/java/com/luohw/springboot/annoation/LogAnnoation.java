package com.luohw.springboot.annoation;

import java.lang.annotation.*;

//日志注解
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface LogAnnoation {
}
