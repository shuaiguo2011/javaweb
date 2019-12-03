package com.qcby.servlet;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.qcby.db.Db;

import net.sf.json.JSONArray;


/**
 * Servlet implementation class Index
 */
@WebServlet("/Index")
public class Index extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final int pageSize = 10;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Index() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		response.setHeader("Content-type", "text/html;charset=UTF-8"); 
		String action = request.getParameter("action");
		String search_title = request.getParameter("search_title");
		String pageIndex = request.getParameter("pageIndex");
		Object account = request.getSession().getAttribute("userId");
		String que_sql = "";
		String que_sql1 = "select * from t_news";
		String [] columns = new String []{"id","title","author","description","date"};
		if(action!=null) {
			if(action.equals("search")) {
				que_sql = "select * from t_news where title like '%"+search_title+"%'  order by date DESC limit 0,"+pageSize;
				que_sql1 = "select * from t_news where title like '%"+search_title+"%'  order by date DESC";
			}else if(action.equals("load")){
				que_sql = "select * from t_news order by date DESC limit 0,"+pageSize;								
			}
			else if(action.equals("page")){
				que_sql = "select * from t_news  where title like '%"+search_title+"%' order by date DESC limit "+(Integer.parseInt(pageIndex)-1)*pageSize+","+pageSize;
			}
		}
		List<Map<String,String>> result = Db.find(que_sql, columns);
		List<Map<String,String>> result1 = Db.find(que_sql1, columns);
		int pageCount = (int)Math.ceil(((float)result1.size()/pageSize));
		if(result.size()==0) {
			String json="{\"code\":0,\"account\":\""+account+"\"}";		
			response.getWriter().write(json);			
		}else { 
			//List 转 JSONArray 再 JSONArray 转 String
		    String jsonStr = JSONArray.fromObject(result).toString();			    
			String json="{\"code\":1,\"account\":\""+account+"\",\"pageCount\":\""+pageCount+"\",\"result\":"+jsonStr+"}";
			response.getWriter().write(json);

		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		response.setHeader("Content-type", "text/html;charset=UTF-8"); 
		String action = request.getParameter("action");
		String id = request.getParameter("id");
		String title = request.getParameter("title");	
		Object author = request.getSession().getAttribute("userId");
		String description = request.getParameter("description");
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String str_date = sdf.format(date);
		String que_sql="";
		String que_sql1 = "select * from t_news";
		if(action.equals("out")) {
			String json="{\"code\":1}";
        	request.getSession().removeAttribute("userId");	
			response.getWriter().write(json);
		}else {
			if(action.equals("update_select")) {
				String sql = "select * from t_news where id='"+id+"'";
				String [] columns = new String []{"id","title","author","description","date"};
				List<Map<String,String>> result = Db.find(sql, columns);
				if(result.size()==0) {
					String json="{\"code\":0}";		
					response.getWriter().write(json);			
				}else { 
					//List 转 JSONArray 再 JSONArray 转 String
				    String jsonStr = JSONArray.fromObject(result).toString();			    
					String json="{\"code\":1,\"result\":"+jsonStr+"}";
					response.getWriter().write(json);
				}
			}else {
				if(action.equals("add")) {
					 que_sql = "insert into t_news (title,author,description,date) values ('"+title+"','"+author+"','"+description+"','"+str_date+"')";				
				}else if(action.equals("remove")) {
					 que_sql = "delete from t_news where id=\""+id+"\"";	
				}
				else if(action.equals("update")) {
					 que_sql = "update t_news set title='"+title+"' ,author='"+author+"',description='"+description+"',date='"+str_date+"' where id=\""+id+"\"";	
				}
				else if(action.equals("removeall")) {
					 que_sql = "delete from t_news where id in ("+id+")";	
				}
				if(que_sql!="") {
					Db.update(que_sql);
				}
				String sql = "select * from t_news order by date DESC limit 0,"+pageSize;
				String [] columns = new String []{"id","title","author","description","date"};
				List<Map<String,String>> result = Db.find(sql, columns);
				List<Map<String,String>> result1 = Db.find(que_sql1, columns);
				int pageCount = (int)Math.ceil(((float)result1.size()/pageSize));
				if(result.size()==0) {
					String json="{\"code\":0}";		
					response.getWriter().write(json);			
				}else { 
					//List 转 JSONArray 再 JSONArray 转 String
				    String jsonStr = JSONArray.fromObject(result).toString();			    
					String json="{\"code\":1,\"pageCount\":\""+pageCount+"\",\"result\":"+jsonStr+"}";
					response.getWriter().write(json);
				}
			}	
		}
		
		
	}

}
