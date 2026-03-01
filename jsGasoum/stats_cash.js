function statsCashToTable(){
    // console.log('statsCashToTable');

    var fromDatePickerValue = document.getElementById("from_datepicker").value ;
    var toDatePickerValue   = document.getElementById("to_datepicker").value ;
    var fromDt = formatDateForMySQL(fromDatePickerValue);
    var toDt   = formatDateForMySQL(toDatePickerValue);

    //delete all previous data from the table
    if ( $.fn.dataTable.isDataTable( '#datatable1' ) ) {
        table = $('#datatable1').DataTable();
        table.clear();
    }

    var url_stat_sales = serverURL + '/statsCash/allBetweenDatesGroupByDate?from=' + fromDt + '&to=' + toDt;
    // GROUP BY DATE
    if (statsCashChooser == 1){
        url_stat_sales = serverURL + '/statsCash/allBetweenDatesGroupByDate?from=' + fromDt + '&to=' + toDt;
    }
    // GROUP BY MONTH
    if (statsCashChooser == 2){
        url_stat_sales = serverURL + '/statsCash/allBetweenDatesGroupByMonth?from=' + fromDt + '&to=' + toDt;
    }
    // GROUP BY YEAR
    if (statsCashChooser == 3){
        url_stat_sales = serverURL + '/statsCash/allBetweenDatesGroupByYear?from=' + fromDt + '&to=' + toDt;
    }

    data_graph_cash_esoda_metrita            = [];
    data_graph_cash_esoda_karta              = [];
    data_graph_cash_esoda_karta_metrita      = [];
    data_graph_cash_eksoda_metrita           = [];
    data_graph_cash_eksoda_karta             = [];
    data_graph_cash_eksoda_karta_metrita     = [];
    data_graph_cash_total_karta_metrita      = [];
    x_axis_labels = [];

    // AJAX MAGIC
    $.ajax({
        url: url_stat_sales,
        dataType: "json",
        cache: true,
        success: function (data) {
        // data = JSON.parse(result);
        $.each(data, function (index, data) {

            var dtStr = data.dt;
            if( dtStr.includes('2100')){
                dtStr = 'ΣΥΝΟΛΑ';
            }
            if(dtStr != 'ΣΥΝΟΛΑ'){
                // ADD DATA TO CHART
                data_graph_cash_esoda_metrita.push(data.esoda_metrita);  
                data_graph_cash_esoda_karta.push(data.esoda_karta);  
                data_graph_cash_esoda_karta_metrita.push(data.esoda_metrita_karta);  
                data_graph_cash_eksoda_metrita.push(data.eksoda_metrita);  
                data_graph_cash_eksoda_karta.push(data.eksoda_karta);  
                data_graph_cash_eksoda_karta_metrita.push(data.eksoda_metrita_karta);  
                data_graph_cash_total_karta_metrita.push(data.total_metrita_karta);  
                x_axis_labels.push(dtStr);  
            }


            $("#datatable1")
            .dataTable()
            .fnAddData(
                [
                data.id,
                dtStr,
                formatMoney(data.esoda_metrita),
                formatMoney(data.esoda_karta),
                formatMoney(data.esoda_metrita_karta),
                formatMoney(data.eksoda_metrita),
                formatMoney(data.eksoda_karta),
                formatMoney(data.eksoda_metrita_karta),
                formatMoney(data.total_metrita),
                formatMoney(data.total_karta),
                formatMoney(data.total_metrita_karta)
                ],
                false
            );
        });
        // When second attribut of fnAddData == false, you need to fnDraw
        $("#datatable1").dataTable().fnDraw();
        // ACTIVATE IT
        initializeCashChart();
        },
        error: function(jqXHR, textStatus, errorThrown){
            write_to_log('Error stats_cash statsCashToTable' + ' ' + textStatus + " - " + errorThrown);
            alert('Error gasoum: ' + textStatus + ' - ' + errorThrown);
        },
        failure: function(errMsg) {
            write_to_log('Failure stats_cash: statsCashToTable' + ' ' + errMsg);
            alert('Failure: Ο server δεν ανταποκρίθηκε');
        }
    });



}
function initializeDates(){
    // INITIALIZE  DATES TO TODAY
    var currentDate = new Date();  
    $("#from_datepicker").datepicker("setDate",currentDate);
    $("#to_datepicker").datepicker("setDate",currentDate);

}



