package com.luohw.springboot.redis;

import com.luohw.springboot.domain.RedisProperties;
import org.apache.commons.pool2.impl.GenericObjectPoolConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import redis.clients.jedis.HostAndPort;
import redis.clients.jedis.JedisCluster;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by luohw on 2018/5/2 0002.
 */
@Configuration
public class JedisClusterConfig {

    @Autowired
    RedisProperties redisProperties;

    /**
     * 这里返回的JedisCluster是单例的，并且可以直接注入到其他类中去使用
     */
    @Bean
    public JedisCluster getJedisCluster() {

        String[] serverArray = redisProperties.getClusterNodes().split(",");
        Set<HostAndPort> nodes = new HashSet<>();

        for (String ipPort : serverArray) {
            String[] ipPortPair = ipPort.split(":");
            nodes.add(new HostAndPort(ipPortPair[0].trim(), Integer.valueOf(ipPortPair[1].trim())));
        }

        GenericObjectPoolConfig poolConfig = new GenericObjectPoolConfig();
        poolConfig.setMinIdle(300);
        poolConfig.setMaxIdle(1200);
        poolConfig.setMaxTotal(102400);
        poolConfig.setMaxWaitMillis(3000L);
        return new JedisCluster(nodes, 3000, 3000, 100,
                redisProperties.getPassword(), poolConfig);
    }

}

