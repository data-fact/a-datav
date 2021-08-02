package com.aleiye.adatav.service;

import com.aleiye.adatav.entity.DatavInfo;

import java.util.List;

public interface IDatavTemplateService {

    public String insert(DatavInfo info) throws Exception;

    public Boolean update(DatavInfo info) throws Exception;

    public Integer delete(List<String> ids) throws Exception;

    public DatavInfo getById(String id) throws Exception;

    public List<DatavInfo> getAll() throws Exception;

}
