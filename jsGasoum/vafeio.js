// ----------------------- GENERAL -----------------------

function initialize_fields() {
  document.getElementById("vafeio_cus_vafi").value = "";
}

function initializeDates() {
  // INITIALIZE  DATES TO TODAY
  var currentDate = new Date();
  $("#dt_datepicker").datepicker("setDate", currentDate);
}

function getCusId() {
  // console.log('---- getCusId ----');
  var cus = document.getElementById("select_cus").value;
  var cusArray = cus.split(" ");
  var cus_name = cusArray[1];
  var cus_surname = cusArray[0];
  var dash = cusArray[2];
  var cus_mobile = cusArray[3];
  var cus_length = document.getElementById("select_cus").value.length;

  if (cus_length == 0) {
    // console.log("cus_length: " + cus_length);
    empty_all_fields();

    // alert("Παρακαλώ επιλέξτε πελάτη από τη λίστα");
    return;
  }

  /*
    console.log('customer: ' + cus);
    console.log('cus_name: ' + cus_name);
    console.log('cus_surname: ' + cus_surname);
    console.log('cus_mobile: ' + cus_mobile);
    */
  var getCusURL =
    serverURL +
    "/cus/cusNameSurnameMobile?name=" +
    cus_name +
    "&surname=" +
    cus_surname +
    "&mobile=" +
    cus_mobile;

  var promise = $.ajax({
    url: getCusURL,
    dataType: "json",
    type: "GET",
    success: function (data) {
      current_cus_id = data.id;
      // console.log("current_cus_id: " + current_cus_id);

      executeShowCusById(current_cus_id, 3);
      ajaxVafeioVafiByCusIdToTable();
      cuslHistoryMainModalGetHistoryByCusIdForSales(current_cus_id);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error vafeio: getCusId" + " " + textStatus + " - " + errorThrown
      );
      alert("Error gasoum getCusId: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure vafeio: getCusId" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });

  return promise; //Promise is returned
}

function add_cus_to_selection() {
  // console.log('---- add_cus_to_selection ----');
  // AJAX MAGIC

  var promise = $.ajax({
    url: serverURL + "/cus/allActiveOrdered",
    dataType: "json",
    cache: true,
    success: function (data) {
      // data = JSON.parse(result);
      $.each(data, function (index, data) {
        /* DEPRECATED OLD WAY OF SELECTING CUSTOMER
                var option = document.createElement("option");
                option.text = data.surname + ' ' + data.name;
                option.value = data.id;
                var select = document.getElementById("select_cus_old");
                select.appendChild(option);
                */

        availableCustomers.push(
          data.surname + " " + data.name + " - " + data.mobile
        );
        $("#select_cus").autocomplete({
          source: availableCustomers,
        });
        document.getElementById("select_cus").disabled = false;
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error vafeio: add_cus_to_selection" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert(
        "Error gasoum add_cus_to_selection: " + textStatus + " - " + errorThrown
      );
    },
    failure: function (errMsg) {
      write_to_log("Failure vafeio: add_cus_to_selection" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });

  return promise; //Promise is returned
}

function empty_all_fields() {
  current_cus_id = -1;
  document.getElementById("vafeio_cus_vafi").value = "";
  //   document.getElementById("select_cus").value = "";
  // EMPTY STOIXEIA PELATI
  empty_stoixeia_pelati();
  // EMPTY ISTORIKO
  $("#cusHistoryTableSales tbody tr").remove();
  // EMPTY TABLE
  $("#cusVafeio tbody tr").remove();
}

function empty_stoixeia_pelati() {
  document.getElementById("cus_id").value = "";
  document.getElementById("cus_name").value = "";
  document.getElementById("cus_surname").value = "";
  document.getElementById("cus_active").checked = false;
  document.getElementById("dob_datepicker").value = "";
  document.getElementById("cus_is_female").checked = false;
  document.getElementById("cus_is_male").checked = false;
  document.getElementById("cus_gdpr").checked = false;
  document.getElementById("cus_gdpr_datepicker").value = "";
  document.getElementById("cus_mobile").value = "";
  document.getElementById("cus_phone").value = "";
  document.getElementById("cus_email").value = "";
  document.getElementById("cus_address").value = "";
  document.getElementById("cus_disc_service").value = "";
  document.getElementById("cus_disc_stock").value = "";
  document.getElementById("cus_days_from_last").value = "";
  document.getElementById("cus_comments").value = "";
}

function new_vafi_save() {
  // alert("Αποθήκευση νέας βαφής. Η λειτουργία θα υλοποιηθεί σύντομα.");
  if (current_cus_id < 0) {
    alert("Παρακαλώ επιλέξτε πελάτη από τη λίστα");
    return;
  }
  var newCusVafiDescr = document.getElementById("vafeio_cus_vafi").value;
  if (newCusVafiDescr.length < 3) {
    alert("Παρακαλώ συμπληρώστε την περιγραφή της βαφής");
    return;
  }
  var newVafiDt = document.getElementById("dt_datepicker").value;
  if (newVafiDt.length < 1) {
    alert("Παρακαλώ συμπληρώστε την ημερομηνία της βαφής");
    return;
  }
  // console.log('new_vafi_save');

  var today = moment().format("DD/MM/YYYY");
  var todayMySqlMFormat = formatDateForMySQL(today);
  //// console.log('cusVafiNewGroupVisible today: ' + today);
  //// console.log('cusVafiNewGroupVisible todayMySqlMFormat: ' + todayMySqlMFormat);

  //document.getElementById("cus_vafi_new_datepicker").value = today;

  // PREPARE JSON OBJECT && URL
  // console.log(newVafiDt);
  // console.log('newVafiDt');
  var newVafiDtMuysqlFormat = formatDateForMySQL(newVafiDt);
  var newCusId = current_cus_id;

  var urlInsertCusVafi = serverURL + "/cusvafi/add/";

  var newCusVafi = {
    id: 1,
    cusId: newCusId,
    descr: newCusVafiDescr,
    vafiDt: newVafiDtMuysqlFormat,
    saleId: 0,
    userInsert: "gs",
    userUpdate: "gs",
    dateInsert: todayMySqlMFormat,
    dateUpdate: todayMySqlMFormat,
  };
  // console.log( newCusVafi);

  // AJAX MAGIC
  $.ajax({
    url: urlInsertCusVafi,
    dataType: "json",
    type: "POST",
    contentType: "application/json",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify(newCusVafi),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      // RELOAD THE TABLE
      ajaxVafeioVafiByCusIdToTable();
    },

    complete: function (data) {
      document.getElementById("vafeio_cus_vafi").value = "";
      // cusVafiByCusIdToTable();
      //  $("#cusVaFiMainModal").modal("hide");
      // window.location.reload();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error vafeio: new_vafi_save" + " " + textStatus + " - " + errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure vafeio: new_vafi_save" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });

  return false; // Prevent default form submission
}

function ajaxVafeioVafiByCusIdToTable() {
  return $.ajax({
    url: serverURL + "/cusvafi/vafiByCusId/" + current_cus_id,
    dataType: "json",
    cache: true,
    success: function (data) {
      $("#cusVafeio tbody tr").remove();
      var trHTML = "";
      $.each(data, function (i, item) {
        if (item.saleId == "0") {
          trHTML +=
            "<tr><td>" +
            item.id +
            "</td>" +
            "<td>" +
            item.vafiDt +
            "</td>" +
            "<td>" +
            item.descr +
            "</td>" +
            '<td><a href="" data-toggle="modal" data-target="#vafeioVaFiMainModal" onclick="cusVafiUpdateGroupVisible(' +
            item.id +
            ')"><i class="fa fa-edit" aria-hidden="true"></i> </a></td>' +
            // '<td><span onclick="cusVafiUpdateGroupVisible(' + item.id  + ')" style="color: blue;"><i class="fa fa-edit" aria-hidden="true"></i></span>' + '</td>' +
            // '<td><span onclick="cuslVafiDeleteById(' + item.id  + ')" style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i></span>' + '</td></tr>';
            '<td><a href="" data-toggle="modal" data-target="#vafeio_vafi_delete_modal" onclick="vafeio_vafi_id_for_delete(' +
            "'" +
            item.id +
            "' ," +
            "'" +
            item.descr +
            "'" +
            ')" style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i> </a>' +
            "</td></tr>";
        } else {
          trHTML +=
            "<tr><td>" +
            item.id +
            "</td>" +
            "<td>" +
            item.vafiDt +
            "</td>" +
            "<td>" +
            item.descr +
            "</td>" +
            "<td> </td>" +
            // '<td><span onclick="cusVafiUpdateGroupVisible(' + item.id  + ')" style="color: blue;"><i class="fa fa-edit" aria-hidden="true"></i></span>' + '</td>' +
            "<td> </td></tr>";
        }
      });
      $("#cusVafeio").append(trHTML);
      // DataTables instantiation.
      // $("#cusVafeio" ).DataTable();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error vafeio: ajaxVafeioVafiByCusIdToTable" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure vafeio: ajaxVafeioVafiByCusIdToTable" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

// -------------------------- CUS_VAFI_DELETE --------------------------
function vafeio_vafi_delete() {
  // console.log("vafeio_vafi_delete: " + curr_vafi_id_for_delete);
  // PREPARE URL
  var delVafiURL = serverURL + "/cusvafi/delCusVafi/" + curr_vafi_id_for_delete;
  // AJAX MAGIC
  $.ajax({
    url: delVafiURL,
    type: "GET",
    success: function (data) {
      // RELOAD THE TABLE
      ajaxVafeioVafiByCusIdToTable();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error vafeio: vafeio_vafi_delete" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert(
        "Error gasoum vafeio_vafi_delete: " + textStatus + " - " + errorThrown
      );
    },
    failure: function (errMsg) {
      write_to_log("Failure vafeio: vafeio_vafi_delete" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}
function vafeio_vafi_id_for_delete(vafi_id, vafi_descr) {
  curr_vafi_id_for_delete = vafi_id;
  curr_vafi_descr_for_delete = vafi_descr;
  document.getElementById("vafeio_vafi_delete_descr").innerHTML = vafi_descr;
}

// -------------------------- LAST_CUS_VAFI SHOW ON VAFEIO --------------------------
function vafeioLastVafiByCusIdForSales() {
  // console.log('vafeioLastVafiByCusIdForSales');
  // console.log('current_cus_id: ' + current_cus_id);
  document.getElementById("vafeio_cus_vafi").value = "";

  // AJAX MAGIC
  $.ajax({
    url: serverURL + "/cusvafi/lastVafiByCusId/" + current_cus_id,
    dataType: "json",
    cache: true,
    success: function (data) {
      // ONLY IF THERE IS PREVIOUS VAFI
      if (data != null) {
        // console.log('data.descr: ' + data.descr);
        document.getElementById("vafeio_cus_vafi").value = data.descr;
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error vafeio: vafeioLastVafiByCusIdForSales" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log(
        "Failure vafeio: vafeioLastVafiByCusIdForSales" + " " + errMsg
      );
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

// -------------------------- CUS_VAFI_UPDATE --------------------------
function cusVafiUpdateGroupVisible(cusVafiId) {
  // console.log('cusVafiUpdateGroupVisible');
  // console.log('cusVafiId: ' + cusVafiId);
  document.getElementById("vafeio_vafi_update_group").style.visibility =
    "visible";
  //document.getElementById('btn_cus_vafi_new').style.visibility = "visible";

  // GET VAFI BY ID AND PUT IT INTO ELEMENTS
  var urlVafiById = serverURL + "/cusvafi/" + cusVafiId;
  $.ajax({
    url: urlVafiById,
    dataType: "json",
    success: function (data) {
      // GET DATA FROM JSON OBJECT
      document.getElementById("vafeio_vafi_update_id").value = data.id;
      var vafiDateString = formatDateForDatepicker(data.vafiDt);
      document.getElementById("vafeio_vafi_update_datepicker").value =
        vafiDateString;
      document.getElementById("vafeio_vafi_update_descr").value = data.descr;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert("Error: " + textStatus + " - " + errorThrown);
    },
  });
}

function vafeioVafiUpdate() {
  // console.log('vafeioVafiUpdate');

  var currentVafiId = document.getElementById("vafeio_vafi_update_id").value;
  var urlVafeioVafiUpdate =
    serverURL + "/cusvafi/updateCusVafi/" + currentVafiId;

  var cusVafiDtHtmlFormat = document.getElementById(
    "vafeio_vafi_update_datepicker"
  ).value;
  var vafeioVafiDtMySqlMFormat = formatDateForMySQL(cusVafiDtHtmlFormat);

  var vafiDescr = document.getElementById("vafeio_vafi_update_descr").value;

  var today = moment().format("DD/MM/YYYY");
  var todayMySqlMFormat = formatDateForMySQL(today);

  var upd_cus_vafi = {
    id: currentVafiId,
    cusId: "99", // DOES NOT GET UPDATED
    descr: vafiDescr,
    vafiDt: vafeioVafiDtMySqlMFormat,
    userInsert: "99", // DOES NOT GET UPDATED
    userUpdate: "gs", //TODO localStorage
    dateInsert: "99", // DOES NOT GET UPDATED
    dateUpdate: todayMySqlMFormat,
  };

  // AJAX MAGIC
  $.ajax({
    url: urlVafeioVafiUpdate,
    dataType: "json",
    type: "POST",
    contentType: "application/json",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify(upd_cus_vafi),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      // RELOAD THE TABLE
      ajaxVafeioVafiByCusIdToTable();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error vafeio: vafeioVafiUpdate" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure vafeio: vafeioVafiUpdate" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
  $("#vafeioVaFiMainModal").modal("hide");

  // cuslVafiMainModalGetVafesByCusId(); // IT IS SUPPOSED TO DO THIS BUT !!!!
}
