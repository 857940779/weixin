package com.luohw.springboot;

import com.luohw.springboot.service.WeixinService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class WeixinTest {
    @Autowired
    WeixinService weixinService;

    //直接测试类的方法，不需要启动服务
    @Test
    public void testToken(){
        weixinService.getToken();
    }

    @Test
    public void testWeixinToken(){
        System.out.println(weixinService.getWeixinToken());
    }

}
