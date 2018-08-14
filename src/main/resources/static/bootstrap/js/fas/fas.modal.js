$(function() {
	window.KNModal = function() {
		var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
		var alr = $("#ycf-alert");
		var ahtml = alr.html();

		// 关闭时恢复 modal html 原样，供下次调用时 replace 用
		// var _init = function () {
		// alr.on("hidden.bs.modal", function (e) {
		// $(this).html(ahtml);
		// });
		// }();

		/* html 复原不在 _init() 里面做了，重复调用时会有问题，直接在 _alert/_confirm 里面做 */

		var _alert = function(options) {
			alr.html(ahtml); // 复原
			alr.find('.ok').removeClass('btn-success').addClass('btn-primary');
			alr.find('.cancel').hide();
			
			
			if(typeof options=='string' && options.constructor==String){
				options = {"msg":options};
			}
			
			_dialog(options);

			return {
				on : function(callback) {
					if (callback && typeof callback == 'function') {
						alr.find('.ok').click(function() {
							callback(true)
						});
					}
					/**
					 * if (callback && callback instanceof Function) {
					 * alr.find('.ok').click(function () { callback(true) }); }
					 */
				}
			};
		};

		var _confirm = function(options) {
			alr.html(ahtml); // 复原
			alr.find('.ok').removeClass('btn-primary').addClass('btn-success');
			alr.find('.cancel').show();
			_dialog(options);

			return {
				on : function(callback) {
					if (callback && typeof callback == 'function') {
						alr.find('.ok').click(function() {
							callback(true)
						});
						alr.find('.cancel').click(function() {
							callback(false)
						});
					}

					/**
					 * 判断函数方法有误 if (callback && callback instanceof Function) {
					 * alr.find('.ok').click(function () { callback(true) });
					 * alr.find('.cancel').click(function () { callback(false)
					 * }); }
					 */
				}
			};
		};

		var _dialog = function(options) {
			var ops = {
				msg : "提示内容",
				title : "操作提示",
				btnok : "确定",
				btncl : "取消"
			};

			$.extend(ops, options);

			var html = alr.html().replace(reg, function(node, key) {
				return {
					Title : ops.title,
					Message : ops.msg,
					BtnOk : ops.btnok,
					BtnCancel : ops.btncl
				}[key];
			});

			alr.html(html);
			alr.modal({
				width : 500,
				backdrop : 'static'
			});
		}

		
		var _data = '@JFModal.DATA';
		var showModal = function(options) {
			var frameSrc = options.frameSrc;// frameSrc:url地址
			var otitle = options.title;// 标题，
			var cssobj = options.modalCss;// modalCss：弹出框样式
			var cssifm = options.iframeCss;// iframe样式

			$('#GlobalModal').unbind("show.bs.modal");
			$('#GlobalModal').unbind("shown.bs.modal");
			$('#GlobalModal').unbind("hide.bs.modal");
			$('#GlobalModal').unbind("hidden.bs.modal");

			$("#GlobalModalIframe").attr("src", frameSrc);
			$('#GlobalModal').modal({
				show : true,
				backdrop : 'static'
			}).on('show.bs.modal', function() {
			}).on('shown.bs.modal', function() {
			}).on('hide.bs.modal', function() {
			}).on('hidden.bs.modal', options.callback);

			var _scrollHeight = $(document).scrollTop();
			var wHeight = $(window).height();
			var this_height;
			if (cssobj && cssobj["height"])
				this_height = cssobj["height"];
			else
				this_height = "450";

			var this_top = (wHeight - this_height) / 2 + _scrollHeight + "px";
			var this_top = (wHeight - this_height) / 2 + "px";
			var mycss = cssobj || {
				"width" : "800px",
				"height" : "450px",
				"top" : this_top
			};
			var myifmcss = cssifm || {};// iframe样式
			$('#GlobalModal .modal-dialog').css(mycss).find('.modal-content')
					.css({
						height : '100%',
						width : '100%'
					}).find('h4').html(otitle || "").end().find('.modal-body')
					.css({
						height : '85%'
					}).find("#GlobalModalIframe").css(myifmcss);
		};

		var hideModal = function() {
			$("#GlobalModal").modal('hide');
		};

		/** 获取 artDialog 可跨级调用的最高层的 window 对象 */
		var _top = function() {
			var top = window, test = function(name) {
				try {
					var doc = window[name].document; // 跨域|无权限
					doc.getElementsByTagName; // chrome 本地安全限制
				} catch (e) {
					return false;
				}
				;

				return window[name]._top
				// 框架集无法显示第三方元素
				&& doc.getElementsByTagName('frameset').length === 0;
			};

			if (test('top')) {
				top = window.top;
			} else if (test('parent')) {
				top = window.parent;
			}
			;
			return top;
		}();

		/**
		 * 跨框架数据共享接口
		 * 
		 * @see http://www.planeart.cn/?p=1554
		 * @param {String}
		 *            存储的数据名
		 * @param {Any}
		 *            将要存储的任意数据(无此项则返回被查询的数据)
		 */
		data = function(name, value) {
			var top = _top, cache = top[_data] || {};
			top[_data] = cache;

			if (value !== undefined) {
				cache[name] = value;
			} else {
				return cache[name];
			}
			;
			return cache;
		};

		/**
		 * 数据共享删除接口
		 * 
		 * @param {String}
		 *            删除的数据名
		 */
		removeData = function(name) {
			var cache = top[_data];
			if (cache && cache[name])
				delete cache[name];
		};

		return {
			alert : _alert,
			confirm : _confirm,
			open: showModal,
			close: hideModal,
			data:data,
			removeData:removeData
		}
	}();

});