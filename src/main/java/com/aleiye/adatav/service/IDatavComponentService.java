package com.aleiye.adatav.service;

import com.aleiye.adatav.entity.DatavComponent;

import java.util.List;

public interface IDatavComponentService {

    public Integer insert(String userId, List<DatavComponent> components) throws Exception;

    public Integer update(String userId, List<DatavComponent> components) throws Exception;

    public Integer updateAll(String userId, String datavId, List<DatavComponent> components) throws Exception;

    public Integer delete(String userId, List<String> ids) throws Exception;

    public Integer deleteByDatavIds(String userId, List<String> datavIds) throws Exception;

    public DatavComponent getById(String userId, String id) throws Exception;

    public List<DatavComponent> getByDatavId(String userId, String datavId) throws Exception;
}
