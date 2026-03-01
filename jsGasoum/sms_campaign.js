function initilizeFilters() {
  var cur_year = new Date().getFullYear();
  document.getElementById("sms_fltr_first_name").checked = false;
  document.getElementById("sms_fltr_dob").checked = false;
  document.getElementById("sms_fltr_last_visit").checked = false;
  document.getElementById("sms_fltr_tziros").checked = false;
  document.getElementById("sms_fltr_max_rows").checked = false;
  document.getElementById("sms_fltr_order_by").checked == false;

  document.getElementById("dt_datepicker_dob_from").value = "01/01/" + cur_year;
  document.getElementById("dt_datepicker_dob_to").value = "01/01/" + cur_year;

  document.getElementById("last_visit_from").value = "0";
  document.getElementById("last_visit_to").value = "3650";

  document.getElementById("dt_datepicker_tziros_from").value =
    "01/01/" + cur_year;
  document.getElementById("dt_datepicker_tziros_to").value =
    "01/01/" + cur_year;
  document.getElementById("tziros_amount_from").value = "0";
  document.getElementById("tziros_amount_to").value = "100000";

  document.getElementById("max_rows").value = "500";

  document.getElementById("select_order_by").disabled = true;
  document.getElementById("select_order_by_desc_asc").disabled = true;
}

function fltr_first_name_toggle() {
  if (document.getElementById("sms_fltr_first_name").checked == false) {
    document.getElementById("first_name").value = "";

    document.getElementById("first_name").disabled = true;
  } else {
    document.getElementById("first_name").disabled = false;
  }
}

function fltr_dob_toggle() {
  var cur_year = new Date().getFullYear();
  if (document.getElementById("sms_fltr_dob").checked == false) {
    document.getElementById("dt_datepicker_dob_from").value =
      "01/01/" + cur_year;
    document.getElementById("dt_datepicker_dob_to").value = "01/01/" + cur_year;

    document.getElementById("dt_datepicker_dob_from").disabled = true;
    document.getElementById("dt_datepicker_dob_to").disabled = true;
  } else {
    var currentDate = new Date();
    $("#dt_datepicker_dob_from").datepicker("setDate", currentDate);
    $("#dt_datepicker_dob_to").datepicker("setDate", currentDate);

    document.getElementById("dt_datepicker_dob_from").disabled = false;
    document.getElementById("dt_datepicker_dob_to").disabled = false;
  }
}

function fltr_last_visit_toggle() {
  if (document.getElementById("sms_fltr_last_visit").checked == false) {
    document.getElementById("last_visit_from").value = "0";
    document.getElementById("last_visit_to").value = "36500";

    document.getElementById("last_visit_from").disabled = true;
    document.getElementById("last_visit_to").disabled = true;
  } else {
    document.getElementById("last_visit_from").value = "1";
    document.getElementById("last_visit_to").value = "100";
    document.getElementById("last_visit_from").disabled = false;
    document.getElementById("last_visit_to").disabled = false;
  }
}

function fltr_tziros_toggle() {
  var cur_year = new Date().getFullYear();
  if (document.getElementById("sms_fltr_tziros").checked == false) {
    document.getElementById("dt_datepicker_tziros_from").value =
      "01/01/" + cur_year;
    document.getElementById("dt_datepicker_tziros_to").value =
      "01/01/" + cur_year;
    document.getElementById("tziros_amount_from").value = "0";
    document.getElementById("tziros_amount_to").value = "100000";

    document.getElementById("dt_datepicker_tziros_from").disabled = true;
    document.getElementById("dt_datepicker_tziros_to").disabled = true;
    document.getElementById("tziros_amount_from").disabled = true;
    document.getElementById("tziros_amount_to").disabled = true;
  } else {
    var currentDate = new Date();
    var firstDateOfTheYear = new Date(new Date().getFullYear(), 0, 1);
    $("#dt_datepicker_tziros_from").datepicker("setDate", firstDateOfTheYear);
    $("#dt_datepicker_tziros_to").datepicker("setDate", currentDate);
    document.getElementById("tziros_amount_from").value = "0";
    document.getElementById("tziros_amount_to").value = "500";

    document.getElementById("dt_datepicker_tziros_from").disabled = false;
    document.getElementById("dt_datepicker_tziros_to").disabled = false;
    document.getElementById("tziros_amount_from").disabled = false;
    document.getElementById("tziros_amount_to").disabled = false;
  }
}

function fltr_max_rorws_toggle() {
  if (document.getElementById("sms_fltr_max_rows").checked == false) {
    document.getElementById("max_rows").value = "500";

    document.getElementById("max_rows").disabled = true;
  } else {
    document.getElementById("max_rows").disabled = false;
  }
}

