package com.luohw.springboot.service;

import com.luohw.springboot.dbentity.MenuDO;

import java.util.List;

public interface MenuServcie {

    /**
     * 获取所有menu
     * @return
     */
    List<MenuDO> getAllMenu();

    /**
     * 获取菜单树
     * @return
     */
    String getMeneuTree();
}
