/*var cmdSaveStep1 = "/actmanager/save";
var cmdModuleSaveStep2 = "/actmanager/saveMould";
var cmdCollect = "/resdetail/collect";
var cmdSaveStep2 = "/resdetail/saveDetail";
var cmdSaveStep3 = "/actmanager/saveRule";
var cmdSaveStep4 = "/resdetail/saveData";

var cmdView = "/actmanager/actview";
var cmdViewRes = "/resdetail/resview";
var cmdViewRestype = "/actmanager/restype";

var cmdModuleType = "/actmanager/querytype";
var cmdDelError= "/actmanager/delerroract";*/


jQuery(function($) {

    var id = $("#id").val();
    if(id!=="" && id!==null && id!==0){

        actId = id;//设置全局变量活动id
        var rule = null;
        /*活动基本信息回显*/
        $.ajax({
            "dataType": 'json',
            "type": "POST",
            "async": false,
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
                    $("textarea[name='actdesc']").val(actManager.actdesc);
                    $("select[name='scheid']").val(actManager.scheid).trigger("change");
                    $("textarea[name='resdesc']").val(actManager.resdesc);
                    $("input[name='acturl']").attr("value",actManager.acturl);
                    $("select[name='province']").val(actManager.province).trigger("change");

                    //回显奖品资源发放日期
                    releaseChange(actManager.releaseDate);

                    <!--  回显关联用户组信息start   -->
                    var groupIds = actManager.groupIds;

                    $("#validation-step1 button[name='actTaGroup']").attr("class","btn btn-success btn-sm");
                    $("#validation-step1 button[name='actTaGroup']").text("已配置");

                    $("#groupIds").val(groupIds.toString());

                    <!--  回显关联用户组信息end   -->

                    <!--  回显模版信息start   -->
                    var module= actManager.moduleVo;

                    if(module!==null && module!==undefined){

                        for(let conf in module){
                            if(conf === "picCnf"){
                                let moduleConf = module[conf];
                                for(let value in moduleConf){
                                    $("#"+value+"Values").attr(value+"ID",moduleConf[value].id);
                                    $("#"+value+"Img").attr("src",moduleConf[value].url);
                                }
                            }
                            if(conf === "textCnf"){
                                let moduleConf = module[conf];
                                for(let value in moduleConf){
                                    $("#"+value).val(moduleConf[value]);
                                }
                            }
                        }
                    }
                    <!--  /回显模版信息end -->

                    <!--  回显规则信息start   -->
                    rule = actManager.ruleVo;
                    //console.log(rule);
                    // 控制台打印输出： Object {xxx,xxx }
                    if(rule !== null && rule!==undefined){
                        for(var conf in rule){
                            var ruleConf = rule[conf];

                            //获取表单id
                            let formName = convertFormName(stepForm3);

                            switch(mouldCode){
                                case totalSign_Mould:
                                    var confs = $(formName+"input[name='"+conf+"']");
                                    break;
                                default:
                                    var confs = $(formName+"input[name='"+conf+"']");
                            }

                            if(confs.length===1){
                                $("input[name='"+conf+"']").val(ruleConf);
                            }else{
                                for(var r=0;r<confs.length;r++){
                                    if(confs[r]["value"] === ruleConf){
                                        confs[r]["checked"]=true;
                                    }
                                }
                            }
                        }
                    }
                    <!--  /回显规则信息end   -->

                }else{
                    failsave(json.msg);
                    //alert("活动信息回显失败！");
                }
            },
            "error": "请求失败！"
        });

        <!--        活动奖品资源回显start       -->
        $.ajax({
            "dataType": 'json',
            "type": "POST",
            "async": false,
            "url": cmdViewRes,
            "data":{"actId":id},
            "success": function(data){
                var json = eval(data);
                if(json.status==="SUCCESS"){
                    var actResList = json.data;
                    debugger;
                    if(actResList !== null && actResList !== undefined){

                        let formName = convertFormName(stepForm2);
                        let signRuleList = eval(rule["signinRule"]);
                        for(let s =0;s<signRuleList.length;s++){
                            var index = s;
                            var length = $(formName+"tr[name='dataTr']").length;

                            var signMap = signRuleList[s]; //签到活动规则和资源设置
                            var resId = signMap["actResId"];//活动资源id
                            var day = signMap["day"];//活动累计签到天数
                            var ruleIndex = signMap["ruleIndex"];

                            //签到活动第一行是固定的
                            if(length<=index){
                                let clone = addTr();
                                clone.children().children(".day").val(day);
                            }else{
                                $(formName+"input[id='day"+index+"']").val(day);
                            }

                            let i = ruleIndex-1;
                            if(actResList[i].resType.parent.type!=="0"){
                                //代表该类型有父类 例如 60min
                                $(formName+"#resType"+index).val(actResList[i].resType.parent.type);
                                selectRestype(actResList[i].resType.parent.type,index,actResList[i].resType.id);
                            }else{
                                //代表该类型没有父类 例如 流量，时长
                                $(formName+"#resType"+index).val(actResList[i].resType.type);
                                selectRestype(actResList[i].resType.type,index,actResList[i].value);
                            }

                            $(formName+"input[id='resId"+index+"']").val(actResList[i].resType.id);
                            $(formName+"input[id='resCode"+index+"']").val(actResList[i].resCode);
                            $(formName+"input[id='resnumber"+index+"']").val(actResList[i].number);

                            /*
                            for(let i =0;i<actResList.length;i++){
                                if(resId === actResList[i].resType.id+""){
                                    if(actResList[i].resType.parent.type!=="0"){
                                        //代表该类型有父类 例如 60min
                                        $(formName+"#resType"+index).val(actResList[i].resType.parent.type);
                                        selectRestype(actResList[i].resType.parent.type,index,actResList[i].resType.id);
                                    }else{
                                        //代表该类型没有父类 例如 流量，时长
                                        $(formName+"#resType"+index).val(actResList[i].resType.type);
                                        selectRestype(actResList[i].resType.type,index,actResList[i].value);
                                    }

                                    $(formName+"input[id='resId"+index+"']").val(actResList[i].resType.id);
                                    $(formName+"input[id='resCode"+index+"']").val(actResList[i].resCode);
                                    $(formName+"input[id='resnumber"+index+"']").val(actResList[i].number);
                                    break;
                                }
                            }*/

                        }

                        /*switch(mouldCode){
                            case totalSign_Mould:

                                break;
                            default:
                                for(var i =0;i<actResList.length;i++){
                                    addObject();
                                    index = i+1;
                                    if(actResList[i].resType.parent.type!=="0"){
                                        //代表该类型有父类 例如 100M
                                        $(formName+"#resType"+index).val(actResList[i].resType.parent.type);
                                        selectRestype(actResList[i].resType.parent.type,index,actResList[i].resType.id);
                                    }else{
                                        //代表该类型没有父类 例如 流量，时长
                                        $(formName+"#resType"+index).val(actResList[i].resType.type);
                                        selectRestype(actResList[i].resType.type,index,actResList[i].value);
                                    }

                                    $(formName+"input[id='resId"+index+"']").val(actResList[i].resType.id);
                                    $(formName+"input[id='resCode"+index+"']").val(actResList[i].resCode);
                                    $(formName+"input[id='resnumber"+index+"']").val(actResList[i].number);
                                    $(formName+"input[id='respr"+index+"']").val(actResList[i].probability);
                                }
                        }*/
                    }

                    collectPr();
                }else{
                    failsave(json.msg);
                }
            },
            "error": "请求失败！"
        });
        <!--        活动奖品资源回显end       -->
    }

    initWizard();

});


