$(function(){
	//点击下一页
	$(document).on('click',".pagination li:last-child",function(){		
		if($(".pagination li").filter(".active").next()[0]!==$(".pagination li:last-child")[0]){
			var search_title = $('#search_title').val();
			pageLoad($(".pagination li").filter(".active").next().text(),search_title);
			$(".pagination li").filter(".active").removeClass('active').next().addClass('active');
		}	
	})
	//点击上一页
	$(document).on('click',".pagination li:first-child",function(){
		if($(".pagination li").filter(".active").prev()[0]!==$(".pagination li:first-child")[0]){
			var search_title = $('#search_title').val();
			pageLoad($(".pagination li").filter(".active").prev().text(),search_title);
			$(".pagination li").filter(".active").removeClass('active').prev().addClass('active');
		}
	})
	//点击任意一页
	$(document).on('click',".pagination li:not(:first-child):not(:last-child)",function(){
		$(".pagination li").removeClass('active');
		$(this).addClass('active');
		var search_title = $('#search_title').val();
		pageLoad($(this).text(),search_title);
	})
    //分页数据加载
	var pageLoad = function(pageIndex,search_title){
		$.ajax({
			url:"Index",
			type:"get",
			data:{
				"action":"page",
				"search_title":search_title,
				'pageIndex':pageIndex
			},
			dataType:"text",
			success:function(data){		
				data = JSON.parse(data);
				if(data.code==0){
					$('.my_table>tbody').empty().append("<tr><td colspan='7'>无数据</td></tr>")
				}else{
					//更新数据	
					data = data.result;
					$('.my_table>tbody').empty()
					for(var i in data){
						$('.my_table>tbody').append("<tr><td><input type='checkbox' name='checkbox_item' /></td><td>"+data[i].id+"</td><td>"+data[i].title+"</td><td>"+data[i].author+"</td><td>"+data[i].description+"</td><td>"+data[i].date+"</td><td><button class='btn btn-info btn-xs' id='modify'>修改</button>&nbsp;<button class='btn btn-danger btn-xs'  id='remove'>删除</button></td></tr>")
					}
				}						
			}
		})
	}
})
