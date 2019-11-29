package com.qcby.servlet;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.qcby.db.Db;

/**
 * Servlet implementation class TestServlet
 */
@WebServlet("/Login")
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Login() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/** 
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		String account = request.getParameter("account");
		String password = request.getParameter("password");
		String sql = "select * from t_user where account=\""+account+"\" and password=\""+password+"\"";
		String [] columns = new String []{"account","password"};
		List<Map<String,String>> result = Db.find(sql, columns);
        if(result!=null&&result.size()!=0) {
        	String json="{\"code\":1}";
        	request.getSession().setAttribute("userId", account);
			response.getWriter().write(json);	
        }else {
        	String json="{\"code\":0}";
			response.getWriter().write(json);	
        }
		
		//String json="{\"account\":\""+account+"\",\"password\":\""+password+"\"}";
		//response.getWriter().write(json);
	}

}
