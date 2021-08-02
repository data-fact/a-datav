package com.aleiye.adatav.security;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Project_name: demo-jwt
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2021/2/23.
 * Description:
 * Modified By:
 */
public class HttpStatusLoginFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException {
        if(exception instanceof BadCredentialsException)
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
        else
            response.setStatus(HttpStatus.FORBIDDEN.value());
    }

}
