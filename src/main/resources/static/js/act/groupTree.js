
jQuery(function($) {

    //全部用户勾选锁框
    $("#checkbox3").change(function() {
        if ($("#checkbox3").is(':checked')){
            disabledResourceTree();
        }else {
            enableResourceTree();
        }
    });
});

/**
 *  加载用户组树
 */
function loadRoleOfResourceTree() {
    $.ajax({
        url: cmdLoad,
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (data) {
            var json = eval(data);
            if (json.status == "SUCCESS") {
                resourceTreeConfig(json.data.treeNodes);
            } else {
                handleAjaxError(json);
            }
        }
    });
}

function resourceTreeConfig(data) {
    if ($('#resourceTree').jstree(true)) { //销毁当前资源权限树，
        $('#resourceTree').jstree(true).destroy();
    }

    //构造资源权限树
    var $jstree = $('#resourceTree')
        .jstree(
            {
                "core": {
                    "animation": 0,
                    "check_callback": true,
                    "data": data
                },
                /**'force_text' : true,**/
                'themes': {
                    'responsive': false,
                    'variant': 'large',
                    'stripes': true
                },
                "types": {
                    "#": {
                        "max_children": 1,
                        "max_depth": 4,
                        "valid_children": ["0", "1", "2", "default"]
                    },
                    "0": {
                        "icon": "ace-icon fa fa-home bigger-130 blue"
                    },
                    "1": {
                        "icon": "ace-icon fa fa-leaf bigger-130 green"
                    },
                    "2": {
                        "icon": "ace-icon fa  fa-hand-pointer-o bigger-130 blue"
                    },
                    "default": {
                        "icon": "glyphicon glyphicon-flash"
                    },
                    "file": {
                        "icon": "ace-icon fa fa-file icon-lg blue"
                    }
                },
                "checkbox": {
                    "three_state": true,
                    "cascade": false,
                    "keep_selected_style": false,
                    "real_checkboxes": true
                },
                "plugins": ["checkbox", "types", "wholerow", "wholerow", "search"]
            }).on("ready.jstree", function (e) {
        });
}

//应该是搜索吧
$(function () {
    $("#s").click(function (e) {
        e.preventDefault();
        $("#resourceTree").jstree(true).search($("#q").val());
    });
});

/**
 * 打开模态框的树
 * @param obj
 */
function openTree() {

    var groupIds = $("#groupIds").val();

    console.log(groupIds);

    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "url": cmdQueryTagroup,
        "data": {"groupIds": groupIds},
        "success": function (data) {
            var json = eval(data);
            if (json.status == "SUCCESS") {
                var tree = json.data.tree;

                if(tree === undefined){
                    loadRoleOfResourceTree();
                }else {
                    resourceTreeConfig(tree);
                }

                var allUser = json.data.allUser;

                if(allUser === 1 && actId !== 0 && actId!==undefined && actId!==""){
                    //页面加载完成后等待一段时间在执行js的方法
                    setTimeout(function () {
                        disabledResourceTree();
                    },200);

                    $("#checkbox3").prop("checked",true);
                }else {
                    $("#checkbox3").prop("checked",false);
                }


                $('#modal-form').modal('show');

            } else {
                alert("查找失败");
            }
        }
    });
}

/**
 * 保存模态框
 * @param obj
 */
function saveTree() {
    treeIds = doSaveResourceTree();
    treeIds = treeIds.substring(0,treeIds.length-1);

    if ($("#checkbox3").is(':checked')){
        $("#groupIds").val("");
        $("#validation-step1 button[name='actTaGroup']").attr("class","btn btn-success btn-sm");
        $("#validation-step1 button[name='actTaGroup']").text("已配置");
    }else{

        if(treeIds !== undefined || treeIds !== ""){
            $("#groupIds").val(treeIds);
            $("#validation-step1 button[name='actTaGroup']").attr("class","btn btn-success btn-sm");
            $("#validation-step1 button[name='actTaGroup']").text("已配置");
        }else{
            $("#validation-step1 button[name='actTaGroup']").attr("class","btn btn-light btn-sm");
            $("#validation-step1 button[name='actTaGroup']").text("未配置");
        }

    }


    $('#modal-form').modal('hide');
}

/**
 * 获取选中的节点
 * @returns {string}
 */
function doSaveResourceTree() {
    var ref = $('#resourceTree').jstree(true);

    //1、获取选中的资源权限node.id,(节点状态为undetermined和checked都被认为是选中)
    var resourceIds = "";
    ref.load_all(null, function (node, obj) {
        var allNodes = node.children_d;
        $.each(allNodes, function (i, value) {
            var node = ref.get_node(this);
            if ((ref.is_undetermined(node) || ref.is_checked(node))&& node.type == 2 ) {
                resourceIds += node.id.substring(1)+",";
            }
        });
    });
    return resourceIds;
}
//解锁树
function enableResourceTree() {
    $('#resourceTree').jstree(true).load_all(null, function(node, obj) {
        var allNodes = node.children_d;
        $.each(allNodes, function(i, value) {
            $('#resourceTree').jstree(true).enable_node(this);
        });
    });
}
//锁定树
function disabledResourceTree() {

    $('#resourceTree').jstree(true).load_all(null, function(node, obj) {
        var allNodes = node.children_d;
        $.each(allNodes, function(i, value) {
            $('#resourceTree').jstree(true).disable_node(this);
        });
    });

}