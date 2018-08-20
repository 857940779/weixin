package com.luohw.springboot.mapper;

import com.luohw.springboot.dbentity.test;

public interface testMapper {
    int deleteByPrimaryKey(Long id);

    int insert(test record);

    int insertSelective(test record);

    test selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(test record);

    int updateByPrimaryKey(test record);
}