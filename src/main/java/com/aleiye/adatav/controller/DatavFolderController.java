package com.aleiye.adatav.controller;

import com.aleiye.adatav.entity.DatavFolder;
import com.aleiye.adatav.service.IDatavFolderService;
import com.aleiye.adatav.utils.DatavUtil;
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
 * Date: Created in 2020/12/17.
 * Description:
 * Modified By:
 */
@RestController
@RequestMapping("/datav/folder")
public class DatavFolderController {

    private static Logger log = LoggerFactory.getLogger(DatavFolderController.class);

    @Autowired
    IDatavFolderService service;

    /**
     * 创建分组
     * @param userId
     * @param info
     * @return 是否创建成功
     */
    @PostMapping("/post")
    public ResponseEntity insert(@RequestAttribute("user-id") String userId,
                                 @RequestBody DatavFolder info){
        if(!DatavUtil.validName(info.getName())){
            log.error("创建失败，名称格式错误");
            return new ResponseEntity("创建失败::名称格式错误", HttpStatus.SERVICE_UNAVAILABLE);
        }
        if(!service.validName("",info.getName(),userId)){
            log.error("创建失败，名称重复");
            return new ResponseEntity("创建失败::名称重复", HttpStatus.SERVICE_UNAVAILABLE);
        }
        String id;
        try{
            id = service.insert(userId,info);
        } catch (Exception e){
            log.error("创建失败",e);
            return new ResponseEntity("创建失败",HttpStatus.SERVICE_UNAVAILABLE);
        }
        return new ResponseEntity(id,HttpStatus.OK);
    }

    /**
     * 更新分组
     * @param userId
     * @param info
     * @return 是否更新成功
     */
    @PostMapping("/update")
    public ResponseEntity update(@RequestAttribute("user-id") String userId,
                                 @RequestBody DatavFolder info){
        if(StringUtils.isEmpty(info.getId())){
            log.error("创建失败，id不能为空");
            return new ResponseEntity("更新失败::ID不能为空",HttpStatus.SERVICE_UNAVAILABLE);
        }
        if(!StringUtils.isEmpty(info.getName()) && !service.validName(info.getId(),info.getName(),userId)){
            log.error("更新失败，名称重复");
            return new ResponseEntity("更新失败::名称重复",HttpStatus.SERVICE_UNAVAILABLE);
        }
        Boolean success = null;
        try {
            success = service.update(userId,info);
        } catch (Exception e) {
            log.error("更新失败",e);
            return new ResponseEntity("更新失败",HttpStatus.SERVICE_UNAVAILABLE);
        }
        return new ResponseEntity(success,HttpStatus.OK);
    }

    /**
     * 通过id列表删除分组
     * @param userId
     * @param ids id之间逗号(,)分隔
     * @return 删除条数
     */
    @GetMapping("/delete/{ids}")
    public ResponseEntity delete(@RequestAttribute("user-id") String userId,
                                 @PathVariable("ids") String ids){
        List idList = DatavUtil.splitIds(ids);
        Integer count = null;
        try {
            count = service.delete(userId,idList);
        } catch (Exception e) {
            log.error("删除失败",e);
            return new ResponseEntity("删除失败",HttpStatus.SERVICE_UNAVAILABLE);
        }
        return new ResponseEntity(count,HttpStatus.OK);
    }

    /**
     * 通过id获取分组
     * @param userId
     * @param id
     * @return 大屏信息
     */
    @GetMapping("/get/{id}")
    public ResponseEntity get(@RequestAttribute("user-id") String userId,
                              @PathVariable("id") String id){
        DatavFolder info = null;
        try {
            info = service.getById(userId,id);
            if(info == null)
                throw new Exception("大屏不存在 id:" + id);
        } catch (Exception e) {
            log.error("获取失败",e);
            return new ResponseEntity("获取失败",HttpStatus.SERVICE_UNAVAILABLE);
        }
        return new ResponseEntity(info,HttpStatus.OK);
    }

    /**
     * 通过用户id获取分组列表
     * @param userId
     * @return 大屏信息列表
     */
    @GetMapping("/get/by-user")
    public ResponseEntity get(@RequestAttribute("user-id") String userId){
        List<DatavFolder> infos = null;
        try {
            infos = service.getByUserId(userId);
        } catch (Exception e) {
            log.error("获取失败",e);
            return new ResponseEntity("获取失败",HttpStatus.SERVICE_UNAVAILABLE);
        }
        return new ResponseEntity(infos,HttpStatus.OK);
    }
}