<!--  活動保存数据start   -->

var save_ActResModule = false;
//保存资源(奖品)申请信息
function save2(formname) {

    var canSaveMould = false; //是否可以保存活动模板
    var formName = convertFormName(stepForm2);

    if (!$("#validation-step2_totalSignMould").valid()) return false;

    let list = [];
    $(formName+" tr[name='dataTr']").each(function (i,obj) {
        let signMap = {};
        let childrenObj = $(obj).children();
        let flag = false;
        signMap["day"] = childrenObj.children(".day").val();
        signMap["resId"] = childrenObj.children(".resId").val();
        signMap["value"] = childrenObj.find(".value").val();
        signMap["number"] = childrenObj.children(".number").val();
        signMap["resCode"]= childrenObj.children(".resCode").val();
        signMap["ruleIndex"] = i+1;
        if(signMap["day"].length === 0 || signMap["number"].length === 0 || signMap["resId"].length ===0){
            $(obj).remove();
        }else{
            list.push(signMap);
        }
    });

    let signinRuleMap = {};
    signinRuleMap["signinRule"] = list;

    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "async": false,
        "url": cmdSaveSiginRule,
        "data":{"signinRule":JSON.stringify(signinRuleMap),"actId":actId},
        "success": function(data){
            var json = eval(data);
            if(json.status=="SUCCESS"){
                canSaveMould = true;
                $("#validation-step3_totalSignMould [name='signinRule']").val(json.data);
                collect("validation-step2");
                //return true;
            }else{
                failsave(json.msg);
                //alert("保存奖品资源失败，请稍后重试！");
                return false;
            }
        },
        "error" : function(){
            failsave("保存奖品资源失败，请稍后重试");
            //alert("保存模板失败，请稍后重试");
        }
    });

    /*if(mouldCode === "totalSignMould"){

    }else{

        if (!$('#' + formname).valid()) return false;

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
                        canSaveMould = true;
                        collect("validation-step2");
                        //return true;
                    }else{
                        failsave(json.msg);
                        //alert("保存奖品资源失败，请稍后重试！");
                        return false;
                    }
                },
                "error" : function(){
                    failsave("保存奖品资源失败，请稍后重试");
                    //alert("保存模板失败，请稍后重试");
                }
            });

        }
    }*/
    /*保存活动模板开始*/
    if(canSaveMould === true){

        var paramObj = {};
        paramObj.id = actId;
        var actMouldConf = {};
        //包含MOULDCONF的dom即textarea类型的活动模型配置信息（文字）
        $("textarea[MOULDCONF]").each(function (i, obj) {
            var objDom = $(obj);
            if(objDom.val()!==undefined && objDom.val()!==""){
                actMouldConf[objDom.attr("name")] = objDom.val();
            }

        });
        //包含MOULDCONF的dom即input类型的活动模型配置信息（图片）
        $("input[MOULDCONF]").each(function (i, obj) {

            var objDom = $(obj);
            var mouldConf = objDom.attr("MOULDCONF");
            //var mouldConfDesc = objDom.attr("MOULDCONFDESC");
            console.log("mouldConf:"+mouldConf);
            var confValues = null;

            confValues = $('#'+mouldConf+'Values').attr(mouldConf+"ID");
            /*switch(mouldCode){
                case totalSign_Mould:
                    confValues = $('#'+mouldConf+'Values_totalSignMould').attr(mouldConf+"ID");
                    break;
                default:
                    confValues = $('#'+mouldConf+'Values').attr(mouldConf+"ID");
            }*/

            console.log("confValues:"+confValues);
            actMouldConf[mouldConf] = confValues;
        });
        paramObj.actMould =actMouldConf;
        console.log(paramObj);
        $.ajax({
            "dataType": 'json',
            "type": "POST",
            "async": false,
            "url": cmdModuleSaveStep2,
            //"data":JSON.stringify(paramObj),
            "data": paramObj,
            "success": function(data){
                flag = true;
                var json = eval(data);
                if(json.status==="SUCCESS"){

                    //显示活动链接
                    var actUrl = json.data;
                    if (actUrl.length>=60){
                        var s = actUrl.substr(0,60)+"....";
                    }
                    $("#acturl").attr("title",actUrl);
                    $("#acturl").text(s);

                    save_ActResModule = true;
                    return true;
                }else{
                    failsave(json.msg);
                    //alert("保存模板失败，请稍后重试！");
                    return false;
                }
            },
            "error" : function(){
                failsave("保存模板失败，请稍后重试！");
                //alert("保存模板失败，请稍后重试");
            }
        });
    }
    /*保存活动模板结束*/
}

