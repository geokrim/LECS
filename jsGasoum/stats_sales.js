function statsSalesToTable(){
    // console.log('statsSalesToTable');

    var fromDatePickerValue = document.getElementById("from_datepicker").value ;
    var toDatePickerValue   = document.getElementById("to_datepicker").value ;
    var fromDt = formatDateForMySQL(fromDatePickerValue);
    var toDt   = formatDateForMySQL(toDatePickerValue);

    //delete all previous data from the table
    if ( $.fn.dataTable.isDataTable( '#datatable1' ) ) {
        table = $('#datatable1').DataTable();
        table.clear();
    }

    var url_stat_sales = serverURL + '/statsSaleMain/allBetweenDatesGroupByDate?from=' + fromDt + '&to=' + toDt;
    // GROUP BY DATE
    if (statsSalesChooser == 1){
        url_stat_sales = serverURL + '/statsSaleMain/allBetweenDatesGroupByDate?from=' + fromDt + '&to=' + toDt;
    }
    // GROUP BY MONTH
    if (statsSalesChooser == 2){
        url_stat_sales = serverURL + '/statsSaleMain/allBetweenDatesGroupByMoth?from=' + fromDt + '&to=' + toDt;
    }
    // GROUP BY YEAR
    if (statsSalesChooser == 3){
        url_stat_sales = serverURL + '/statsSaleMain/allBetweenDatesGroupByYear?from=' + fromDt + '&to=' + toDt;
    }

    data_graph_sales_services  = [];
    data_graph_sales_stock     = [];
    data_graph_sales_total     = [];
    x_axis_labels              = [];

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
                data_graph_sales_services.push(data.serviceAmount);  
                data_graph_sales_stock.push(data.stckAmount);  
                data_graph_sales_total.push(data.totAmount);  
                x_axis_labels.push(dtStr);  
            }
            console.log('data.serviceAmount ' + (data.serviceAmount).toFixed(2) );

            $("#datatable1")
            .dataTable()
            .fnAddData(
                [
                data.id,
                dtStr,
                formatMoney(data.serviceAmount),
                formatMoney(data.stckAmount),
                formatMoney(data.totAmount),
                formatMoney(data.metrita),
                formatMoney(data.karta)
                ],
                false
            );
        });
        // When second attribut of fnAddData == false, you need to fnDraw
        $("#datatable1").dataTable().fnDraw();
        initializeSalesChart();
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




function statsSaleDailySelected(){
    document.getElementById("dailyStats").checked = true;
    document.getElementById("monthlyStats").checked = false;
    document.getElementById("yearlyStats").checked    = false;
    statsSalesChooser = 1;
    // GET SALE STATS DAILY
    statsSalesToTable();

  }
  function statsSaleMonthlySelected(){
    document.getElementById("dailyStats").checked = false;
    document.getElementById("monthlyStats").checked = true;
    document.getElementById("yearlyStats").checked    = false;    
    statsSalesChooser = 2;
    // GET SALE STATS MONTLYY
    statsSalesToTable();

  }
  function statsSaleYearlySelected(){
    document.getElementById("dailyStats").checked = false;
    document.getElementById("monthlyStats").checked = false;
    document.getElementById("yearlyStats").checked    = true;    
    statsSalesChooser = 3;
    // GET SALE STATS DAILY
    statsSalesToTable();
  }


//---------- SALES CHART

function initializeSalesChart(){

  
    var label_graph_sales_services = 'Υπηρεσίες ';
    var label_graph_sales_stock    = 'Προιόντα ';
    var label_graph_sales_total    = 'Σύνολο ';

    $("canvas#salesMainChart").remove();
    $("div#salesChartDiv").append('<canvas id="salesMainChart" width="400" height="300"></canvas>');
  
    var ctx = document.getElementById('salesMainChart').getContext('2d');
      var myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: x_axis_labels,
              datasets: [{
                  label: label_graph_sales_services,
                  data: data_graph_sales_services,
                  backgroundColor: [
                      'rgba(102, 153, 255, 0.2)'
                  ],
                  borderColor: [
                      'rgba(102, 153, 255, 1)'
                  ],
                  borderWidth: 1
              },
              {
                  label: label_graph_sales_stock,
                  data: data_graph_sales_stock,
                  backgroundColor: [
                      'rgba(255, 102, 102, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 102, 102, 1)'
                  ],
                  borderWidth: 1
              },
              {
                  label: label_graph_sales_total,
                  data: data_graph_sales_total,
                  backgroundColor: [
                      'rgba(0, 204, 102, 0.2)'
                  ],
                  borderColor: [
                      'rgba(0, 204, 102, 1)'
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


  function maintenance_clean_mov_with_no_dt(){

    var url_maintenance = serverURL + '/statsSaleMain/maintenance_clean_mov_with_no_dt';
    // AJAX MAGIC
    $.ajax({
        url: url_maintenance,
        dataType: "json",
        cache: true,
        success: function (data) {
            // data = JSON.parse(result);
            $.each(data, function (index, data) {
                // DO NOTHING
            });
        },
        error: function(jqXHR, textStatus, errorThrown){
            write_to_log('Error stats_sales: maintenance_clean_mov_with_no_dt' + ' ' + textStatus + " - " + errorThrown);
            alert('Error gasoum: ' + textStatus + ' - ' + errorThrown);
        },
        failure: function(errMsg) {
            write_to_log('Failure stats_sales: maintenance_clean_mov_with_no_dt' + ' ' + errMsg);
            alert('Failure: Ο server δεν ανταποκρίθηκε');
        }

    });

    

  }