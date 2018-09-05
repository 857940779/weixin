package com.luohw.springboot.constant;

import com.luohw.springboot.service.WeixinService;
import com.luohw.springboot.util.SpringUtil;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TokenConstant implements InitializingBean{
    //token 全局唯一
    private String weiToken;

    @Autowired
    WeixinService weixinService;

    public TokenConstant(){

    }

    //这里想在bean初始化时就引入wexinService，只能通过这个方式，不能再构造方法中写，因为注入其他bean在构造方法后
    //而且不能用setter方法注入，要用@Autowired
    //启动服务时获取token，如果是多台服务器，那么要用redis来存
    @Override
    public void afterPropertiesSet() throws Exception {
        String token= weixinService.getWeixinToken();
        if(StringUtils.isNotEmpty(token)){
            weiToken=token;
        }
        System.out.println("---------get toekn success-----------"+weiToken);
    }

    public String getWeiToken() {
        return weiToken;
    }

    public void setWeiToken(String weiToken) {
        this.weiToken = weiToken;
    }
}
