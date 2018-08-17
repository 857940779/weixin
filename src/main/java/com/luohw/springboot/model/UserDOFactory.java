package com.luohw.springboot.model;

import com.alibaba.fastjson.JSON;
import com.luohw.springboot.dbentity.UserDO;
import com.luohw.springboot.vo.response.UserResponseVO;

import java.util.ArrayList;
import java.util.List;

public class UserDOFactory {

    public  static List<UserResponseVO> converDOTOResponse(List<UserDO> userDOList){
        List<UserResponseVO> userResponseVOList=new ArrayList<>();

        for(UserDO userDO:userDOList){
            UserResponseVO userResponseVO=converDOTOResponse(userDO);
            userResponseVOList.add(userResponseVO);
        }
        return userResponseVOList;
    }

    public  static UserResponseVO converDOTOResponse(UserDO userDO){
        if(userDO==null){
            return null;
        }
        String str= JSON.toJSONString(userDO);
        UserResponseVO userResponseVO=JSON.parseObject(str,UserResponseVO.class);
        return userResponseVO;
    }
}