var save_ActRule = false;
//保存活动规则
function save3(formname){

    var paramObj = {};
    paramObj.id = actId;
    var actRuleConf = {};
    //表单名
    var fromName = convertFormName(formname);

    actRuleConf["mouldCode"] = "totalSignMould";
    actRuleConf["signinRule"] = $(fromName+" [name='signinRule']").val();

    $(fromName+" label[RULECONF]").each(function (i,obj) {
        var objConf = $(obj);
        var ruleConf = objConf.attr("RULECONF");
        var confs= $("input[name='"+ ruleConf +"']");
        if(confs.length === 1){
            var conf = confs[0];
            actRuleConf[ruleConf] = (conf["value"]);
        }else{
            for(var r=0;r<confs.length;r++){
                if(confs[r]["checked"]===true){
                    actRuleConf[ruleConf] = confs[r]["value"] /*(confs[r]["value"] === "true")*/;
                }
            }
        }

        if(actRuleConf[ruleConf] === undefined){
            confs= $("select[name='"+ ruleConf +"']");
            actRuleConf[ruleConf] = confs[0].value;
        }
    });

    paramObj.actRole = actRuleConf;
    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "async": false,
        "url": cmdSaveStep3,
        "data": {"rule":JSON.stringify(paramObj)},
        "success": function(data){
            var json = eval(data);
            if(json.status=="SUCCESS"){
                save_ActRule = true ;
                return true;
            }else{
                //alert("保存规则失败，请稍后重试！");
                failsave(json.msg);
                return save_ActRule;
            }
        },
        "error" : function(){
            failsave("保存规则失败，请稍后重试");
            return false;
        }
    });

}

