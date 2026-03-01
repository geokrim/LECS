function statsShow(){

    stat_totals();


   // --------------- TODO ????
   // stat_sales();
   // stat_categ_services();
   // stat_categ_stock();
   // stat_poeple();
   // statsSalesToTable();

}



function stat_totals(){

    document.getElementById("stats_total_tameio_sales").innerHTML  = '0,00 €';
    document.getElementById("stats_total_tameio_esoda").innerHTML  = '0,00 €';
    document.getElementById("stats_total_tameio_exoda").innerHTML  = '0,00 €';
    document.getElementById("stats_total_tameio_profit").innerHTML = '0,00 €';
    document.getElementById("stats_total_perc_profit").innerHTML   = '0,00 %';
    document.getElementById("stats_total_perc_exoda").innerHTML    = '0,00 %';


    var fromDatePickerValue = document.getElementById("from_datepicker").value ;
    var toDatePickerValue   = document.getElementById("to_datepicker").value ;
    var fromDt = formatDateForMySQL(fromDatePickerValue);
    var toDt   = formatDateForMySQL(toDatePickerValue);
    var total_sales         = 0.00;
    var total_esoda         = 0.00;
    var total_exoda         = 0.00;
    var total_profit        = 0.00;
    var total_prrofit_perc  = 0.00;
    var total_exoda_perc    = 0.00;

    // --------------- TOTAL_SALES ---------------
    var url_stat_sales = serverURL + '/statsSaleMain/allBetweenDatesGroupByDate?from=' + fromDt + '&to=' + toDt;
    // AJAX MAGIC
    $.ajax({
        url: url_stat_sales,
        dataType: "json",
        cache: true,
        success: function (data) {
        // data = JSON.parse(result);
        $.each(data, function (index, data) {
            if(data.dt == '2100-01-01'){
                total_sales = data.totAmount;
                total_sales = total_sales.toLocaleString('de-DE', {
                    style: 'currency', 
                    currency: 'EUR', 
                    minimumFractionDigits: 2 
                });
                document.getElementById("stats_total_tameio_sales").innerHTML  = total_sales ;
            }
        });
        },
        error: function(jqXHR, textStatus, errorThrown){
            write_to_log('Error stats_sales stat_totals' + ' ' + textStatus + " - " + errorThrown);
            alert('Error gasoum: ' + textStatus + ' - ' + errorThrown);
        },
        failure: function(errMsg) {
            write_to_log('Failure stats_sales: stat_totals' + ' ' + errMsg);
            alert('Failure: Ο server δεν ανταποκρίθηκε');
        }
    });
    // ---------------TOTAL_ESODA, TOTAL_EXODA, TOTAL_PROFIT ---------------
    var url_stat_sales = serverURL + '/statsCash/allBetweenDatesGroupByDate?from=' + fromDt + '&to=' + toDt;
    // AJAX MAGIC
    $.ajax({
        url: url_stat_sales,
        dataType: "json",
        cache: true,
        success: function (data) {
        // data = JSON.parse(result);
        $.each(data, function (index, data) {
            if(data.dt == '2100-01-01'){
                total_esoda = data.esoda_metrita_karta;
                total_esoda = total_esoda.toLocaleString('de-DE', {
                    style: 'currency', 
                    currency: 'EUR', 
                    minimumFractionDigits: 2 
                });
                total_exoda = data.eksoda_metrita_karta;
                total_exoda = total_exoda.toLocaleString('de-DE', {
                    style: 'currency', 
                    currency: 'EUR', 
                    minimumFractionDigits: 2 
                });
                total_profit = data.total_metrita_karta;
                total_profit = total_profit.toLocaleString('de-DE', {
                    style: 'currency', 
                    currency: 'EUR', 
                    minimumFractionDigits: 2 
                });

                if(data.total_metrita_karta != 0){
                    total_prrofit_perc = data.total_metrita_karta / data.esoda_metrita_karta;
                    total_prrofit_perc = total_prrofit_perc.toLocaleString('de-DE', {
                        style: 'percent',
                        minimumFractionDigits: 2 
                    });

                    total_exoda_perc = 1 - (data.total_metrita_karta / data.esoda_metrita_karta);
                    total_exoda_perc = total_exoda_perc.toLocaleString('de-DE', {
                        style: 'percent',
                        minimumFractionDigits: 2 
                    });
                }
                
                document.getElementById("stats_total_tameio_esoda").innerHTML  = total_esoda;
                document.getElementById("stats_total_tameio_exoda").innerHTML  = total_exoda;
                document.getElementById("stats_total_tameio_profit").innerHTML = total_profit;
                document.getElementById("stats_total_perc_profit").innerHTML   = total_prrofit_perc;
                document.getElementById("stats_total_perc_exoda").innerHTML    = total_exoda_perc;
            }
        });
        },
        error: function(jqXHR, textStatus, errorThrown){
            write_to_log('Error stats_sales statsSalesToTable' + ' ' + textStatus + " - " + errorThrown);
            alert('Error gasoum: ' + textStatus + ' - ' + errorThrown);
        },
        failure: function(errMsg) {
            write_to_log('Failure stats_sales: statsSalesToTable' + ' ' + errMsg);
            alert('Failure: Ο server δεν ανταποκρίθηκε');
        }
    });
}




function stat_sales(){
    console.log('In stat_sales');
}


function stat_categ_services(){
    console.log('In stat_categ_services');

}
function stat_categ_stock(){
    console.log('In stat_categ_stock');

}
function stat_poeple(){
    console.log('In stat_poeple');

}

function initializeDates(){
    // INITIALIZE  DATES TO TODAY
    var currentDate = new Date();  
    $("#from_datepicker").datepicker("setDate",currentDate);
    $("#to_datepicker").datepicker("setDate",currentDate);

}


