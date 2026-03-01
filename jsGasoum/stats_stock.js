function statsStockToTable(){

    var fromDatePickerValue = document.getElementById("from_datepicker").value ;
    var toDatePickerValue   = document.getElementById("to_datepicker").value ;
    var fromDt = formatDateForMySQL(fromDatePickerValue);
    var toDt   = formatDateForMySQL(toDatePickerValue);

    //delete all previous data from the table
    if ( $.fn.dataTable.isDataTable( '#datatable1' ) ) {
        table = $('#datatable1').DataTable();
        table.clear();
    }

    var url_stat_service = serverURL + '/statsStck/allBetweenDates?from=' + fromDt + '&to=' + toDt;

    data_graph_stock_total = [];
    x_axis_labels_stock = [];

    // AJAX MAGIC
    $.ajax({
        url: url_stat_service,
        dataType: "json",
        cache: true,
        success: function (data) {
        // data = JSON.parse(result);
        $.each(data, function (index, data) {

            if(data.descr != 'ΣΥΝΟΛΟ'){
                data_graph_stock_total.push(data.axia);
                x_axis_labels_stock.push(data.descr);
            }

            $("#datatable1")
            .dataTable()
            .fnAddData(
                [
                data.id,
                data.descr,
                data.posotita,
                formatMoney(data.axia)
                ],
                false
            );
        });
        // When second attribut of fnAddData == false, you need to fnDraw
        $("#datatable1").dataTable().fnDraw();
        initializeStockChart();
        },
        error: function(jqXHR, textStatus, errorThrown){
            write_to_log('Error stats_stock : statsStockToTable' + ' ' + textStatus + " - " + errorThrown);
            alert('Error gasoum: ' + textStatus + ' - ' + errorThrown);
        },
        failure: function(errMsg) {
            write_to_log('Failure stats_stock : statsStockToTable' + ' ' + errMsg);
            alert('Failure: Ο server δεν ανταποκρίθηκε');
        }
    });

}



//----------  CHART

function initializeStockChart(){


    $("canvas#stockChart").remove();
    $("div#stockChartDiv").append('<canvas id="stockChart" width="400" height="300"></canvas>');
  
    var ctx = document.getElementById('stockChart').getContext('2d');
      var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: x_axis_labels_stock,
              datasets: [{
                  label: 'ΠΕΡΙΟΔΟΣ',
                  data: data_graph_stock_total,
                  backgroundColor: [
                      'rgba(102, 153, 255, 0.2)'
                  ],
                  borderColor: [
                      'rgba(102, 153, 255, 1)'
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