package com.luohw.springboot.schedule;

import com.luohw.springboot.constant.TokenConstant;
import com.luohw.springboot.service.WeixinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class TokenTask {
    @Autowired
    TokenConstant tokenConstant;
    @Autowired
    WeixinService weixinService;

    //每两个小时更新一次token
    @Scheduled(cron = "* * */2  * * ?")
    public void sendingMessage() {
        System.out.println("------------token自动刷新------------");
        tokenConstant.setWeiToken(weixinService.getWeixinToken());
    }
}
