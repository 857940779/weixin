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
    public String adminIndex(Model model,String roleId){
        //TODO  正常登陆，需要根据用户信息查询用户角色id，然后获取菜单

        String menuTree = menuServcie.getMenuTreeByRoleId(roleId);  //页面初始化加载左侧菜单树
        model.addAttribute("message", menuTree);
        return "admin/index";
    }

    @RequestMapping(value = "/admin/home",method = RequestMethod.GET)
    public String home(Model model){
        //返回的数据需要时数组，或者时list形式
        getLine(model);
        getBar(model);
        getPice(model);
        return "admin/home";
    }


    /**
     * 折线图数据
     * @param model
     */
    private void getLine(Model model){
        ArrayList lineTypeList=new ArrayList();
        lineTypeList.add("type1");
        lineTypeList.add("type2");
        lineTypeList.add("type3");
        model.addAttribute("lineType",lineTypeList);

        ArrayList timeList=new ArrayList();
        timeList.add("08-16");
        timeList.add("08-17");
        timeList.add("08-18");
        timeList.add("08-19");
        timeList.add("08-20");
        model.addAttribute("timeList",timeList);

        ArrayList lineData=new ArrayList();
        Map map1=new HashMap();
        map1.put("name","type1");
        map1.put("type","line");
        map1.put("statck","总量");
        map1.put("data",Arrays.asList(new String[]{"120","132","101","134","90","230","210"}));
        lineData.add(map1);

        Map map2=new HashMap();
        map2.put("name","type2");
        map2.put("type","line");
        map2.put("statck","总量");
        map2.put("data",Arrays.asList(new String[]{"820","932", "901", "934","1290","1330","1320"}));
        lineData.add(map2);

        Map map3=new HashMap();
        map3.put("name","type3");
        map3.put("type","line");
        map3.put("statck","总量");
        map3.put("data",Arrays.asList(new String[]{"320","332","301","334","390","330","320"}));
        lineData.add(map3);
        model.addAttribute("lineData",lineData);
    }

    /**
     * 柱状图数据
     * @param model
     */
    private void getBar(Model model){
        ArrayList barTypeList=new ArrayList();
        barTypeList.add("统计一");
        barTypeList.add("统计二");
        barTypeList.add("统计三");
        model.addAttribute("barType",barTypeList);

        ArrayList monthList=new ArrayList();
        monthList.add("1月");
        monthList.add("2月");
        monthList.add("3月");
        monthList.add("4月");
        monthList.add("5月");
        monthList.add("6月");
        model.addAttribute("month",monthList);

        ArrayList barData=new ArrayList();
        Map map4=new HashMap();
        map4.put("name","统计一");
        map4.put("type","bar");
        map4.put("data",new double[]{2.0, 4.9, 7.0, 23.2, 25.6, 76.7});
        barData.add(map4);

        Map map5=new HashMap();
        map5.put("name","统计二");
        map5.put("type","bar");
        map5.put("data",new double[]{ 135.6, 162.2, 32.6, 20.0, 6.4, 3.3});
        barData.add(map5);

        Map map6=new HashMap();
        map6.put("name","统计三");
        map6.put("type","bar");
        map6.put("data",new double[]{2.6, 5.9, 9.0, 26.4, 28.7,175.6});
        barData.add(map6);

        model.addAttribute("barData",barData);
    }

    /**
     * 饼状图数据
     */
    private void getPice(Model model){
        ArrayList cityTypeList=new ArrayList();
        cityTypeList.add("广州");
        cityTypeList.add("杭州");
        cityTypeList.add("北京");
        cityTypeList.add("深圳");
        cityTypeList.add("上海");
        model.addAttribute("cityType",cityTypeList);

        ArrayList piceData=new ArrayList();
        Map map1=new HashMap();
        map1.put("name","广州");
        map1.put("value",20);
        piceData.add(map1);

        Map map2=new HashMap();
        map2.put("name","杭州");
        map2.put("value",40);
        piceData.add(map2);

        Map map3=new HashMap();
        map3.put("name","北京");
        map3.put("value",10);
        piceData.add(map3);

        Map map4=new HashMap();
        map4.put("name","深圳");
        map4.put("value",15);
        piceData.add(map4);

        Map map5=new HashMap();
        map5.put("name","上海");
        map5.put("value",15);
        piceData.add(map5);

        model.addAttribute("piceData",piceData);
    }
}
