//package com.luohw.springboot;
//
//import com.alibaba.fastjson.JSON;
//import com.luohw.springboot.entity.GuidanceEvaluationListDO;
//import com.luohw.springboot.service.GuidanceService;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.junit4.SpringRunner;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest
//public class SpringbootApplicationTests {
//	@Autowired
//	GuidanceService guidanceService;
//
//	@Test
//	public void testPage() {
//		GuidanceEvaluationListDO guidanceEvaluationListDO=new GuidanceEvaluationListDO();
//		guidanceEvaluationListDO.setHospitalId(26L);
//		System.out.println(JSON.toJSONString(guidanceService.findByPage(1,10,guidanceEvaluationListDO)));
//	}
//
//}
