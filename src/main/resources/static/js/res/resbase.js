var resTypemap = {};
var durationMap = [];
var flowMap = [];
var rescardList = [];
cmdDic = /*[[@{/dict/query}]]*/'Sebastian';

resallmap = {};
var resTypUnit = new Object();
$(function () {
    $.ajax({
        type: "POST",
        url: cmdDic + "?dictCode=RESUNIT",
        success: function (data) {
            resTypUnit = data.data.dictDatas;
            $.ajax({
                type: "POST",
                url: cmdcardList,
                success: function (data) {
                    var data = eval('(' + data + ')');
                    resallmap = data;
                    var begain = {};
                    begain.id = "-1";
                    begain.name = "--请选择--";
                    flowMap[0] = begain;
                    durationMap[0] = begain;
                    var a = 1;
                    var b = 1;
                    $(data["all"]).each(function (index, value) {
                        $(".type").append("<option value=" + value.type + ">" + value.name + "</option>");
                    });
                    $(data["0"]).each(function (index, value) {
                        $(".typenocard").append("<option value=" + value.type + ">" + value.name + "</option>");
                        var type = value.type;
                        var unit = value.unit;
                        $(resTypUnit).each(function (index, value) {
                            if (value.dictdataValue == unit) {
                                resTypemap[type] = value.dictdataName;
                            }
                        })
                    })
                    $(data["Card"]).each(function (index, value) {
                        rescardList[index] = value.type;
                        $(data[value.type]).each(function (index, value) {
                            //资源类型卡券类型
                            $(".cardtypes").append("<option value=" + value.type + ">" + value.name + "</option>");
                        });
                    })
                }
            });
        }
    });

});