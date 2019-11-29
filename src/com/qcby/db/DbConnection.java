package com.qcby.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DbConnection {
	private DbConnection() { 
		
	}
	
	private static DbConnection dbConection =new DbConnection();

	public static Connection getConnection() {
		return dbConection.createConnection();
	}
	
	
	public Connection createConnection() {
		Connection connection =null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			String url = "jdbc:mysql://localhost:3306/servlet?useUnicode=true&characterEncoding=UTF-8";
			String user="root";
			String pwd="root";
			connection = DriverManager.getConnection(url, user, pwd);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return connection;
	}
	
}
