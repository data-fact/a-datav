package com.aleiye.adatav.config;

import com.alibaba.druid.spring.boot.autoconfigure.DruidDataSourceBuilder;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

/**
 *
 * Project_name: apsc-demo
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 14:18 2020-06-09.
 * Description:
 * Modified By:
 */
@Configuration
public class DataSourceConfig {

    @Bean
    @Qualifier("primaryDataSource")
    @ConfigurationProperties(prefix="spring.datasource")
    public DataSource primaryDataSource() {
        return DruidDataSourceBuilder.create().build();
//        return DataSourceBuilder.create().build();
    }

//    @Bean(name = "wzgsDataSource")
//    @Qualifier("wzgsDataSource")
//    @ConfigurationProperties(prefix="spring.wzgs-datasource")
//    public DataSource chartDataSource() {
//        return DruidDataSourceBuilder.create().build();
////        return DataSourceBuilder.create().build();
//    }
//
//    @Bean(name = "kylinDataSource")
//    @Qualifier("kylinDataSource")
//    @ConfigurationProperties(prefix="spring.kylin-datasource")
//    public DataSource kylinDataSource() {
//        return DruidDataSourceBuilder.create().build();
////        return DataSourceBuilder.create().build();
//    }

}
