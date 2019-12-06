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
			$('.my_table>tbody').empty().append("<tr><td colspan='7'>无数据</td></tr>")
		}else{
			//更新数据	
			load(data.result);			
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
					$('.my_table>tbody').empty().append("<tr><td colspan='7'>无数据</td></tr>")
				}else{
					$('#title').val("");
					$('#description').val("")				
					$('.my_table>tbody').empty();
					//更新数据	
					load(data.result);					
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
						layer.msg('删除成功,无数据!');
					}else{													
						$('.my_table>tbody').empty();
						//更新数据						
						load(data.result);
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
							$('.my_table>tbody').empty().append("<tr><td colspan='7'>无数据</td></tr>")
							layer.msg('删除成功,无数据!');
							$("#checkbox_all").prop('checked',false);
						}else{													
							$('.my_table>tbody').empty();
							//更新数据						
							load(data.result);
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
//加载数据
var load = function(data){
	for(var i in data){
		$('.my_table>tbody').append("<tr><td><input type='checkbox' name='checkbox_item' /></td><td>"+data[i].id+"</td><td>"+data[i].title+"</td><td>"+data[i].author+"</td><td>"+data[i].description+"</td><td>"+data[i].date+"</td><td><button class='btn btn-info btn-xs' id='modify'>修改</button>&nbsp;<button class='btn btn-danger btn-xs'  id='remove'>删除</button></td></tr>")
	}
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
				$('.my_table>tbody').empty().append("<tr><td colspan='7'>无数据</td></tr>")
			}else{
				$('.my_table>tbody').empty();
				//更新数据						
				load(data.result);
				layer.msg('查询成功！')					
			}	
			$('#search_title').val('');
		}
	})
})


//粒子运动效果
var canvas = document.getElementById("cas");
var ctx = canvas.getContext("2d");
resize();
window.onresize = resize;

function resize() {
	canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}
var RAF = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
		window.setTimeout(callback, 1000 / 60);
	};
})();
// 鼠标活动时，获取鼠标坐标
var warea = { x: null, y: null, max: 50000 };
window.onmousemove = function(e) {
	e = e || window.event;
	warea.x = e.clientX;
	warea.y = e.clientY;
};
window.onmouseout = function(e) {
	warea.x = null;
	warea.y = null;
};
// 添加粒子
// x，y为粒子坐标，xa, ya为粒子xy轴加速度，max为连线的最大距离
var dots = [];
for(var i = 0; i < 150; i++) {
	var x = Math.random() * canvas.width;
	var y = Math.random() * canvas.height;
	var xa = Math.random() * 2 - 1;
	var ya = Math.random() * 2 - 1;
	dots.push({
		x: x,
		y: y,
		xa: xa,
		ya: ya,
		max: 35000
	})
}
// 延迟100秒开始执行动画，如果立即执行有时位置计算会出错
setTimeout(function() {
	animate();
}, 100);
// 每一帧循环的逻辑
function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// 将鼠标坐标添加进去，产生一个用于比对距离的点数组
	var ndots = [warea].concat(dots);
	dots.forEach(function(dot) {
		// 粒子位移
		dot.x += dot.xa;
		dot.y += dot.ya;
		// 遇到边界将加速度反向
		dot.xa *= (dot.x > canvas.width || dot.x < 0) ? -1 : 1;
		dot.ya *= (dot.y > canvas.height || dot.y < 0) ? -1 : 1;
		// 绘制点
		ctx.fillRect(dot.x - 0.5, dot.y - 0.5, 1, 1);
		// 循环比对粒子间的距离
		for(var i = 0; i < ndots.length; i++) {
			var d2 = ndots[i];
			if(dot === d2 || d2.x === null || d2.y === null) continue;
			var xc = dot.x - d2.x;
			var yc = dot.y - d2.y;
			// 两个粒子之间的距离
			var dis = xc * xc + yc * yc;
			// 距离比
			var ratio;
			// 如果两个粒子之间的距离小于粒子对象的max值，则在两个粒子间画线
			if(dis < d2.max) {
				// 如果是鼠标，则让粒子向鼠标的位置移动
				if(d2 === warea && dis > (d2.max / 2)) {
					dot.x -= xc * 0.01;
					dot.y -= yc * 0.01;
				}
				// 计算距离比
				ratio = (d2.max - dis) / d2.max;
				// 画线
				ctx.beginPath();
				ctx.lineWidth = ratio / 2;
				ctx.strokeStyle = 'rgba(30,144,255,' + (ratio + 0.2) + ')';
				ctx.moveTo(dot.x, dot.y);
				ctx.lineTo(d2.x, d2.y);
				ctx.stroke();
			}
		}
		// 将已经计算过的粒子从数组中删除
		ndots.splice(ndots.indexOf(dot), 1);
	});
	RAF(animate);
}
