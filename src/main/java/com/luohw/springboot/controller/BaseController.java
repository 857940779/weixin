package com.luohw.springboot.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.luohw.springboot.domain.JsonResult;
import com.luohw.springboot.domain.PageConstants;
import com.luohw.springboot.domain.StatusCode;
import com.luohw.springboot.vo.BaseVo;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ModelAttribute;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;

/**
 * Created by chenxuwu on 2018/1/4.
 *
 * 1、Controller层基类，封装分页相关信息
 * 2、响应状态处理
 */
public class BaseController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    protected HttpServletRequest request;
    protected HttpServletResponse response;
    protected HttpSession session;

    /**
     *  /**@ModelAttribute
     * 放置在方法上面：表示请求该类的每个Action前都会首先执行它，也可以将一些准备数据的操作放置在该方法里面。
     * @param request
     * @param response
     */
    @ModelAttribute
    public void setReqAndRes(HttpServletRequest request, HttpServletResponse response){
        this.request = request;
        this.response = response;
        this.session = request.getSession();

    }

    protected void buildPageRequest(){
        buildPageRequest(null);
    }

    protected void buildPageRequest(BaseVo baseVo) {
        try {
            String jsondata = (String) request.getParameter(PageConstants.JSON_PARAM_AODATA);

            int sEcho = PageConstants.DEFAULT_SECHO;
            int iDisplayStart = PageConstants.DEFAULT_IDISPLAYSTART;
            int iDisplayLength = PageConstants.DEFAULT_IDISPLAYLENGTH;
            String sColumns = "";
            String orderColumn = null;
            String order = PageConstants.DEFAULT_ORDERBY;

            // 解析jquery datatables 异步查询JSON数据结构
            HashMap<String, Object> pageParamsMap = new HashMap<String, Object>();
            if (StringUtils.isNotBlank(jsondata)) {
                JSONArray jsonarray = JSONArray.parseArray(jsondata);
                for (int i = 0; i < jsonarray.size(); i++) {
                    JSONObject obj = (JSONObject) jsonarray.get(i);
                    pageParamsMap.put(obj.get(PageConstants.JSON_PARAM_NAME).toString(),
                            obj.get(PageConstants.JSON_PARAM_VALUE));
                }
                sEcho = (Integer) pageParamsMap.get(PageConstants.JSON_PARAM_SECHO);// sEcho
                iDisplayStart = (Integer) pageParamsMap.get(PageConstants.JSON_PARAM_IDISPLAYSTART);// 第几页
                iDisplayLength = (Integer) pageParamsMap.get(PageConstants.JSON_PARAM_IDISPLAYLENGTH);// 每页显示多少记录
                sColumns = (String) pageParamsMap.get(PageConstants.JSON_PARAM_SCOLUMNS);// 前台显示字段name数组

                int iSortCol_0 = 0;
                if (pageParamsMap.get(PageConstants.JSON_PARAM_ISORTCOL_O) != null) {
                    iSortCol_0 = (Integer) pageParamsMap.get(PageConstants.JSON_PARAM_ISORTCOL_O);// 排序列在列名索引
                    order = (String) pageParamsMap.get(PageConstants.JSON_PARAM_SSORTDIR_O);// 排序方式
                }

                String[] colArray = sColumns.split(",");
                if (colArray.length > iSortCol_0) {
                    orderColumn = colArray[iSortCol_0];
                }
            }

            // 设置排序信息
            StringBuffer orderby = new StringBuffer();
            if (StringUtils.isNotBlank(orderColumn)) {
                orderby.append(orderColumn).append(" ").append(order);
            }
            if(baseVo != null ) {
                baseVo.setsEcho(sEcho);
                baseVo.setPageNumber(iDisplayStart / iDisplayLength + 1);
                baseVo.setPageSize(iDisplayLength);
                baseVo.setOrderby(orderby.toString());
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    protected static final JsonResult SUCCESS = new JsonResult(StatusCode.SUCCESS, "success");
    protected static final JsonResult FAIL = new JsonResult(StatusCode.BAD_REQUEST, "fail");

    protected JsonResult JsonResultSuccess(String message, Object returnData) {
        return new JsonResult(StatusCode.SUCCESS, message, returnData);
    }
    protected JsonResult JsonResultError(String message, Object returnData) {
        return new JsonResult(StatusCode.SERVER_ERROR, message, returnData);
    }


}

