package com.luohw.springboot.constant;

public class WeixinConstant {
    //微信公众号平台的类型，写死不变
    public static final String GRANT_TYPE="client_credential";

    public static final String APPID="wx53afeddec9d5181d";

    public static final String SECRET="ee71ffa8ff51f8c445152349ce9ae75e";

    public static final String TOKEN_URL="https://api.weixin.qq.com/cgi-bin/token?grant_type={0}&appid={1}&secret={2}";

}
