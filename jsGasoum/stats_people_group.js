function statsPeopleGroupToTable(){
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

    var url_stat_people_group = serverURL + '/statsUserGroup/groupJust?from=' + fromDt + '&to=' + toDt;
    // GROUP TOTAL
    if (statsPeopleGroupChooser == 1){
        url_stat_people_group = serverURL + '/statsUserGroup/groupJust?from=' + fromDt + '&to=' + toDt;
    }
    // GROUP BY MONTH
    if (statsPeopleGroupChooser == 2){
        url_stat_people_group = serverURL + '/statsUserGroup/groupByMonth?from=' + fromDt + '&to=' + toDt;
    }
    // GROUP BY YEAR
    if (statsPeopleGroupChooser == 3){
        url_stat_people_group = serverURL + '/statsUserGroup/groupByYear?from=' + fromDt + '&to=' + toDt;
    }

    data_graph_people_group_total = [];
    x_axis_labels_people_group = [];
    data_graph_people_group_labels = [];


    // AJAX MAGIC
    $.ajax({
        url: url_stat_people_group,
        dataType: "json",
        cache: true,
        success: function (data) {
        // data = JSON.parse(result);
        $.each(data, function (index, data) {
            var dtStr = data.dt;
            if( dtStr.includes('2100')){
                dtStr = 'ΣΥΝΟΛΟ';
            }
            if(dtStr != 'ΣΥΝΟΛΟ'){
                data_graph_people_group_total.push(data.totAmount);
                x_axis_labels_people_group.push(data.fullname);
                data_graph_people_group_labels.push(dtStr);
            }

            $("#datatable1")
            .dataTable()
            .fnAddData(
                [
                data.id,
                dtStr,
                data.fullname, 
                formatMoney(data.serviceAmount),
                formatMoney(data.stckAmount),
                formatMoney(data.totAmount)
                ],
                false
            );
        });
        // When second attribut of fnAddData == false, you need to fnDraw
        $("#datatable1").dataTable().fnDraw();
        initializePeopleGroupChart();
        },
        error: function(jqXHR, textStatus, errorThrown){
            write_to_log('Error stats_people_group statsPeopleGroupToTable' + ' ' + textStatus + " - " + errorThrown);
            alert('Error gasoum: ' + textStatus + ' - ' + errorThrown);
        },
        failure: function(errMsg) {
            write_to_log('Failure stats_people_group: statsPeopleGroupToTable' + ' ' + errMsg);
            alert('Failure: Ο server δεν ανταποκρίθηκε');
        }
    });



}




function statsPeopleGroupTotalSelected(){
    document.getElementById("totalPeopleGroupStats").checked     = true;
    document.getElementById("monthlyPeopleGroupStats").checked   = false;
    document.getElementById("yearlyPeopleGroupStats").checked    = false;
    statsPeopleGroupChooser = 1;
    // GET PEOPLE GROUP STATS TOTAL
    statsPeopleGroupToTable();

  }
  function statsPeopleGroupMonthlySelected(){
    document.getElementById("totalPeopleGroupStats").checked     = false;
    document.getElementById("monthlyPeopleGroupStats").checked   = true;
    document.getElementById("yearlyPeopleGroupStats").checked    = false;    
    statsPeopleGroupChooser = 2;
    // GET PEOPLE GROUP STATS MONTLYY
    statsPeopleGroupToTable();

  }
  function statsPeopleGroupYearlySelected(){
    document.getElementById("totalPeopleGroupStats").checked     = false;
    document.getElementById("monthlyPeopleGroupStats").checked   = false;
    document.getElementById("yearlyPeopleGroupStats").checked    = true;    
    statsPeopleGroupChooser = 3;
    // GET PEOPLE GROUP STATS DAILY
    statsPeopleGroupToTable();
  }



//----------  CHART

function initializePeopleGroupChart(){

  
    var label_graph_sales_services = 'Υπηρεσίες ';
    var label_graph_sales_stock    = 'Προιόντα ';
    var label_graph_sales_total    = 'Σύνολο ';

    $("canvas#peopleGroupChart").remove();
    $("div#peopleGroupChartDiv").append('<canvas id="peopleGroupChart" width="400" height="300"></canvas>');
  
    var ctx = document.getElementById('peopleGroupChart').getContext('2d');
      var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: x_axis_labels_people_group,
              datasets: [{
                  label: 'ΠΕΡΙΟΔΟΣ',
                  data: data_graph_people_group_total,
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