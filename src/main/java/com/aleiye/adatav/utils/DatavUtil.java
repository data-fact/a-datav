package com.aleiye.adatav.utils;

import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/22.
 * Description:
 * Modified By:
 */
public class DatavUtil {

    public static List<String> splitIds(String ids){
        if(StringUtils.isEmpty(ids))
            return new ArrayList<>();
        return Arrays.asList(ids.split(","));
    }

    public static boolean validName(String name){
        return !StringUtils.isEmpty(name);
    }
}
