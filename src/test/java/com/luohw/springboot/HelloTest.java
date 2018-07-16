//package com.luohw.springboot;
//
//import com.luohw.springboot.controller.HelloWorldController;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.MediaType;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//
//import static org.hamcrest.core.IsEqual.equalTo;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
///**
// * Created by luohw on 2018/5/2 0002.
// */
////启动注解，读取spring
//@RunWith(SpringRunner.class)
//@SpringBootTest
//public class HelloTest {
////    private MockMvc mvc;
////
////    @Before
////    public void setUp() throws Exception {
////        mvc = MockMvcBuilders.standaloneSetup(new HelloWorldController()).build();
////    }
//
////    @Test
////    public void getHello() throws Exception {
////        //判断预期值是否为Hello World
////        mvc.perform(MockMvcRequestBuilders.get("/hello").accept(MediaType.APPLICATION_JSON))
////                .andExpect(status().isOk())
////                .andExpect(content().string(equalTo("Hello World")));
////
////    }
//
//}
