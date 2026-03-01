function activeTabsToTable() {
  var fromDatePickerValue = document.getElementById("from_datepicker").value ;
  var toDatePickerValue   = document.getElementById("to_datepicker").value ;
  var fromDt = formatDateForMySQL(fromDatePickerValue);
  var toDt   = formatDateForMySQL(toDatePickerValue);

  //delete all previous data from the table
  if ( $.fn.dataTable.isDataTable( '#datatable1' ) ) {
    table = $('#datatable1').DataTable();
    table.clear();
  }

  // console.log('URL: ' + serverURL + '/sale/short/allActiveBetweenDates?from=' + fromDt + '&to=' + toDt);
  var url_tabs = serverURL + '/sale/short/allActiveBetweenDates?from=' + fromDt + '&to=' + toDt;
  // ENERGES KARTELES MONO
  if (tabsChooser == 0){
    url_tabs = serverURL + '/sale/short/allActiveBetweenDates?from=' + fromDt + '&to=' + toDt;
  }
  // KLEISTES KARTELES MONO
  if (tabsChooser == 1){
    url_tabs = serverURL + '/sale/short/allClosedBetweenDates?from=' + fromDt + '&to=' + toDt;
  }
  // OLES OI KARTELES
  if (tabsChooser == 2){
    url_tabs = serverURL + '/sale/allBetweenDates?from=' + fromDt + '&to=' + toDt;
  }
  // console.log('URL: ' + url_tabs);



  // AJAX MAGIC
  $.ajax({

    url: url_tabs,
    dataType: "json",
    cache: true,
    success: function (data) {
      // data = JSON.parse(result);
      $.each(data, function (index, data) {
        //!!!--Here is the main catch------>fnAddData
       var open_value = data.open;
        if (data.open == 0){
          open_value = '<i class="fa fa-minus" aria-hidden="true">';
        }
        if (data.open == 1){
          open_value = '<i class="fa fa-check" aria-hidden="true"></i>';
        }


        $("#datatable1")
          .dataTable()
          .fnAddData(
            [
              data.id,
              '<a href="active_tabs_main.html?id=' +data.id +'">' +
                data.name +
                "</a>",
              '<a href="active_tabs_main.html?id=' +
                data.id +
                '">' +
                data.surname +
                "</a>",
              '<a href="active_tabs_main.html?id=' +
                data.id +
                '">' +
                data.dt +
                "</a>",

              '<a href="active_tabs_main.html?id=' + data.id +'">' +data.tm +"</a>",
              open_value,
              


              '<a href="active_tabs_main.html?id=' + data.id + '">' + formatMoney(data.amount) + "</a>",
              '<a href="active_tabs_main.html?id=' + data.id + '">' + formatMoney(data.metrita) + "</a>",
              '<a href="active_tabs_main.html?id=' + data.id + '">' + formatMoney(data.karta) + "</a>",
              //'<a href="" data-toggle="modal" data-target="#active_tab_delete_modal"  style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i> </a>'
  
              '<a href="" data-toggle="modal" data-target="#active_tab_delete_modal" onclick="activeTabDeleteModal(' + '\'' + data.id + '\' ,' +  '\'' + data.surname +' ' + data.name  + '\' , \'' + data.cusId   +'\', ' + data.amount + ')" style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i> </a>'
  
            // "<span onclick=\"tab_delete('" + data.id + '\' ,' + data.cusId +  ')" style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i></span>',
            ],
            false
          );
      });
      // When second attribut of fnAddData == false, you need to fnDraw
      $("#datatable1").dataTable().fnDraw();
      // LOGGING
      
    },
    error: function(jqXHR, textStatus, errorThrown){
      write_to_log('Error sales: activeTabsToTable' + ' ' + textStatus + " - " + errorThrown);
      alert('Error gasoum: ' + textStatus + ' - ' + errorThrown);
    },
    failure: function(errMsg) {
        write_to_log('Failure sales: activeTabsToTable' + ' ' + errMsg);
        alert('Failure: Ο server δεν ανταποκρίθηκε');
    }
  });
}


