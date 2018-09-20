package com.luohw.springboot.mapper;

import com.luohw.springboot.dbentity.MenuDO;
import java.util.List;

public interface MenuMapper {
    List<MenuDO> findByAll();

    //根据一级菜单列表查询所有菜单
    List<MenuDO> getMenuByFirstMenuId(List<Long> firstMenuIdList);
}