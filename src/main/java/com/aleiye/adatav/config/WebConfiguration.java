package com.aleiye.adatav.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;


/**
 *
 * Project_name: apsc-gateway
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 19:06 2019-05-30.
 * Description:
 * Modified By:
 */
@Configuration
public class WebConfiguration implements WebMvcConfigurer {

    @Value("${aleiye.upload-locations:}")
    private String uploadLocation;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/upload/**").addResourceLocations("file:" + uploadLocation);
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("redirect:/datav/list");
    }

}
