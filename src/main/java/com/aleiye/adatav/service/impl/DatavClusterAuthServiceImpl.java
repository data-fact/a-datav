package com.aleiye.adatav.service.impl;

import com.aleiye.adatav.dao.DatavInfoMapper;
import com.aleiye.adatav.entity.DatavInfo;
import com.aleiye.adatav.entity.DatavInfoExample;
import com.aleiye.adatav.service.IDatavAuthService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

/**
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2021/3/18.
 * Description:
 * Modified By:
 */
public class DatavClusterAuthServiceImpl implements IDatavAuthService {

    @Autowired
    DatavInfoMapper mapper;

    @Override
    public DatavInfo getAuthDatav(String userId, String datavId) {
        DatavInfo datav = mapper.selectByPrimaryKey(datavId);
        if(null != datav && StringUtils.equals(userId,datav.getOwnerId()))
            return datav;
        return mapper.getClusterAuthDatav(userId,datavId);
    }

    @Override
    public List<DatavInfo> getAuthDatavList(String userId) {
        DatavInfoExample example = new DatavInfoExample();
        DatavInfoExample.Criteria criteria = example.createCriteria();
        criteria.andOwnerIdEqualTo(userId);
        criteria.andTemplateEqualTo((short) 0);
        example.setOrderByClause("CREATE_TIME ASC");
        List<DatavInfo> list =  mapper.selectByExample(example);
        List<DatavInfo> clusterAuthList = mapper.getClusterAuthList(userId);
        Map<String,DatavInfo> map = new HashMap<>();
        for (DatavInfo datavInfo : list) {
            map.put(datavInfo.getId(),datavInfo);
        }
        for (DatavInfo datavInfo : clusterAuthList) {
            map.put(datavInfo.getId(),datavInfo);
        }
        List<DatavInfo> values = new ArrayList<>(map.values());
        Collections.sort(values, new Comparator<DatavInfo>() {
            @Override
            public int compare(DatavInfo o1, DatavInfo o2) {
                return (int) (o1.getCreateTime() - o2.getCreateTime());
            }
        });
        return values;
    }
}
