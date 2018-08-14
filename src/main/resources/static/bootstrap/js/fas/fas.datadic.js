
function ParamType(type,params){
	this.type = type; 
	this.params =params;
}

function ParamsUtil(cmdDictInit){
     this.dataSet = []; 
     this.getParamName = function(type,value){ 
    	 
     	 //console.log("getParamName"+type+"-"+value);
     	 var paramType = this.getParamType(type);
     	 if(paramType){
     	 	//console.log("found type"+type+"-"+value);
     	 }else{
     	 	//console.log("not found type"+type+ "_"+value);
     		paramType = this.loadParamType(type);
     	 }
     	 
     	 var paramName = "";
     	 if(paramType){
     	 	 $.each(paramType.params, function (n,param) {
     	 		if(param.value == ""+value){
     	 			paramName = param.name;
     	 			return false;
     	 		}
     	 	});
     	 }
         return paramName; 
     };
     
     this.getTranHtml = function(type,value){
    	 //console.log("getParamName"+type+"-"+value);
     	 var paramType = this.getParamType(type);
     	 if(paramType){
     	 	//console.log("found type"+type+"-"+value);
     	 }else{
     	 	//console.log("not found type"+type+ "_"+value);
     		paramType = this.loadParamType(type);
     	 }
     	 
     	 var html = "";
     	 if(paramType){
     	 	 $.each(paramType.params, function (n,param) {
     	 		if(param.value == ""+value){
     	 			html = param.html;
     	 			return false;
     	 		}
     	 	});
     	 }
         return html; 
     };
     
     this.getParamCode = function(type,value){ 
    	 
     	 //console.log("getParamName"+type+"-"+value);
     	 var paramType = this.getParamType(type);
     	 if(paramType){
     	 	//console.log("found type"+type+"-"+value);
     	 }else{
     	 	//console.log("not found type"+type+ "_"+value);
     		paramType = this.loadParamType(type);
     	 }
     	 
     	 var paramCode = "";
     	 if(paramType){
     	 	 $.each(paramType.params, function (n,param) {
     	 		if(param.name == value){
     	 			paramCode = param.value;
     	 			return false;
     	 		}
     	 	});
     	 }
         return paramCode; 
     };
     
     this.getParamType = function(type){
     	var $paramType = null;
 		$.each(this.dataSet, function (n,value) {
 			if(value){
 				var paramType = value;
 	       		if(paramType.type && paramType.type == type){
 	       			$paramType = paramType;
 	       			return false;
 	       		}
 			}
    	});
     	return $paramType;
     };

     this.loadParamType = function(type){
     	 var $paramType = null;
		 $.ajax({
				url : cmdDictInit,
				async : false, 
				type : "POST",
                data:{"dictCode":type},
				dataType : "json",
				success : function(data) {
                    var json = eval(data);
                    if(json.status=="SUCCESS"){
						var paramType = new ParamType(type,json.data);
						$paramType = paramType;
					}
				}
		 });
		 this.dataSet.push($paramType);
     	 return $paramType;
     }
} 
