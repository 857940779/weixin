package com.luohw.springboot.vo;

/**
 * //所有前端使用Datatable的分页模块实体／VO继承此基类
 */
public class BaseVo {

    private int sEcho;
    private int pageNumber;
    private int pageSize;
    private String orderby;

    public int getsEcho() {
        return sEcho;
    }

    public void setsEcho(int sEcho) {
        this.sEcho = sEcho;
    }

    public int getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(int pageNumber) {
        this.pageNumber = pageNumber;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public String getOrderby() {
        return orderby;
    }

    public void setOrderby(String orderby) {
        this.orderby = orderby;
    }
}
