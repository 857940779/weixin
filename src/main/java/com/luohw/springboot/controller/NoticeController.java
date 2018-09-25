package com.luohw.springboot.controller;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.luohw.springboot.dbentity.UserDO;
import com.luohw.springboot.domain.PageResponse;
import com.luohw.springboot.model.UserDOFactory;
import com.luohw.springboot.vo.request.NoticeRequestVO;
import com.luohw.springboot.vo.request.UserRequestVO;
import com.luohw.springboot.vo.response.NoticeResponseVO;
import com.luohw.springboot.vo.response.UserResponseVO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 公告controller
 */
@Controller
@RequestMapping("/notice")
public class NoticeController extends  BaseController{

    //FIXME 构造缓存
    private  List<NoticeResponseVO> list=null;

    @RequestMapping(value="/pageHtml")
    public String gotToPageHtml(){
        return "notice/page";
    }

    @RequestMapping(value = "/page",method = RequestMethod.POST)
    @ResponseBody
    public PageResponse getNoticePage(NoticeRequestVO noticeRequestVO){
        //把前端的参数封装到vo中
        buildPageRequest(noticeRequestVO);

        //分页查询需要获取页码和每页大小
        PageHelper.startPage(noticeRequestVO.getPageNumber(), noticeRequestVO.getPageSize());

        //写死10条数据
        if(list==null){
            list=new ArrayList<>();
            for(int i=1;i<=10;i++){
                NoticeResponseVO noticeResponseVO=new NoticeResponseVO();
                noticeResponseVO.setId(Long.valueOf(i));
                noticeResponseVO.setName("公告"+i);
                noticeResponseVO.setContent("这是公告 "+i+" 的公告内容，测试数据，不用管！！！");
                noticeResponseVO.setState(1);
                noticeResponseVO.setCreateId(1L);
                noticeResponseVO.setCreateTime(new Date());
                noticeResponseVO.setUpdateTime(new Date());
                list.add(noticeResponseVO);
            }
        }

        PageResponse<NoticeResponseVO> pageInfo = new PageResponse<NoticeResponseVO>(noticeRequestVO.getsEcho(),10,list);
        return pageInfo;
    }

    @RequestMapping(value = "/detail")
    @ResponseBody
    public NoticeResponseVO getNoticeDetail(Long id){
        NoticeResponseVO vo=list.get(id.intValue()-1);
        return vo;
    }
}
