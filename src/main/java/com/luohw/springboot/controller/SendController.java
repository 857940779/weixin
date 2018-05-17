package com.luohw.springboot.controller;

import java.util.UUID;

import com.luohw.springboot.mq.RabbitMQConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.support.CorrelationData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 测试RabbitMQ发送消息的Controller
 * @author Raye
 *
 */
@RestController
public class SendController{
    @Autowired
    private RabbitTemplate rabbitTemplate;

    /**
     * 向消息队列1中发送消息
     * @return
     */
    @RequestMapping("send1")
    public String send1(){
        String msg="test springboot + rabbitmq";
        String uuid = UUID.randomUUID().toString();
        CorrelationData correlationId = new CorrelationData(uuid);
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE, RabbitMQConfig.ROUTINGKEY1, msg,
                correlationId);
        return "发送消息成功";
    }

    @RequestMapping("send2")
    public String send2(){
        String msg="test springboot + rabbitmq--222";
        String uuid = UUID.randomUUID().toString();
        CorrelationData correlationId = new CorrelationData(uuid);
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE, RabbitMQConfig.ROUTINGKEY2, msg,
                correlationId);
        return "发送消息成功";
    }
}