function statsCashDailySelected(){
    document.getElementById("dailyStats").checked = true;
    document.getElementById("monthlyStats").checked = false;
    document.getElementById("yearlyStats").checked    = false;
    statsCashChooser = 1;
    // GET SALE STATS DAILY
    statsCashToTable();

  }
  function statsCashMonthlySelected(){
    document.getElementById("dailyStats").checked = false;
    document.getElementById("monthlyStats").checked = true;
    document.getElementById("yearlyStats").checked    = false;    
    statsCashChooser = 2;
    // GET SALE STATS MONTLYY
    statsCashToTable();

  }
  function statsCashYearlySelected(){
    document.getElementById("dailyStats").checked = false;
    document.getElementById("monthlyStats").checked = false;
    document.getElementById("yearlyStats").checked    = true;    
    statsCashChooser = 3;
    // GET SALE STATS DAILY
    statsCashToTable();
  }


//---------- SALES CHART

function initializeCashChart(){

  
    var label_graph_cash_esoda_metrita           = 'Έσοδα Μετρητά';
    var label_graph_cash_esoda_karta             = 'Έσοδα Κάρτα';
    var label_graph_cash_esoda_metrita_karta     = 'Έσοδα Μετρητά-Κάρτα';
    var label_graph_cash_eksoda_metrita          = 'Έξοδα Μετρητά ';
    var label_graph_cash_eksoda_karta            = 'Έξοδα Κάρτα';
    var label_graph_cash_eksoda_metrita_karta    = 'Έξοδα Μετρητά-Κάρτα';
    var label_graph_cash_total_metrita_karta     = 'Σύνολο Μετρητά-Κάρτα';

    $("canvas#cashChart").remove();
    $("div#cashChartDiv").append('<canvas id="cashChart" width="400" height="300"></canvas>');
  
    var ctx = document.getElementById('cashChart').getContext('2d');
      var myChart = new Chart(ctx, {
          type: 'line',
          data: {
             labels: x_axis_labels,
              datasets: [{
                  label: label_graph_cash_esoda_metrita,
                  data: data_graph_cash_esoda_metrita,
                  backgroundColor: [
                      'rgba(17, 240, 100, 0.2)'
                  ],
                  borderColor: [
                      'rgba(7, 240, 100,  1)'
                  ],
                  hidden: true,
                  borderWidth: 1
              },
              {
                  label: label_graph_cash_esoda_karta,
                  data: data_graph_cash_esoda_karta,
                  backgroundColor: [
                      'rgba(10, 161, 65, 0.2)'
                  ],
                  borderColor: [
                      'rgba(10, 161, 65,  1)'
                  ],
                  hidden: true,
                  borderWidth: 1
              },
              {
                  label: label_graph_cash_esoda_metrita_karta,
                  data: data_graph_cash_esoda_karta_metrita,
                  backgroundColor: [
                      'rgba(6, 100, 40, 0.2)'
                  ],
                  borderColor: [
                      'rgba(6, 100, 40, 1)'
                  ],
                  hidden: true,
                  borderWidth: 1
              },

              {
                label: label_graph_cash_eksoda_metrita,
                data: data_graph_cash_eksoda_metrita,
                backgroundColor: [
                    'rgba(247, 11, 50, 0.2)'
                ],
                borderColor: [
                    'rgba(247, 11, 50,  1)'
                ],
                hidden: true,
                borderWidth: 1
            },
            {
                label: label_graph_cash_eksoda_karta,
                data: data_graph_cash_eksoda_karta,
                backgroundColor: [
                    'rgba(185, 7, 40, 0.2)'
                ],
                borderColor: [
                    'rgba(185, 7, 40, 1)'
                ],
                hidden: true,
                borderWidth: 1
            },
            {
                label: label_graph_cash_eksoda_metrita_karta,
                data: data_graph_cash_eksoda_karta_metrita,
                backgroundColor: [
                    'rgba(135, 5, 26, 0.2)'
                ],
                borderColor: [
                    'rgba(135, 5, 26,  1)'
                ],
                hidden: true,
                borderWidth: 1
            },
            {
                label: label_graph_cash_total_metrita_karta,
                data: data_graph_cash_total_karta_metrita,
                backgroundColor: [
                    'rgba(67, 147, 193, 0.2)'
                ],
                borderColor: [
                    'rgba(67, 147, 193,  1)'
                ],
                borderWidth: 1
            }

            ]
          },
          options: {
            legend: {
                display: false
            },
            responsive: true,
            maintainAspectRatio: false,
              scales: {
                    xaxes: {
                        ticks: {
                            autoSkip: false,
                            maxRotation: 60,
                            minRotation: 60
                        }
                      },
                      yaxes: {
                        title: {
                          display: true,
                          text: 'Αξία'
                        }
                      }
                    }
          }
      });

      myChart.update();
  
  }


  function addSalesDataChart(myChart) {

    myChart.update();
  }