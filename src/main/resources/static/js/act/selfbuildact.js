/*
var cmdSaveStep1 = "/actmanager/save";
var cmdSaveDetail = "/resdetail/saveDetail";
var cmdSaveStep3 = "/actmanager/saveRule";
var cmdModuleSaveStep2 = "/actmanager/saveMould";
var cmdSaveData = "/resdetail/saveData";
var cmdView = "/actmanager/actview";
var cmdViewRes = "/resdetail/resview";
var cmdViewRestype = "/actmanager/restype";
var cmdCollect = "/resdetail/collect";
var cmdDelError= "/actmanager/delerroract";

var cmdModuleType = "/actmanager/querytype";
*/

var adId = 0;
var message_finished = "活动配置完成,可继续执行工单流程发起审核!";

jQuery(function($) {

    $('.form_datetime').datetimepicker({
        language:  'zh-CN',
        weekStart: 0,
        todayBtn:  1,
        autoclose: 1,
        format:"yyyy-mm-dd hh:ii:ss"
    });

    $('[data-rel=tooltip]').tooltip();

    $(".select2").css('width','200px').select2({allowClear:true})
        .on('change', function(){
            $(this).closest('form').validate().element($(this));
        });

    //全部用户勾选锁框
    $("#noCheck").change(function() {
        exChangeSteps();
    });

    var id = $("#id").val();

    if(id!=="" && id!==null && id!==0){
        /*活动基本信息回显*/
        $.ajax({
            "dataType": 'json',
            "type": "POST",
            "url": cmdView,
            "data":{"id":id},
            "success": function(data){
                var json = eval(data);
                if(json.status==="SUCCESS"){
                    var actManager = json.data;
                    $("input[name='actname']").val(actManager.actname);
                    $("input[name='acttheme']").val(actManager.acttheme);
                    $("input[name='begintime']").val(new Date(actManager.begintime).Format("yyyy-MM-dd hh:mm:ss"));
                    $("input[name='endtime']").val(new Date(actManager.endtime).Format("yyyy-MM-dd hh:mm:ss"));
                    $("input[name='acturl']").val(actManager.acturl);
                    $("textarea[name='actdesc']").val(actManager.actdesc);
                    $("select[name='scheid']").val(actManager.scheid).trigger("change");
                    $("input[name='actUrl']").val(actManager.acturl);
                    $("textarea[name='resdesc']").val(actManager.resdesc);
                    $("select[name='province']").val(actManager.province).trigger("change");

                }else{
                    failsave(json.msg);
                    return false;
                }
            },
            "error": "请求失败！"
        });
        /*活动奖品资源回显*/
        $.ajax({
            "dataType": 'json',
            "type": "POST",
            "url": cmdViewRes,
            "data":{"actId":id},
            "success": function(data){
                var json = eval(data);
                if(json.status==="SUCCESS"){
                    var actResList = json.data;
                    if(actResList !== null && actResList.length　!== 0){
                        for(var i =0;i<actResList.length;i++){
                            addObject();
                            if(actResList[i].resType.parent.type!=="0"){
                                //代表该类型有父类 例如 100M
                                $("#resType"+i).val(actResList[i].resType.parent.type);//.trigger("change")
                                selectRestype(actResList[i].resType.parent.type,i,actResList[i].resType.id);
                            }else{
                                //代表该类型没有父类 例如 流量，时长
                                $("#resType"+i).val(actResList[i].resType.type);
                                selectRestype(actResList[i].resType.type,i,actResList[i].value);
                            }

                            $("#resId"+i).val(actResList[i].resType.id);
                            $("#resCode"+i).val(actResList[i].resCode);
                            $("#resnumber"+i).val(actResList[i].number);
                            $("#respr"+i).val(actResList[i].probability);
                        }
                        collectPr();
                    }else{
                        $("#noCheck").attr("checked",true);
                        exChangeSteps();

                    }

                }else{
                    failsave(json.msg);
                    return false;
                }
            },
            "error": "请求失败！"
        });


    }


    var step1_swith = true; //表单校验开关
    var step2_swith = true; //表单校验开关
    var step3_swith = true;
    var step_flag = true;

    $('#fuelux-wizard').ace_wizard().on('change' , function(e, info){

        if(info.direction === "previous"){
            return true;
        }

        if(info.step === 1 && step1_swith ) {
            return save("validation-step1");
        }

        if(info.step === 2 && step2_swith ) {
            var check = $("#noCheck").is(':checked');
            if (check){
                deleteData(check);

                bootbox.dialog({
                    message: message_finished,
                    buttons: {
                        "success" : {
                            "label" : "OK",
                            "className" : "btn-sm btn-primary",
                            "callback": function () {
                                window.location.href = "/actmanager/page";
                            }
                        }
                    }
                });

                return false;
            }else{
                return save2("validation-step2");
            }

        }

        if(info.step === 3 && step3_swith){

            return saveResData("validation-res-form");

            /*
            if( save_ActManage && save_ActRes && save_ActResData){
                step_flag = false;
            }

            if(step_flag){
                $("#fuelux-wizard").children("ul:eq(0)").children("li:eq(4)").attr("data-target","#step5_fail");
                rollBackAct();
            }
            */
        }

        if(info.step === 4){

            bootbox.dialog({
                message: message_finished,
                buttons: {
                    "success" : {
                        "label" : "OK",
                        "className" : "btn-sm btn-primary",
                        "callback": function () {
                            window.location.href = "/actmanager/page";
                        }
                    }
                }
            });

            return false;
        }

    }).on('finished', function(e) {


        bootbox.dialog({
            message: message_finished,
            buttons: {
                "success" : {
                    "label" : "OK",
                    "className" : "btn-sm btn-primary",
                    "callback": function () {
                        window.location.href = "/actmanager/page";
                    }
                }
            }
        });

    }).on('stepclick', function(e){
        //return false;//prevent clicking on steps
    });

    //自建活动不配置活动资源删除所有资源信息
    function deleteData(check) {
        if(check){
            $.ajax({
                "dataType": 'json',
                "type": "POST",
                "url": cmdDeleteData,
                "data":{"actId":actId},
                "success": function(data){
                    var json = eval(data);
                    if(json.status=="SUCCESS"){
                        return true;
                    }else{
                        failsave(json.msg);
                        return false;
                    }
                }
            });
        }
    }

    $('#bannerpic, #bgpic').ace_file_input({
        no_file:'No File ...',
        btn_choose:'Choose',
        btn_change:'Change',
        droppable:false,
        onchange:null,
        thumbnail:true //| true | large
        //whitelist:'gif|png|jpg|jpeg'
        //blacklist:'exe|php'
        //onchange:''
        //
    });

});

