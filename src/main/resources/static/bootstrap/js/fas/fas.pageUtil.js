/**
 * 在指定URL后面加上参数
 * @param url
 * @param name
 * @param value
 * @return
 */
function addParam(url, name, value) {
	if (url != null && name != null) {
		if (url.indexOf('?') == -1) {
			url = url + '?' + name + '=' + value;
		}else {
			url = url + '&' + name + '=' + value;
		}
	}
	return url;
}
 
function doReset(formId){
	var form = getForm(formId);
	form[0].reset();
}

/**
 * jquery datatable插件查询
 * @param formId
 * @return
 */
function doQuery(){
	if(dataTable){
		dataTable.fnDraw();//重新查询
	}
}
/**
 * jquery datatable插件重置
 * @param formId
 * @return
 */
function doQueryReset(){
	doReset();
	doQuery();
}

/**
 * 页面验证方法
 */
function formCheck(formId){
	var form = getForm(formId);
	
	if(!form.valid()){
		return false;
	}
	return true;
}

/**
 * 获得页面的Form方法
 */
function getForm(formId){
	if(typeof(formId) == "undefined"){
		formId = $(document.forms[0]).attr("id");
	}
	if(typeof(formId) == "undefined"){
		parent.bootbox.alert("请确认formId是否存在");
		return null;
	}
	
	return $("#" + formId);
}


 
/***********************************************************************
 * 金额格式化--开始 *   默认参数s单位为元
 *
 * 例如：   s = 1999999元
 *       var afterTran = tranMoney(s); //afterTran 为1,999,999
 *
/*********************************************************************/
function tranMoney(s){
        s = s+"";
        if(/[^0-9\.]/.test(s)) return "invalid value";
        s=s.replace(/^(\d*)$/,"$1.");
        s=(s+"00").replace(/(\d*\.\d\d)\d*/,"$1");
        s=s.replace(".",",");
        var re=/(\d)(\d{3},)/;
        while(re.test(s))
                s=s.replace(re,"$1,$2");
        s=s.replace(/,(\d\d)$/,".$1");
        return  s.replace(/^\./,"0.")
}


/***********************************************************************
 *
 * 日期字符串格式化
 *
 * 例如： 将var datestr = '2015-04-15 10:33:00' 格式化为'2015-04-15'
 *        var formatStr = dateFormat(datestr,'yyyy-MM-dd');
 *
 ***********************************************************************/
function dateFormat(value,format){
 	var datestr = "";
	try{
	  	var str = value.replace(/-/g,"/");
   		var date = new Date(str);
   		if(!format){
   			format = "yyyy-MM-dd hh:mm:ss";
   		}
  		datestr = date.Format(format);
  	}catch(e){
  	}
	return datestr;
}



/***********************************************************************************
* 页面初始化公共函数，包括：
*    list.jsp的 initListPage（）
*    select.jsp的 initSelectPage（）
*    content.jsp的initContentPage（）
************************************************************************************/

/**
 * 初始化list.jsp页面
 */
function initListPage(){
	  //弹出框页面处理
	  var isSelectPage = $(".select-page").length;
	  if(isSelectPage > 0 ){
		  initSelectPage();
	  }
	  
	  //绑定页面resize事件
	  bindResizeEvent();
	  //初始化页面元素
	  initPageElements();
	  //查询页面回车查询
	  $('.query-form').find('input[type="text"]').keydown(function(e){
		  if(e.keyCode==13){
			  if($("button[name='btn-query']")){
				  $("button[name='btn-query']").click();
			  }
		  }
	  });
	  
	  //tr 单击列表行，高亮
	  if(dataTable){
		  dataTable.$('tr').click( function (e) {
			  var $tr = $(this).parents('.table').find('tr');
			  $tr.each(function () {
	              $(this).removeClass('row_selected');
	          });
			  $(this).addClass('row_selected');
	      });
	  }
	  //td 强制不换行
	  if($('#dataTable')){
		 $('#dataTable tbody td').css({ "white-space": "nowrap"});
	  }

	  if(!isSelectPage){
		  //返回页面顶部 
		  //scrollTop();
		  //重新计算iframe高端
		  resizeMainIFrame();
	  }
}

