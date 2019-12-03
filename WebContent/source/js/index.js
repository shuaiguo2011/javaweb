//进页面加载新闻
$.ajax({
	url:"Index",
	type:"get",
	data:{
		"action":"load"		
	},
	dataType:"text",
	success:function(data){		
		data = JSON.parse(data);
		$("#cur_account").html(data.account);
		if(data.code==0){
			$('.my_table>tbody').empty().append("<tr><td colspan='7'>无数据</td></tr>");
			$(".pagination").empty();
		}else{
			//更新数据	
			load(data);			
		}						
	}
})
//退出
$("#out").on("click",function(){
	layer.confirm('确定要退出吗？', {
		  btn: ['退出','取消'] //按钮
		}, function(){
			$.ajax({
				url:"Index",
				type:"post",
				data:{
					"action":"out"				
				},		
				dataType:"text",
				success:function(data){
					data = JSON.parse(data);
					console.log(data)
					if(data.code==0){
						layer.msg("登出失败！");
					}else{
						layer.msg("登出成功！",{
							  time: 1000 
						},function(){
							window.location.href='Index';	
						});	 			
					} 
				}
			})
		
		}, function(){
		  layer.msg('再看一会吧！');
	});
})
//点击添加按钮，弹出添加窗口
var index_add_form = 0;//窗口标识
var action_flag=0;//添加，修改标识
$("#add").on('click',function(){
	action_flag=0;
	index_add_form =layer.open({
		 type: 1,
		 title: '新闻详情', 
		 skin: 'layui-layer-rim', //加上边框
		 area: ['50%', '380px'], //宽高
		 anim:2,
		 content: $('#add_form')

	});
})
//点击添加确认
$("#add_form").on('submit',function(e){
	e.preventDefault();
	var id = $('#id').val();
	var title = $('#title').val();
	var description = $('#description').val();
	var action="";
	if(action_flag==0){
		action="add"
	}else{
		action="update"
	}
	if(action!=""){
		$.ajax({
			url:"Index",
			type:"post",
			data:{
				"action":action,
				"id":id,
				"title":title,
				"description":description
			},		
			dataType:"text",
			success:function(data){
				data = JSON.parse(data);
				if(data.code==0){
					$('.my_table>tbody').empty().append("<tr><td colspan='7'>无数据</td></tr>");
					$(".pagination").empty();
				}else{
					$('#title').val("");
					$('#description').val("")				
					$('.my_table>tbody').empty();
					//更新数据	
					load(data);	
					//清空输入框内容
					$('#search_title').val('')
				}
			}
		})	
	}
	layer.close(index_add_form);

})
//删除新闻
$(document).on('click','#remove',function(){
	var cur_id= $(this).parent().siblings().eq(1).text();
	layer.confirm('确定要删除吗？', {
		  btn: ['确定','取消'] //按钮
	}, function(){
		$.ajax({
				url:"Index",
				type:"post",
				data:{
					"action":"remove",
					"id":cur_id
				},		
				dataType:"text",
				success:function(data){
					data = JSON.parse(data);
					if(data.code==0){
						$('.my_table>tbody').empty().append("<tr><td colspan='7'>无数据</td></tr>");
						$(".pagination").empty();
						$("#checkbox_all").prop('checked',false);
						layer.msg('删除成功,无数据!');
					}else{													
						$('.my_table>tbody').empty();
						//更新数据						
						load(data);
						//清空输入框内容
						$('#search_title').val('')
						layer.msg('删除成功！')								
					}
				}
			}) 
	}, function(){
		 layer.msg('谢谢你留下我！');
	});	
})
//点击要修改的新闻，回显到表单中
$(document).on('click','#modify',function(){
	action_flag=1;
	var cur_id= $(this).parent().siblings().eq(1).text();
	$.ajax({
		url:"Index",
		type:"post",
		data:{
			"action":"update_select",
			"id":cur_id
		},		
		dataType:"text",
		success:function(data){
			data = JSON.parse(data);
			$('#id').val(data.result[0].id);
			$('#title').val(data.result[0].title);
			$('#description').val(data.result[0].description);
			index_add_form =layer.open({
				 type: 1,
				 title: '新闻详情', 
				 skin: 'layui-layer-rim', //加上边框
				 area: ['50%', '380px'], //宽高
				 anim:2,
				 content: $('#add_form'),
				 cancel: function(){ 
					 $('#id').val("");
					 $('#title').val("");
					 $('#description').val("");   
			     }

			});
		}
	})
	
})
//删除多条新闻
$("#remove_all").on('click',function(){
	var checkbox_arr = '';
	$("input:checkbox[name=checkbox_item]:checked").each(function(){
		checkbox_arr += $(this).parent().next().text()+',';
	})
	checkbox_arr = checkbox_arr.slice(0,checkbox_arr.length-1);
	if(checkbox_arr!=""){
		layer.confirm('确定要删除吗？', {
			  btn: ['确定','取消'] //按钮
		}, function(){
			$.ajax({
					url:"Index",
					type:"post",
					data:{
						"action":"removeall",
						"id":checkbox_arr
					},		
					dataType:"text",
					success:function(data){
						data = JSON.parse(data);
						if(data.code==0){
							$('.my_table>tbody').empty().append("<tr><td colspan='7'>无数据</td></tr>");
							$(".pagination").empty();
							$("#checkbox_all").prop('checked',false);
							layer.msg('删除成功,无数据!');
						}else{													
							$('.my_table>tbody').empty();
							//更新数据						
							load(data);
							//清空输入框内容
							$('#search_title').val('')
							layer.msg('删除成功！')								
						}
					}
				}) 
		}, function(){
			 layer.msg('谢谢你留下我！');
		});	
	}else{
		layer.msg('请勾选内容！')	
	}
    
})
//全选
$("#checkbox_all").on('click',function(){
	if($(this).is(":checked")){
		$("input:checkbox[name=checkbox_item]").prop('checked',true);
	}else{
		$("input:checkbox[name=checkbox_item]").prop('checked',false);
	}	
})
//补全选
$(document).on('click','input:checkbox[name=checkbox_item]',function(){
	var flag=true;
	$("input:checkbox[name=checkbox_item]").each(function(){
		if($(this).is(":checked")){
			flag=flag&&true
		}else{
			flag=flag&&false
		}
	})
	if(flag){
		$("#checkbox_all").prop('checked',true);
	}else{
		$("#checkbox_all").prop('checked',false);
	}
})
//加载数据和分页
var load = function(data){
	//加载数据
	for(var i in data.result){
		$('.my_table>tbody').append("<tr><td><input type='checkbox' name='checkbox_item' /></td><td>"+data.result[i].id+"</td><td>"+data.result[i].title+"</td><td>"+data.result[i].author+"</td><td>"+data.result[i].description+"</td><td>"+data.result[i].date+"</td><td><button class='btn btn-info btn-xs' id='modify'>修改</button>&nbsp;<button class='btn btn-danger btn-xs'  id='remove'>删除</button></td></tr>")
	}
	//加载分页
	$(".pagination").empty().append("<li><a href='#'>&laquo;</a></li>");
	for(var i=0;i<data.pageCount;i++){			
		$(".pagination").append("<li><a href='#'>" + (i+1) + "</a></li>");					
	}
	$(".pagination").append(" <li><a href='#'>&raquo;</a></li>");
	$(".pagination li").eq(1).addClass('active');
	//取消全选
	$("#checkbox_all").prop('checked',false);
}
//查询
$('#search_form').on("submit",function(e){
	e.preventDefault();
	var search_title = $('#search_title').val();
	$.ajax({
		url:"Index",
		type:"get",
		data:{
			"action":"search",
			"search_title":search_title
		},
		dataType:"text",
		success:function(data){		
			data = JSON.parse(data);
			if(data.code==0){
				$('.my_table>tbody').empty().append("<tr><td colspan='7'>无数据</td></tr>");
				$("#checkbox_all").prop('checked',false);
				$(".pagination").empty();
			}else{
				$('.my_table>tbody').empty();
				//更新数据						
				load(data);
				layer.msg('查询成功！')					
			}	
		}
	})
})