function fltr_order_by_toggle() {
  if (document.getElementById("sms_fltr_order_by").checked == false) {
    document.getElementById("select_order_by").disabled = true;
    document.getElementById("select_order_by_desc_asc").disabled = true;
  } else {
    document.getElementById("select_order_by").disabled = false;
    document.getElementById("select_order_by_desc_asc").disabled = false;
  }
}

function executeSmsKeimenaToSelection() {
  $.ajax({
    url: serverURL + "/smsKeimena/all",
    dataType: "json",
    cache: true,
    success: function (data) {
      // data = JSON.parse(result);
      $.each(data, function (index, data) {
        var option = document.createElement("option");
        if (data.active == 1) {
          option.text = data.title;
          option.value = data.id;
          var select = document.getElementById("select_keimeno");
          select.appendChild(option);
        }
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error sales_new: executeSmsKeimenaToSelection" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert(
        "Error gasoum executeSmsKeimenaToSelection: " +
          textStatus +
          " - " +
          errorThrown
      );
    },
    failure: function (errMsg) {
      write_to_log(
        "Failure sms_campaign: executeSmsKeimenaToSelection" + " " + errMsg
      );
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function getSmsKeimenoById() {
  var keimeno_id = document.getElementById("select_keimeno").value;
  // console.log("keimeno_id: " + keimeno_id);
  if (keimeno_id != 0) {
    $.ajax({
      url: serverURL + "/smsKeimena/" + keimeno_id,
      dataType: "json",
      success: function (data) {
        // GET DATA FROM JSON OBJECT
        document.getElementById("sms_keimena_txt").value = data.txt;
        // CALCULATE DATE FROM LAST VISIT
        var sms_txt_len = document.getElementById("sms_keimena_txt").value;
        document.getElementById("sms_keimena_txt_len").innerHTML =
          sms_txt_len.length;
      },
      error: function (jqXHR, textStatus, errorThrown) {
        write_to_log(
          "Error cus: getSmsKeimenoById" +
            " " +
            textStatus +
            " - " +
            errorThrown
        );
        alert("Error gasoum: getSmsKeimenoById" + textStatus + " - " + errorThrown);
      },
      failure: function (errMsg) {
        write_to_log("Failure sms_campaign: getSmsKeimenoById" + " " + errMsg);
        alert("Failure: Ο server δεν ανταποκρίθηκε");
      },
    });
  } else {
    document.getElementById("sms_keimena_txt").value = "";
    document.getElementById("sms_keimena_txt_len").innerHTML = 0;
  }
}

function cus_sms_to_table() {
  console.log("cus_sms_to_table");
  var v_name = document.getElementById("first_name").value;
  if (v_name == "") {
    v_name = "XXXyyyXXXyyy";
    // console.log('v_name: ' + v_name);
  }

  var v_dob_from_value = document.getElementById(
    "dt_datepicker_dob_from"
  ).value;
  var v_dob_from = formatDateForMySQL(v_dob_from_value);
  var v_dob_to_value = document.getElementById("dt_datepicker_dob_to").value;
  var v_dob_to = formatDateForMySQL(v_dob_to_value);
  var v_last_visit_from = document.getElementById("last_visit_from").value;
  var v_last_visit_to = document.getElementById("last_visit_to").value;
  var v_sale_from_value = document.getElementById(
    "dt_datepicker_tziros_from"
  ).value;
  var v_sale_from = formatDateForMySQL(v_sale_from_value);
  var v_sale_to_value = document.getElementById(
    "dt_datepicker_tziros_to"
  ).value;
  var v_sale_to = formatDateForMySQL(v_sale_to_value);
  var v_tziros_from = document.getElementById("tziros_amount_from").value;
  var v_tziros_to = document.getElementById("tziros_amount_to").value;
  var v_limit = document.getElementById("max_rows").value;
  var v_order_by = document.getElementById("select_order_by").value;
  var v_order_by_asc_desc = document.getElementById(
    "select_order_by_desc_asc"
  ).value;

  var cus_sms_url =
    "/cus/cusSms?name=" +
    v_name +
    "&visit_from=" +
    v_last_visit_from +
    "&visit_to=" +
    v_last_visit_to +
    "&dob_from=" +
    v_dob_from +
    "&dob_to=" +
    v_dob_to +
    "&sale_from=" +
    v_sale_from +
    "&sale_to=" +
    v_sale_to +
    "&tziros_from=" +
    v_tziros_from +
    "&tziros_to=" +
    v_tziros_to +
    "&limit=" +
    v_limit +
    "&order_by=" +
    v_order_by +
    "&order_by_asc_desc=" +
    v_order_by_asc_desc;
  console.log("URL: " + cus_sms_url);

  $("#datatable2").DataTable().clear();
  $.ajax({
    url: serverURL + cus_sms_url,
    dataType: "json",
    cache: true,
    success: function (data) {
      // data = JSON.parse(result);
      $.each(data, function (index, data) {
        if (data.selected == 1) {
          var slct =
            '<input type="checkbox" id="check_' +
            data.mobile +
            '" checked="true" onclick= tableChangeChecked("check_' +
            data.mobile +
            '")>';
          $("#datatable2")
            .dataTable()
            .fnAddData(
              [
                data.cusId,
                data.fname,
                data.sname,
                data.mobile,
                data.dob,
                data.lastVisit,
                data.tziros,
                slct,
                1,
              ],
              false
            );
        }
      });

      // When second attribut of fnAddData == false, you need to fnDraw
      //console.log('ajaxCusToTable');
      $("#datatable2").dataTable().fnDraw();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error sms_campaign: cus_sms_to_table" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure sms_campaign: cus_sms_to_table" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function cusToSendExportArray(element) {
  // console.log('tableChangeChecked element = ' + element);
  // var cus_mob = Number(element.replace('check_',''));      // Must be number because  cusToSendArray holds Numbers
  // var cus_mob = Number(element);      // Must be number because  cusToSendArray holds Numbers
  var cus_mob = element; // Must be number because  cusToSendArray holds Numbers
  // console.log('cusToSendExport cus_mob = ' + cus_mob);

  // console.log('cusToSendArray = ' + cusToSendArray);
  if (cusToSendArray.includes(cus_mob)) {
    // console.log("cus_mob " + cus_mob + " already in the Array, thus must be deleted");
    for (var i = 0; i < cusToSendArray.length; i++) {
      if (cusToSendArray[i] === cus_mob) {
        cusToSendArray.splice(i, 1);
      }
    }
  } else {
    // console.log("cus_mob " + cus_mob + " not  in the Array, thus must be added");
    cusToSendArray.push(cus_mob);
  }

  // console.log('cusToSendArray = ' + cusToSendArray);
}

function convert_array_to_comma_delimited_string() {
  if (cusToSendArray.length == 0) {
    cusToSendDelimitedStr = "";
  } else if (cusToSendArray.length == 1) {
    cusToSendDelimitedStr = cusToSendArray[0];
  } else {
    cusToSendDelimitedStr = cusToSendArray.join(",");
  }
  parameter_to = cusToSendDelimitedStr;
}

function cus_sms_send_campaign() {
  console.log("In cus_sms_send_campaign");
  console.log("cusToSendArray = " + cusToSendArray);
}

/*
function sms_camp_send(){
    console.log('sms_camp_send ');
    // console.log('cusToSendArray = ' + cusToSendArray);
    // console.log('cusToSendDelimitedStr = ' + cusToSendDelimitedStr);
    // console.log('Posotita = ' + cusToSendArray.length);
    // console.log('global_sms_ypoloipo: ' + global_sms_ypoloipo);
    posotita_to_send = cusToSendArray.length;
    parameter_text = document.getElementById("sms_keimena_txt").value ;


    convert_array_to_comma_delimited_string();
    // console.log('cusToSendArray = ' + cusToSendArray);
    // console.log('cusToSendDelimitedStr = ' + cusToSendDelimitedStr);

    if(posotita_to_send > global_sms_ypoloipo){
        alert('Error: Ανεπαρκής υπόλοιπο. Αριθμός πελατών: ' + posotita_to_send + ', υπόλοιπο SMS: ' + global_sms_ypoloipo);
    }else{
        if(parameter_text === ''){
            alert('Error: Δεν έχετε συμπληρώσει το πεδίο κείμενο');
        }else{
            if (posotita_to_send > 0 && cusToSendArray.length <= 1){
                // console.log('cusToSendArray <= 1  thus single send');
                send_sms();
            }else if(posotita_to_send > 1) {
                // console.log('cusToSendArray > 1 thus buld send ');
                send_sms();
            }else{
                alert('Error: Δεν έχετε επιλέξει πελάτη.');
            }
        }   

    }

}
*/
async function send_sms() {
  try {
    const resShowProgressBar = await show_progress_line();
    const resParameters = await getSMSParameters();
    const resCallSendURL = await callSendURLWithParameters();
    const resHideProgressBar = await hide_progress_line();
    const resRefreshPage = await refresh_page();
  } catch (err) {
    console.log(err);
  }
}

function getSMSParameters() {
  return $.ajax({
    url: serverURL + "/smsSetup/1",
    dataType: "json",
    success: function (data) {
      // GET DATA FROM JSON OBJECT

      parameter_key = data.smsApiKey;
      parameter_from = data.smsSender;
      parameter_end_point = data.smsSendUrl;

      parameter_key = "key=" + parameter_key;
      parameter_to = "to=" + parameter_to;
      parameter_text = "text=" + parameter_text;
      parameter_from = "from=" + parameter_from;
      parameter_type = "type=" + parameter_type;
      urLSendBulk =
        parameter_end_point +
        parameter_key +
        "&" +
        parameter_to +
        "&" +
        parameter_text +
        "&" +
        parameter_from +
        "&" +
        parameter_type;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error sms_setup: getSMSParameters" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: getSMSParameters" + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure sms_setup: getSMSParameters" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function callSendURLWithParameters() {
  return $.ajax({
    url: urLSendBulk,
    type: "POST",
    success: function (data) {
      // DO NOTHING
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error sms Bulk: callSendURLWithParameters" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error Bulk: callSendURLWithParameters");
    },
    failure: function (errMsg) {
      write_to_log("Failure Bulk: callSendURLWithParameters" + " " + errMsg);
      alert("Error Bulk: callSendURLWithParameters");
    },
  });
  /*
    console.log('parameter_end_point: ' + parameter_end_point);
    console.log('parameter_key: '       + parameter_key);
    console.log('parameter_text: '      + parameter_text);
    console.log('parameter_from: '      + parameter_from);
    console.log('parameter_to: '        + parameter_to);
    console.log('parameter_type: '      + parameter_type);
    console.log('urLSendBulk: '         + urLSendBulk);

    return 0;
*/
}

function refresh_page() {
  alert(posotita_to_send + " SMS, στάλθηκαν με επιτυχία.");

  window.location.replace(
    "https://lecs.gr/lc/app/sms_campaign.html" + "?pid=" + generateRandomToken()
  );
  return 0;
}

function tableChangeChecked(element) {
  console.log("tableChangeChecked element = " + element);
  var cur_cus_id = element.replace("check_", "");
  console.log("tableChangeChecked cur_cus_id = " + cur_cus_id);
  var isChecked = document.getElementById(element).checked;
  console.log("tableChangeChecked isChecked = " + isChecked);
  if (isChecked) {
    document.getElementById(element).checked = true;
    var table = $("#datatable2").DataTable();
    table
      .column(0)
      .data()
      .each(function (value, index) {
        if (value == cur_cus_id) {
          // console.log('value = ' + value);
          // console.log('cur_cus_id = ' + cur_cus_id);
          // console.log( 'Data in index: ' + index + ' is: ' + value );
          changeToOne(index);
        }
      });
  } else {
    document.getElementById(element).checked = false;
    var table = $("#datatable2").DataTable();
    table
      .column(0)
      .data()
      .each(function (value, index) {
        if (value == cur_cus_id) {
          // console.log('value = ' + value);
          // console.log('cur_cus_id = ' + cur_cus_id);
          // console.log( 'Data in index: ' + index + ' is: ' + value );
          changeToZero(index);
        }
      });
  }
}

function changeToZero(index) {
  $("#datatable2")
    .DataTable()
    .cell({ row: index, column: 8 })
    .data("0")
    .draw(false);
  $("#datatable2").dataTable().fnDraw();
}

function changeToOne(index) {
  $("#datatable2")
    .DataTable()
    .cell({ row: index, column: 8 })
    .data("1")
    .draw(false);
  $("#datatable2").dataTable().fnDraw();
}

function sms_camp_send() {
  console.log("sms_camp_send ");
  console.log("cusToSendArray = " + cusToSendArray);
  console.log("cusToSendDelimitedStr = " + cusToSendDelimitedStr);
  console.log("Posotita = " + cusToSendArray.length);
  console.log("global_sms_ypoloipo: " + global_sms_ypoloipo);
  posotita_to_send = cusToSendArray.length;
  parameter_text = document.getElementById("sms_keimena_txt").value;

  convert_array_to_comma_delimited_string();
  console.log("cusToSendArray = " + cusToSendArray);
  console.log("cusToSendDelimitedStr = " + cusToSendDelimitedStr);

  if (posotita_to_send > global_sms_ypoloipo) {
    alert(
      "Error: Ανεπαρκής υπόλοιπο. Αριθμός πελατών: " +
        posotita_to_send +
        ", υπόλοιπο SMS: " +
        global_sms_ypoloipo
    );
  } else {
    if (parameter_text === "") {
      alert("Error: Δεν έχετε συμπληρώσει το πεδίο κείμενο");
    } else {
      if (posotita_to_send > 0 && cusToSendArray.length <= 1) {
        // console.log('cusToSendArray <= 1  thus single send');
        send_sms();
      } else if (posotita_to_send > 1) {
        // console.log('cusToSendArray > 1 thus buld send ');
        send_sms();
      } else {
        alert("Error: Δεν έχετε επιλέξει πελάτη.");
      }
    }
  }
}
