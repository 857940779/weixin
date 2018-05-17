package com.luohw.springboot.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.luohw.springboot.entity.GuidanceEvaluationListDO;
import com.luohw.springboot.mapper.GuidanceEvaluationListMapper;
import com.luohw.springboot.service.GuidanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by luohw on 2018/5/9 0009.
 */
@Component
public class GuidanceServiceImpl implements GuidanceService{
    @Autowired
    GuidanceEvaluationListMapper guidanceEvaluationListMapper;

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED,propagation = Propagation.REQUIRED)
    public void testTransaction() {
        GuidanceEvaluationListDO guidanceEvaluationListDO=new GuidanceEvaluationListDO();
        guidanceEvaluationListDO.setHospitalId(1L);
        guidanceEvaluationListDO.setHospitalName("测试医院");
        guidanceEvaluationListDO.setName("测试病人");
        guidanceEvaluationListDO.setAge(100);
        guidanceEvaluationListDO.setSex((byte)1);
        guidanceEvaluationListMapper.addOne(guidanceEvaluationListDO);

        //故意抛出数组越界异常
        int[] a=new int[1];
        System.out.println(a[1]);

        GuidanceEvaluationListDO guidanceEvaluationListDO2=new GuidanceEvaluationListDO();
        guidanceEvaluationListDO2.setHospitalId(1L);
        guidanceEvaluationListDO2.setHospitalName("测试医院");
        guidanceEvaluationListDO2.setName("测试病人");
        guidanceEvaluationListDO2.setAge(100);
        guidanceEvaluationListDO2.setSex((byte)1);
        guidanceEvaluationListMapper.addOne(guidanceEvaluationListDO2);
    }

    @Override
    public PageInfo<GuidanceEvaluationListDO> findByPage(int pageNo, int pageSize,GuidanceEvaluationListDO guidanceEvaluationListDO) {
        PageHelper.startPage(pageNo, pageSize);

        Page<GuidanceEvaluationListDO> page=guidanceEvaluationListMapper.findByPage(guidanceEvaluationListDO);
        PageInfo<GuidanceEvaluationListDO> pageInfo=new PageInfo<GuidanceEvaluationListDO>(page);
        return pageInfo;
    }
}
