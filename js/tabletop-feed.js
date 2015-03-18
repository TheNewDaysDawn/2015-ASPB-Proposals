var jqueryNoConflict = jQuery;

// begin main function
jqueryNoConflict(document).ready(function(){
    initializeTabletopObject('1b1J_5QgjWu0_DZ9dxpotoWXgl0YEMAECnNOGEVPm_Gw');
});

// pull data from google spreadsheet
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

// create the table container and object; DataTables-Demo example; jQueryUI styling

function writeTableWith(dataSource){

    jqueryNoConflict('#demo').html('<table cellpadding="0" cellspacing="0" border="0" class="display table table-bordered table-striped" id="data-table-container"></table>');

    var oTable = jqueryNoConflict('#data-table-container').dataTable({

	    'renderer': "jqueryui",	
		'bJQueryUI': true,
		'bProcessing': true,
		'sPaginationType': 'full_numbers', 
        'aLengthMenu': [[ 5, 25, -1], [ 5, 25, "All"]],
        'iDisplayLength': 5,
		'bAutoWidth': false,

		// Place <Search:>, <Showing # to # of # entries>, <# records per page> at top of table
		// https://datatables.net/examples/basic_init/dom.html
		'sDom': '<"top"iflp<"clear">>rt<"bottom"ip<"clear">>',

        'aaData': dataSource,
        'aoColumns': createTableColumns(),
        'oLanguage': {
				"sLengthMenu": "_MENU_ records per page"
        }
	});
};

//define two custom functions (asc and desc) for string sorting
jQuery.fn.dataTableExt.oSort['string-case-asc']  = function(x,y) {
	return ((x < y) ? -1 : ((x > y) ?  0 : 0));
};

jQuery.fn.dataTableExt.oSort['string-case-desc'] = function(x,y) {
	return ((x < y) ?  1 : ((x > y) ? -1 : 0));
};