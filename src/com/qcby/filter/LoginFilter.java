package com.qcby.filter;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet Filter implementation class LoginFilter
 */
@WebFilter("/*")
public class LoginFilter implements Filter {

    /**
     * Default constructor. 
     */
    public LoginFilter() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		// TODO Auto-generated method stub
		// place your code here
		Object userId = ((HttpServletRequest)request).getSession().getAttribute("userId");
		String requestURI = ((HttpServletRequest) request).getRequestURI();
		//System.out.println(requestURI);
		if(requestURI.equals("/javaweb/Register")||requestURI.equals("/javaweb/register.html")||requestURI.equals("/javaweb/")||requestURI.equals("/javaweb/login.html")||requestURI.equals("/javaweb/Login")||requestURI.contains("/javaweb/source")) {	
			
		}else {
			//System.out.println(userId);
			if(userId==null) {
				((HttpServletResponse) response).sendRedirect("login.html");				
			}
		}
		// pass the request along the filter chain
		chain.doFilter(request, response);
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

}
