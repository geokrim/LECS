// -------------------------- TABLE SHOW ALL CATEGORIES  --------------------------
function cashEsExCategGetAll() {
  // console.log(serviceCategDescrById(1));

  // AJAX MAGIC
  $.ajax({
    url: serverURL + "/esexcateg/all",
    dataType: "json",
    cache: true,
    success: function (data) {
      // data = JSON.parse(result);
      $.each(data, function (index, data) {
        //!!!--Here is the main catch------>fnAddData
        if (data.active == 1) {
          $("#cashEsExCategTable")
            .dataTable()
            .fnAddData(
              [
                data.id,
                '<a href="cash_esex_categ_main.html?id=' +
                  data.id +
                  '">' +
                  data.descr +
                  "</a>",
                '<i class="fa fa-check" aria-hidden="true"></i>',
                data.typos == 1 ? "ΕΣΟΔΟ" : data.typos == 2 ? "ΕΞΟΔΟ" : "",
                // '<span onclick="serviceDelete(' + data.id +  ', \'' + data.descr + '\')" style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i></span>'
                '<a href="" data-toggle="modal" data-target="#cash_esex_categ_delete_modal" onclick="cash_esex_categ_check_before_delete(' +
                  "'" +
                  data.id +
                  "' ," +
                  "'" +
                  data.descr +
                  "'" +
                  ')" style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i> </a>',
              ],
              false
            );
        } else {
          $("#cashEsExCategTable")
            .dataTable()
            .fnAddData(
              [
                data.id,
                '<a href="cash_esex_categ_main.html?id=' +
                  data.id +
                  '">' +
                  data.descr +
                  "</a>",
                "",
                data.typos == 1 ? "ΕΣΟΔΟ" : data.typos == 2 ? "ΕΞΟΔΟ" : "",
                // '<span onclick="serviceDelete(' + data.id +  ', \'' + data.descr + '\')" style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i></span>'
                '<a href="" data-toggle="modal" data-target="#cash_esex_categ_delete_modal" onclick="cash_esex_categ_check_before_delete(' +
                  "'" +
                  data.id +
                  "' ," +
                  "'" +
                  data.descr +
                  "'" +
                  ')" style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i> </a>',
              ],
              false
            );
        }
      });
      // When second attribut of fnAddData == false, you need to fnDraw
      $("#cashEsExCategTable").dataTable().fnDraw();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error service: serviceGetAll" + " " + textStatus + " - " + errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure service: serviceGetAll" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

// --------------------------  UPDATE service BY ID --------------------------

function showCashEsexCategById() {
  // GET DATA TO UI
  // AJAX MAGIC
  var localcategId = 0;

  $.ajax({
    url: serverURL + "/esexcateg/" + curr_cash_esex_categ_id,
    dataType: "json",
    success: function (data) {
      // GET DATA FROM JSON OBJECT
      document.getElementById("cash_esex_categ_id").value = data.id;
      if (data.active == "0") {
        document.getElementById("cash_esex_categ_active").checked = false;
      } else {
        document.getElementById("cash_esex_categ_active").checked = true;
      }
      document.getElementById("cash_esex_categ_descr").value = data.descr;
      if (data.typos == "1") {
        document.getElementById("cash_esex_categ_typos_esodo").checked = true;
        document.getElementById("cash_esex_categ_typos_exodo").checked = false;
      } else {
        document.getElementById("cash_esex_categ_typos_esodo").checked = false;
        document.getElementById("cash_esex_categ_typos_exodo").checked = true;
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error service: showCashEsexCategById" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure service: showCashEsexCategById" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function updateEsexCategById() {
  // PERFORM UPDATE
  var urlEsexCategUpdate =
    serverURL + "/esexcateg/updateEsexCateg/" + curr_cash_esex_categ_id;

  var activeVar = "0";
  if (document.getElementById("cash_esex_categ_active").checked == true) {
    activeVar = "1";
  }
  var typosVar = "0";
  if (document.getElementById("cash_esex_categ_typos_esodo").checked == true) {
    typosVar = "1";
  } else {
    typosVar = "2";
  }

  // PREPARE JSON OBJECT
  var upd_esex_categ = {
    id: curr_cash_esex_categ_id,
    active: activeVar,
    typos: typosVar,
    descr: $("#cash_esex_categ_descr").val(),
  };

  // AJAX MAGIC
  $.ajax({
    url: urlEsexCategUpdate,
    dataType: "json",
    type: "POST",
    contentType: "application/json",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify(upd_esex_categ),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      // window.location.replace("service.html" + "?pid=" + generateRandomToken());
    },
    complete: function (data) {
      window.location.replace(
        "cash_esex_categ.html" + "?pid=" + generateRandomToken()
      );
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error service: updateEsexCategById" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure service: updateEsexCategById" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

// --------------------------  INSERT NEW SERVICE  --------------------------

function insertNewEsexCategInitialize() {
  document.getElementById("cash_esex_categ_active").checked = true;
}

function insertNewEsexCateg() {
  // console.log('insertNewservice');

  // PERFORM UPDATE
  var urlEsexCategInsert = serverURL + "/esexcateg/add/";

  var activeVar = "0";
  if (document.getElementById("cash_esex_categ_active").checked == true) {
    activeVar = "1";
  }

  var typosVar = "2"; // Default to ΕΞΟΔΟ
  if (document.getElementById("cash_esex_categ_typos_esodo").checked == true) {
    typosVar = "1"; // ΕΣΟΔΟ
  } else {
    // ΕΞΟΔΟ
    typosVar = "2";
  }

  // PREPARE JSON OBJECT
  var ins_esex_categ = {
    id: 1,
    active: activeVar,
    typos: typosVar,
    descr: $("#cash_esex_categ_descr").val(),
  };
  // console.log(ins_service);

  // AJAX MAGIC
  $.ajax({
    url: urlEsexCategInsert,
    dataType: "json",
    type: "POST",
    contentType: "application/json",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify(ins_esex_categ),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      // window.location.replace("service.html" + "?pid=" + generateRandomToken());
    },
    complete: function (data) {
      window.location.replace(
        "cash_esex_categ.html" + "?pid=" + generateRandomToken()
      );
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error service: insertNewEsexCateg" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure service: insertNewEsexCateg" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

// --------------------------  DELETE service BY ID --------------------------
function cash_esex_categ_check_before_delete(
  current_id,
  current_esex_categ_descr
) {
  // TODO: CHECH IF THE ESE EX CATEG CAN BE DELETED
  // ASUME YOU CAN DELETE IT
  document.getElementById("cash_esex_categ_id").innerHTML = current_id;
  document.getElementById("cash_esex_categ_descr").innerHTML =
    current_esex_categ_descr;
  document.getElementById("cash_esex_categ_delete_error_message").innerHTML =
    "ΕΠΙΒΕΒΑΙΩΣΗ ΔΙΑΓΡΑΦΗΣ";
  document.getElementById("btn_esex_categ_delete").style.visibility = "visible";


  // console.log('in cus_check_before_delete');
  // console.log(current_id + ' ' + current_cus_details);
  // PREPARE URL
  var delURL = serverURL + "/esexcateg/canDelEsexCateg/" + current_id;
  // AJAX MAGIC

  $.ajax({
    url: delURL,
    type: "GET",
    success: function (data) {
      if (data == 0) {
        //// console.log('Cus can be deleted');
        document.getElementById("cash_esex_categ_id").innerHTML = current_id;
        document.getElementById("cash_esex_categ_descr").innerHTML =
          current_esex_categ_descr;
        document.getElementById("cash_esex_categ_delete_error_message").innerHTML =
          "ΕΠΙΒΕΒΑΙΩΣΗ ΔΙΑΓΡΑΦΗΣ";
        document.getElementById("btn_esex_categ_delete").style.visibility =
          "visible";
      } else {
        //// console.log('Cus can NOT be deleted');
        document.getElementById("cash_esex_categ_id").innerHTML = current_id;
        document.getElementById("cash_esex_categ_descr").innerHTML =
          current_esex_categ_descr;
        document.getElementById("cash_esex_categ_delete_error_message").innerHTML =
          "ΑΠΑΓΟΡΕΥΣΗ ΔΙΑΓΡΑΦΗΣ";
        document.getElementById("btn_esex_categ_delete").style.visibility =
          "hidden";
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error service: cash_esex_categ_check_before_delete" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log(
        "Failure service: cash_esex_categ_check_before_delete" + " " + errMsg
      );
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
  
}

function cash_esex_categ_delete() {
  // console.log('in service_delete');
  var current_id = document.getElementById("cash_esex_categ_id").innerHTML;
  var current_esex_categ_descr = document.getElementById(
    "cash_esex_categ_descr"
  ).innerHTML;

  // PREPARE URL
  var delURL = serverURL + "/esexcateg/delEsexCateg/" + current_id;
  // AJAX MAGIC
  $.ajax({
    url: delURL,
    type: "GET",
    success: function (data) {
      var table = $("#cashEsExCategTable").DataTable();
      var filteredData = table
        .rows()
        .indexes()
        .filter(function (value, index) {
          return table.row(value).data()[0] == current_id;
        });

      table.rows(filteredData).remove().draw();
      alert("Η Κατηγορία: " + current_esex_categ_descr + " διαγράφηκε. ");
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error service: cash_esex_categ_delete" + " " + textStatus + " - " + errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure service: cash_esex_categ_delete" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

// --------------------------  GET ID FROM URL --------------------------
function cashEsexCategGetId() {
  let searchParams = new URLSearchParams(window.location.search);
  let paramId = searchParams.get("id");
  return paramId;
}

function esodoClicked() {
  if (document.getElementById("cash_esex_categ_typos_esodo").checked == true) {
    document.getElementById("cash_esex_categ_typos_exodo").checked = false;
  } else {
    document.getElementById("cash_esex_categ_typos_exodo").checked = true;
  }
}

function exodoClicked() {
  if (document.getElementById("cash_esex_categ_typos_exodo").checked == true) {
    document.getElementById("cash_esex_categ_typos_esodo").checked = false;
  } else {
    document.getElementById("cash_esex_categ_typos_esodo").checked = true;
  }
}
