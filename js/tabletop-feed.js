// test if Flash is installed
var hasFlash = false;
try {
	var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
	if(fo) hasFlash = true;
}
catch(e){
	if(navigator.mimeTypes ["application/x-shockwave-flash"] != undefined) hasFlash = true;
};

// begin main function
var jqueryNoConflict = jQuery;
jqueryNoConflict(document).ready(function(){
  initializeTabletopObject('1b1J_5QgjWu0_DZ9dxpotoWXgl0YEMAECnNOGEVPm_Gw'); /* published key of spreadsheet */
});

// pull data from published Google spreadsheet
function initializeTabletopObject(dataSpreadsheet){
	Tabletop.init({
			key: dataSpreadsheet,
			callback: writeTableWith,
			simpleSheet: true,
			debug: false
	});
}

// create table headers
function createTableColumns(){

    /* swap out the properties of mDataProp & sTitle to reflect
    the names of columns or keys you want to display.
    Remember, tabletop.js strips out spaces from column titles, which
    is what happens with the More Info column header */

    var tableColumns =   [
			{'mDataProp': 'project', 'sTitle': 'Project', sWidth: '12%'},
			{'mDataProp': 'goal', 'sTitle': 'Goal', sWidth: '14%'},
			{'mDataProp': 'objective', 'sTitle': 'Objective', 'sWidth': '44%'},
			{'mDataProp': 'amount', 'sTitle': 'Amount', 'sWidth': '7%', 'sClass': 'right'},
			{'mDataProp': 'investigator', 'sTitle': 'Investigator', 'sWidth': '7%'},
			{'mDataProp': 'status', 'sTitle': 'Status', sWidth: '8%'}
		];
    return tableColumns;
}

// custom TableTools buttons function for jQueryUI per http://iksela.tumblr.com/post/2727627360/display-tabletools-buttons-as-jqueryui-buttons
function formatTableToolsButton(node, icon) {
	$(node).removeClass('DTTT_button');
	$(node).button({icons: {primary: icon}});
	$('.DTTT_container').buttonset();
} 

// create the table container and object; DataTables-Demo example; jQueryUI styling
function writeTableWith(dataSource){

	jqueryNoConflict('#demo').html('<table id="demo-container" class="display compact" width="100%" cellspacing="0"></table>');
		
	var oTable = jqueryNoConflict('#demo-container').DataTable({

		'bJQueryUI': true,
		'bAutoWidth': false,

		'scrollY': '290',
		'scrollCollapse': true,
		'paging': false,
		
		/*
		 * TableTools and Search: filter 
		 * https://datatables.net/examples/basic_init/dom.html | http://www.blinkdata.com/datatables-sdom-property/ 
		 * http://datatables.net/forums/discussion/676/tabletools-used-alongwith-jquery-ui-1-7-2-custom-css 
		 * 'sDom': '<"top"iflp<"clear">>rt<"bottom"ip<"clear">>',
		 * 'sDom': '<"H"lfr>t<"F"ip>',  when bjQueryUI = true 
		 * 'sDom': 'lfrtip',  when bJQueryUI = false
		 */
		'sDom': '<"H"Tfr>t<"F"i>',

		'oTableTools': {
			"sSwfPath": "http://cdn.datatables.net/tabletools/2.2.3/swf/copy_csv_xls_pdf.swf",
			/* jQuery UI icon name map at http://roam.be/lab/jquery-ui-icon-name-map/ */
			"aButtons": [
				{
					"sExtends":	"print",
					"fnInit": function(node){formatTableToolsButton(node, 'ui-icon-print');}
				},
				{
					"sExtends": "csv",
					"sFileName": "2015ASPB.csv",
					"fnInit": function(node){formatTableToolsButton(node, 'ui-icon-note');}
				},
				{
					"sExtends": "pdf",
					"sPdfOrientation": "landscape",
					"sFileName": "2015ASPB.pdf",
					"fnInit": function(node){formatTableToolsButton(node, 'ui-icon-document');}
				}
			]
		},
		
		'aaData': dataSource,
		'aoColumns': createTableColumns()
		
	});

};

//define two custom functions (asc and desc) for string sorting
jQuery.fn.dataTableExt.oSort['string-case-asc']  = function(x,y) {
	return ((x < y) ? -1 : ((x > y) ?  0 : 0));
};

jQuery.fn.dataTableExt.oSort['string-case-desc'] = function(x,y) {
	return ((x < y) ?  1 : ((x > y) ? -1 : 0));
};