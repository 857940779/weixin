package com.luohw.springboot.filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * Created by luohw on 2018/5/2 0002.
 */
public class MyFilter implements Filter{
    @Override
    public void destroy() {
    }

    @Override
    public void doFilter(ServletRequest srequest, ServletResponse sresponse, FilterChain filterChain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) srequest;
        System.out.println("this is My First Filter,url :"+request.getRequestURI());
        filterChain.doFilter(srequest, sresponse);
    }

    @Override
    public void init(FilterConfig arg0) throws ServletException {
    }
}
