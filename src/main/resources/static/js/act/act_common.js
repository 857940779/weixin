/*cmdSaveStep1 = /!*[[@{/actmanager/save}]]*!/'Sebastian';
cmdSaveStep2 = /!*[[@{/resdetail/saveDetail}]]*!/'Sebastian';
cmdSaveStep3 = /!*[[@{/actmanager/saveRule}]]*!/'Sebastian';
cmdSaveStep4 = /!*[[@{/resdetail/saveData}]]*!/'Sebastian';

//回显请求
cmdView =  /!*[[@{/actmanager/actview}]]*!/'Sebastian';
cmdViewRes = /!*[[@{/resdetail/resview}]]*!/'Sebastian';
cmdViewRestype = /!*[[@{/actmanager/restype}]]*!/'Sebastian';

cmdModuleSaveStep2 = /!*[[@{/actmanager/saveMould}]]*!/'Sebastian';
cmdModuleType = /!*[[@{/actmanager/querytype}]]*!/'Sebastian';
cmdCollect =  /!*[[@{/resdetail/collect}]]*!/'Sebastian';

//自建活动专属URL
//删除所有资源信息
cmdDeleteData = /!*[[@{/resdetail/deletedata}]]*!/'Sebastian';*/

var actId = 0;

var totalSign_Mould = "totalSignMould";
var luckDraw_Mould = "luckDraw";
var bigWheel_Mould = "bigWheel";

var stepForm1 = "validation-step1";
var stepForm2 = "validation-step2";
var stepForm3 = "validation-step3";

var message_finished = "活动配置完成,可继续执行工单流程发起审核!";

jQuery(function($) {

    //日期插件
    $('.form_datetime').datetimepicker({
        language:  'zh-CN',
        weekStart: 0,
        todayBtn:  1,
        autoclose: 1,
        format:"yyyy-mm-dd hh:ii:ss",
        forceParse: true
    });

    $('.form_day_datetime').datetimepicker({
        language: 'zh-CN',  //日期
        weekStart: 0,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        format: "yyyy-mm-dd"      //格式化日期
    });

    $('[data-rel=tooltip]').tooltip();

    //select2样式
    $(".select2").css('width','200px').select2({allowClear:true})
        .on('change', function(){
            $(this).closest('form').validate().element($(this));
        });

    releaseChange();

    //根据活动模版类型初始化向导页面
    mouldCodeChange();

});

<!--  活動保存数据start   -->
var save_ActManage = false;
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
                //保存活动返回活动对象
                $("#id").val(act.id);
                $("input[name='actId']").val(act.id);
                actId = act.id;
                save_ActManage = true;
                return true;
            }else{
                //alert("保存失败，请稍后重试！");
                failsave(json.msg);
                return false;
            }
        }
    });
}

//保存资源总量信息
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
                return true;
            }else{
                failsave(json.msg);
                //alert("保存资源总量失败，请稍后重试");
                return false;
            }
        }
    });
}

<!--  活動保存数据end  -->


/**
 * 根据活动类型或模版类型展示页面
 */
var mouldCode = null;
function mouldCodeChange() {

    /*switch(mouldCode){
        case totalSign_Mould:
            $(formName+"tr[name='dataTr']").each(function (i,obj) {
                if(i<number){
                    let childrenObj = $(obj).children();
                    childrenObj.children(".day").val("");
                    childrenObj.children(".resId").val("");
                    childrenObj.children(".resType").val(0);
                    childrenObj.children(".resCode").val("");

                    childrenObj.children(".restype-content").html("");

                    childrenObj.find(".value").val("");
                    childrenObj.children(".number").val(1);


                }else{
                    $(obj).remove();
                }
            });
            break;
        default:
            $(formName+"div[name='actResDetail']").each(function (i,obj) {
                $(obj).remove();
            });
            $(formName+"#allpr").val(0);
    }*/
    /*var wizard = $('#fuelux-wizard').data("wizard").constructor;
    $("#fuelux-wizard").children("ul:eq(0)").children("li:eq(1)").attr("data-target","#step2");
    $("#fuelux-wizard").children("ul:eq(0)").children("li:eq(2)").attr("data-target","#step3");*/
    /*var firstUlId = $("#fuelux-wizard").children("ul:eq(0)").id;
    exChangeSteps("wizard-steps");

    var typeList = document.getElementsByName("MOULD");
    for(var i=0 ;i<typeList.length;i++){
        typeList[i].style.display="none";
    }*/

    //获得活动模版类型
    mouldCode = $("#mouldCode").val();

    if(mouldCode!=="" && mouldCode!==undefined){
        /*if(mouldCode === totalSign_Mould){
            //todo 模版转换需要完整删除上个模版的信息
            exChangeSteps("totalSignMould_steps");
        }*/

        $.ajax({
            "dataType": 'json',
            "type": "POST",
            "url": cmdModuleType,
            "data": {"type":mouldCode},
            "success": function(data){
                var json = eval(data);
                if(json.status==="SUCCESS") {
                    var typeList = json.data;
                    if(typeList!==null){
                        for(var i=0;i<typeList.length;i++){
                            var $type = $("div[MOULDTYPE='"+typeList[i]+"']");
                            $type.show();
                        }
                    }
                }
                return true;
            },
            "error" : function(){
                return false;
            }
        });
    }
}

