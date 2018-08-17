package com.luohw.springboot.mapper;

import com.github.pagehelper.Page;
import com.luohw.springboot.dbentity.UserDO;
import com.luohw.springboot.vo.request.UserRequestVO;

public interface UserMapper {

    Page<UserDO> getPage(UserRequestVO userRequestVO);
}
