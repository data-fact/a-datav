package com.aleiye.adatav.service.impl;

import com.aleiye.adatav.dao.DatavComponentMapper;
import com.aleiye.adatav.entity.DatavComponent;
import com.aleiye.adatav.entity.DatavComponentExample;
import com.aleiye.adatav.service.IDatavComponentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/22.
 * Description:
 * Modified By:
 */
@Service
public class DatavComponentServiceImpl implements IDatavComponentService {

    @Autowired
    DatavComponentMapper mapper;

    @Override
    @Transactional
    public Integer insert(String userId, List<DatavComponent> components) throws Exception {
        if(components.size() == 0)
            return 0;
        long now = new Date().getTime();
        int count = 0;
        for(DatavComponent component : components){
            component.setId(UUID.randomUUID().toString());
            component.setCreateTime(now);
            component.setModifyTime(now);
//            component.setOwnerId(userId);
            count += mapper.insert(component);
        }
        return count;
    }

    @Override
    @Transactional
    public Integer update(String userId, List<DatavComponent> components) throws Exception {
        if(components.size() == 0)
            return 0;
        long now = new Date().getTime();
        int count = 0;
        for(DatavComponent component : components){
            if(component.getCreate())
                count += doInsert(userId,component,now);
            else
                count += doUpdate(userId,component,now);
        }
        return count;
    }

    @Override
    @Transactional
    public Integer updateAll(String userId, String datavId, List<DatavComponent> components) throws Exception {
        List<String> datavIds = new ArrayList<>();
        datavIds.add(datavId);
        deleteByDatavIds(userId,datavIds);
        long now = new Date().getTime();
        int count = 0;
        for(DatavComponent component : components){
            count += doInsert(userId,component,now);
        }
        return count;
    }

    private Integer doInsert(String userId, DatavComponent component, long now){
        component.setCreateTime(now);
        component.setModifyTime(now);
//        component.setOwnerId(userId);
        return mapper.insert(component);
    }
    private Integer doUpdate(String userId, DatavComponent component, long now){
        DatavComponentExample example = new DatavComponentExample();
        DatavComponentExample.Criteria criteria = example.createCriteria();
//        criteria.andOwnerIdEqualTo(userId);
        criteria.andIdEqualTo(component.getId());
        component.setModifyTime(now);
        return mapper.updateByExampleSelective(component,example);
    }

    @Override
    public Integer delete(String userId, List<String> ids) throws Exception {
        DatavComponentExample example = new DatavComponentExample();
        DatavComponentExample.Criteria criteria = example.createCriteria();
//        criteria.andOwnerIdEqualTo(userId);
        criteria.andIdIn(ids);
        int count = mapper.deleteByExample(example);
        return count;
    }

    @Override
    public Integer deleteByDatavIds(String userId, List<String> datavIds) throws Exception {
        DatavComponentExample example = new DatavComponentExample();
        DatavComponentExample.Criteria criteria = example.createCriteria();
//        criteria.andOwnerIdEqualTo(userId);
        criteria.andDatavIdIn(datavIds);
        return mapper.deleteByExample(example);
    }

    @Override
    public DatavComponent getById(String userId, String id) throws Exception {
        DatavComponentExample example = new DatavComponentExample();
        DatavComponentExample.Criteria criteria = example.createCriteria();
        criteria.andIdEqualTo(id);
//        criteria.andOwnerIdEqualTo(userId);
        List<DatavComponent> components = mapper.selectByExample(example);
        if(components.size() > 0)
            return components.get(0);
        return null;
    }

    @Override
    public List<DatavComponent> getByDatavId(String userId, String datavId) throws Exception {
        DatavComponentExample example = new DatavComponentExample();
        DatavComponentExample.Criteria criteria = example.createCriteria();
        criteria.andDatavIdEqualTo(datavId);
//        criteria.andOwnerIdEqualTo(userId);
        return mapper.selectByExample(example);
    }
}