/**
 * 互换向导页面集
 */
function exChangeSteps() {
    var firstUl = $("#fuelux-wizard").children("ul:eq(0)");
    var nextUl = firstUl.next();
    nextUl.after(firstUl);

    firstUl.hide();
    nextUl.show();
}

/**
 * 资源明细整合总量
 * @param formname
 * @returns {boolean}
 */
function collect(formname) {

    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "url": cmdCollect,
        "data":{"actId":actId},
        "success": function(data){
            var json = eval(data);
            if(json.status=="SUCCESS"){
                /*var obj = json.data;
                var object = [{obj:obj}];
                var resdataHtml = $("#tmpl-resData").tmpl(object);
                $("#resdata-content").html(resdataHtml);*/
                var dataList = json.data;
                $(document).find("tr[name='cloneTr']").remove();
                if(dataList.length !==0 && dataList!==undefined){
                    var desc = "您好!该活动一共申请了:"+"\r\n";
                    for(var i=0;i<dataList.length;i++){
                        var clone = $(".look_dataTable_body tr:last").clone();
                        clone.attr("name","cloneTr");

                        if(dataList[i].resType.parent.type === "0"){
                            clone.find("label[name='resType']").text(ParamTool.getParamName("RESTYPES",dataList[i].resType.type));
                            desc += dataList[i].resall + ParamTool.getParamName("RESUNIT",dataList[i].resType.unit) + ParamTool.getParamName("RESTYPES",dataList[i].resType.type) +"\r\n";
                        }else{
                            clone.find("label[name='resType']").text(ParamTool.getParamName("RESTYPES",dataList[i].resType.parent.type));
                            desc += dataList[i].resall + ParamTool.getParamName("RESUNIT",dataList[i].resType.unit) +dataList[i].resType.name+ ParamTool.getParamName("RESTYPES",dataList[i].resType.parent.type) +"\r\n";
                        }

                        clone.find("label[name='resName']").text(dataList[i].resType.name);
                        clone.find("label[name='resAll']").text(dataList[i].resall + ParamTool.getParamName("RESUNIT",dataList[i].resType.unit));

                        clone.find(".resCode").val(dataList[i].resCode);
                        clone.find(".resCode").attr("name","actResDataList["+ i + "].resCode");
                        clone.find(".resId").val(dataList[i].resType.id);
                        clone.find(".resId").attr("name","actResDataList["+ i + "].resType.id");
                        clone.find(".resall").val(dataList[i].resall);
                        clone.find(".resall").attr("name","actResDataList["+ i + "].resall");

                        //把colonel追加到父元素
                        clone.show();
                        clone.appendTo($(".look_dataTable_body"));
                    }
                    $("#resdesc").val(desc);
                }else{
                    alert("该活动总量错误,请稍后再次编辑提交，防止审核错误!")
                }
                return true;
            }else{
                //alert("保存失败，请稍后重试！");
                failsave(json.msg);
                return false;
            }
        }
    });

}


