package com.luohw.springboot.controller;

import com.luohw.springboot.domain.JsonResult;
import com.luohw.springboot.domain.StatusCode;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * 登录登出controller
 */
@Controller
@RequestMapping("/login")
public class LoginController {

    @RequestMapping(value = "/login",method = RequestMethod.POST)
    @ResponseBody
    public JsonResult loginAction(HttpServletRequest httpServletRequest) {
        JsonResult<Object> result = new JsonResult<>();
        String username = httpServletRequest.getParameter("username");
        String password=httpServletRequest.getParameter("password");
        //用户密码校验
        if("admin".equalsIgnoreCase(username) && "123123".equalsIgnoreCase(password)){
            result.setStatus(StatusCode.SUCCESS);
            result.setData("/admin/index");
        }else{
            result.setStatus(StatusCode.AUTH_TOKEN_FAIL);
        }
        return result;    //转发url到Index做页面初始化用

    }

    @RequestMapping(value = "/loginByType",method = RequestMethod.POST)
    @ResponseBody
    public JsonResult loginByType(String roleId){
        JsonResult<Object> result = new JsonResult<>();
        //用户密码校验
        result.setStatus(StatusCode.SUCCESS);
        result.setData("/admin/index?roleId="+roleId);   //转发url到Index做页面初始化用
        return result;
    }
}
