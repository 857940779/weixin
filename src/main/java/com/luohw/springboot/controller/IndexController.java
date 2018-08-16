package com.luohw.springboot.controller;

import com.luohw.springboot.service.MenuServcie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.*;

@Controller
public class IndexController {
    @Autowired
    private MenuServcie menuServcie;

    //服务启动后默认页面
    @GetMapping(value = "/")
    public String index() throws Exception {
        System.out.println("---------进入登陆页---------");
        return "login";
    }

    //这个效果等同于上面的GetMapping注解
    @RequestMapping(value="/admin/index",method = RequestMethod.GET)
    public String adminIndex(Model model){
        String menuTree = menuServcie.getMeneuTree();  //页面初始化加载左侧菜单树
        model.addAttribute("message", menuTree);
        return "admin/index";
    }



}
