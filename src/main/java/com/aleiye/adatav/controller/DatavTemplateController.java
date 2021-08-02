package com.aleiye.adatav.controller;

import com.aleiye.adatav.config.DatavConstance;
import com.aleiye.adatav.entity.DatavInfo;
import com.aleiye.adatav.service.IDatavInfoService;
import com.aleiye.adatav.service.IDatavTemplateService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/12/18.
 * Description:
 * Modified By:
 */
@RestController
@RequestMapping("/datav/template")
public class DatavTemplateController {

    private static Logger log = LoggerFactory.getLogger(DatavTemplateController.class);

    @Autowired
    IDatavInfoService service;
    @Autowired
    IDatavTemplateService templateService;

    /**
     * 将大屏保存为模版(仅超级管理员)
     * @param userId
     * @param info 包含被复制的大屏id,模版大屏的名称、描述
     * @return 模版大屏id
     */
    @PostMapping("/post/copy-to")
    public ResponseEntity<String> copyTo(@RequestAttribute("user-id") String userId,
                                 @RequestBody DatavInfo info){
        if(!DatavConstance.ADMIN_ID.equals(userId)){
            log.error("创建失败，非管理员用户");
            return new ResponseEntity("创建失败::未授权",HttpStatus.SERVICE_UNAVAILABLE);
        }
        info.setOwnerId(DatavConstance.ADMIN_ID);
        info.setTemplate((short) 1);
        return copy(DatavConstance.ADMIN_ID,info);
    }

    /**
     * 从模版复制大屏
     * @param info 包含模版大屏id,新大屏的名称、描述
     * @return 新大屏id
     */
    @PostMapping("/post/copy-from")
    public ResponseEntity<String> copyFrom(@RequestAttribute("user-id") String userId, @RequestBody DatavInfo info){
        info.setOwnerId(userId);
        info.setTemplate((short) 0);
        return copy(DatavConstance.ADMIN_ID,info);
    }

    /**
     * 获取模版列表
     * @return 模版列表
     */
    @GetMapping("/get/all")
    public ResponseEntity<List> get(@RequestAttribute("user-id") String userId){
        List<DatavInfo> infos = null;
        try {
            infos = templateService.getAll();
        } catch (Exception e) {
            log.error("获取失败",e);
            return new ResponseEntity("获取失败",HttpStatus.SERVICE_UNAVAILABLE);
        }
        return new ResponseEntity(infos,HttpStatus.OK);
    }

    public ResponseEntity<String> copy(@RequestAttribute("user-id") String userId, @RequestBody DatavInfo info){
        if(StringUtils.isEmpty(info.getId())){
            log.error("创建失败，id不能为空");
            return new ResponseEntity("创建失败::ID不能为空",HttpStatus.SERVICE_UNAVAILABLE);
        }
        if(!service.validName("",info.getName(),userId)){
            log.error("创建失败，名称重复");
            return new ResponseEntity("创建失败::名称重复", HttpStatus.SERVICE_UNAVAILABLE);
        }
        String id;
        try{
            id = service.copy(userId,info);
        } catch (Exception e){
            log.error("创建失败",e);
            return new ResponseEntity("创建失败",HttpStatus.SERVICE_UNAVAILABLE);
        }
        return new ResponseEntity(id,HttpStatus.OK);
    }
}
