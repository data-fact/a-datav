package com.aleiye.adatav.config;

import net.hasor.core.ApiBinder;
import net.hasor.core.DimModule;
import net.hasor.core.Module;
import net.hasor.db.JdbcModule;
import net.hasor.db.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

/**
 *
 * Project_name: apsc-demo
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 09:08 2020-06-08.
 * Description:
 * Modified By:
 */
@DimModule
@Component
public class HasorModule implements Module {

    @Autowired
    @Qualifier("primaryDataSource")
    private DataSource dataSource;

//    @Autowired
//    @Qualifier("wzgsDataSource")
//    private DataSource wzgsDataSource;
//
//    @Autowired
//    @Qualifier("kylinDataSource")
//    private DataSource kylinDataSource;

    @Override
    public void loadModule(ApiBinder apiBinder) throws Throwable {
        apiBinder.installModule(new JdbcModule(Level.Full,dataSource));
//        apiBinder.installModule(new JdbcModule(Level.Full,wzgsDataSource));
//        apiBinder.installModule(new JdbcModule(Level.Full,"wisdom",dataSource));
//        apiBinder.installModule(new JdbcModule(Level.Full,"kylin",kylinDataSource));
    }
}
