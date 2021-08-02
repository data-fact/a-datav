package com.aleiye.adatav.service.impl;

import com.aleiye.adatav.dao.DatavFolderMapper;
import com.aleiye.adatav.dao.DatavInfoMapper;
import com.aleiye.adatav.entity.DatavFolder;
import com.aleiye.adatav.entity.DatavFolderExample;
import com.aleiye.adatav.entity.DatavInfo;
import com.aleiye.adatav.entity.DatavInfoExample;
import com.aleiye.adatav.service.IDatavFolderService;
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
 * Date: Created in 2020/12/17.
 * Description:
 * Modified By:
 */
@Service
public class DatavFolderServiceImpl implements IDatavFolderService {

    @Autowired
    DatavFolderMapper mapper;

    @Autowired
    DatavInfoMapper datavInfoMapper;

    @Override
    public String insert(String userId, DatavFolder info) throws Exception {
        long now = new Date().getTime();
        String id = UUID.randomUUID().toString();
        info.setId(id);
        info.setOwnerId(userId);
        info.setCreateTime(now);
        info.setModifyTime(now);
        mapper.insert(info);
        return id;
    }

    @Override
    public Boolean update(String userId, DatavFolder info) throws Exception {
        DatavFolderExample example = new DatavFolderExample();
        DatavFolderExample.Criteria criteria = example.createCriteria();
        criteria.andIdEqualTo(info.getId());
        criteria.andOwnerIdEqualTo(userId);
        info.setModifyTime(new Date().getTime());
        int count = mapper.updateByExampleSelective(info,example);
        return count == 1;
    }

    @Override
    @Transactional
    public Integer delete(String userId, List<String> ids) throws Exception {
        DatavFolderExample example = new DatavFolderExample();
        DatavFolderExample.Criteria criteria = example.createCriteria();
        criteria.andIdIn(ids);
        criteria.andOwnerIdEqualTo(userId);

        DatavInfoExample example1 = new DatavInfoExample();
        DatavInfoExample.Criteria criteria1 = example1.createCriteria();
        criteria1.andFolderIdIn(ids);
        criteria1.andOwnerIdEqualTo(userId);
        DatavInfo datavInfo = new DatavInfo();
        datavInfo.setFolderId("");

        datavInfoMapper.updateByExampleSelective(datavInfo,example1);
        int count = mapper.deleteByExample(example);
        return count;
    }

    @Override
    public DatavFolder getById(String userId, String id) throws Exception {
        DatavFolderExample example = new DatavFolderExample();
        DatavFolderExample.Criteria criteria = example.createCriteria();
        criteria.andIdEqualTo(id);
        criteria.andOwnerIdEqualTo(userId);
        List<DatavFolder> infos =  mapper.selectByExample(example);
        if(infos.size() > 0)
            return infos.get(0);
        return null;
    }

    @Override
    public List<DatavFolder> getByUserId(String userId) throws Exception {
        DatavFolderExample example = new DatavFolderExample();
        DatavFolderExample.Criteria criteria = example.createCriteria();
        criteria.andOwnerIdEqualTo(userId);
        example.setOrderByClause("CREATE_TIME ASC");
        List<DatavFolder> infos =  mapper.selectByExample(example);
        return infos;
    }

    @Override
    public Boolean validName(String excId, String name, String userId) {
        if("全部应用".equals(name) || "未分组".equals(name))
            return false;
        DatavFolderExample example = new DatavFolderExample();
        DatavFolderExample.Criteria criteria = example.createCriteria();
        criteria.andIdNotEqualTo(excId);
        criteria.andNameEqualTo(name);
        criteria.andOwnerIdEqualTo(userId);
        return mapper.selectByExample(example).size() == 0;
    }
}
