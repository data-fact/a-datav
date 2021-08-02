package com.aleiye.adatav.service.impl;

import com.aleiye.adatav.config.DatavConstance;
import com.aleiye.adatav.dao.DatavInfoMapper;
import com.aleiye.adatav.entity.DatavInfo;
import com.aleiye.adatav.entity.DatavInfoExample;
import com.aleiye.adatav.service.IDatavComponentService;
import com.aleiye.adatav.service.IDatavTemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/12/18.
 * Description:
 * Modified By:
 */
@Service
public class DatavTemplateServiceImpl implements IDatavTemplateService {

    @Autowired
    DatavInfoMapper mapper;

    @Autowired
    IDatavComponentService componentService;

    @Override
    public String insert(DatavInfo info) throws Exception {
        long now = new Date().getTime();
        String id = UUID.randomUUID().toString();
        info.setId(id);
        info.setOwnerId(DatavConstance.ADMIN_ID);
        info.setCreateTime(now);
        info.setModifyTime(now);
        info.setTemplate((short) 1);
        mapper.insert(info);
        return id;
    }

    @Override
    public Boolean update(DatavInfo info) throws Exception {
        info.setTemplate((short) 1);
        DatavInfoExample example = new DatavInfoExample();
        DatavInfoExample.Criteria criteria = example.createCriteria();
        criteria.andIdEqualTo(info.getId());
        criteria.andOwnerIdEqualTo(DatavConstance.ADMIN_ID);
        criteria.andTemplateEqualTo((short) 1);
        info.setModifyTime(new Date().getTime());
        int count = mapper.updateByExampleSelective(info,example);
        return count == 1;
    }

    @Override
    @Transactional
    public Integer delete(List<String> ids) throws Exception {
        DatavInfoExample example = new DatavInfoExample();
        DatavInfoExample.Criteria criteria = example.createCriteria();
        criteria.andIdIn(ids);
        criteria.andOwnerIdEqualTo(DatavConstance.ADMIN_ID);
        criteria.andTemplateEqualTo((short) 1);
        componentService.deleteByDatavIds(DatavConstance.ADMIN_ID,ids);
        int count = mapper.deleteByExample(example);
        return count;
    }

    @Override
    public DatavInfo getById(String id) throws Exception {
        DatavInfoExample example = new DatavInfoExample();
        DatavInfoExample.Criteria criteria = example.createCriteria();
        criteria.andIdEqualTo(id);
        criteria.andOwnerIdEqualTo(DatavConstance.ADMIN_ID);
        criteria.andTemplateEqualTo((short) 1);
        List<DatavInfo> infos =  mapper.selectByExample(example);
        if(infos.size() > 0)
            return infos.get(0);
        return null;
    }

    @Override
    public List<DatavInfo> getAll() throws Exception {
        DatavInfoExample example = new DatavInfoExample();
        DatavInfoExample.Criteria criteria = example.createCriteria();
        criteria.andOwnerIdEqualTo(DatavConstance.ADMIN_ID);
        criteria.andTemplateEqualTo((short) 1);
        example.setOrderByClause("CREATE_TIME ASC");
        List<DatavInfo> infos =  mapper.selectByExample(example);
        return infos;
    }
}