<!--  活動保存数据start   -->

var save_ActManage = false ;
//保存活动基础信息
function save(formname){
    if(!$('#'+formname).valid()) return false;
    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "async": false,
        "url": cmdSaveStep1,
        "data":$('#'+formname).serialize(),
        "success": function(data){
            var json = eval(data);
            if(json.status=="SUCCESS"){
                var act = json.data;
                $("#id").val(act.id);
                $("input[name='actId']").val(act.id);
                actId = act.id;
                //alert(actId);
                save_ActManage = true;

                return true;
            }else{
                //alert("保存失败，请稍后重试！");
                failsave(json.msg);
                return save_ActManage;
            }
        }
    });
}

var save_ActRes = false;
//保存资源(奖品)申请信息
function save2(formname) {

    if(!$('#'+formname).valid()) return false;

    var allType = 0;
    for(var i=1; i<10;i++){
        allType += parseInt($("#restype"+i).val());
    }
    if(allType == 0){
        top.bootbox.confirm("请至少添加一项奖品资源", function (result) {
        });
        return false;
    }else{

        $.ajax({
            "dataType": 'json',
            "type": "POST",
            "async": false,
            "url": cmdSaveStep2,
            "data":$('#'+formname).serialize(),
            "success": function(data){
                flag = true;
                var json = eval(data);
                if(json.status=="SUCCESS"){
                    save_ActRes = true;
                    collect("validation-step2");
                    return true;
                }else{
                    //alert("保存奖品资源失败，请稍后重试！");
                    failsave(json.msg);
                    return false;
                }
            }
        });

    }

}

var save_ActResData = false;
/**
 * 保存资源总量信息
 * @param formname
 * @returns {boolean}
 */
function saveResData(formname) {
    if (!$('#' + formname).valid()) return false;
    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "async": false,
        "url": cmdSaveStep4,
        "data":$('#'+formname).serialize(),
        "success": function(data){
            var json = eval(data);
            if(json.status=="SUCCESS"){
                //alert("保存成功");
                save_ActResData = true;
                return true;
            }else{
                failsave(json.msg);
                return save_ActResData;
            }
        }
    });
}

<!--  活動保存数据end   -->

/**
 * 资源选中事件
 */
