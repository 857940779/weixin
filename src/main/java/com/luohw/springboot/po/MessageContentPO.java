package com.luohw.springboot.po;

//微信消息PO
public class MessageContentPO {
    private String touser;
    private String msgtype;
    private TextContentPO text;

    public String getTouser() {
        return touser;
    }

    public void setTouser(String touser) {
        this.touser = touser;
    }

    public String getMsgtype() {
        return msgtype;
    }

    public void setMsgtype(String msgtype) {
        this.msgtype = msgtype;
    }

    public TextContentPO getText() {
        return text;
    }

    public void setText(TextContentPO text) {
        this.text = text;
    }
}
