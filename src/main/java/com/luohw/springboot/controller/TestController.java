package com.luohw.springboot.controller;

import jdk.nashorn.internal.runtime.JSONFunctions;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/kafka")
public class TestController {
    @Autowired
    private KafkaTemplate kafkaTemplate;

    @RequestMapping(value = "/send", method = RequestMethod.GET)
    public String sendKafka() {
        try {

            kafkaTemplate.send("luohwTest", "test message");
            System.out.println("发送kafka成功.");
            return "kafka test success";
        } catch (Exception e) {
            e.printStackTrace();
            return "kafka test fail";
        }
    }

}