function resTypeChange(obj){

    var id = obj.id;     //资源id
    var num =id.replace(/[^0-9]/ig,"");
    if(obj.value == ""){
        $('.restype-content'+num).html("");
        return ;
    }
    var isNoused = document.getElementById("resnumber"+num).style.visibility;
    if(isNoused == "hidden"){
        document.getElementById("resnumber"+num).style.visibility = "visible";
    }

    var resType = $("#resType" + num).val();

    selectRestype(resType,num,null);
    changeResCode(obj);
}

/**
 * 次级资源选中事件
 */
function changeResCode(obj) {
    var id = obj.id;     //资源id
    var num =id.replace(/[^0-9]/ig,"");

    var resCode = null;
    var name = $("#resName"+num).find("option:selected").text();
    var type = $("#resType"+num).val();
    var unit = $("#unit"+num).val();

    if(name!==undefined && name!==""){
        resCode = name +"."+type+"."+unit;
        $("#resId"+num).val($("#resName"+num).val());
    }else{
        resCode = type + "." + unit;
    }

    $("#resCode"+num).val(resCode);
}

/**
 *  根据资源类型展现列表
 */
function selectRestype(resType,num,para) {

    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "async": false,
        "url": cmdViewRestype,
        "data":{"resType":resType},
        "success": function(data){
            var json = eval(data);
            if(json.status=="SUCCESS"){
                var obj=json.data;
                //给予资源id
                $("#resId"+num).val(obj.id);
                if(obj.resTypes.length == 0){

                    if(obj.type == "Nouse"){
                        document.getElementById("resnumber"+num).style.visibility = "hidden";
                        document.getElementById("resunit"+num).innerText ="";
                        $('#restype-content'+num).html("");
                        return ;
                    }

                    document.getElementById("resunit"+num).innerText = "个";
                }else{
                    document.getElementById("resunit"+num).innerText = ParamTool.getParamName("RESUNIT",obj.unit);

                }
                var object =[{obj:obj,num:num}];

                var restypeHtml = $("#tmpl-resType").tmpl(object);
                $('#restype-content'+num).html(restypeHtml);

                $("#resvalue"+num).rules("add",{required:true,min:1,digits:true,messages:{min:"数量不能小于等于0!",digits:"请输入正确的整数!"}});

                if(para !=null){
                    if(obj.resTypes.length == 0){
                        $("#resvalue"+num).val(para);
                    }else{
                        $("#resName"+num).val(para);
                    }
                }

            }else{
                //alert("获取资源失败！");
            }
        },
        "error": "请求失败！"
    });
}

/**
 *  计算奖品总概率
 * @returns {boolean}
 */
function collectPr(){
    var allPr = 0;
    var reg =  /^[0-9]+.?[0-9]*$/;

    var resPrList = document.getElementsByClassName("probability");
    for(var i=1;i<resPrList.length;i++){
        var value = resPrList[i].value;
        /*if(!reg.test(value)){
            top.bootbox.confirm("请在文本框中输入正确数字!", function (result) {
            });
            return false;
        }*/
        allPr += parseInt(value);
        if(allPr>100){

            resPrList[i].value = 0;
            allPr =  allPr - parseInt(value);
            $("#allpr").val(allPr);
            return false;
        }
    }

    $("#allpr").val(allPr);

}

//保存失败提示方法
function failsave(msg) {
    bootbox.dialog({
        message: msg,
        buttons: {
            "success" : {
                "label" : "返回管理页面",
                "className" : "btn-primary",
                "callback": function () {
                    window.location.href = "/actmanager/page";
                }
            }
        }
    });
}

