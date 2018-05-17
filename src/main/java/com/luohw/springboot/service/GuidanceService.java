package com.luohw.springboot.service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageInfo;
import com.luohw.springboot.entity.GuidanceEvaluationListDO;

/**
 * Created by luohw on 2018/5/9 0009.
 */
public interface GuidanceService {

     void testTransaction();

     PageInfo<GuidanceEvaluationListDO> findByPage(int pageNo, int pageSize,GuidanceEvaluationListDO guidanceEvaluationListDO);
}
