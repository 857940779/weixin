package com.luohw.springboot.mapper;

import com.luohw.springboot.dbentity.MenuDO;
import java.util.List;

public interface MenuMapper {
    List<MenuDO> findByAll();
}