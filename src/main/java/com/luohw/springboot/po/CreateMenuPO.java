package com.luohw.springboot.po;

import java.util.List;

//创建菜单po
public class CreateMenuPO {
    private List<FirstMenuPO> button;

    public List<FirstMenuPO> getButton() {
        return button;
    }

    public void setButton(List<FirstMenuPO> button) {
        this.button = button;
    }
}
