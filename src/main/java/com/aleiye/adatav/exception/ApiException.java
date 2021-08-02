package com.aleiye.adatav.exception;

/**
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2021/3/1.
 * Description:
 * Modified By:
 */
public class ApiException extends RuntimeException {

    public ApiException() {
        super();
    }

    public ApiException(String message) {
        super(message);
    }
}
