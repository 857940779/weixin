package com.luohw.springboot.domain;

import com.github.pagehelper.Page;

import java.io.Serializable;
import java.util.List;

//前端分页插件使用的分页对象
public class PageResponse<T> implements Serializable {

    private static final long serialVersionUID = 1L;

    private int sEcho;
    private long iTotalRecords;
    private long iTotalDisplayRecords;
    private List<T> aaData;

    public PageResponse(){}

    public PageResponse(int sEcho,long total, List<T>list){
        this.aaData = list;
        this.sEcho = sEcho;
        this.iTotalRecords = total;
        this.iTotalDisplayRecords =total;
    }




    public int getsEcho() {
        return sEcho;
    }

    public void setsEcho(int sEcho) {
        this.sEcho = sEcho;
    }

    public long getiTotalRecords() {
        return iTotalRecords;
    }

    public void setiTotalRecords(long iTotalRecords) {
        this.iTotalRecords = iTotalRecords;
    }

    public long getiTotalDisplayRecords() {
        return iTotalDisplayRecords;
    }

    public void setiTotalDisplayRecords(long iTotalDisplayRecords) {
        this.iTotalDisplayRecords = iTotalDisplayRecords;
    }

    public List<T> getAaData() {
        return aaData;
    }

    public void setAaData(List<T> aaData) {
        this.aaData = aaData;
    }
}
