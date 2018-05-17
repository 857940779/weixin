package com.luohw.springboot.domain;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Created by luohw on 2018/5/2 0002.
 */

@Component
public class RedisProperties {

    @Value("${redis.cache.clusterNodes}")
    private String clusterNodes;

    @Value("${redis.cache.password}")
    private String password;


    public String getClusterNodes() {
        return clusterNodes;
    }

    public void setClusterNodes(String clusterNodes) {
        this.clusterNodes = clusterNodes;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
