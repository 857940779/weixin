/**
 * @author ZhangHuihua@msn.com
 */
(function($){
	// jQuery validate
	$.extend($.validator.messages, {
		required: "必填字段",
		remote: "请修正该字段",
		email: "请输入正确格式的电子邮件",
		url: "请输入合法的网址",
		date: "请输入合法的日期",
		dateISO: "请输入合法的日期 (ISO).",
		number: "请输入合法的数字",
		digits: "只能输入整数",
		creditcard: "请输入合法的信用卡号",
		equalTo: "请再次输入相同的值",
		accept: "请输入拥有合法后缀名的字符串",
		maxlength: $.validator.format("长度最多是 {0} 的字符串"),
		minlength: $.validator.format("长度最少是 {0} 的字符串"),
		rangelength: $.validator.format("长度介于 {0} 和 {1} 之间的字符串"),
		range: $.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
		max: $.validator.format("请输入一个最大为 {0} 的值"),
		min: $.validator.format("请输入一个最小为 {0} 的值"),
		ipother: $.validator.format("请输入正确ip地址"),
		postcode: "请输入正确的邮编号码",
		alphanumeric: "字母、数字、下划线",
		lettersonly: "必须是字母",
		phone: "请输入正确的电话号码"
		
	});
	
	// jQuery validate
	$.extend($.validator.defaults, {
		  errorElement: 'span', //default input error message container
          errorClass: 'help-block help-block-error', // default input error message class
          focusInvalid: false, // do not focus the last invalid input
          ignore: "", // validate all fields including form hidden input
		  errorPlacement: function (error, element) { // render error placement for each input type
			  if(element.next('.help-block.help-block-error').length != 0)
			    	return;
			  
              if (element.parent(".input-group").size() > 0) {
                  error.insertAfter(element.parent(".input-group"));
              } else if (element.attr("data-error-container")) { 
                  error.appendTo(element.attr("data-error-container"));
              } else if (element.parents('.radio-list').size() > 0) { 
                  error.appendTo(element.parents('.radio-list').attr("data-error-container"));
              } else if (element.parents('.radio-inline').size() > 0) { 
                  error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
              } else if (element.parents('.checkbox-list').size() > 0) {
                  error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
              } else if (element.parents('.checkbox-inline').size() > 0) { 
                  error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
              } else {
                  error.insertAfter(element); // for other inputs, just perform default behavior
              }
          },

          highlight: function (element) { // hightlight error inputs
               $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
           },

           unhighlight: function (element) { // revert the change done by hightlight
               $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
           },

           success: function (label) {
               label.closest('.form-group').removeClass('has-error'); // set success class to the control group
           }
	});
	
})(jQuery);

