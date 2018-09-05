package com.luohw.springboot.service.impl;

import com.alibaba.fastjson.JSON;
import com.luohw.springboot.constant.WeixinConstant;
import com.luohw.springboot.po.CreateMenuPO;
import com.luohw.springboot.po.FirstMenuPO;
import com.luohw.springboot.po.SecondMenuPO;
import com.luohw.springboot.po.TokenPO;
import com.luohw.springboot.service.WeixinService;
import com.luohw.springboot.util.HttpClientUtil;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.entity.StringEntity;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class WeixinServiceImpl implements WeixinService{

    //创建菜单
    @Override
    public boolean createMenu() {
        String url="https://api.weixin.qq.com/cgi-bin/menu/create?access_token=13_wpEKpnnTuBl4h93HRBLCxORDT4Jw4z-6HHeuarBzxiF7gUpAasvqmOw0Y9STC9qBh8_KaQAv-qXNNSiRPA_J0PxtHn7pFvBhgyCe8buFS4NXbpvIO1xOHWDbP5SbfbWm_g3tm4fmePD83679YHEcAJAUDA";
        CreateMenuPO createMenuPO=new CreateMenuPO();
        FirstMenuPO firstMenuPO=new FirstMenuPO();
        firstMenuPO.setName("扫码");

        List list=new ArrayList<>();
        SecondMenuPO secondMenuPO=new SecondMenuPO();
        secondMenuPO.setName("扫码带提示");
        secondMenuPO.setType("scancode_waitmsg");
        secondMenuPO.setKey("rselfmenu_0_0");
        list.add(secondMenuPO);

        SecondMenuPO secondMenuPO2=new SecondMenuPO();
        secondMenuPO2.setName("扫码推事件");
        secondMenuPO2.setType("scancode_push");
        secondMenuPO2.setKey("rselfmenu_0_1");
        list.add(secondMenuPO2);

        firstMenuPO.setSub_button(list);

        FirstMenuPO firstMenuPO1=new FirstMenuPO();
        firstMenuPO1.setName("发送位置");
        firstMenuPO1.setType("location_select");
        firstMenuPO1.setKey("rselfmenu_2_0");

        List<FirstMenuPO> buttonList=new ArrayList();
        buttonList.add(firstMenuPO);
        buttonList.add(firstMenuPO1);
        createMenuPO.setButton(buttonList);

        try {
            HttpEntity httpEntity=new StringEntity(JSON.toJSONString(createMenuPO),"utf-8");
            HttpResponse httpResponse=HttpClientUtil.post(url,null,httpEntity);

            InputStream inputStream=httpResponse.getEntity().getContent();
            int length=inputStream.available();
            byte[] bytes=new byte[length];
            inputStream.read(bytes);
            String str=new String(bytes);
            System.out.println(str);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean delMenu() {
        String url="https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=";
        String token="13_wpEKpnnTuBl4h93HRBLCxORDT4Jw4z-6HHeuarBzxiF7gUpAasvqmOw0Y9STC9qBh8_KaQAv-qXNNSiRPA_J0PxtHn7pFvBhgyCe8buFS4NXbpvIO1xOHWDbP5SbfbWm_g3tm4fmePD83679YHEcAJAUDA";
        url+=token;
        try {
            HttpResponse httpResponse=HttpClientUtil.get(url,null);

            InputStream inputStream=httpResponse.getEntity().getContent();
            int length=inputStream.available();
            byte[] bytes=new byte[length];
            inputStream.read(bytes);
            String str=new String(bytes);
            System.out.println(str);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    //获取token
    @Override
    public boolean getToken() {
        String url="https://api.weixin.qq.com/cgi-bin/token?grant_type={0}&appid={1}&secret={2}";
        url= MessageFormat.format(url,"client_credential","wx53afeddec9d5181d","ee71ffa8ff51f8c445152349ce9ae75e");
        //grant_type写死，后面两个在公众号后台里面得

        try {
            HttpResponse httpResponse=HttpClientUtil.get(url,null);

            InputStream inputStream=httpResponse.getEntity().getContent();
            int length=inputStream.available();
            byte[] bytes=new byte[length];
            inputStream.read(bytes);
            String str=new String(bytes);
            System.out.println(str);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public String getWeixinToken() {
        String url=WeixinConstant.TOKEN_URL;
        url= MessageFormat.format(url, WeixinConstant.GRANT_TYPE,WeixinConstant.APPID,WeixinConstant.SECRET);

        try {
            HttpResponse httpResponse=HttpClientUtil.get(url,null);

            InputStream inputStream=httpResponse.getEntity().getContent();
            int length=inputStream.available();
            byte[] bytes=new byte[length];
            inputStream.read(bytes);
            String str=new String(bytes);
            TokenPO tokenPO=JSON.parseObject(str,TokenPO.class);
            return tokenPO.getAccess_token();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
