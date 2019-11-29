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
 * Servlet implementation class Register
 */
@WebServlet("/Register")
public class Register extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Register() {
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
		String que_sql = "select * from t_user where account=\""+account+"\"";
		String [] columns = new String []{"account"};
		List<Map<String,String>> result = Db.find(que_sql, columns);
		String sql ="insert into t_user (account,password) values (\""+account+"\", \""+password+"\")";
		if(result.size()==0) {
			Db.update(sql);
			String json="{\"code\":1,\"account\":\""+account+"\",\"password\":\""+password+"\"}";
			response.getWriter().write(json);			
		}else {
			String json="{\"code\":0}";
			response.getWriter().write(json);
		}

	}

}
