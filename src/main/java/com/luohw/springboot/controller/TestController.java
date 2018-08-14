package com.luohw.springboot.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {


    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public String test() {

        System.out.println("----------test success----------");
        return "test success";

    }

}
