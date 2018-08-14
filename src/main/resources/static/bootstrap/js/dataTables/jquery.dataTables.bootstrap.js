/* Set the defaults for DataTables initialisation */
$
		.extend(
				true,
				$.fn.dataTable.defaults,
				{
					// "dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6
					// col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5
					// col-sm-12'i><'col-md-7 col-sm-12'p>>", // default layout
					// with horizobtal scrollable datatable
					// "dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6
					// col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7
					// col-sm-12'p>>", // datatable layout without horizobtal
					// scroll(used when bootstrap dropdowns used in the
					// datatable cells)
					// "sPaginationType": "bootstrap",
					// "sDom": "<'table-scrollable't>r<'row
					// paginationRow'<'col-sm-1'l><'col-sm-3'i><'col-sm-8
					// text-right'p><'clearfix'>>",
					// "sDom": "<'table-scrollable't>r<'row
					// paginationRow'<'col-xs-2 col-sm-2'l><'col-xs-2
					// col-sm-3'i><'col-xs-8 col-sm-7
					// text-right'p><'clearfix'>>",
					// "sDom": "<'table-scrollable't>r<'row
					// paginationRow'<'col-sm-3'l><'col-sm-3'i><'col-sm-6
					// text-right'p><'clearfix'>>",
					"sDom" : "<'row'<'col-sm-4'l><'col-sm-8 text-right'i>><'table-scrollable't>r<'row'<'col-sm-12 text-right'p><'clearfix'>>",
					"oLanguage" : {
						"sLengthMenu" : "每页显示_MENU_条记录",
						"sInfo" : "当前显示 _START_ 到 _END_ 条 , 共<span class='badge badge-warning'>_TOTAL_</span>条数据",
						// "sInfo": "共 _TOTAL_ 条 &nbsp; ",
						"sInfoFiltered" : "(从 _MAX_ 条数据中检索)",
						"oPaginate" : {
							"sFirst" : "首页",
							"sPrevious" : "前一页",
							"sNext" : "后一页",
							"sLast" : "尾页"
						},
						"sProcessing" : "正在获取数据，请稍后...",
						"sZeroRecords" : "没有检索到数据",
						"sEmptyTable" : "没有检索到数据",
						"sInfoEmpty" : "总记录0"
					},
					"iDisplayLength" : 15,// 默认每页15条
					"aLengthMenu" : [ [ 15, 30, 50, 100 ], [ 15, 30, 50, 100 ] ],
					'bProcessing' : true,
					// 'bScrollCollapse':true,
					// 'sScrollX':'90%',
					// 'sScrollXInner':'110%',
					// "bAutoWidth": true,//自动宽度,
					'sPaginationType' : 'full_numbers',
					"bServerSide" : true,// 后台获取数据
					"fnServerData" : function(sSource, aoData, fnCallback,
							oSettings) {// 从服务器请求数据
						var data = $('#queryForm').serializeObject();
						data.aoData = JSON.stringify(aoData);
						oSettings.jqXHR = $
								.ajax({
									"url" : sSource,
									"data" : data,
									"type" : "POST",
									"dataType" : "json",
									"success" : function(json) {
										fnCallback(json);
										initListPage();
									},
									"cache" : false,
									"error" : function(xhr, error, thrown) {
										if (error == "parsererror") {
											console.log(xhr);
											console.log(thrown);
											oSettings.oApi
													._fnLog(
															oSettings,
															0,
															"DataTables warning: JSON data from "
																	+ "server could not be parsed. This is caused by a JSON formatting error.");
										}
									}
								});
					}
				});

/* Default class modification */
$.extend($.fn.dataTableExt.oStdClasses, {
	"sWrapper" : "dataTables_wrapper form-inline",
	"sFilterInput" : "form-control input-small input-inline",
	"sLengthSelect" : "form-control input-xsmall input-inline"
});

