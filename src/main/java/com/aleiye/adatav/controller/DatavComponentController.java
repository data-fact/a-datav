package com.aleiye.adatav.controller;

import com.aleiye.adatav.entity.DatavComponent;
import com.aleiye.adatav.entity.DatavInfo;
import com.aleiye.adatav.service.IDatavComponentService;
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
 * Date: Created in 2020/10/22.
 * Description:
 * Modified By:
 */
@RestController
@RequestMapping("/datav/component")
public class DatavComponentController {

    private static Logger log = LoggerFactory.getLogger(DatavComponentController.class);

    @Autowired
    IDatavComponentService service;

    /**
     * 创建组件
     * @param userId
     * @param components
     * @return 创建成功条数
     */
    @PostMapping("/post")
    public ResponseEntity insert(@RequestAttribute("user-id") String userId,
                                          @RequestBody List<DatavComponent> components){
        Integer count = null;
        try {
            count = service.insert(userId,components);
        } catch (Exception e) {
            log.error("创建失败",e);
            return new ResponseEntity("创建失败",HttpStatus.SERVICE_UNAVAILABLE);
        }
        return new ResponseEntity(count,HttpStatus.OK);
    }

    /**
     * 更新组件
     * @param userId
     * @param components
     * @return 更新成功条数
     */
    @PostMapping("/update")
    public ResponseEntity update(@RequestAttribute("user-id") String userId,
                                          @RequestBody List<DatavComponent> components){
        Integer count = null;
        try {
            count = service.update(userId,components);
        } catch (Exception e) {
            log.error("更新失败",e);
            return new ResponseEntity("更新失败",HttpStatus.SERVICE_UNAVAILABLE);
        }
        return new ResponseEntity(count,HttpStatus.OK);
    }
    /**
     * 全量更新组件
     * @param userId
     * @param datavId
     * @param components
     * @return 更新成功条数
     */
    @PostMapping("/update-all")
    public ResponseEntity updateAll(@RequestAttribute("user-id") String userId,
                                 @RequestParam("datavId") String datavId,
                                 @RequestBody List<DatavComponent> components){
        if(StringUtils.isEmpty(datavId)){
            log.error("全量更新失败,大屏id不能为空");
            return new ResponseEntity("全量更新失败::大屏id不能为空",HttpStatus.SERVICE_UNAVAILABLE);
        }
        Integer count = null;
        try {
            count = service.updateAll(userId,datavId,components);
        } catch (Exception e) {
            log.error("全量更新失败",e);
            return new ResponseEntity("全量更新失败",HttpStatus.SERVICE_UNAVAILABLE);
        }
        return new ResponseEntity(count,HttpStatus.OK);
    }

    /**
     * 通过id列表删除组件
     * @param userId
     * @param ids id之间逗号(,)分隔
     * @return 删除条数
     */
    @GetMapping("/delete/{ids}")
    public ResponseEntity delete(@RequestAttribute("user-id") String userId,
                                          @PathVariable("ids") String ids){
        Integer count = null;
        try {
            List<String> idList = DatavUtil.splitIds(ids);
            count = service.delete(userId,idList);
        } catch (Exception e) {
            log.error("删除失败",e);
            return new ResponseEntity("删除失败",HttpStatus.SERVICE_UNAVAILABLE);
        }
        return new ResponseEntity(count,HttpStatus.OK);
    }

    /**
     * 通过id获取组件
     * @param userId
     * @param id
     * @return 组件信息
     */
    @GetMapping("/get/{id}")
    public ResponseEntity get(@RequestAttribute("user-id") String userId,
                                              @PathVariable("id") String id){
        DatavComponent component = null;
        try {
            component = service.getById(userId,id);
        } catch (Exception e) {
            log.error("获取失败",e);
            return new ResponseEntity("获取失败",HttpStatus.SERVICE_UNAVAILABLE);
        }
        return new ResponseEntity(component,HttpStatus.OK);
    }

    /**
     * 通过大屏id获取组件列表
     * @param userId
     * @param datavId
     * @return 组件信息列表
     */
    @GetMapping("/get/by-datav")
    public ResponseEntity getByDatavId(@RequestAttribute("user-id") String userId,
                                                    @RequestParam("datavId") String datavId){
        List<DatavComponent> components = null;
        try {
            components = service.getByDatavId(userId,datavId);
        } catch (Exception e) {
            log.error("获取失败",e);
            return new ResponseEntity("获取失败",HttpStatus.SERVICE_UNAVAILABLE);
        }
        return new ResponseEntity(components,HttpStatus.OK);
    }
}
