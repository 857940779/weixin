package com.luohw.springboot;

import com.github.pagehelper.PageHelper;
import com.luohw.springboot.service.GuidanceService;
import com.luohw.springboot.service.impl.GuidanceServiceImpl;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Properties;

@SpringBootApplication
@MapperScan("com.luohw.springboot.mapper")
public class SpringbootApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringbootApplication.class, args);
	}
}