/**
 * 活动发放资源日期设置方法
 * @param releaseDate 发放日期
 */
function releaseChange(releaseDate) {

    if(releaseDate!=null){

        $("input[name='releaseType'][value='true']").attr("checked","true");
        $("input[name='releaseDate']").val(newDate(releaseDate).Format("yyyy-MM-dd"));
        $("input[name='releaseDate']").show();
    }else{
        var releaseType = $("input[name='releaseType'][value='true']");
        var checked = releaseType[0].checked;

        if(checked){
            $("input[name='releaseDate']").show();
        }else{
            $("input[name='releaseDate']").hide();
            $("#releaseDate-error").remove();
        }
    }
    //$("input[name='releaseDate']").css("display")!=="none"
    if(!$("input[name='releaseDate']").is(":hidden")){
        var endTime = $("input[name='endtime']");
        $("input[name='releaseDate']").rules("add",{required:true,date:true});
        $("input[name='releaseDate']").datetimepicker('setStartDate', newDate(endTime).Format("yyyy-MM-dd"));
    }else{
        $("input[name='releaseDate']").val("");
        $("input[name='releaseDate']").rules("remove");
    }

}

/**
 * 活动模板的文件上传。带有MOULDCONF熟悉的input元素被认为是活动模板文件
 */
$('input[MOULDCONF]').on('change',function(){

    var me = $(this);
    var mouldConf = me.attr("MOULDCONF");
    var mouldConfDesc = me.attr("MOULDCONFDESC");
    var fileElementId = mouldConf;
    var mouldValues = '#' + mouldConf + 'Values';
    var mouldImg = '#' + mouldConf + 'Img';

    var picName = this.value;
    $.ajaxFileUpload({
        url : '/fileupload?source=2',
        type : 'POST',
        fileElementId : fileElementId,  //这里对应html中上传file的id
        success: function(data){
            var str = $(data).find("body").text();//获取返回的字符串
            var json = $.parseJSON(str);//把字符串转化为json对象
            if(json.status=='SUCCESS' || json.status=='success'){
                $(mouldValues).val(picName);
                $(mouldValues).attr(mouldConf+"ID",json.data.id);
                $(mouldImg).attr("src",json.data.url );
            }
            else{
                alert("上传" + mouldConfDesc +"失败!");
            }
        },
        error: function(){
            alert("上传" + mouldConfDesc +"失败!");
        }
    });
});

/**
 * 资源选中事件
 */
function resTypeChange(obj){

    var id = obj.id;     //资源id
    var num =id.replace(/[^0-9]/ig,"");
    var formName = convertFormName(stepForm2);
    if(obj.value === ""){
        $(formName+'.restype-content'+num).html("");
        return ;
    }
    let isNoused = $(formName+"#resnumber"+num)[0].style.display;
    if(isNoused === "none"){
        $(formName+"#resnumber"+num).show();
    }

    var resType = $(formName+"#resType"+num).val();
    selectRestype(resType,num,null);
    changeResCode(obj);
}

/**
 *  根据资源类型展现列表
 */
