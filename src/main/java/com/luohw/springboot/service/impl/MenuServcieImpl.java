package com.luohw.springboot.service.impl;

import com.luohw.springboot.dbentity.MenuDO;
import com.luohw.springboot.dbentity.RoleMenuMapperDO;
import com.luohw.springboot.domain.MenuConstant;
import com.luohw.springboot.mapper.MenuMapper;
import com.luohw.springboot.mapper.RoleMenuMapperMapper;
import com.luohw.springboot.service.MenuServcie;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MenuServcieImpl implements MenuServcie {
    @Autowired
    private MenuMapper menuMapper;
    @Autowired
    private RoleMenuMapperMapper roleMenuMapperMapper;

    @Override
    public List<MenuDO> getAllMenu() {
        List<MenuDO> menuDOList= menuMapper.findByAll();
        return menuDOList;
    }

    private String getTreeHtml(List<MenuDO> menuDOList){
        //首先遍历一次，把一级菜单拿出来，放到一个map
        //key为菜单id，value为menu，map为所有一级菜单的集合
        Map<Long,MenuDO> parentMenuMap=new LinkedHashMap<>();
        for(MenuDO menuDO:menuDOList){
            if(menuDO.getParentId()== MenuConstant.ROOT){
                parentMenuMap.put(menuDO.getId(),menuDO);
            }
        }

        //再次遍历菜单list，获取每个父菜单下的所有子菜单。
        //key-为父菜单id，value为所有子菜单集合
        Map<Long,List<MenuDO>> childMenuMap=new LinkedHashMap();
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
        //遍历父菜单
        Iterator<Map.Entry<Long,MenuDO>> it=parentMenuMap.entrySet().iterator();
        while(it.hasNext()){
            Map.Entry<Long,MenuDO> entry=it.next();
            MenuDO parentMenu=entry.getValue();

            String url=parentMenu.getUrl();
            if (StringUtils.isBlank(url)) {
                url = "javascript:void(0)";
            }

            //错误代码

            List<MenuDO> childMenuList=childMenuMap.get(parentMenu.getId());
            if(childMenuList!=null && childMenuList.size()>0){
                //先添加父菜单
                html.append("<li class='").append("").append("'>");
                html.append("	<a class='dropdown-toggle'>");
                html.append("       <i class='").append(parentMenu.getIconClass() + "").append("'></i>");// 图标
                html.append("		<span class='menu-text'>").append(parentMenu.getName()).append("</span>");
                html.append("   	<b class='arrow fa fa-angle-down'></b>");
                html.append("   </a>");
                html.append("   <b class='arrow'></b>");

                //添加子菜单
                StringBuffer childMentHtml=new StringBuffer();

                html.append("<ul class='submenu'>");
                for(MenuDO menuDO:childMenuList){
                    childMentHtml.append("<li class='").append("").append("'>");
                    childMentHtml.append("<a target='main_frame' href='").append(url).append("'>");
                    childMentHtml.append("		<span class='menu-text'>").append(menuDO.getName()).append("</span>");
                    childMentHtml.append("   </a>");
                    childMentHtml.append("</li>");
                }
                html.append(childMentHtml);

                html.append("   </ul>");
                html.append("   </li>");
            }else{
                //如果菜单没有子菜单，直接添加url
                html.append("<li class='").append("").append("'>");
                html.append("<a target='main_frame' href='").append(url).append("'>");
                html.append("	<span class='menu-text'>").append(parentMenu.getName()).append("</span>");
                html.append("</a><b class='arrow'></b>");
                html.append("</li>");
            }
        }

        return html.toString();
    }

    @Override
    public String getMeneuTree() {
        List<MenuDO> menuDOList= menuMapper.findByAll();
        return getTreeHtml(menuDOList);
    }

    @Override
    public String getMenuTreeByRoleId(String roleId) {
        //需要根据roleid查询mapper，然后根据mapper查询menu
        List<RoleMenuMapperDO> roleMenuMapperDOList=roleMenuMapperMapper.getRoleMenuMapperByRoleId(Long.parseLong(roleId));

        List<Long> firstMenuIdList=new ArrayList<>();
        for (RoleMenuMapperDO roleMenuMapperDO:roleMenuMapperDOList){
            firstMenuIdList.add(roleMenuMapperDO.getMenuId());
        }

        List<MenuDO> menuDOList=menuMapper.getMenuByFirstMenuId(firstMenuIdList);
        return getTreeHtml(menuDOList);
    }

}
