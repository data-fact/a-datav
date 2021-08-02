package com.aleiye.adatav.service.impl;

import com.aleiye.adatav.dao.DatavInfoMapper;
import com.aleiye.adatav.entity.DatavInfo;
import com.aleiye.adatav.entity.DatavInfoExample;
import com.aleiye.adatav.service.IDatavAuthService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2021/3/18.
 * Description:
 * Modified By:
 */
public class DatavAloneAuthServiceImpl implements IDatavAuthService {

    @Autowired
    DatavInfoMapper mapper;

    @Override
    public DatavInfo getAuthDatav(String userId,String datavId) {
        DatavInfo datav = mapper.selectByPrimaryKey(datavId);
        if(null != datav && StringUtils.equals(userId,datav.getOwnerId()))
            return datav;

        return null;
    }

    @Override
    public List<DatavInfo> getAuthDatavList(String userId) {
        DatavInfoExample example = new DatavInfoExample();
        DatavInfoExample.Criteria criteria = example.createCriteria();
        criteria.andOwnerIdEqualTo(userId);
        criteria.andTemplateEqualTo((short) 0);
        example.setOrderByClause("CREATE_TIME ASC");
        List<DatavInfo> infos =  mapper.selectByExample(example);
        return infos;
    }
}
