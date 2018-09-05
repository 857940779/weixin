package com.luohw.springboot.service.impl;

import com.alibaba.fastjson.JSON;
import com.luohw.springboot.po.MessageContentPO;
import com.luohw.springboot.po.TextContentPO;
import com.luohw.springboot.service.MessageService;
import com.luohw.springboot.util.HttpClientUtil;
import org.apache.http.HttpResponse;
import org.apache.http.entity.ByteArrayEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;

@Service
public class MessageServiceImpl implements MessageService {
    String accessToken="13_WDZ9JYx-XW1H-k33dnowrCJVvIv3p27qibsequnbZwUNjYpP3eG8YnBbUh5ulgKjOvA5h5Yl9gqlvaiAgtc5LyLMnmqRXStMa7XssMtRru7D2SXoLkgoGQyNFlIqRB6ejuEaBfxHcaHQpuCrSMDgAIANHY";

    //后台发送消息给微信服务器，让微信回复用户，需要access_token

    @Override
    public void sendCustomTextMessage() {
        String url="https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token="+accessToken;

        MessageContentPO messageContentPO=new MessageContentPO();
        messageContentPO.setMsgtype("text");
        messageContentPO.setTouser("oGR881MPhd7lk2xUCsRmv0NZ45XA");
        TextContentPO textContentPO=new TextContentPO();
        textContentPO.setContent("Hello SB!!!!");
        messageContentPO.setText(textContentPO);
        String content= JSON.toJSONString(messageContentPO);
        byte[] array=content.getBytes();
        ByteArrayEntity entity = new ByteArrayEntity(array);
        HttpResponse httpResponse=HttpClientUtil.post(url,null,entity);
        try {
            InputStream inputStream=httpResponse.getEntity().getContent();
            int length=inputStream.available();
            byte[] bytes=new byte[length];
            inputStream.read(bytes);
            String str=new String(bytes);
            System.out.println(str);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