function allTabsToTable() {

  var fromDatePickerValue = document.getElementById("from_datepicker").value ;
  var toDatePickerValue   = document.getElementById("to_datepicker").value ;
  var fromDt = formatDateForMySQL(fromDatePickerValue);
  var toDt   = formatDateForMySQL(toDatePickerValue);

  //delete all previous data from the table
  // $('#datatable1').DataTable().clear();

  //delete all previous data from the table
  if ( $.fn.dataTable.isDataTable( '#datatable1' ) ) {
    table = $('#datatable1').DataTable();
    table.clear();
  }

  // AJAX MAGIC
  $.ajax({
   //  url: serverURL + "/sale/short/all",
    url: serverURL + '/sale/allBetweenDates?from=' + fromDt + '&to=' + toDt,
    dataType: "json",
    cache: true,
    success: function (data) {
      // data = JSON.parse(result);
      $.each(data, function (index, data) {
        //!!!--Here is the main catch------>fnAddData
        $("#datatable1")
          .dataTable()
          .fnAddData(
            [
              data.id,
              '<a href="active_tabs_main.html?id=' +data.id +'">' +
                data.name +
                "</a>",
              '<a href="active_tabs_main.html?id=' +
                data.id +
                '">' +
                data.surname +
                "</a>",
              '<a href="active_tabs_main.html?id=' +
                data.id +
                '">' +
                data.dt +
                "</a>",
              '<a href="cus_main.html?id=' +
                data.id +
                '">' +
                data.amount +
                "</a>",
                '<a href="" data-toggle="modal" data-target="#active_tab_delete_modal" onclick="activeTabDeleteModal(' + '\'' + data.id + '\' ,' +  '\'' + data.surname +' ' + data.name  + '\' , \'' + data.cusId   +'\', ' + data.amount + ')" style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i> </a>'
  
            // "<span onclick=\"tab_delete('" + data.id + '\' ,' + data.cusId +  ')" style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i></span>',
            ],
            false
          );
      });
      // When second attribut of fnAddData == false, you need to fnDraw
      $("#datatable1").dataTable().fnDraw();
    },
    error: function(jqXHR, textStatus, errorThrown){
      write_to_log('Error sales: allTabsToTable' + ' ' + textStatus + " - " + errorThrown);
      alert('Error gasoum: ' + textStatus + ' - ' + errorThrown);
    },
    failure: function(errMsg) {
        write_to_log('Failure sales: allTabsToTable' + ' ' + errMsg);
        alert('Failure: Ο server δεν ανταποκρίθηκε');
    }
  });
}

