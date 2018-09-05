package com.luohw.springboot.controller;


import com.luohw.springboot.constant.TokenConstant;
import com.luohw.springboot.service.MessageService;
import com.luohw.springboot.service.WeixinService;
import com.luohw.springboot.util.SignUtil;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

@Controller
@RequestMapping("/weixin")
public class WeixinController {
    //这个是自己配置得token，与微信得不一样
    String token="2018luohw";

    @Autowired
    MessageService messageService;
    @Autowired
    WeixinService weixinService;
    @Autowired
    TokenConstant tokenConstant;

    /**
     * 测试数据
     * @param signature  0688e477bf15a0b3b2a7210def86cdbb261d91f1
     * @param timestamp  1535957987
     * @param nonce  1567072979
     * @param echostr  5775464274792872931
     * @param resp
     */

    @RequestMapping(value ="test",method = RequestMethod.GET)
    //此处需要直接返回string，不能返回json，否则微信无法解析
    public void test(String signature,String timestamp,String nonce,String echostr,HttpServletResponse resp){
        //这几个参数都是微信调用得时候传给我们得，我们需要自己做校验，此处简单一点，直接返回成功
        System.out.println(signature);
        System.out.println(timestamp);
        System.out.println(nonce);
        System.out.println(echostr);

        if(SignUtil.checkSignature(signature,timestamp,nonce,token)){
            System.out.println("校验成功");
        }else {
            System.out.println("校验失败");
        }

        //返回字符串
        PrintWriter out = null;
        try {
            out = resp.getWriter();
            out.write(echostr);
            out.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }finally{
            if(out != null){
                out.close();
            }
        }
    }


    /**
     * 微信调用我们，传输数据，比如用户发送消息给微信，微信再发给我
     * 请求测试报文
     * <xml><ToUserName><![CDATA[gh_87ffa1b9f425]]></ToUserName>
     <FromUserName><![CDATA[oGR881MPhd7lk2xUCsRmv0NZ45XA]]></FromUserName>
     <CreateTime>1535960673</CreateTime>
     <MsgType><![CDATA[text]]></MsgType>
     <Content><![CDATA[123]]></Content>
     <MsgId>6596900858906268230</MsgId>
     </xml>
     * @param resp
     */
    @RequestMapping(value ="test",method = RequestMethod.POST)
    //此处需要直接返回string，不能返回json，否则微信无法解析，5秒内必须返回，你可以先返回一个success
    //微信所有回调，需要交互，除了验证token，都是走这个
    public void weixinCallUs(HttpServletRequest request, HttpServletResponse resp){
        PrintWriter out=null;
        try {
            InputStream inputStream=request.getInputStream();
            int length=request.getContentLength();
            byte[] array=new byte[length];
            inputStream.read(array);
            String xml=new String(array);
            System.out.println(xml);

            String timestamp=System.currentTimeMillis()+"";
            out = resp.getWriter();
            //根据微信文档，此处按道理是可以回复的，但实际上不行，可以考虑使用客服消息发送
//            String str="<xml> <ToUserName>< ![CDATA[oGR881MPhd7lk2xUCsRmv0NZ45XA] ]></ToUserName> " +
//                    "<FromUserName>< ![CDATA[gh_87ffa1b9f425] ]></FromUserName> " +
//                    "<CreateTime>"+timestamp+
//                    "</CreateTime>" +
//                    " <MsgType>< ![CDATA[text] ]></MsgType>" +
//                    " <Content>< ![CDATA[456] ]></Content> " +
//                    "</xml>";

            String str="success";
            out.write(str);
            out.flush();
            new TestThread().start();
        } catch (IOException e) {
            e.printStackTrace();
            out.close();
        }
    }

    //获取access_token



    class TestThread extends Thread{
        @Override
        public void run() {
            messageService.sendCustomTextMessage();
        }
    }


    //测试创建菜单
    @RequestMapping(value = "/createMenu",method = RequestMethod.GET)
    @ResponseBody
    public String createMenu(){
        if(weixinService.createMenu()){
            return "success";
        }else {
            return "fail,see the console";
        }

    }

    @RequestMapping(value = "/delMenu",method = RequestMethod.GET)
    @ResponseBody
    public String delMenu(){
        if(weixinService.delMenu()){
            return "success";
        }else {
            return "fail,see the console";
        }

    }

    //两小时过期
    @RequestMapping(value = "/token",method = RequestMethod.GET)
    @ResponseBody
    public String getToken(){
        if(StringUtils.isEmpty(tokenConstant.getWeiToken())){
            tokenConstant.setWeiToken(weixinService.getWeixinToken());
        }
        return "success,see the console,token--"+tokenConstant.getWeiToken();

    }
}
