package com.aleiye.adatav.service;

import com.aleiye.adatav.entity.DatavFolder;

import java.util.List;

public interface IDatavFolderService {
    public String insert(String userId, DatavFolder info) throws Exception;

    public Boolean update(String userId, DatavFolder info) throws Exception;

    public Integer delete(String userId, List<String> ids) throws Exception;

    public DatavFolder getById(String userId, String id) throws Exception;

    public List<DatavFolder> getByUserId(String userId) throws Exception;

    public Boolean validName(String excId, String name, String userId);
}
