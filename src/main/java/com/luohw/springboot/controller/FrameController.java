package com.luohw.springboot.controller;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.luohw.springboot.dbentity.UserDO;
import com.luohw.springboot.domain.JsonResult;
import com.luohw.springboot.domain.PageResponse;
import com.luohw.springboot.domain.StatusCode;
import com.luohw.springboot.mapper.UserMapper;
import com.luohw.springboot.model.UserDOFactory;
import com.luohw.springboot.vo.request.UserRequestVO;
import com.luohw.springboot.vo.response.UserResponseVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("/frame")
public class FrameController extends BaseController{

    @Autowired
    UserMapper userMapper;


    @RequestMapping("/pageTest")
    public String pageTest(){
        return "framework/page";
    }

    /**
     * 这个前端的datatable分页插件不太好用，每次请求都要送一大堆分页查询，而且还要返回，以便下一页使用
     * 请求方式还必须是post
     * 后端分页用的是pagehelper，在startPage后，要马上接你分页的sql，要是有其他sql，会导致分页失败的
     * @param userRequestVO
     * @return
     */
    @RequestMapping(value = "/page",method = RequestMethod.POST)
    @ResponseBody
    public PageResponse getUserPage(UserRequestVO userRequestVO){
        //把前端的参数封装到vo中
        buildPageRequest(userRequestVO);

        //分页查询需要获取页码和每页大小
        PageHelper.startPage(userRequestVO.getPageNumber(), userRequestVO.getPageSize());

        Page<UserDO> page= userMapper.getPage(userRequestVO);
        List<UserDO> dbList=page.getResult();
        List<UserResponseVO> list= UserDOFactory.converDOTOResponse(dbList);

        PageResponse<UserResponseVO> pageInfo = new PageResponse<UserResponseVO>(userRequestVO.getsEcho(), page.getTotal(),list);
        return pageInfo;
    }

    @RequestMapping("/dialogTest")
    public String dialog(){
        return "framework/dialog";
    }

    @RequestMapping("/tabTest")
    public String tab(){
        return "framework/tab";
    }


    @RequestMapping("/upload")
    public String upload(){
        return "framework/upload";
    }

    //页面必须使用form表单，post形式，entype为multipartfile
    @RequestMapping(value = "/uploadFile",method = RequestMethod.POST)
    @ResponseBody
    public String uploadFile(@RequestParam("file") MultipartFile file,@RequestParam("file2") MultipartFile file2,
                             @RequestParam("file3") MultipartFile file3){
        byte[] bytes=null;
        byte[] bytes2=null;
        byte[] bytes3=null;
        try {
            bytes = file.getBytes();
            bytes2=file2.getBytes();
            bytes3=file3.getBytes();
            System.out.println(new String(bytes));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "上传成功";
    }
}
