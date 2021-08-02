package com.aleiye.adatav.service;

import com.aleiye.adatav.entity.DatavInfo;

import java.util.List;

public interface IDatavInfoService {

    public String insert(String userId, DatavInfo info) throws Exception;

    public Boolean update(String userId, DatavInfo info) throws Exception;

    public Integer delete(String userId, List<String> ids) throws Exception;

    public DatavInfo getById(String userId, String id) throws Exception;

    public List<DatavInfo> getByUserId(String userId) throws Exception;

    public List<DatavInfo> getAll() throws Exception;

    /**
     * 复制大屏
     * @param info 包含被复制的大屏id,新大屏的名称、描述、所属用户id、是否为模版 等
     * @return 复制完成后的新大屏id
     */
    public String copy(String userId, DatavInfo info) throws Exception;

    public Boolean validName(String excId, String name, String userId);
}
