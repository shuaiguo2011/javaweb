package com.qcby.db;

import java.sql.Connection;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class Db {
	public static void main(String[] args) {

		
	}

	public static List<Map<String,String>> find(String sql,String [] columns) {
		List<Map<String,String>> list = new ArrayList<>();
		try {
			Connection connection = DbConnection.getConnection();
			Statement stat = connection.createStatement();
			
			ResultSet result=stat.executeQuery(sql);
			while(result.next()) {
				Map<String,String> map =new HashMap<>();
				for(String str:columns) {
					String value = result.getString(str);
					map.put(str, value);
				}
				list.add(map);
			}
			close(connection);
		}  catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return list;
	}
	
	public static int update(String sql) {
		int i=0;
		try {
			Connection connection = DbConnection.getConnection();
			Statement stat = connection.createStatement();
			i= stat.executeUpdate(sql);
			close(connection);
		}  catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return i;
	}
	
	private static void close(Connection connection) {
		try {
			connection.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}
