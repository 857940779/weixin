package com.luohw.springboot.po;

//二级菜单po
public class SecondMenuPO {
    private String type; //按钮类型，具体看微信文档
    private String name; //按钮名称
    private String url;     //按钮对应得url
    private String appid;  //如果是小程序，需要appid
    private String pagepath;    //页面路径？
    private String key;  //对应得key

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getAppid() {
        return appid;
    }

    public void setAppid(String appid) {
        this.appid = appid;
    }

    public String getPagepath() {
        return pagepath;
    }

    public void setPagepath(String pagepath) {
        this.pagepath = pagepath;
    }
}
