package com.luohw.springboot.po;

import java.util.List;

//一级菜单po
public class FirstMenuPO {
    private String name;    //菜单名称
    private List<SecondMenuPO> sub_button;      //二级菜单列表，如果有，必须填
    private String type;        //一级菜单类型，如果没有子菜单，此类型必须
    private String key;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<SecondMenuPO> getSub_button() {
        return sub_button;
    }

    public void setSub_button(List<SecondMenuPO> sub_button) {
        this.sub_button = sub_button;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }
}