/**
 * 初始化content.jsp页面
 */
function initContentPage(isEditable){
	bindResizeEvent();
	initPageElements();
	
	if(isEditable){
		enableForm();
	}else{
		disabledForm();
	}
	
	var form = $('#contentForm');
    $('.select2me', form).change(function () {
    	form.validate().element($(this)); 
    });
    
    //返回页面顶部 
    scrollTop();
}

function scrollTop(){
	if(parent){
		  parent.$('html,body').animate({
               scrollTop: 0
           }, 'slow');
    }else{
    	  $('html,body').animate({
               scrollTop: 0
          }, 'slow');
    }
}
function disabledForm(){
	$(".disabled-control").attr("disabled", "true");
}	
function enableForm(){
	$(".disabled-control").removeAttr("disabled");
}	
/**
 * 初始化select.jsp页面
 */
function initSelectPage() {
	if(dataTable){
		 dataTable.$('tr').dblclick( function () {
	         	var data = dataTable.fnGetData( this );//获取双击TR JSON对象
	         	//console.log(data);
	         	//art.dialog.data('data',data);//把双击的正行JSON对象返回
	         	//art.dialog.close();//关闭弹出框
	         	
	         	parent.KNModal.data('data',data);
	         	parent.KNModal.close();
	    });
	}
}

function initSelectPageNoDblclick(dataTable){
	initListPage(true);
}

function bindResizeEvent(){
	if(parent){
		$("body .sub-page-content").resize(function(){
			//console.log('触发div resize');
			resizeMainIFrame();
		});
	}
}

/**
 * 初始页面元素
 */
function initPageElements(){
	
 // initDatepicker("");//初始化日期选择组件
  $('.form-control').tooltip();
  //$('select').select2();//下拉框组件
}


/**
  * 初始化JSP页面样式为date-picker的元素
  *    
  **/
function initDatepicker(format){
		
		if(!format){
			format = 'yyyy-mm-dd';
		}

		//日期插件
		$('.date-picker').datepicker({
				language:  'zh-CN',
		        weekStart: 1,
		        todayBtn:  true,//是否显示“今天”
				autoclose: true,//选择日期后自动关闭
				todayHighlight: true, //是否高亮显示“今天”
				startView: 'month', //开始试图：月份
				forceParse: true, //是否强制解析（手动输入有无情况）
  				showMeridian: false,//是否显示‘天’、‘小时’视图
  				format: format
		});
		
		
		//日期插件
		$('.dateptimeicker').datetimepicker({
			    format: 'yyyy-mm-dd hh:ii:ss',
   				showButtonPanel: true
		});
		
}

/**
  *main_frame根据内容重新自适应高度
  *
  **/		 
function resizeMainIFrame(){
	    
		if(parent){
			var pTar = parent.document.getElementById("main_frame");
			if (pTar) { //ff
				if (pTar.contentDocument && pTar.contentDocument.body.offsetHeight) {
					    if($(".sub-page-content").height()  && $(".sub-page-content").height() < pTar.contentDocument.body.offsetHeight){
					    	pTar.height = $(".sub-page-content").height() +30;
					    }else{
					    	pTar.height = pTar.contentDocument.body.offsetHeight;
					    }
				}else if (pTar.Document && pTar.Document.body.scrollHeight) { //ie
					    if($(".sub-page-content").height()  && $(".sub-page-content").height() <pTar.contentDocument.body.offsetHeight){
					    	pTar.height = $(".sub-page-content").height() ;
					    }else{
					    	pTar.height = pTar.Document.body.scrollHeight;
					    }
				}
			}
		}
}

function tran(group,value,cssClass){
	var html = "<fas:dict group='"+group+"' value='"+value+"' cssClass='"+cssClass+"' />";
	console.log(html);
	return html; 
}