// In 1.10 we use the pagination renderers to draw the Bootstrap paging,
// rather than custom plug-in
$.fn.dataTable.defaults.renderer = 'bootstrap';
$.fn.dataTable.ext.renderer.pageButton.bootstrap = function(settings, host,
		idx, buttons, page, pages) {
	var api = new $.fn.dataTable.Api(settings);
	var classes = settings.oClasses;
	var lang = settings.oLanguage.oPaginate;
	var btnDisplay, btnClass;

	var attach = function(container, buttons) {
		var i, ien, node, button;
		var clickHandler = function(e) {
			e.preventDefault();
			if (e.data.action !== 'ellipsis') {
				api.page(e.data.action).draw(false);
			}
		};

		for (i = 0, ien = buttons.length; i < ien; i++) {
			button = buttons[i];

			if ($.isArray(button)) {
				attach(container, button);
			} else {
				btnDisplay = '';
				btnClass = '';

				switch (button) {
				case 'ellipsis':
					btnDisplay = '&hellip;';
					btnClass = 'disabled';
					break;

				case 'first':
					btnDisplay = lang.sFirst;
					btnClass = button + (page > 0 ? '' : ' disabled');
					break;

				case 'previous':
					btnDisplay = lang.sPrevious;
					btnClass = button + (page > 0 ? '' : ' disabled');
					break;

				case 'next':
					btnDisplay = lang.sNext;
					btnClass = button + (page < pages - 1 ? '' : ' disabled');
					break;

				case 'last':
					btnDisplay = lang.sLast;
					btnClass = button + (page < pages - 1 ? '' : ' disabled');
					break;

				default:
					btnDisplay = button + 1;
					btnClass = page === button ? 'active' : '';
					break;
				}

				if (btnDisplay) {
					node = $(
							'<li>',
							{
								'class' : classes.sPageButton + ' ' + btnClass,
								'aria-controls' : settings.sTableId,
								'tabindex' : settings.iTabIndex,
								'id' : idx === 0 && typeof button === 'string' ? settings.sTableId
										+ '_' + button
										: null
							}).append($('<a>', {
						'href' : '#'
					}).html(btnDisplay)).appendTo(container);

					settings.oApi._fnBindAction(node, {
						action : button
					}, clickHandler);
				}
			}
		}
	};

	attach($(host).empty().html('<ul class="pagination"/>').children('ul'),
			buttons);
}

/*
 * TableTools Bootstrap compatibility Required TableTools 2.1+
 */
if ($.fn.DataTable.TableTools) {
	// Set the classes that TableTools uses to something suitable for Bootstrap
	$.extend(true, $.fn.DataTable.TableTools.classes, {
		"container" : "DTTT btn-group",
		"buttons" : {
			"normal" : "btn btn-default",
			"disabled" : "disabled"
		},
		"collection" : {
			"container" : "DTTT_dropdown dropdown-menu",
			"buttons" : {
				"normal" : "",
				"disabled" : "disabled"
			}
		},
		"print" : {
			"info" : "DTTT_Print_Info"
		},
		"select" : {
			"row" : "active"
		}
	});

	// Have the collection use a bootstrap compatible dropdown
	$.extend(true, $.fn.DataTable.TableTools.DEFAULTS.oTags, {
		"collection" : {
			"container" : "ul",
			"button" : "li",
			"liner" : "a"
		}
	});
}

/*******************************************************************************
 * Custom Pagination
 ******************************************************************************/

/* API method to get paging information */
$.fn.dataTableExt.oApi.fnPagingInfo = function(oSettings) {
	return {
		"iStart" : oSettings._iDisplayStart,
		"iEnd" : oSettings.fnDisplayEnd(),
		"iLength" : oSettings._iDisplayLength,
		"iTotal" : oSettings.fnRecordsTotal(),
		"iFilteredTotal" : oSettings.fnRecordsDisplay(),
		"iPage" : oSettings._iDisplayLength === -1 ? 0 : Math
				.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength),
		"iTotalPages" : oSettings._iDisplayLength === -1 ? 0 : Math
				.ceil(oSettings.fnRecordsDisplay() / oSettings._iDisplayLength)
	};
};

