
/****************************************************************************/
  /* 菜单点击事件（点击<a>标签）
  * 主要处理逻辑：
  * 	(1)、当前选中菜单、及其父菜单，高亮显示
  * 	(2)、动态更新面包屑路径
  */
 /***************************************************************************/
$(document).on('click', '.nav-list a' , function(){

	//--------------------逻辑(1): 当前选中菜单、及其父菜单，高亮显示--------------------
	//获取当前菜单<li>标签
	var new_active = $(this).parent("li");
	
	//删除所有菜单项(li标签)的active属性
	//$('.nav-list li.active').removeClass('active');
    $('.submenu > li').removeClass('active');

	//获取是否有父菜单
	var no_parent = new_active.parents('.nav-list li').length;
	if(no_parent){  
		new_active.addClass('active'); //如果没有父菜单，则添加active open样式
	}else{
		new_active.addClass('active').parents('li').addClass('active');//如果有父菜单，则自身添加active样式，所有父菜单添加active open样式
	}
	
	
	//--------------------逻辑(2): 动态更新面包屑路径--------------------
	var breadcrumb_items = [];//定义面包屑内容数组
	//获取当前及其所有上级菜单的(每个菜单节点都为面包屑内容项)：菜单名称、菜单链接属性
	$(this).parents('.nav-list li').each(function() {
			var link = $(this).find('> a');
				var text = link.text();
				var href = link.attr('href');
				breadcrumb_items.push({'text': text, 'href': href});
	})
	
	breadcrumb_items.reverse();//数组返序 (默认从子菜单，递归到顶层父菜单，但面包屑展示相反，所以要进行反序处理)
	
	//面包屑HTML: 默认有：控制台
	var liHtml = '<li><i class="ace-icon fa fa-home home-icon"></i><a target="main_frame" href="/admin/home">首页</a></li>';
	$.each(breadcrumb_items,function(n,menuItem) {
      		if(n == breadcrumb_items.length-1){
      			liHtml += "<li class='active'>"+menuItem.text+"</li>";  //当前选中菜单，面包屑中不提供链接
      		}else{
      		    if(menuItem.href){
      		    	liHtml += "<li class='active'><a href'"+menuItem.href+"'>"+menuItem.text+"</a></li>"; //存在href，提供链接
      		    }else{
      		    	liHtml += "<li>"+menuItem.text+"</li>";   //菜单没有href(比如：父菜单)，面包屑中不提供链接
      		    }

      		}
     });  
     
  	 //获取当前选中菜单的href属性，如果href为空，则不更新面包屑内容(比如：点击父菜单，不需要更新)
   	 var activeMenuHref = $(this).attr("href");
   	 if(activeMenuHref){
   	   $(".breadcrumb").html(liHtml); //面包屑<ul>样式为breadcrumb，不能随意修改
   	 }
});



/****************************************************************************/
  /* ACE事件处理
  * 以下事件触发，会在这个方法进行处理,通过name属性判断具体事件：
  * 	(1)、导航栏固定，name=navbar_fixed
  * 	(2)、菜单栏固定，name=sidebar_fixed
  * 	(3)、面包屑固定，name=breadcrumbs_fixed
  * 	(4)、主容器固定，name=main_container_fixed
  * 	(5)、菜单栏收缩，name=sidebar_collapsed
  */
 /***************************************************************************/
$(document).on('settings.ace', function(event, name, status) {
	//TODO
});
	
/****************************************************************************/
/*
 * 点击菜单，处理逻辑：
 * (1)、打开相应界面
 * (2)、
 * (3)、
 */
 /***************************************************************************/
function gopage(url){
  	$("#main_frame").attr("src",url);//嵌套的主页面iframe id必须为main_frame
}
		