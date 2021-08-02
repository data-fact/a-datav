package com.aleiye.adatav.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 *
 * Project_name: apsc-search
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 09:51 2019-01-26.
 * Description:
 * Modified By:
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    private static Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    public ResponseEntity jsonErrorHandler(HttpServletRequest req, Exception e) throws Exception {
        log.error("",e);
        return new ResponseEntity("操作失败", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
