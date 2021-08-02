package com.aleiye.adatav.service.impl;

import com.aleiye.adatav.dao.UserInfoMapper;
import com.aleiye.adatav.entity.UserInfo;
import com.aleiye.adatav.entity.UserInfoExample;
import com.aleiye.adatav.exception.ApiException;
import com.aleiye.adatav.service.IUserInfoService;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2021/3/1.
 * Description:
 * Modified By:
 */
@Service
public class UserInfoServiceImpl implements IUserInfoService {

    private static Logger log = LoggerFactory.getLogger(UserInfoServiceImpl.class);

    public static final String USER_NAME_REG = "^[a-zA-Z0-9_-]{4,11}$";
    public static final String TEL_REG = "^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\\d{8}$";
    public static final String EMAIL_REG = "^([a-zA-Z0-9]+[_|_|\\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\\.[a-zA-Z]{2,3}$";

    private PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();

    @Autowired
    private UserInfoMapper userInfoMapper;

    @Override
    public UserInfo getUserByUserName(String userName) {
        UserInfoExample example = new UserInfoExample();
        UserInfoExample.Criteria criteria = example.createCriteria();
        criteria.andUserNameEqualTo(userName);
        List<UserInfo> users = userInfoMapper.selectByExample(example);
        if(users == null || users.size() == 0)
            return null;
        return users.get(0);
    }

    @Override
    @Transactional
    public Boolean createUser(UserInfo user) throws ApiException {
        validUser(user);
        String uuid = String.valueOf(UUID.randomUUID());
        user.setId(uuid);
        Date date = new Date();
        user.setCreateTime(date);
        user.setModifyTime(date);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        int count = userInfoMapper.insertSelective(user);
        return count == 1;
    }

    @Override
    public UserInfo getUserInfo(String userId) {
        UserInfo userInfo = userInfoMapper.selectByPrimaryKey(userId);
        return userInfo;
    }

    @Override
    public Boolean updatePwd(String userId, String oldPwd, String newPwd) throws ApiException {
        validPwd(oldPwd);
        validPwd(newPwd);
        UserInfo user = userInfoMapper.selectByPrimaryKey(userId);
        if(user == null || !passwordEncoder.matches(oldPwd,user.getPassword()))
            throw new ApiException("旧密码不正确");
        UserInfo newUser = new UserInfo();
        newUser.setId(userId);
        newUser.setPassword(passwordEncoder.encode(newPwd));
        newUser.setModifyTime(new Date());
        int count = userInfoMapper.updateByPrimaryKeySelective(newUser);
        return count == 1;
    }

    @Override
    public List<UserInfo> getUserInfoList() {
        return userInfoMapper.selectByExample(new UserInfoExample());
    }

    @Override
    public Boolean validTel(String tel) throws ApiException {
//        if(StringUtils.isEmpty(tel))
//            throw new ApiException("手机号不能为空");
//        if(!tel.matches(TEL_REG))
//            throw new ApiException("手机号不合法");
        UserInfoExample example = new UserInfoExample();
        UserInfoExample.Criteria criteria = example.createCriteria();
        criteria.andTelEqualTo(tel);
        List<UserInfo> users = userInfoMapper.selectByExample(example);
        if(users != null && users.size() > 0)
            throw new ApiException("手机号已注册");
        return true;
    }

    @Override
    public UserInfo getUserById(String userId) throws ApiException {
        return userInfoMapper.selectByPrimaryKey(userId);
    }

    @Override
    public int getUserSize() throws ApiException {
        return userInfoMapper.countByExample(new UserInfoExample());
    }

    public Boolean validUser(UserInfo user) throws ApiException {
        validUsername(user.getUserName());
        validPwd(user.getPassword());
//        validTel(user.getTel());
//        validEmail(user.getEmail());
        return true;
    }
    public Boolean validUsername(String name) throws ApiException {
        if(StringUtils.isEmpty(name))
            throw new ApiException("用户名不能为空");
        if(!name.matches(USER_NAME_REG))
            throw new ApiException("用户名为4到11位数字、字母、下划线");
        if(getUserByUserName(name) != null)
            throw new ApiException("用户名已存在");
        return true;
    }
    public Boolean validPwd(String pwd) throws ApiException {
        if(StringUtils.isEmpty(pwd))
            throw new ApiException("密码不能为空");
        if(pwd.length() < 6)
            throw new ApiException("密码长度不能少于6位");
        if(pwd.length() > 18)
            throw new ApiException("密码长度不能大于18位");
        return true;
    }
    public Boolean validEmail(String email) throws ApiException {
        if(StringUtils.isEmpty(email))
            throw new ApiException("邮箱不能为空");
        if(!email.matches(EMAIL_REG))
            throw new ApiException("邮箱不合法");
        return true;
    }
}