<!--  活動保存数据end   -->

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

        allPr += parseInt(value);

        if(allPr>100){
            /*
            top.bootbox.confirm("总概率不能超过100%", function (result) {
            });
            */
            resPrList[i].value = 0;
            allPr =  allPr - parseInt(value);
            $("#allpr").val(allPr);
            return false;
        }

    }

    $("#allpr").val(allPr);

}


var number = 1; //资源数据下标
var index = 0;  //限制添加奖品个数

//新增某规则
/*function addObject() {

    if(index >=10){
        alert("最多只能增加10个奖品信息");
        return false;
    }

    var detail = $("#actResDetail");
    var newDetail = detail.clone(true);
    newDetail.attr("id","actResDetail"+number);
    newDetail.attr("name","actResDetail");

    newDetail.find(".resType").attr("id","resType"+number);
    newDetail.find(".resType").attr("name","actResDetails["+number+"].resType.type");
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

    number=number+1;
    index=index+1;
}*/

//新增某规则
function addTr() {

    if(index >=10){
        alert("最多只能增加10个奖品信息");
        return false;
    }

    let clone = $(".detailTable_body tr:eq(1)").clone();

    clone.attr("name","dataTr");

    clone.find(".day").attr("id","day"+number);
    clone.find(".resId").attr("id","resId"+number);
    //clone.find(".resId").attr("name","actResDetails["+number+"].resType.id");
    clone.find(".resType").attr("id","resType"+number);
    //clone.find(".resType").attr("name","actResDetails["+number+"].resType.type");
    clone.find(".resCode").attr("id","resCode"+number);
    //clone.find(".resCode").attr("name","actResDetails["+number+"].resCode");
    clone.find(".restype-content").attr("id","restype-content"+number);
    clone.find(".number").attr("id","resnumber"+number);
    clone.find(".number").attr("name","number");
    //clone.find(".probability").attr("id","respr"+number);
    //clone.find(".probability").attr("name","actResDetails["+number+"].probability");
    clone.find(".unit").attr("id","resunit"+number);

    clone.appendTo($(".detailTable_body"));
    clone.show();


    //$("#day"+number).rules("add",{required:true,min:1,digits:true,messages:{min:"数量不能小于等于0!",digits:"请输入正确的整数!"}});
    //$("#resnumber"+number).rules("add",{required:true,min:1,digits:true,messages:{min:"数量不能小于等于0!",digits:"请输入正确的整数!"}});
    //$("#resType"+number).rules("add",{required:true,messages:{}});
    //clone.find(".day").rules("add",{required:true,min:1,digits:true,messages:{min:"数量不能小于等于0!",digits:"请输入正确的整数!"}});
    clone.find(".number").rules("add",{required:true,min:1,digits:true,messages:{min:"数量不能小于等于0!",digits:"请输入正确的整数!"}});
    number=number+1;
    index=index+1;

    return clone;
}


