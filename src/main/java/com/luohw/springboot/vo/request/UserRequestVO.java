package com.luohw.springboot.vo.request;

import com.luohw.springboot.vo.BaseVo;

/**
 * 查询请求vo
 */
public class UserRequestVO extends BaseVo{
    private String keyword;     //关键字

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }
}
