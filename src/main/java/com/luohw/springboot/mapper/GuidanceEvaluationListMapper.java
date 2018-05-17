package com.luohw.springboot.mapper;


import com.github.pagehelper.Page;
import com.luohw.springboot.entity.GuidanceEvaluationListDO;

import java.util.List;

/**
 * Created by luohw on 2018/5/2 0002.
 */
public interface GuidanceEvaluationListMapper {

    List<GuidanceEvaluationListDO> getAll();

    GuidanceEvaluationListDO getOne(Long id);

    void addOne(GuidanceEvaluationListDO guidanceEvaluationListDO);

    Page<GuidanceEvaluationListDO> findByPage(GuidanceEvaluationListDO guidanceEvaluationListDO);
}