var number = 0;
var index = 0;
//新增某规则
function addObject() {

    if(index >=10){
        top.bootbox.confirm("最多只能增加10个奖品信息", function (result) {
        });
        return false;
    }

    var detail = $("#actResDetail");
    var newDetail = detail.clone(true);
    newDetail.attr("id","actResDetail"+number);
    newDetail.attr("name","actResDetailTr");

    newDetail.find(".resType").attr("id","resType"+number);
    newDetail.find(".resType").attr("name","actResDetails["+number+"].resType.type");
    //newDetail.find(".resType").attr("class","width-60 select2 resType");
    newDetail.find(".resId").attr("id","resId"+number);
    newDetail.find(".resId").attr("name","actResDetails["+number+"].resType.id");
    newDetail.find(".resCode").attr("id","resCode"+number);
    newDetail.find(".resCode").attr("name","actResDetails["+number+"].resCode");
    newDetail.find(".restype-content").attr("id","restype-content"+number);
    newDetail.find(".number").attr("id","resnumber"+number);
    newDetail.find(".number").attr("name","actResDetails["+number+"].number");
    newDetail.find(".probability").attr("id","respr"+number);
    newDetail.find(".probability").attr("name","actResDetails["+number+"].probability");
    newDetail.find(".unit").attr("id","resunit"+number);
    newDetail.show();

    var prize = $("#prize");
    prize.append(newDetail);

    $("#resnumber"+number).rules("add",{required:true,min:1,digits:true,messages:{min:"数量不能小于等于0!",digits:"请输入正确的整数!"}});
    $("#respr"+number).rules("add",{required:true,min:1,digits:true,messages:{min:"机率不能小于等于0!",digits:"请输入正确的整数!"}});
   /*
    $(".select2").css('width','200px').select2({allowClear:true})
        .on('change', function(){
            $(this).closest('form').validate().element($(this));
        });
    */

    number=number+1;
    index=index+1;

}

//删除某规则
function delObject(obj) {

    var del = $(obj);
    del.parent().parent(".row").remove();
    index = index -1;

}

<!--  校验表单信息start   -->

$('#validation-step1').validate({
    errorElement: 'div',
    errorClass: 'help-block',
    focusInvalid: false,
    rules: {
        actname: {
            required: true,
            maxlength: 20
        },
        acttheme: {
            required: true,
            maxlength: 20
        },
        actdesc: {
            required: true,
            maxlength: 200
        },
        begintime: {
            date:true,
            required: true
        },
        endtime: {
            date:true,
            required: true
        },
        acturl:{
            url:true,
            required:true
        },
        province:{
            required: true
        }
    },

    messages: {
        actname: {
            required:"请输入活动名称",
            maxlength: "字数不能超过20字"
        },
        acttheme: {
            required:"请输入活动主题",
            maxlength: "字数不能超过20字"
        },
        actdesc: {
            required:"请输入活动描述",
            maxlength: "字数不能超过200字"
        },
        begintime :"请选择正确的开始日期",
        endtime :"请选择正确的结束日期"
    },

    highlight: function (e) {
        $(e).closest('.form-group').removeClass('has-info').addClass('has-error');
    },

    success: function (e) {
        $(e).closest('.form-group').removeClass('has-error').addClass('has-info');
        $(e).remove();
    }
});

$('#validation-step2').validate({
    errorElement: 'div',
    errorClass: 'help-block',
    focusInvalid: false,
    rules: {
        allpr:{
            required: true,
            range:[100,100]
        }
    },

    messages: {
        allpr:"总概率要为100%"
    },

    highlight: function (e) {
        $(e).closest('.form-group').removeClass('has-info').addClass('has-error');
    },

    success: function (e) {
        $(e).closest('.form-group').removeClass('has-error').addClass('has-info');
        $(e).remove();
    }
});

$('#validation-res-form').validate({
    errorElement: 'div',
    errorClass: 'help-block',
    focusInvalid: false,
    rules: {
        resdesc: {
            required: true,
            maxlength: 200
        }
    },
    messages: {
        resdesc:{
            required:"资源申请描述不能为空",
            maxlength:"字数不能超过200字"
        }

    },

    highlight: function (e) {
        $(e).closest('.form-group').removeClass('has-info').addClass('has-error');
    },

    success: function (e) {
        $(e).closest('.form-group').removeClass('has-error').addClass('has-info');
        $(e).remove();
    }
});

<!--  校验表单信息end   -->