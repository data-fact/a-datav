package com.aleiye.adatav.config;

import com.aleiye.adatav.service.IDatavAuthService;
import com.aleiye.adatav.service.impl.DatavAloneAuthServiceImpl;
import com.aleiye.adatav.service.impl.DatavClusterAuthServiceImpl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2021/3/18.
 * Description:
 * Modified By:
 */
@Configuration
public class AutowiredStrategyConfig {

    //如果aleiye.auth-strategy值为cluster，则启用集群菜单权限校验
    @Bean
    @ConditionalOnExpression("!'cluster'.equals('${aleiye.auth-strategy:}')")
    DatavAloneAuthServiceImpl getDatavAloneAuthService(){
        return new DatavAloneAuthServiceImpl();
    }
    @Bean
    @ConditionalOnExpression("'cluster'.equals('${aleiye.auth-strategy:}')")
    DatavClusterAuthServiceImpl getDatavClusterAuthService(){
        return new DatavClusterAuthServiceImpl();
    }
}
