package com.luohw.springboot.mq;

import org.springframework.amqp.core.AcknowledgeMode;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.ChannelAwareMessageListener;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by luohw on 2018/5/14 0014.
 */
@Configuration
public class RabbitMQConfig {
    //消息交换机的名字
    public static final String EXCHANGE = "my-mq-exchange";
    //队列key1
    public static final String ROUTINGKEY1 = "queue_one_key1";
    public static final String ROUTINGKEY2="queue_two_key";


    //队列名字
    public static final String QUEUE="springboot";

    public static final String QUEUE2="sprngboot2";

    public static final String USER_NAME="guest";

    public static final String PASSWORD="guest";

    public static final String HOST="127.0.0.1";


    /**
     * 配置链接信息
     * @return
     */
    @Bean
    public ConnectionFactory connectionFactory() {
        CachingConnectionFactory connectionFactory = new CachingConnectionFactory(HOST,5672);

        connectionFactory.setUsername(USER_NAME);
        connectionFactory.setPassword(PASSWORD);
        connectionFactory.setVirtualHost("/");
        connectionFactory.setPublisherConfirms(true); // 必须要设置
        return connectionFactory;
    }

    /**
     * 配置消息交换机
     * 针对消费者配置
     FanoutExchange: 将消息分发到所有的绑定队列，无routingkey的概念
     HeadersExchange ：通过添加属性key-value匹配
     DirectExchange:按照routingkey分发到指定队列
     TopicExchange:多关键字匹配
     */
    @Bean
    public DirectExchange defaultExchange() {
        return new DirectExchange(EXCHANGE, true, false);
    }
    /**
     * 配置消息队列1
     * 针对消费者配置
     * @return
     */
    @Bean
    public Queue queue() {
        return new Queue(QUEUE, true); //队列持久
    }
    /**
     * 将消息队列1与交换机绑定
     * 针对消费者配置
     * @return
     */
    @Bean
    public Binding binding() {
        return BindingBuilder.bind(queue()).to(defaultExchange()).with(RabbitMQConfig.ROUTINGKEY1);
    }



    /**
     * 接受消息的监听，这个监听会接受消息队列1的消息
     * 针对消费者配置
     * @return
     */
    @Bean
    public SimpleMessageListenerContainer messageContainer() {
        SimpleMessageListenerContainer container = new SimpleMessageListenerContainer(connectionFactory());
        container.setQueues(queue());
        container.setExposeListenerChannel(true);
        container.setMaxConcurrentConsumers(1);
        container.setConcurrentConsumers(1);
        container.setAcknowledgeMode(AcknowledgeMode.MANUAL); //设置确认模式手工确认
        container.setMessageListener(new ChannelAwareMessageListener() {

            public void onMessage(Message message, com.rabbitmq.client.Channel channel) throws Exception {
                byte[] body = message.getBody();
                System.out.println("收到消息 : " + new String(body));
                channel.basicAck(message.getMessageProperties().getDeliveryTag(), false); //确认消息成功消费

            }

        });
        return container;
    }

    /**
     * 配置第二个队列及消费者
     *
     */

    @Bean
    public Queue queue1() {
        return new Queue(QUEUE2, true); //队列持久
    }

    @Bean
    public Binding binding1() {
        return BindingBuilder.bind(queue1()).to(defaultExchange()).with(RabbitMQConfig.ROUTINGKEY2);
    }

    @Bean
    public SimpleMessageListenerContainer messageContainer2() {
        SimpleMessageListenerContainer container = new SimpleMessageListenerContainer(connectionFactory());
        container.setQueues(queue1());
        container.setExposeListenerChannel(true);
        container.setMaxConcurrentConsumers(1);
        container.setConcurrentConsumers(1);
        container.setAcknowledgeMode(AcknowledgeMode.MANUAL); //设置确认模式手工确认
        container.setMessageListener(new ChannelAwareMessageListener() {

            public void onMessage(Message message, com.rabbitmq.client.Channel channel) throws Exception {
                byte[] body = message.getBody();
                System.out.println("queue1 收到消息 : " + new String(body));
                channel.basicAck(message.getMessageProperties().getDeliveryTag(), false); //确认消息成功消费

            }

        });
        return container;
    }
}