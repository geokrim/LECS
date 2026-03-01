function initializeDates() {
  // INITIALIZE  DATES TO TODAY
  var currentDate = new Date();
  $("#from_datepicker").datepicker("setDate", currentDate);
  $("#to_datepicker").datepicker("setDate", currentDate);
}

function cashToTable() {
  var fromDatePickerValue = document.getElementById("from_datepicker").value;
  var toDatePickerValue = document.getElementById("to_datepicker").value;
  var fromDt = formatDateForMySQL(fromDatePickerValue);
  var toDt = formatDateForMySQL(toDatePickerValue);

  // console.log('fromDt: ' + fromDt);
  // console.log('toDt: ' + toDt);

  //delete all previous data from the table
  $("#datatable1").DataTable().clear();

  // AJAX MAGIC
  $.ajax({
    url: serverURL + "/cashMov/allBetweenDates?from=" + fromDt + "&to=" + toDt,
    dataType: "json",
    cache: true,
    success: function (data) {
      // data = JSON.parse(result);
      $.each(data, function (index, data) {
        //// console.log('saleToken: ' + data.saleToken)
        //!!!--Here is the main catch------>fnAddData
        $("#datatable1")
          .dataTable()
          .fnAddData(
            [
              data.id,
              linkToCachMovMain(
                data.saleId,
                data.id,
                formatDateForDatepicker(data.dt)
              ),
              // formatDateForDatepicker(data.dt),
              linkToCachMovMain(
                data.saleId,
                data.id,
                humanifyEidos(data.isCash)
              ),
              linkToCachMovMain(data.saleId, data.id, humanifyTypos(data.type)),
              linkToCachMovMain(data.saleId, data.id, formatMoney(data.amount)),
              linkToCachMovMain(data.saleId, data.id, data.comment),

              checkAndDelete(data.saleId, data.id), // check if saleToken is 0
            ],
            false
          );
      });
      // When second attribut of fnAddData == false, you need to fnDraw
      $("#datatable1").dataTable().fnDraw();
      calculateTotals(data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error cash: cashToTable" + " " + textStatus + " - " + errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure cash: cashToTable" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε.");
    },
  });
}

function calculateTotals(data) {
  var metrita_kiniseis = 0.0;
  var karta_kiniseis = 0.0;
  var synolo_kiniseis = 0.0;

  $.each(data, function (index, data) {
    // metrita
    if (data.isCash == 1) {
      // kiniseis
      if (data.type != 0) {
        metrita_kiniseis = metrita_kiniseis + data.amount;
        synolo_kiniseis = synolo_kiniseis + data.amount;
      }
    } // ENDIF metrita

    // karta
    if (data.isCash == 2) {
      // kiniseis
      if (data.type != 0) {
        karta_kiniseis = karta_kiniseis + data.amount;
        synolo_kiniseis = synolo_kiniseis + data.amount;
      }
    } // ENDIF karta
  });

  metrita_kiniseis = formatMoney(metrita_kiniseis);
  karta_kiniseis = formatMoney(karta_kiniseis);
  synolo_kiniseis = formatMoney(synolo_kiniseis);

  document.getElementById("cash_mov_cach_mov").value = metrita_kiniseis;
  document.getElementById("cash_mov_card_mov").value = karta_kiniseis;
  document.getElementById("cash_mov_total_mov").value = synolo_kiniseis;
}

function humanifyEidos(eidos_id) {
  eidos_human = "ΜΕΤΡΗΤΑ";
  if (eidos_id == 1) {
    eidos_human = "ΜΕΤΡΗΤΑ";
  }
  if (eidos_id == 2) {
    eidos_human = "ΚΑΡΤΕΣ";
  }
  return eidos_human;
}

function humanifyTypos(type_id) {
  type_human = "ΕΝΑΡΞΗ ΤΑΜΕΙΟΥ";
  if (type_id == 0) {
    type_human = "ΕΝΑΡΞΗ ΤΑΜΕΙΟΥ";
  }
  if (type_id == 1) {
    type_human = "ΕΣΟΔΟ";
  }
  if (type_id == 2) {
    type_human = "ΕΞΟΔΟ";
  }
  return type_human;
}

function linkToCachMovMain(saleToken, cash_mov_id, descr) {
  if (saleToken == "0") {
    return '<a href="cash_main.html?id=' + cash_mov_id + '">' + descr + "</a>";
  } else {
    return "<span>" + descr + "</span>";
  }
}

function cusCachMovId() {
  let searchParams = new URLSearchParams(window.location.search);
  let paramId = searchParams.get("id");
  return paramId;
}

function showCashMovById(curr_cash_id) {
  // AJAX MAGIC
  $.ajax({
    url: serverURL + "/cashMov/" + curr_cash_id,
    dataType: "json",
    success: function (data) {
      // EMPTY ELEMENTS FIRST IN CASE ID DOES NOT EXIST
      document.getElementById("cash_mov_id").value = "";
      document.getElementById("cash_mov_is_cash").checked = false;
      document.getElementById("cash_mov_is_card").checked = false;
      document.getElementById("cash_mov_amount").value = "";
      document.getElementById("cash_mov_comment").value = "";

      // GET DATA FROM JSON OBJECT
      document.getElementById("cash_mov_id").value = data.id;
      if (data.isCash == 1) {
        document.getElementById("cash_mov_is_cash").checked = true;
        document.getElementById("cash_mov_is_card").checked = false;
      }
      if (data.isCash == 2) {
        document.getElementById("cash_mov_is_cash").checked = false;
        document.getElementById("cash_mov_is_card").checked = true;
      }

      var dtDateString = formatDateForDatepicker(data.dt);
      document.getElementById("mov_datepicker").value = dtDateString;
      document.getElementById("cach_mov_typos").value = data.type;
      if( data.type == 1) {
        // ESODA
        loadEsodaForUpdate(data.esexCategId);
      }
      if (data.type == 2) {
        // EXOΔO
        loadExodaForUpdate(data.esexCategId);

      }
      
      //  var amount = '0.00';
      // amount = Math.abs(data.amount);
      // console.count(amount);
      document.getElementById("cash_mov_amount").value = Math.abs(data.amount);
      document.getElementById("cash_mov_comment").value = data.comment;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error cash: showCashMovById" + " " + textStatus + " - " + errorThrown
      );
      alert("Error: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure cash: showCashMovById" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function clickCashMovIsCash() {
  document.getElementById("cash_mov_is_card").checked = false;
}

function clickCashMovIsCard() {
  document.getElementById("cash_mov_is_cash").checked = false;
}

function cashMovUpdateById() {
  var urlRaw = serverURL + "/cashMov/updateCashMov/" + curr_cash_id;
  var isCashVar = 1;
  if (document.getElementById("cash_mov_is_card").checked == true) {
    isCashVar = 2;
  }
  var dtDtHtmlFormat = document.getElementById("mov_datepicker").value;
  var dtDtMySqlMFormat = formatDateForMySQL(dtDtHtmlFormat);

  var typosVar = 0;
  typosVar = document.getElementById("cach_mov_typos").value;

  var esex_categ_id = 0;
  esex_categ_id = parseInt(document.getElementById("cach_mov_esex_categ").value);

  var amountVar = "0.00";
  amountVar = document.getElementById("cash_mov_amount").value;

  // EKSODA
  if (typosVar == 2) {
    amountVar = -1 * amountVar;
  }

  // PREPARE JSON OBJECT
  var update_cash_mov = {
    id: $("#cash_mov_id").val(),
    isCash: isCashVar,
    dt: dtDtMySqlMFormat,
    type: typosVar,
    amount: amountVar,
    comment: $("#cash_mov_comment").val(),
    saleId: 0,
    esexCategId: esex_categ_id,
  };

  // console.log(upd_cus);
  // console.log(urlRaw);

  // AJAX MAGIC
  $.ajax({
    url: urlRaw,
    dataType: "json",
    type: "POST",
    contentType: "application/json",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify(update_cash_mov),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      //
    },
    complete: function (data) {
      window.location.replace("cash.html" + "?pid=" + generateRandomToken());
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error cash: cashMovUpdateById" + " " + textStatus + " - " + errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure cash: cashMovUpdateById" + " " + errMsg);
      alert("Failure: O server δεν ανταποκρίθηκε");
    },
  });
}

function cashMovNewInitialize() {
  document.getElementById("cash_mov_id").value = "";
  document.getElementById("cash_mov_is_cash").checked = true;
  document.getElementById("cash_mov_is_card").checked = false;

  var today = moment().format("YYYY/MM/DD");
  var todayMySqlMFormat = formatDateForDatepicker(today);
  document.getElementById("mov_datepicker").value = todayMySqlMFormat;

  document.getElementById("cash_mov_amount").value = "";
  document.getElementById("cash_mov_comment").value = "";
}

function chooseTyposInsert() {
  // console.log(document.getElementById("cach_mov_typos").value);
  document.getElementById("cach_mov_esex_categ").innerHTML = "";
  // 1 == ΕΣΟΔΟ
  // 2 == ΕΞΟΔΟ 
  if (parseInt(document.getElementById("cach_mov_typos").value) == 1) {
    //document.getElementById("cash_mov_comment").value = "ΕΝΑΡΞΗ ΤΑΜΕΙΟΥ ΗΜΕΡΑΣ";
    loadEsoda();
  } else {
    loadExoda();
    //document.getElementById("cash_mov_comment").value = "";
  }

}

function loadEsoda() {
  $.ajax({
    url: serverURL + "/esexcateg/allActiveEsoda",
    dataType: "json",
    cache: false,
    success: function (data) {
      $.each(data, function (index, data) {
        if (data.active == 1) {
          var x = document.getElementById("cach_mov_esex_categ");
          var option = document.createElement("option");
          option.text = data.descr;
          option.value = data.id;
          // option.selected = 'selected';
          x.add(option);
        }
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error service: loadEsoda" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure service: loadEsoda" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function loadExoda() {
  $.ajax({
    url: serverURL + "/esexcateg/allActiveExoda",
    dataType: "json",
    cache: false,
    success: function (data) {
      $.each(data, function (index, data) {
        if (data.active == 1) {
          var x = document.getElementById("cach_mov_esex_categ");
          var option = document.createElement("option");
          option.text = data.descr;
          option.value = data.id;
          // option.selected = 'selected';
          x.add(option);
        }
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error service: loadEsoda" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure service: loadEsoda" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}


function loadEsodaForUpdate(selectedEsodaId) {
  $.ajax({
    url: serverURL + "/esexcateg/allActiveEsoda",
    dataType: "json",
    cache: false,
    success: function (data) {
      $.each(data, function (index, data) {
        if (data.id == selectedEsodaId) {
          var x = document.getElementById("cach_mov_esex_categ");
          var option = document.createElement("option");
          option.text = data.descr;
          option.value = data.id;
          option.selected = "selected";
          x.add(option);
        } else {
          var x = document.getElementById("cach_mov_esex_categ");
          var option = document.createElement("option");
          option.text = data.descr;
          option.value = data.id;
          x.add(option);
        }
      });  
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error service: loadEsodaForUpdate" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure service: loadEsodaForUpdate" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function loadExodaForUpdate(selectedExodaId) {
  $.ajax({
    url: serverURL + "/esexcateg/allActiveExoda",
    dataType: "json",
    cache: false,
    success: function (data) {
      $.each(data, function (index, data) {
        if (data.id == selectedExodaId) {
          var x = document.getElementById("cach_mov_esex_categ");
          var option = document.createElement("option");
          option.text = data.descr;
          option.value = data.id;
          option.selected = "selected";
          x.add(option);
        } else {
          var x = document.getElementById("cach_mov_esex_categ");
          var option = document.createElement("option");
          option.text = data.descr;
          option.value = data.id;
          x.add(option);
        }
      });  
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error service: loadExodaForUpdate" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure service: loadExodaForUpdate" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}


function cashMovInsertNew() {
  // console.log('cashMovInsertNew()');
  var urlInsertRaw = serverURL + "/cashMov/add";
  var isCach = 1;
  if (document.getElementById("cash_mov_is_cash").checked == true) {
    isCach = 1;
  }
  if (document.getElementById("cash_mov_is_card").checked == true) {
    isCach = 2;
  }

  var dtDtHtmlFormat = document.getElementById("mov_datepicker").value;
  var dtDtMySqlMFormat = formatDateForMySQL(dtDtHtmlFormat);
  // console.log('MySqlFormat:' + dtDtMySqlMFormat);

  var typos = 0;
  typos = parseInt(document.getElementById("cach_mov_typos").value);

  var esex_categ_id = 0;
  esex_categ_id = parseInt(document.getElementById("cach_mov_esex_categ").value);

  var amount = "0.00";
  amount = document.getElementById("cash_mov_amount").value;

  // EKSODA
  if (typos == 2) {
    amount = -1 * amount;
  }

  var comment = "";
  comment = document.getElementById("cash_mov_comment").value;

  // PREPARE JSON OBJECT
  var insert_new_cash_mov = {
    id: 1,
    isCash: isCach,
    dt: dtDtMySqlMFormat,
    type: typos,
    amount: amount,
    comment: comment,
    saleId: 0,
    esexCategId: esex_categ_id,
  };

  console.log(insert_new_cash_mov);

  // AJAX MAGIC
  $.ajax({
    url: urlInsertRaw,
    dataType: "json",
    type: "POST",
    contentType: "application/json",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify(insert_new_cash_mov),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      // DO NOTHIING
    },
    complete: function (data) {
      window.location.replace("cash.html" + "?pid=" + generateRandomToken());
      // console.log('cashMovInsertNew ' +  urlInsertRaw);
      // console.log('cashMovInsertNew ' +  insert_new_cash_mov);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error cash: cashMovInsertNew" + " " + textStatus + " - " + errorThrown
      );
      alert("Error gasoum active_tabs: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure cash: cashMovInsertNew", errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function checkAndDelete(saleId, cash_mov_id) {
  // console.log('saleToken: ' + saleToken);
  if (saleId == 0) {
    // console.log('in checkAndDelete cash_mov_id ' + cash_mov_id);
    return (
      '<a href="" data-toggle="modal" data-target="#cash_delete_modal" onclick="cash_mov_button_click(' +
      "'" +
      cash_mov_id +
      "' " +
      ')" style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i> </a>'
    );
    //return '<a href="" data-toggle="modal" data-target="#cash_delete_modal" style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i> </a>'

    // return '<span onclick="cash_mov_delete(' +'\''+ cash_mov_id + '\')" style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i></span>';
    //// console.log('Cus can be deleted');
    document.getElementById("cash_id").innerHTML = cash_mov_id;
    document.getElementById("cash_delete_error_message").innerHTML =
      "ΕΠΙΒΕΒΑΙΩΣΗ ΔΙΑΓΡΑΦΗΣ";
    document.getElementById("btn_cash_delete").style.visibility = "visible";
  } else {
    return "<span></span>";
  }
}

function cash_mov_button_click(curr_cash_id) {
  document.getElementById("cash_id").innerHTML = curr_cash_id;
  document.getElementById("cash_delete_error_message").innerHTML =
    "ΕΠΙΒΕΒΑΙΩΣΗ ΔΙΑΓΡΑΦΗΣ";
  document.getElementById("btn_cash_delete").style.visibility = "visible";
}

function cash_mov_delete() {
  var curr_cash_id = document.getElementById("cash_id").innerHTML;
  // console.log('curr_cash_id: ' + curr_cash_id);
  // PREPARE URL
  var delURL = serverURL + "/cashMov/delCashMov/" + curr_cash_id;
  // AJAX MAGIC
  $.ajax({
    url: delURL,
    type: "GET",
    success: function (data) {
      var table = $("#datatable1").DataTable();
      var filteredData = table
        .rows()
        .indexes()
        .filter(function (value, index) {
          return table.row(value).data()[0] == curr_cash_id;
        });

      table.rows(filteredData).remove().draw();
      alert("Η κίνηση διαγράφηκε. ");
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error cash: cash_mov_delete" + " " + textStatus + " - " + errorThrown
      );
      alert(
        "Error gasoum cash_mov_delete: " + textStatus + " - " + errorThrown
      );
    },
    failure: function (errMsg) {
      write_to_log("Failure cash: cash_mov_delete" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}
