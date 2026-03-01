function ajaxCusVafiByCusIdToTable() {
  return $.ajax({
    url: serverURL + "/cusvafi/vafiByCusId/" + cus_id,
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
            '<td><a href="" data-toggle="modal" data-target="#cusVaFiMainModal" onclick="cusVafiUpdateGroupVisible(' +
            item.id +
            ')"><i class="fa fa-edit" aria-hidden="true"></i> </a></td>' +
            // '<td><span onclick="cusVafiUpdateGroupVisible(' + item.id  + ')" style="color: blue;"><i class="fa fa-edit" aria-hidden="true"></i></span>' + '</td>' +
            // '<td><span onclick="cuslVafiDeleteById(' + item.id  + ')" style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i></span>' + '</td></tr>';
            '<td><a href="" data-toggle="modal" data-target="#cus_vafi_delete_modal" onclick="set_vafi_id_for_delete(' +
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
        "Error cusVafi: ajaxCusVafiByCusIdToTable" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure cusVafi: ajaxCusVafiByCusIdToTable" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}
async function executeCusVafiByCusIdToTable() {
  try {
    const resShowProgressBar = await show_progress_line();
    const resCusVafiToTable = await ajaxCusVafiByCusIdToTable();
    const resHideProgressBar = await hide_progress_line();
  } catch (err) {
    console.log(err);
  }
}

// -------------------------- CUS_VAFI_DELETE --------------------------
function cus_vafi_delete() {
  //// console.log('cuslVafiDeleteById: ' + curr_vafi_id_for_delete);
  // PREPARE URL
  var delVafiURL = serverURL + "/cusvafi/delCusVafi/" + curr_vafi_id_for_delete;
  // AJAX MAGIC
  $.ajax({
    url: delVafiURL,
    type: "GET",
    success: function (data) {
      // RELOAD THE TABLE
      ajaxCusVafiByCusIdToTable();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error cusVafi: cus_vafi_delete" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert(
        "Error gasoum cash_mov_delete: " + textStatus + " - " + errorThrown
      );
    },
    failure: function (errMsg) {
      write_to_log("Failure cusVafi: cus_vafi_delete" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}
function set_vafi_id_for_delete(vafi_id, vafi_descr) {
  curr_vafi_id_for_delete = vafi_id;
  curr_vafi_descr_for_delete = vafi_descr;
  document.getElementById("cus_vafi_delte_descr").innerHTML = vafi_descr;
}

// -------------------------- CUS_VAFI_NEW --------------------------
function cusVafiNewGroupVisible() {
  // console.log('cusVafiNewGroupVisible');
  document.getElementById("cus_vafi_new_group").style.visibility = "visible";
  document.getElementById("cus_vafi_update_group").style.visibility = "hidden";
  document.getElementById("btn_cus_vafi_new").style.visibility = "hidden";

  var today = moment().format("DD/MM/YYYY");
  var todayMySqlMFormat = formatDateForMySQL(today);
  //// console.log('cusVafiNewGroupVisible today: ' + today);
  //// console.log('cusVafiNewGroupVisible todayMySqlMFormat: ' + todayMySqlMFormat);

  document.getElementById("cus_vafi_new_datepicker").value = today;

  document.getElementById("cus_vafi_new_descr").value = "";
}
function cusVafiNewSave() {
  // console.log('cusVafiNewSave');
  document.getElementById("cus_vafi_new_group").style.visibility = "hidden";

  var today = moment().format("DD/MM/YYYY");
  var todayMySqlMFormat = formatDateForMySQL(today);
  //// console.log('cusVafiNewGroupVisible today: ' + today);
  //// console.log('cusVafiNewGroupVisible todayMySqlMFormat: ' + todayMySqlMFormat);

  //document.getElementById("cus_vafi_new_datepicker").value = today;

  // PREPARE JSON OBJECT && URL
  var newVafiDt = document.getElementById("cus_vafi_new_datepicker").value;
  // console.log(newVafiDt);
  // console.log('newVafiDt');
  var newVafiDtMuysqlFormat = formatDateForMySQL(newVafiDt);
  var newCusId = cus_id;
  var newCusVafiDescr = document.getElementById("cus_vafi_new_descr").value;

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
      ajaxCusVafiByCusIdToTable();
    },

    complete: function (data) {
      document.getElementById("cus_vafi_update_group").style.visibility =
        "hidden";
      cusVafiByCusIdToTable();
      $("#cusVaFiMainModal").modal("hide");
      window.location.reload();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error cusVafi: cusVafiNewSave" + " " + textStatus + " - " + errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure cusVafi: cusVafiNewSave" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
  $("#cusVaFiMainModal").modal("hide");
}

// -------------------------- CUS_VAFI_UPDATE --------------------------
function cusVafiUpdateGroupVisible(cusVafiId) {
  // console.log('cusVafiUpdateGroupVisible');
  // console.log('cusVafiId: ' + cusVafiId);

  document.getElementById("cus_vafi_new_group").style.visibility = "hidden";
  document.getElementById("cus_vafi_update_group").style.visibility = "visible";
  //document.getElementById('btn_cus_vafi_new').style.visibility = "visible";

  // GET VAFI BY ID AND PUT IT INTO ELEMENTS
  var urlVafiById = serverURL + "/cusvafi/" + cusVafiId;
  $.ajax({
    url: urlVafiById,
    dataType: "json",
    success: function (data) {
      // GET DATA FROM JSON OBJECT
      document.getElementById("cus_vafi_update_id").value = data.id;
      var vafiDateString = formatDateForDatepicker(data.vafiDt);
      document.getElementById("cus_vafi_update_datepicker").value =
        vafiDateString;
      document.getElementById("cus_vafi_update_descr").value = data.descr;
    },
    error: function (jqXHR, textStatus, errorThrown) {
       write_to_log(
        "Error cusVafi: cusVafiUpdateGroupVisible" + " " + textStatus + " - " + errorThrown
      );
      alert("Error: cusVafiUpdateGroupVisible" + textStatus + " - " + errorThrown);
    },
  });
}

function cusVafiUpdateSave() {
  // console.log('cusVafiUpdateSave');

  var currentVadiId = document.getElementById("cus_vafi_update_id").value;
  var urlCusVafiUpdate = serverURL + "/cusvafi/updateCusVafi/" + currentVadiId;

  var cusVafiDtHtmlFormat = document.getElementById(
    "cus_vafi_update_datepicker"
  ).value;
  var cusVafiDtMySqlMFormat = formatDateForMySQL(cusVafiDtHtmlFormat);

  var vafiDescr = document.getElementById("cus_vafi_update_descr").value;

  var today = moment().format("DD/MM/YYYY");
  var todayMySqlMFormat = formatDateForMySQL(today);

  var upd_cus_vafi = {
    id: currentVadiId,
    cusId: "99", // DOES NOT GET UPDATED
    descr: vafiDescr,
    vafiDt: cusVafiDtMySqlMFormat,
    userInsert: "99", // DOES NOT GET UPDATED
    userUpdate: "gs", //TODO localStorage
    dateInsert: "99", // DOES NOT GET UPDATED
    dateUpdate: todayMySqlMFormat,
  };

  // AJAX MAGIC
  $.ajax({
    url: urlCusVafiUpdate,
    dataType: "json",
    type: "POST",
    contentType: "application/json",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify(upd_cus_vafi),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      // RELOAD THE TABLE
      ajaxCusVafiByCusIdToTable();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error cusVafi: cusVafiUpdateSave" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: cusVafiUpdateSave" + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure cusVafi: cusVafiUpdateSave" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
  $("#cusVaFiMainModal").modal("hide");

  // cuslVafiMainModalGetVafesByCusId(); // IT IS SUPPOSED TO DO THIS BUT !!!!
}

// -------------------------- CUS_VAFIES SHOW ON SALES, ACTIVE_TABS --------------------------
function cuslVafiMainModalGetVafesByCusIdForSales(cus_current_id) {
  // Remove previous data
  $("#cusVafesTableSales tbody tr").remove();

  // AJAX MAGIC
  $.ajax({
    url: serverURL + "/cusvafi/vafiByCusId/" + cus_current_id,
    dataType: "json",
    cache: true,
    success: function (data) {
      var trHTML = "";
      $.each(data, function (i, item) {
        trHTML +=
          "<tr><td>" + item.vafiDt + "</td>" + "<td>" + item.descr + "</td>";
      });
      $("#cusVafesTableSales").append(trHTML);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error cusVafi: cuslVafiMainModalGetVafesByCusIdForSales" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log(
        "Failure cusVafi: cuslVafiMainModalGetVafesByCusIdForSales" +
          " " +
          errMsg
      );
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

// -------------------------- LAST_CUS_VAFI SHOW ON SALES, ACTIVE_TABS --------------------------
function cuslLastVafiByCusIdForSales() {
  // console.log('cuslLastVafiByCusIdForSales');
  // console.log('current_cus_id: ' + current_cus_id);
  document.getElementById("sale_cus_vafi").value = "";

  // AJAX MAGIC
  $.ajax({
    url: serverURL + "/cusvafi/lastVafiByCusId/" + current_cus_id,
    dataType: "json",
    cache: true,
    success: function (data) {
      // ONLY IF THERE IS PREVIOUS VAFI
      if (data != null) {
        // console.log('data.descr: ' + data.descr);
        document.getElementById("sale_cus_vafi").value = data.descr;
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error cusVafi: cuslLastVafiByCusIdForSales" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log(
        "Failure cusVafi: cuslLastVafiByCusIdForSales" + " " + errMsg
      );
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}
