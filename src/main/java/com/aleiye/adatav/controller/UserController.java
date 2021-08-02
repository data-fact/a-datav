package com.aleiye.adatav.controller;

import com.aleiye.adatav.entity.UserInfo;
import com.aleiye.adatav.exception.ApiException;
import com.aleiye.adatav.service.IUserInfoService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.Date;
import java.util.Map;

/**
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2021/2/22.
 * Description: 用户信息管理
 * Modified By:
 */
@RestController
@RequestMapping("user")
public class UserController {

    private static Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    IUserInfoService userInfoService;

    /**
     * 创建用户
     * @param user
     * @return 是否创建成功
     */
    @PostMapping("create")
    public ResponseEntity<Boolean> createUser(@RequestBody UserInfo user){
        Boolean success = false;
        try {
            success = userInfoService.createUser(user);
        } catch (ApiException e) {
            log.error(user.getUserName(),e);
            return new ResponseEntity(e.getMessage(), HttpStatus.SERVICE_UNAVAILABLE);
        }
        return new ResponseEntity(success, HttpStatus.OK);
    }

    /**
     * 修改用户密码 (校验旧密码)
     * @param userId
     * @param user password:旧密码,newPwd:新密码,code:短信验证码
     * @return 是否修改成功
     */
    @PostMapping("update-pwd")
    public ResponseEntity<Boolean> updatePwd(
            @RequestAttribute("user-id") String userId,@RequestBody UserInfo user){
        Boolean success = false;
        try {
//            validTel(user.getTel(),user.getCode());
            success = userInfoService.updatePwd(userId,user.getPassword(),user.getNewPwd());
        } catch (ApiException e) {
            log.error(userId,e);
            return new ResponseEntity(e.getMessage(), HttpStatus.SERVICE_UNAVAILABLE);
        }
        return new ResponseEntity(success, HttpStatus.OK);
    }
}
