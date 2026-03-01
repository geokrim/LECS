function smsSentToTable() {
  var fromDatePickerValue = document.getElementById("from_datepicker").value ;
  var toDatePickerValue   = document.getElementById("to_datepicker").value ;
  var fromDt = formatDateForMySQL(fromDatePickerValue);
  var toDt   = formatDateForMySQL(toDatePickerValue);

  //delete all previous data from the table
  if ( $.fn.dataTable.isDataTable( '#datatable1' ) ) {
    table = $('#datatable1').DataTable();
    table.clear();
  }

  var sms_sent_tabs = serverURL + '/smsSent/allBetweenDates?from=' + fromDt + '&to=' + toDt;
  
  // AJAX MAGIC
  $.ajax({

    url: sms_sent_tabs,
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
              data.cusId,
              data.dt,
              '<a href="cus_main.html?id=' +data.cusId +'">' + data.cusFullname + '</a>',
              '<a href="sms_sent_main.html?id=' +data.id +'">' + data.smsTitle + '</a>',
              '<a href="sms_sent_main.html?id=' +data.id +'">' + data.smsTxt.substring(0, 30) + '... ' + '</a>',
              data.smsTxtLen,
              data.smsXreosi  
             ],
            false
          );
      });
      // When second attribut of fnAddData == false, you need to fnDraw
      $("#datatable1").dataTable().fnDraw();
    },
    error: function(jqXHR, textStatus, errorThrown){
      write_to_log('Error sms_sent: smsSentToTable' + ' ' + textStatus + " - " + errorThrown);
      alert('Error gasoum: ' + textStatus + ' - ' + errorThrown);
    },
    failure: function(errMsg) {
        write_to_log('Failure sms_sent: smsSentToTable' + ' ' + errMsg);
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

function smsSentGetId() {
  let searchParams = new URLSearchParams(window.location.search)
  var paramId = searchParams.get('id')
  return paramId;
}


function showSmsSentById(current_sms_sent_id){
  // AJAX MAGIC
  $.ajax({
      url: serverURL + '/smsSent/' + current_sms_sent_id,
      dataType: 'json',
      success: function(data) {
          // EMPTY ELEMENTS FIRST IN CASE ID DOES NOT EXIST
          document.getElementById("sms_sent_id").value = '';
          document.getElementById("sms_sent_dt").value = '';
          document.getElementById("sms_sent_cus_fullname").value = '';
          document.getElementById("sms_sent_title").value = '';
          document.getElementById("sms_sent_txt").value = '';
          document.getElementById("sms_sent_txt_len").value = '';
          document.getElementById("sms_sent_xreosi").value = '';

 
         
          // GET DATA FROM JSON OBJECT
          document.getElementById("sms_sent_id").value = data.id;
          document.getElementById("sms_sent_dt").value = data.dt;
          document.getElementById("sms_sent_cus_fullname").value = data.cusFullname;
          document.getElementById("sms_sent_title").value = data.smsTitle;
          document.getElementById("sms_sent_txt").value = data.smsTxt;
          document.getElementById("sms_sent_txt_len").value = data.smsTxtLen;
          document.getElementById("sms_sent_xreosi").value = data.smsXreosi;

          /*
          document.getElementById("sms_keimena_id").value = data.id;
          document.getElementById("sms_keimena_title").value = data.title;
          document.getElementById("sms_keimena_txt").value = data.txt;
          document.getElementById("sms_keimena_txt_len").innerHTML = data.txt.length;
          */


      },
      error: function(jqXHR, textStatus, errorThrown){
        write_to_log('Error sms_sent: showSmsSentById' + ' ' + textStatus + " - " + errorThrown);
        alert('Error gasoum: ' + textStatus + ' - ' + errorThrown);
      },
      failure: function(errMsg) {
          write_to_log('Failure sms_sent: showSmsSentById' + ' ' + errMsg);
          alert('Failure: Ο server δεν ανταποκρίθηκε');
      }
  });
}




