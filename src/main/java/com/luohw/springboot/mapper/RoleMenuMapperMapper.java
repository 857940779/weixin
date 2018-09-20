package com.luohw.springboot.mapper;

import com.luohw.springboot.dbentity.RoleMenuMapperDO;

import java.util.List;

public interface RoleMenuMapperMapper {
    int deleteByPrimaryKey(Long id);

    int insert(RoleMenuMapperDO record);

    int insertSelective(RoleMenuMapperDO record);

    RoleMenuMapperDO selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(RoleMenuMapperDO record);

    int updateByPrimaryKey(RoleMenuMapperDO record);

    /**
     * 根据角色id获取映射的mapper
     * @param roleId
     * @return
     */
    List<RoleMenuMapperDO> getRoleMenuMapperByRoleId(Long roleId);
}