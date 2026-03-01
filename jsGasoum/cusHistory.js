function ajaxCusHistoryByCusIdToTable() {
   return  $.ajax({
        url: serverURL + '/cus/history?id=' + cus_id,
        dataType: 'json',
        cache: true,
        success: function(data) {  
            $("#cusHistory tbody tr").remove();
            var trHTML = '';
            $.each(data, function (i, item) {
                trHTML +=   '<tr><td>' + item.dt  + '</td>' +
                            '<td>' + item.typos  + '</td>' +
                            '<td>' + item.descr  + '</td>' +
                            '<td>' + item.usr  + '</td>' +
                            '<td>' + item.amount  + '</td></tr>';
             });
            $('#cusHistory').append(trHTML);
            // DataTables instantiation.
            // $("#cusVafeio" ).DataTable();
        },
        error: function(jqXHR, textStatus, errorThrown){
            write_to_log('Error cusVafi: ajaxCusHistoryByCusIdToTable' + ' ' + textStatus + " - " + errorThrown);
            alert('Error gasoum: ' + textStatus + ' - ' + errorThrown);
        },
        failure: function(errMsg) {
            write_to_log('Failure cusVafi: ajaxCusHistoryByCusIdToTable' + ' ' + errMsg);
            alert('Failure: Ο server δεν ανταποκρίθηκε');
        }
    });

}
async function executeCusHistoryByCusIdToTable() {
    try{
        const resShowProgressBar = await show_progress_line();
        const resCusVafiToTable  = await ajaxCusHistoryByCusIdToTable();
        const resHideProgressBar = await hide_progress_line();
    } catch(err){
        console.log(err);
    }
}

// -------------------------- CUS_HISTORY SHOW ON SALES, ACTIVE_TABS --------------------------
function cuslHistoryMainModalGetHistoryByCusIdForSales(cus_current_id) {

    // Remove previous data
    $("#cusHistoryTableSales tbody tr").remove();
  
    // AJAX MAGIC 
    $.ajax({
        url: serverURL + '/cus/history?id=' + cus_current_id,
        dataType: 'json',
        cache: true,
        success: function(data) {  
            var trHTML = '';
            $.each(data, function (i, item) {
                trHTML +=   '<tr><td>' + item.dt  + '</td>' +
                '<td>' + item.typos  + '</td>' +
                '<td>' + item.descr  + '</td>' +
                '<td>' + item.usr  + '</td>' +
                '<td>' + item.amount  + '</td></tr>';
             });
            $('#cusHistoryTableSales').append(trHTML);
        },
        error: function(jqXHR, textStatus, errorThrown){
            write_to_log('Error cusHistory: cuslHistoryMainModalGetHistoryByCusIdForSales' + ' ' + textStatus + " - " + errorThrown);
            alert('Error gasoum: ' + textStatus + ' - ' + errorThrown);
        },
        failure: function(errMsg) {
            write_to_log('Failure cusHistory: cuslHistoryMainModalGetHistoryByCusIdForSales' + ' ' + errMsg);
            alert('Failure: Ο server δεν ανταποκρίθηκε');
        }
        
    });

}