function handleAjaxError(response){
	if(response.message == 'Unauthenticated'){
		top.window.href ="/login";
	}else{
		top.bootbox.alert(response.message);
	}
	
}


//统一定义Datatable全选事件
function checkClick() {
    if($(this).prop('checked')){
        $('.selectRow').prop('checked', true);
    }else{
        $('.selectRow').prop('checked', false);
    }
}

/**
 * 修改数据方法
 * @return
 */
function checkView() {
    var count = 0;
    var pkvalue = "";
    $("#dataTable").find("input[name=id]").each(function(){
        if(this.checked){
            pkvalue = $(this).attr("value");
            count += 1;
        }
    });
    if(count < 1){
        if(parent){
            parent.bootbox.alert("请选择查看记录");
        }else{
            bootbox.alert("请选择查看记录");
        }
        return false;
    }else if(count > 1){
        if(parent){
            parent.bootbox.alert("请确认一次只能查看一条记录");
        }else{
            bootbox.alert("请确认一次只能查看一条记录");
        }
        return false;
    }
    return pkvalue;
}

/**
 * 修改数据检查方法
 * @return
 */
function checkEdit() {
    var count = 0;
    var pkvalue = "";
    $("#dataTable").find("input[name=id]").each(function(){
        if(this.checked){
            pkvalue = $(this).attr("value");
            count += 1;
        }
    });
    if(count < 1){
        if(parent){
            parent.bootbox.alert("请选择编辑记录");
        }else{
            bootbox.alert("请选择编辑记录");
        }
        return false;
    }else if(count > 1){
        if(parent){
            parent.bootbox.alert("请确认一次只能编辑一条记录");
        }else{
            bootbox.alert("请确认一次只能编辑一条记录");
        }
        return false;
    }
    return pkvalue;
}


//保存表单信息
function doSave(){
    if (!$("#dataform").valid()) {
        return false;
    }
    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "url": cmdSave,
        "data":$('#dataform').serialize(),
        "success": function(data){
            var json = eval(data);
            if(json.status=="SUCCESS"){
                $("#modal-form").modal('hide');
                dataTable.fnDraw();
            }else{
                alert("保存失败，请稍后重试！");
            }
        }
    });
}

//new Date
function newDate(arg){
    if(typeof(arg) === "string"){
    	//如果有包含/-:返回true
		if(arg.search("/") != -1 || arg.search("-") != -1 || arg.search(":") != -1){
            return new Date(arg);
		}else {
            var number = parseInt(arg, 10);
            return new Date(number);
		}
	}else {
        return new Date(arg);
	}

}

/**
 * 删除选中记录
 * @return
 */
function doDelete(){
    var pkvalue="";
    var delCount = 0;
    $("#dataTable").find("input[name=id]").each(function(){
        if(this.checked){
            pkvalue += $(this).attr("value")+",";
            delCount += 1;
        }
    });
    if(delCount < 1){
        if(parent){
            parent.bootbox.alert("请选择删除记录");
        }else{
            bootbox.alert("请选择删除记录");
        }
        return false;
    }
    pkvalue = pkvalue.substr(0, pkvalue.length-1);
    top.bootbox.confirm("确定要删除?", function(result) {
        if (result) {
            $.ajax({
                "dataType": 'json',
                "type": "POST",
                "url": cmdDelete,
                "data":{"ids":pkvalue},
                "success": function(data){
                    var json = eval(data);
                    if(json.status=="SUCCESS"){
                        dataTable.fnDraw();
                    }else{
                        alert("删除失败");
                    }
                }
            });
        }
    });
}

$(function(){
    $('#queryForm').bind('keydown', function(event) {
        if (event.keyCode == "13") {
            //回车执行查询
            $('#keyup13').unbind('click').click()
            }
    });
});

//前台活动状态判定
var actNormal = 1;
var actApplying = 2;
var actPass = 3;
var actFail = 4;
var actPublish = 5;
var actOnline = 6;
var actStop = 7;
var actEnd = 8;
var actReclaimed = 9;