/* Bootstrap style full number pagination control */
$
		.extend(
				$.fn.dataTableExt.oPagination,
				{
					"bootstrap_full_number" : {
						"fnInit" : function(oSettings, nPaging, fnDraw) {
							var oLang = oSettings.oLanguage.oPaginate;
							var fnClickHandler = function(e) {
								e.preventDefault();
								if (oSettings.oApi._fnPageChange(oSettings,
										e.data.action)) {
									fnDraw(oSettings);
								}
							};

							$(nPaging)
									.append(
											'<ul class="pagination">'
													+ '<li class="prev disabled"><a href="#" title="'
													+ oLang.sFirst
													+ '"><i class="fa fa-angle-double-left"></i></a></li>'
													+ '<li class="prev disabled"><a href="#" title="'
													+ oLang.sPrevious
													+ '"><i class="fa fa-angle-left"></i></a></li>'
													+ '<li class="next disabled"><a href="#" title="'
													+ oLang.sNext
													+ '"><i class="fa fa-angle-right"></i></a></li>'
													+ '<li class="next disabled"><a href="#" title="'
													+ oLang.sLast
													+ '"><i class="fa fa-angle-double-right"></i></a></li>'
													+ '</ul>');
							var els = $('a', nPaging);
							$(els[0]).bind('click.DT', {
								action : "first"
							}, fnClickHandler);
							$(els[1]).bind('click.DT', {
								action : "previous"
							}, fnClickHandler);
							$(els[2]).bind('click.DT', {
								action : "next"
							}, fnClickHandler);
							$(els[3]).bind('click.DT', {
								action : "last"
							}, fnClickHandler);
						},

						"fnUpdate" : function(oSettings, fnDraw) {
							var iListLength = 5;
							var oPaging = oSettings.oInstance.fnPagingInfo();
							var an = oSettings.aanFeatures.p;
							var i, j, sClass, iStart, iEnd, iHalf = Math
									.floor(iListLength / 2);

							if (oPaging.iTotalPages < iListLength) {
								iStart = 1;
								iEnd = oPaging.iTotalPages;
							} else if (oPaging.iPage <= iHalf) {
								iStart = 1;
								iEnd = iListLength;
							} else if (oPaging.iPage >= (oPaging.iTotalPages - iHalf)) {
								iStart = oPaging.iTotalPages - iListLength + 1;
								iEnd = oPaging.iTotalPages;
							} else {
								iStart = oPaging.iPage - iHalf + 1;
								iEnd = iStart + iListLength - 1;
							}

							for (i = 0, iLen = an.length; i < iLen; i++) {
								if (oPaging.iTotalPages <= 0) {
									$('.pagination', an[i]).css('visibility',
											'hidden');
								} else {
									$('.pagination', an[i]).css('visibility',
											'visible');
								}

								// Remove the middle elements
								$('li:gt(1)', an[i]).filter(':not(.next)')
										.remove();

								// Add the new list items and their event
								// handlers
								for (j = iStart; j <= iEnd; j++) {
									sClass = (j == oPaging.iPage + 1) ? 'class="active"'
											: '';
									$(
											'<li ' + sClass + '><a href="#">'
													+ j + '</a></li>')
											.insertBefore(
													$('li.next:first', an[i])[0])
											.bind(
													'click',
													function(e) {
														e.preventDefault();
														oSettings._iDisplayStart = (parseInt(
																$('a', this)
																		.text(),
																10) - 1)
																* oPaging.iLength;
														fnDraw(oSettings);
													});
								}

								// Add / remove disabled classes from the static
								// elements
								if (oPaging.iPage === 0) {
									$('li.prev', an[i]).addClass('disabled');
								} else {
									$('li.prev', an[i]).removeClass('disabled');
								}

								if (oPaging.iPage === oPaging.iTotalPages - 1
										|| oPaging.iTotalPages === 0) {
									$('li.next', an[i]).addClass('disabled');
								} else {
									$('li.next', an[i]).removeClass('disabled');
								}
							}
						}
					}
				});

