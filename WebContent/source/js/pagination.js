$(function(){
	//点击下一页
	$(".pagination li:last-child").on('click',function(){
		if($(".pagination li").filter(".active").next()[0]!==$(".pagination li:last-child")[0]){
			pageLoad($(".pagination li").filter(".active").next().text());
			$(".pagination li").filter(".active").removeClass('active').next().addClass('active');
		}	
		pageLoad($(this).text());
	})
	//点击上一页
	$(".pagination li:first-child").on('click',function(){
		if($(".pagination li").filter(".active").prev()[0]!==$(".pagination li:first-child")[0]){
			pageLoad($(".pagination li").filter(".active").prev().text());
			$(".pagination li").filter(".active").removeClass('active').prev().addClass('active');
		}
	})
	//点击任意一页
	$(".pagination li").not('.pagination li:last-child').not('.pagination li:first-child').on('click',function(){
		$(".pagination li").removeClass('active');
		$(this).addClass('active');
		pageLoad($(this).text());
	})
    //分页数据加载
	var pageLoad = function(pageIndex){
		$.ajax({
			url:"Index",
			type:"get",
			data:{
				"action":"page",
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
