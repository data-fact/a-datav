package com.aleiye.adatav.controller;

import org.apache.commons.lang3.StringUtils;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.activation.MimetypesFileTypeMap;
import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/datav/upload")
public class UploadController {

    public static final String PRE_PATH = "datav";
    public static final String TYPE_PREFIX = "image";
    public static final int MAX_FILE_SIZE = 10 * 1024 * 1024;

    @Value("${aleiye.upload-locations:}")
    public String uploadLocations;

    @RequestMapping("/image/{id}")
    public ResponseEntity<String> imgageUpload(
            @PathVariable("id") String id,
            @RequestParam("image") MultipartFile mFile){
        if(StringUtils.isEmpty(uploadLocations))
            return new ResponseEntity("文件上传路径异常",HttpStatus.SERVICE_UNAVAILABLE);
        if(!validate(mFile))
            return new ResponseEntity("文件不合法",HttpStatus.SERVICE_UNAVAILABLE);

        String suffix = StringUtils.substringAfter(mFile.getOriginalFilename(),".");
        String uuid = UUID.randomUUID().toString();
        String filename = uuid + "." + suffix;
        String relativePath = PRE_PATH + "/" + id + "/" + filename;
        String filePath = uploadLocations + relativePath;
        String staticFilePath = "//" + relativePath;
        String dirPath = uploadLocations + PRE_PATH + "/" + id;
        try {
            new File(dirPath).mkdirs();
            File file = new File(filePath);
            mFile.transferTo(file);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ResponseEntity(staticFilePath,HttpStatus.OK);
    }

    private boolean validate(MultipartFile file){
        String type = file.getContentType();
        long size = file.getSize();
        if(!StringUtils.startsWith(type,TYPE_PREFIX))
            return false;
        if(size > MAX_FILE_SIZE)
            return false;
        return true;
    }
}