//function tab_delete(id, cus_id) {
function tab_delete() {
  // console.log('tab_delete: ' + id);
  //---------- DELETE FROM SALE

  var id     = document.getElementById("active_tab_sale_id").innerHTML;
  var cus_id = document.getElementById("active_tab_cus_id").innerHTML;
  

  // PREPARE URL FOR SALE
  var delURLSale = serverURL + "/sale/delSale/" + id;
  // AJAX MAGIC
  $.ajax({
    url: delURLSale,
    type: "GET",
    success: function (data) {
      var table = $("#datatable1").DataTable();
      var filteredData = table
        .rows()
        .indexes()
        .filter(function (value, index) {
          return table.row(value).data()[0] == id;
        });

      table.rows(filteredData).remove().draw();
      // alert('Η καρτέλα διαγράφηκε. ' );
    },
    error: function(jqXHR, textStatus, errorThrown){
      write_to_log('Error sales: tab_delete' + ' ' + textStatus + " - " + errorThrown);
      alert('Error gasoum: ' + textStatus + ' - ' + errorThrown);
    },
    failure: function(errMsg) {
        write_to_log('Failure sales: tab_delete' + ' ' + errMsg);
        alert('Failure: Ο server δεν ανταποκρίθηκε');
    }
  });

  //---------- DELETE FROM SALE_SERVICE_MOV
  // PREPARE URL FOR SALE_SERVICE_MOV
  var delURLServiceMov = serverURL + "/saleServiceMov/delSaleServiceMovBySaleId/" + id;
  // AJAX MAGIC
  $.ajax({
    url: delURLServiceMov,
    type: "GET",
    success: function (data) {
      // DO NOTTHING AT ALL JUST CALL THE API
    },
    error: function(jqXHR, textStatus, errorThrown){
      write_to_log('Error sales: tab_delete' + ' ' + textStatus + " - " + errorThrown);
      alert('Error gasoum: ' + textStatus + ' - ' + errorThrown);
    },
    failure: function(errMsg) {
        write_to_log('Failure sales: tab_delete' + ' ' + errMsg);
        alert('Failure: Ο server δεν ανταποκρίθηκε');
    }
  });

  //---------- DELETE FROM SALE_STCK_MOV
  // PREPARE URL FOR SALE_STCK_MOV
  var delURLStckMov = serverURL + "/saleStckMov/delSaleStckMovBySaleId/" + id;
  // AJAX MAGIC
  $.ajax({
    url: delURLStckMov,
    type: "GET",
    success: function (data) {
      // DO NOTTHING AT ALL JUST CALL THE API
    },
    error: function(jqXHR, textStatus, errorThrown){
      write_to_log('Error sales: tab_delete' + ' ' + textStatus + " - " + errorThrown);
      alert('Error gasoum: ' + textStatus + ' - ' + errorThrown);
    },
    failure: function(errMsg) {
        write_to_log('Failure sales: tab_delete' + ' ' + errMsg);
        alert('Failure: Ο server δεν ανταποκρίθηκε');
    }
  });

  //---------- DELETE FROM CUS VAFES
    // PREPARE URL FOR CUS VAFES
    var delURLCusVafes = serverURL + "/cusvafi/delCusVafiBySaleId/" + id;
    // AJAX MAGIC
    $.ajax({
      url: delURLCusVafes,
      type: "GET",
      success: function (data) {
      // DO NOTTHING AT ALL JUST CALL THE API
      },
      error: function(jqXHR, textStatus, errorThrown){
        write_to_log('Error sales: tab_delete' + ' ' + textStatus + " - " + errorThrown);
        alert('Error gasoum: ' + textStatus + ' - ' + errorThrown);
      },
      failure: function(errMsg) {
          write_to_log('Failure sales: tab_delete' + ' ' + errMsg);
          alert('Failure: Ο server δεν ανταποκρίθηκε');
      }
    });

  //---------- DELETE FROM CASH_MOV
  //TODO: DELETE FROM CASH_MOV
    // PREPARE URL FOR SALE
    var delURLCashMov = serverURL + "/cashMov/delCashMovBySaleId/" + id;
    // AJAX MAGIC
    $.ajax({
      url: delURLCashMov,
      type: "GET",
      success: function (data) {
      // DO NOTTHING AT ALL JUST CALL THE API
      },
      error: function(jqXHR, textStatus, errorThrown){
        write_to_log('Error sales: tab_delete' + ' ' + textStatus + " - " + errorThrown);
        alert('Error gasoum: ' + textStatus + ' - ' + errorThrown);
      },
      failure: function(errMsg) {
          write_to_log('Failure sales: tab_delete' + ' ' + errMsg);
          alert('Failure: Ο server δεν ανταποκρίθηκε');
      }
    });



  //---------- UPDATE CUS->DATE_LAST_VISIT
    // PREPARE URL FOR SALE
    var delURLCusVafes = serverURL + "/cus/updateDateLastVisit/" + cus_id;
    // AJAX MAGIC
    $.ajax({
      url: delURLCusVafes,
      type: "GET",
      success: function (data) {
      // DO NOTTHING AT ALL JUST CALL THE API
      },
      error: function(jqXHR, textStatus, errorThrown){
        write_to_log('Error sales: tab_delete' + ' ' + textStatus + " - " + errorThrown);
        alert('Error gasoum: ' + textStatus + ' - ' + errorThrown);
      },
      failure: function(errMsg) {
          write_to_log('Failure sales: tab_delete' + ' ' + errMsg);
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


function salesToTable(){
  // console.log('salesToTable');

}


  //---------- DELETE MODAL
  function activeTabDeleteModal(current_tab_id, current_cus_name, current_cus_id, current_amount ){
    // console.log('activeTabDeleteModal' + ' ' + current_tab_id + ' ' + current_cus_name + ' ' + current_cus_id + ' ' + current_amount);

    document.getElementById("active_tab_sale_id").innerHTML = current_tab_id;
    document.getElementById("active_tab_cus_id").innerHTML = current_cus_id;
    document.getElementById("active_tab_cus_name").innerHTML = current_cus_name;
    document.getElementById("active_tab_amount").innerHTML   = 'Αξiα: ' + current_amount;

  }


  function tabsActiveSelected(){
    document.getElementById("tabsActive").checked = true;
    document.getElementById("tabsClosed").checked = false;
    document.getElementById("tabsAll").checked    = false;
    tabsChooser = 0;
    // GET ALL ACTIVE TABS
    activeTabsToTable();

  }
  function tabsClosedSelected(){
    document.getElementById("tabsActive").checked = false;
    document.getElementById("tabsClosed").checked = true;
    document.getElementById("tabsAll").checked    = false;    
    tabsChooser = 1;
    // GET ALL ACTIVE TABS
    activeTabsToTable();

  }
  function tabsAllSelected(){
    document.getElementById("tabsActive").checked = false;
    document.getElementById("tabsClosed").checked = false;
    document.getElementById("tabsAll").checked    = true;    
    tabsChooser = 2;
    // GET ALL ACTIVE TABS
    activeTabsToTable();
  }






