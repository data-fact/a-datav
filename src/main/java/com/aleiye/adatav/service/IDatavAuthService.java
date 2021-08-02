package com.aleiye.adatav.service;

import com.aleiye.adatav.entity.DatavInfo;

import java.util.List;

public interface IDatavAuthService {

    public DatavInfo getAuthDatav(String userId,String datavId);

    public List<DatavInfo> getAuthDatavList(String userId);
}