//删除某规则
/*function delObject(obj) {

    var del = $(obj);
    del.parent().parent(".row").remove();
    index = index -1;
}*/

function delTr(obj) {

    var del = $(obj);
    var delTr = del.parent().parent("tr");
    delTr.remove();
}

/*var actData;
function collectData() {
    actData = {}; //资源汇总数据map
    var actResDetails = $("div[name='actResDetail']");
    for(var i=0;i<actResDetails.length;i++){
        var actResData = new Object();
        var resCode = actResDetails[i].find(".resCode").val();
        if(resCode in actData){

        }else{
            actResData.resType.id = actResDetails[i].find(".resId").val();
            actResData.resType.name = actResDetails[i].find(".resType").text();
        }

    }

}*/

<!--  校验表单信息start   -->

//新增step2页面校验方法
var step2Vali = function () {
    $('#validation-step2').validate();
    var numbers = ".number";
    for(var i=0;i<numbers.length;i++){
        numbers[i].rules("add",{required:true,min:0,messages:{min:"数量不能小于0!"}});
    }
};

//校验表单信息
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
        /*mouldCode:{
            required: true
        },*/
        province:{
            required: true
        }
    },

    messages: {
        actname:{
            required:"请输入活动名称",
            maxlength:"字数不能超过20字"
        },
        acttheme:{
            required:"请输入活动主题",
            maxlength:"字数不能超过20字"
        },
        actdesc:{
            required:"请输入活动描述",
            maxlength:"字数不能超过200字"
        },
        begintime :"请选择正确的开始日期",
        endtime :"请选择正确的结束日期",
        mouldCode: "请选择活动模版"
    },

    highlight: function (e) {
        $(e).closest('.form-group').removeClass('has-info').addClass('has-error');
    },

    success: function (e) {
        $(e).closest('.form-group').removeClass('has-error').addClass('has-info');
        $(e).remove();
    }
});

//校验表单信息
$('#validation-step2').validate({
    errorElement: 'div',
    errorClass: 'help-block',
    focusInvalid: false,
    rules: {
        actdesc: {
            required: true,
            maxlength: 500
        },
        ruledesc: {
            required: true,
            maxlength: 500
        },
        allpr:{
            required: true,
            range:[100,100]
        }
    },
    
    messages: {
        actdesc:{
            required:"请输入活动描述",
            maxlength:"字数不能超过500字"
        },
        ruledesc:{
            required:"请输入规则描述",
            maxlength:"字数不能超过500字"
        },
        allpr:{
            range:"总概率要为100%"
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

//校验表单信息
$('#validation-step2_totalSignMould').validate({
    errorElement: 'div',
    errorClass: 'help-block',
    focusInvalid: false,
    rules: {
        actIntr:{
            required:true
        },
        actRuleIntr:{
            required:true
        }
    },
    messages: {

    },

    highlight: function (e) {
        $(e).closest('.form-group').removeClass('has-info').addClass('has-error');
    },

    success: function (e) {
        $(e).closest('.form-group').removeClass('has-error').addClass('has-info');
        $(e).remove();
    }
});

//校验表单信息
$('#validation-step3').validate({
    errorElement: 'div',
    errorClass: 'help-block',
    focusInvalid: false,
    rules: {
        defaultLotteryFrequency: {
            required: true,
            digits:true
        },
        totalLotteryFrequency: {
            required: true,
            digits:true
        }
    },

    messages: {
        defaultLotteryFrequency:"请输入正确的整数",
        totalLotteryFrequency:"请输入正确的整数"
    },

    highlight: function (e) {
        $(e).closest('.form-group').removeClass('has-info').addClass('has-error');
    },

    success: function (e) {
        $(e).closest('.form-group').removeClass('has-error').addClass('has-info');
        $(e).remove();
    }
});

//校验表单信息
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