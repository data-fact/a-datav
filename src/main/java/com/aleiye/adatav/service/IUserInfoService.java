package com.aleiye.adatav.service;

import com.aleiye.adatav.entity.UserInfo;
import com.aleiye.adatav.exception.ApiException;

import java.util.List;

public interface IUserInfoService {

    public UserInfo getUserByUserName(String userName) throws ApiException;

    public Boolean createUser(UserInfo user) throws ApiException;

    public UserInfo getUserInfo(String userId) throws ApiException;

    public Boolean updatePwd(String userId,String oldPwd,String newPwd) throws ApiException;

    public List<UserInfo> getUserInfoList() throws ApiException;

    public Boolean validTel(String tel) throws ApiException;

    public UserInfo getUserById(String userId) throws ApiException;

    public int getUserSize() throws ApiException;
}