/* Bootstrap style full number pagination control */
$
		.extend(
				$.fn.dataTableExt.oPagination,
				{
					"bootstrap_extended" : {
						"fnInit" : function(oSettings, nPaging, fnDraw) {
							var oLang = oSettings.oLanguage.oPaginate;
							var oPaging = oSettings.oInstance.fnPagingInfo();

							var fnClickHandler = function(e) {
								e.preventDefault();
								if (oSettings.oApi._fnPageChange(oSettings,
										e.data.action)) {
									fnDraw(oSettings);
								}
							};

							$(nPaging)
									.append(
											'<div class="pagination-panel"> '
													+ oLang.page
													+ ' '
													+ '<a href="#" class="btn btn-sm default prev disabled" title="'
													+ oLang.previous
													+ '"><i class="fa fa-angle-left"></i></a>'
													+ '<input type="text" class="pagination-panel-input form-control input-mini input-inline input-sm" maxlenght="5" style="text-align:center; margin: 0 5px;">'
													+ '<a href="#" class="btn btn-sm default next disabled" title="'
													+ oLang.next
													+ '"><i class="fa fa-angle-right"></i></a> '
													+ oLang.pageOf
													+ ' <span class="pagination-panel-total"></span>'
													+ '</div>');

							var els = $('a', nPaging);

							$(els[0]).bind('click.DT', {
								action : "previous"
							}, fnClickHandler);
							$(els[1]).bind('click.DT', {
								action : "next"
							}, fnClickHandler);

							$('.pagination-panel-input', nPaging)
									.bind(
											'change.DT',
											function(e) {
												var oPaging = oSettings.oInstance
														.fnPagingInfo();
												e.preventDefault();
												var page = parseInt($(this)
														.val());
												if (page > 0
														&& page <= oPaging.iTotalPages) {
													if (oSettings.oApi
															._fnPageChange(
																	oSettings,
																	page - 1)) {
														fnDraw(oSettings);
													}
												} else {
													$(this).val(
															oPaging.iPage + 1);
												}
											});

							$('.pagination-panel-input', nPaging)
									.bind(
											'keypress.DT',
											function(e) {
												var oPaging = oSettings.oInstance
														.fnPagingInfo();
												if (e.which == 13) {
													var page = parseInt($(this)
															.val());
													if (page > 0
															&& page <= oSettings.oInstance
																	.fnPagingInfo().iTotalPages) {
														if (oSettings.oApi
																._fnPageChange(
																		oSettings,
																		page - 1)) {
															fnDraw(oSettings);
														}
													} else {
														$(this)
																.val(
																		oPaging.iPage + 1);
													}
													e.preventDefault();
												}
											});
						},

						"fnUpdate" : function(oSettings, fnDraw) {
							var iListLength = 5;
							var oPaging = oSettings.oInstance.fnPagingInfo();
							var an = oSettings.aanFeatures.p;
							var i, j, sClass, iStart, iEnd, iHalf = Math
									.floor(iListLength / 2);

							if (oPaging.iTotalPages < iListLength) {
								iStart = 1;
								iEnd = oPaging.iTotalPages;
							} else if (oPaging.iPage <= iHalf) {
								iStart = 1;
								iEnd = iListLength;
							} else if (oPaging.iPage >= (oPaging.iTotalPages - iHalf)) {
								iStart = oPaging.iTotalPages - iListLength + 1;
								iEnd = oPaging.iTotalPages;
							} else {
								iStart = oPaging.iPage - iHalf + 1;
								iEnd = iStart + iListLength - 1;
							}

							for (i = 0, iLen = an.length; i < iLen; i++) {
								var wrapper = $(an[i]).parents(
										".dataTables_wrapper");

								if (oPaging.iTotal <= 0) {
									$(
											'.dataTables_paginate, .dataTables_length',
											wrapper).hide();
								} else {
									$(
											'.dataTables_paginate, .dataTables_length',
											wrapper).show();
								}

								if (oPaging.iTotalPages <= 0) {
									$(
											'.dataTables_paginate, .dataTables_length .seperator',
											wrapper).hide();
								} else {
									$(
											'.dataTables_paginate, .dataTables_length .seperator',
											wrapper).show();
								}

								$('.pagination-panel-total', an[i]).html(
										oPaging.iTotalPages);
								$('.pagination-panel-input', an[i]).val(
										oPaging.iPage + 1);

								// Remove the middle elements
								$('li:gt(1)', an[i]).filter(':not(.next)')
										.remove();

								// Add the new list items and their event
								// handlers
								for (j = iStart; j <= iEnd; j++) {
									sClass = (j == oPaging.iPage + 1) ? 'class="active"'
											: '';
									$(
											'<li ' + sClass + '><a href="#">'
													+ j + '</a></li>')
											.insertBefore(
													$('li.next:first', an[i])[0])
											.bind(
													'click',
													function(e) {
														e.preventDefault();
														oSettings._iDisplayStart = (parseInt(
																$('a', this)
																		.text(),
																10) - 1)
																* oPaging.iLength;
														fnDraw(oSettings);
													});
								}

								// Add / remove disabled classes from the static
								// elements
								if (oPaging.iPage === 0) {
									$('a.prev', an[i]).addClass('disabled');
								} else {
									$('a.prev', an[i]).removeClass('disabled');
								}

								if (oPaging.iPage === oPaging.iTotalPages - 1
										|| oPaging.iTotalPages === 0) {
									$('a.next', an[i]).addClass('disabled');
								} else {
									$('a.next', an[i]).removeClass('disabled');
								}
							}
						}
					}
				});