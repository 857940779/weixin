package com.luohw.springboot.service.impl;

import com.luohw.springboot.annoation.LogAnnoation;
import com.luohw.springboot.service.TestService;
import org.springframework.stereotype.Service;

@Service
public class TestServiceImpl implements TestService {

    @LogAnnoation
    @Override
    public void test() {
        System.out.println("---------------------------");
        System.out.println("正常的业务逻辑");
        System.out.println("---------------------------");
    }
}
