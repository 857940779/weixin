package com.luohw.springboot.domain;

public enum StatusCode {

    SUCCESS(200, "success"),
    CONFIG_NOT_FOUND(201, "config not found"),
    BAD_REQUEST(400, "bad request"),
    AUTH_TOKEN_FAIL(403, "token auth failed"),
    SC_FORBIDDEN(403, "request forbidden"),
    CONFERENCE_NOT_FOUND(404, "not found"),
    ILLEGAL_TYPE(404, "illegal type"),
    GROUP_FAIL(405, "group fail"),
    INITIATOR_BUSY(483, "initiator busy"),
    SERVER_ERROR(500, "the server error");

    private int type;
    private String des;

    StatusCode(int type, String des) {
        this.type = type;
        this.des = des;
    }

    public int intValue() {
        return type;
    }

    public String getDes() {
        return des;
    }


}

