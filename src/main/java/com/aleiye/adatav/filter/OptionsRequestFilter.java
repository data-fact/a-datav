package com.aleiye.adatav.filter;

import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
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
public class OptionsRequestFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        if(request.getMethod().equals("OPTIONS")) {
            response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,HEAD");
            response.setHeader("Access-Control-Allow-Headers", response.getHeader("Access-Control-Request-Headers"));
            return;
        }
        filterChain.doFilter(request, response);
    }

}
