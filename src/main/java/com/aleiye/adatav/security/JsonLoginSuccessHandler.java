package com.aleiye.adatav.security;

import com.aleiye.adatav.service.JwtUserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

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
public class JsonLoginSuccessHandler implements AuthenticationSuccessHandler {

    private JwtUserService jwtUserService;

    public JsonLoginSuccessHandler(JwtUserService jwtUserService) {
        this.jwtUserService = jwtUserService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        Object principal = authentication.getPrincipal();
        Boolean remember = (Boolean) request.getAttribute("remember");
        AccountUser account = (AccountUser) principal;
        account.setRemember(remember);
        String token = jwtUserService.saveUserLoginInfo(account);
        response.setHeader("Authorization", token);
    }

}