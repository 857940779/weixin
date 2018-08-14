package com.luohw.springboot.service.impl;

import com.luohw.springboot.dbentity.MenuDO;
import com.luohw.springboot.domain.MenuConstant;
import com.luohw.springboot.mapper.MenuMapper;
import com.luohw.springboot.service.MenuServcie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MenuServcieImpl implements MenuServcie {
    @Autowired
    private MenuMapper menuMapper;

    @Override
    public List<MenuDO> getAllMenu() {
        List<MenuDO> menuDOList= menuMapper.findByAll();
        return menuDOList;
    }

    @Override
    public String getMeneuTree() {
        List<MenuDO> menuDOList= menuMapper.findByAll();

        //首先遍历一次，把一级菜单拿出来，放到一个map
        //key为菜单id，value为menu，map为所有一级菜单的集合
        Map<Long,MenuDO> parentMenuMap=new HashMap<>();
        for(MenuDO menuDO:menuDOList){
            if(menuDO.getParentId()== MenuConstant.ROOT){
                parentMenuMap.put(menuDO.getId(),menuDO);
            }
        }

        //再次遍历菜单list，获取每个父菜单下的所有子菜单。
        //key-为父菜单id，value为所有子菜单集合
        Map<Long,List<MenuDO>> childMenuMap=new HashMap();
        for(MenuDO menuDO:menuDOList){
            Long parentId=menuDO.getParentId();

            if(parentMenuMap.get(parentId)!=null){
                List<MenuDO> childList=childMenuMap.get(parentId);
                if(childList==null){
                    childList=new ArrayList<>();
                }
                childList.add(menuDO);
                childMenuMap.put(menuDO.getParentId(),childList);
            }
        }

        StringBuffer html = new StringBuffer();
        //父菜单，子菜单的图标不一样
        Iterator<Map.Entry<Long,List<MenuDO>>> it=childMenuMap.entrySet().iterator();
        while(it.hasNext()){
            Map.Entry<Long,List<MenuDO>> entry=it.next();
            Long parentId=entry.getKey();
            MenuDO parentMenu=parentMenuMap.get(parentId);

            html.append("<li class='").append("").append("'>");
            html.append("	<a class='dropdown-toggle'>");
            html.append("       <i class='").append(parentMenu.getIconClass() + "").append("'></i>");// 图标
            html.append("		<span class='menu-text'>").append(parentMenu.getName()).append("</span>");
            html.append("   	<b class='arrow fa fa-angle-down'></b>");
            html.append("   </a>");
            html.append("   <b class='arrow'></b>");
            html.append("	<ul class='submenu'>");

            //添加子菜单
            StringBuffer childMentHtml=new StringBuffer();
            List<MenuDO> childMenuList=entry.getValue();
            for(MenuDO menuDO:childMenuList){
                childMentHtml.append("<li class='").append("").append("'>");
                childMentHtml.append("<a target='main_frame' href='").append(menuDO.getUrl()).append("'>");
                childMentHtml.append("<i class='menu-icon fa fa-caret-right'></i>");// 图标
                childMentHtml.append("	<span class='menu-text'>").append(menuDO.getName()).append("</span>");
                childMentHtml.append("</a><b class='arrow'></b>");
                childMentHtml.append("</li>");
            }
            html.append(childMentHtml);
            html.append("   </ul>");
            html.append("</li>");
        }
        return html.toString();
    }

}
