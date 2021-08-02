package com.aleiye.adatav.service.impl;

import com.aleiye.adatav.config.DatavConstance;
import com.aleiye.adatav.dao.DatavComponentMapper;
import com.aleiye.adatav.dao.DatavInfoMapper;
import com.aleiye.adatav.entity.DatavComponent;
import com.aleiye.adatav.entity.DatavInfo;
import com.aleiye.adatav.entity.DatavInfoExample;
import com.aleiye.adatav.service.IDatavAuthService;
import com.aleiye.adatav.service.IDatavComponentService;
import com.aleiye.adatav.service.IDatavInfoService;
import com.aleiye.adatav.service.IDatavTemplateService;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/22.
 * Description:
 * Modified By:
 */
@Service
public class DatavInfoServiceImpl implements IDatavInfoService {

    @Autowired
    DatavInfoMapper mapper;
    @Autowired
    IDatavComponentService componentService;
    @Autowired
    IDatavTemplateService templateService;
    @Autowired
    IDatavAuthService authService;

    @Override
    public String insert(String userId, DatavInfo info) {
        long now = new Date().getTime();
        String id = UUID.randomUUID().toString();
        info.setId(id);
        info.setOwnerId(userId);
        info.setCreateTime(now);
        info.setModifyTime(now);
        info.setTemplate((short) 0);
        mapper.insert(info);
        return id;
    }

    @Override
    public Boolean update(String userId, DatavInfo info) {
        info.setTemplate((short) 0);
        DatavInfoExample example = new DatavInfoExample();
        DatavInfoExample.Criteria criteria = example.createCriteria();
        criteria.andIdEqualTo(info.getId());
        criteria.andOwnerIdEqualTo(userId);
        criteria.andTemplateEqualTo((short) 0);
        info.setModifyTime(new Date().getTime());
        int count = mapper.updateByExampleSelective(info,example);
        return count == 1;
    }

    @Override
    @Transactional
    public Integer delete(String userId, List<String> ids) throws Exception {
        DatavInfoExample example = new DatavInfoExample();
        DatavInfoExample.Criteria criteria = example.createCriteria();
        criteria.andIdIn(ids);
        criteria.andOwnerIdEqualTo(userId);
        criteria.andTemplateEqualTo((short) 0);
        componentService.deleteByDatavIds(userId,ids);
        int count = mapper.deleteByExample(example);
        return count;
    }

    @Override
    public DatavInfo getById(String userId, String id) {

        DatavInfo datav = authService.getAuthDatav(userId,id);
        if(null != datav && null != datav.getTemplate() && datav.getTemplate() == 0)
            return datav;
        return null;
    }
    private DatavInfo getByIdContainsTemplate(String userId, String id) {

        DatavInfo datav = authService.getAuthDatav(userId,id);
        return datav;
    }

    @Override
    public List<DatavInfo> getByUserId(String userId) {
        return authService.getAuthDatavList(userId);
    }

    @Override
    public List<DatavInfo> getAll() throws Exception {
        return mapper.selectByExample(new DatavInfoExample());
    }

    @Override
    @Transactional
    public String copy(String userId, DatavInfo info) throws Exception {
        DatavInfo datavInfo = null;
        //保证非管理员只能复制自己的大屏或模版
        if(DatavConstance.ADMIN_ID.equals(userId) && !DatavConstance.ADMIN_ID.equals(info.getOwnerId()))
            datavInfo = templateService.getById(info.getId());
        else
            datavInfo = getByIdContainsTemplate(userId,info.getId());
        if(datavInfo == null)
            throw new Exception("被复制大屏不存在");
        List<DatavComponent> components = componentService.getByDatavId(userId,info.getId());
        String newId = UUID.randomUUID().toString();
        long now = new Date().getTime();
        datavInfo.setId(newId);
        datavInfo.setName(info.getName());
        datavInfo.setDescr(info.getDescr());
        datavInfo.setTemplate(info.getTemplate());
        datavInfo.setOwnerId(info.getOwnerId());
        datavInfo.setCreateTime(now);
        datavInfo.setModifyTime(now);
        for(DatavComponent component : components){
            component.setDatavId(newId);
            component.setCreateTime(now);
            component.setModifyTime(now);
        }
        mapper.insert(datavInfo);
        componentService.insert(userId,components);
        return newId;
    }

    @Override
    public Boolean validName(String excId, String name, String userId) {
        DatavInfoExample example = new DatavInfoExample();
        DatavInfoExample.Criteria criteria = example.createCriteria();
        criteria.andIdNotEqualTo(excId);
        criteria.andNameEqualTo(name);
        criteria.andOwnerIdEqualTo(userId);
        return mapper.selectByExample(example).size() == 0;
    }

}
