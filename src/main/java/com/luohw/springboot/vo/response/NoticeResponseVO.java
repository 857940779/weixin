package com.luohw.springboot.vo.response;

import java.util.Date;

//公告返回vo
public class NoticeResponseVO {
    private Long id;    //公告id
    private String name;    // 公告标题
    private String content; // 公告内容
    private Long createId;  // 公告创建人id
    private Date createTime;    // 公告创建时间
    private Date updateTime;    // 公告修改时间
    private Integer state;  // 公告状态  0-失效，1-生效

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getCreateId() {
        return createId;
    }

    public void setCreateId(Long createId) {
        this.createId = createId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }
}
