package com.aleiye.adatav;

import net.hasor.spring.boot.EnableHasor;
import net.hasor.spring.boot.EnableHasorWeb;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
//import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.util.unit.DataSize;

import javax.servlet.MultipartConfigElement;

@EnableCaching
@EnableHasor
@EnableHasorWeb
@MapperScan("com.aleiye.adatav.dao")
//@EnableDiscoveryClient
@SpringBootApplication
public class ADatavApplication {

    public static void main(String[] args) {
        SpringApplication.run(ADatavApplication.class, args);
    }

    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        //// 设置文件大小限制 ,超了，页面会抛出异常信息，这时候就需要进行异常信息的处理了;
        factory.setMaxFileSize(DataSize.ofMegabytes(5)); //KB,MB
        /// 设置总上传数据总大小
        factory.setMaxRequestSize(DataSize.ofMegabytes(5));
        //Sets the directory location wherefiles will be stored.
        //factory.setLocation("路径地址");
        return factory.createMultipartConfig();
    }
}
