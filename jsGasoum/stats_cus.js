function statsCusToTable(){

    var fromDatePickerValue = document.getElementById("from_datepicker").value ;
    var toDatePickerValue   = document.getElementById("to_datepicker").value ;
    var fromDt = formatDateForMySQL(fromDatePickerValue);
    var toDt   = formatDateForMySQL(toDatePickerValue);

    //delete all previous data from the table
    if ( $.fn.dataTable.isDataTable( '#datatable1' ) ) {
        table = $('#datatable1').DataTable();
        table.clear();
    }

    var url_stat_service = serverURL + '/statsCus/allBetweenDates?from=' + fromDt + '&to=' + toDt;


    // AJAX MAGIC
    $.ajax({
        url: url_stat_service,
        dataType: "json",
        cache: true,
        success: function (data) {
        // data = JSON.parse(result);
        $.each(data, function (index, data) {
            // CALCULATE DATE FROM LAST VISIT
            /*
            ADD DAYS FROM LAST VISIT
            const date1 = Date.parse(new Date().toISOString().split('T')[0]);
            const date2 = Date.parse(data.dateLastVisit);
            const diffTime = Math.abs(date1 - date2);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            */
            $("#datatable1")
            .dataTable()
            .fnAddData(
                [
                data.id,
                data.fullname,
                '<a href="tel:' + data.mobile+ '">' + data.mobile  + '</a>',
                '<a href="mailto:' + data.email + '"' + ' target=\"_blank\" ' + '>' + data.email  + '</a>',
                data.sex,
                data.dtInsert,
                data.visits,
                formatMoney(data.amount)
                ],
                false
            );
        });
        // When second attribut of fnAddData == false, you need to fnDraw
        $("#datatable1").dataTable().fnDraw();
        },
        error: function(jqXHR, textStatus, errorThrown){
            write_to_log('Error stats_cus: statsCusToTable' + ' ' + textStatus + " - " + errorThrown);
            alert('Error gasoum: ' + textStatus + ' - ' + errorThrown);
        },
        failure: function(errMsg) {
            write_to_log('Failure stats_cus: statsCusToTable' + ' ' + errMsg);
            alert('Failure: Ο server δεν ανταποκρίθηκε');
        }
    });

}