function selectRestype(resType,num,para) {

    //fixme 活动回显会重复请求,后面的查询请求会被拦截
    var formName = convertFormName(stepForm2);
    $(formName+"#resType"+num).find("option[value='0']").remove();
    $.ajax({
        "dataType": 'json',
        "type": "GET",
        "async": false,
        "url": cmdViewRestype,
        "data":{"resType":resType},
        "success": function(data){
            var json = eval(data);
            if(json.status==="SUCCESS"){
                let obj=json.data;
                //给予资源id
                $(formName+"input[id='resId"+num+"']").val(obj.id);
                //$(formName+"input[id='resnumber"+num+"']").show();
                if(obj.resTypes.length === 0){
                    //document.getElementById("resunit"+num).innerText = "个";
                }else{
                    //设置资源类型单位
                    //document.getElementById("resunit"+num).innerText = ParamTool.getParamName("RESUNIT",obj.unit);
                    $(formName+"input[id='resunit"+num+"']").innerText = ParamTool.getParamName("RESUNIT",obj.unit);
                }

                //创建js模版,导入数据,添加html标签
                var object =[{obj:obj,num:num}];
                var restypeHtml = $("#tmpl-resType").tmpl(object);
                $(formName+"div[id='restype-content"+num+"']").html(restypeHtml);


                //如果是谢谢参与则不予设置面值和数量
                if(obj.type === "Nouse" || obj.type === null){
                    //document.getElementById("resnumber"+num).style.visibility = "hidden";
                    //document.getElementById("resunit"+num).innerText ="Ge";
                    //$("#restype-content"+num).html("");
                    $(formName+"input[id='resnumber"+num+"']").hide();
                    $(formName+"input[id='resunit"+num+"']").innerText ="Ge";
                    $(formName+"div[id='restype-content"+num+"']").html("");
                    return;
                }else{
                    $(formName+"input[id='resnumber"+num+"']").rules("add",{required:true,min:1,digits:true,messages:{min:"数量不能小于等于0!",digits:"请输入正确的整数!"}});
                }

                if(para !== null){
                    if(obj.resTypes.length === 0){
                        $(formName+"input[id='resvalue"+num+"']").val(para);
                    }else{
                        $(formName+"input[id='resName"+num+"']").val(para);
                    }
                }

            }
        },
        "error": "请求失败！"
    });
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
 * 资源明细整合总量
 * @returns {boolean}
 */
function collect() {
    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "url": cmdCollect,
        "data":{"actId":actId},
        "success": function(data){
            var json = eval(data);
            if(json.status==="SUCCESS"){
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

                    desc = desc.substring(0,desc.lastIndexOf("\r\n"));
                    $("#resdesc").val(desc);

                }else{
                    alert("该活动资源设置异常,请稍后再次编辑提交，防止审核错误!")
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

<!--  公共方法start   -->

//初始化ace向导
function initWizard() {

    var step1_swith = true; //表单校验开关
    var step2_swith = true; //表单校验开关
    var step3_swith = true; //表单校验开关
    var step4_swith = true;
    //ace页面向导插件配置
    $('#fuelux-wizard').ace_wizard().on('change' , function(e, info){

        if(info.direction === "previous"){
            return true;
        }

        if(info.step === 1 && step1_swith ) {
            return save("validation-step1");
        }

        if(info.step === 2 && step2_swith ) {
            return save2("validation-step2");
        }

        if(info.step === 3 && step3_swith){
            return save3("validation-step3");
        }

        if(info.step === 4 && step4_swith){
            return saveResData("validation-res-form");
        }
        /*if(info.step === 5){

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
        }*/

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

    });
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

//根据向导层次构建表单名
function convertFormName(formname) {

    let formName = "" ;
    switch(mouldCode){
        case totalSign_Mould:
            formName = "#"+formname+"_"+mouldCode;
            break;
        case luckDraw_Mould:
        case bigWheel_Mould:
            formName = "#"+formname;
            break;
        default:
            formName = "#"+formname+"_"+mouldCode;
    }
    return formName+" ";
}

//预览打开活动页面
function openActUrl() {
    var actUrl = $("#acturl").attr("title");
    window.open(actUrl);
}

<!--  公共方法end  -->