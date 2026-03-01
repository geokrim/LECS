// -------------------------- service_CATEG_SHOW_MAIN_TABLE --------------------------
function serviceCategGetAll() {
  // AJAX MAGIC

  $.ajax({
    url: serverURL + "/servicecateg/all",
    dataType: "json",
    cache: false,
    success: function (data) {
      // data = JSON.parse(result);
      $.each(data, function (index, data) {
        //!!!--Here is the main catch------>fnAddData
        var serviceCategActive = "ΝΑΙ";
        if (data.active == "0") {
          serviceCategActive = "ΟΧΙ";
        }
        $("#serviceCategΤable")
          .dataTable()
          .fnAddData(
            [
              data.id,
              '<a href="service_categ_main.html?id=' +
                data.id +
                '">' +
                data.descr +
                "</a>",
              serviceCategActive,
              //'<a href=""  data-toggle="modal" data-target="#serviceCategMainModal" onclick="serviceCategMainModalSetHeaderInfoForUpdate(' + data.id  + ')">'+ data.descr+ '</a>',
              //'<a href=""  data-toggle="modal" data-target="#serviceCategMainModal" onclick="serviceCategMainModalSetHeaderInfoForUpdate(' + data.id  + ')">'+ serviceCategActive + '</a>',

              //'<span  onclick="serviceCategDeleteById(' + data.id +  ', \'' + data.descr + '\')" style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i></span>'
              '<a href="" data-toggle="modal" data-target="#service_categ_delete_modal" onclick="service_categ_check_before_delete(' +
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
      });
      // When second attribut of fnAddData == false, you need to fnDraw
      $("#serviceCategΤable").dataTable().fnDraw();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error service_categ: serviceCategGetAll" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure service_categ: serviceCategGetAll" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

// -------------------------- service_CATEG_UPDATE --------------------------
function showServiceCategById() {
  // GET DATA TO UI
  // AJAX MAGIC

  $.ajax({
    url: serverURL + "/servicecateg/" + curr_service_categ_id,
    dataType: "json",
    success: function (data) {
      // GET DATA FROM JSON OBJECT
      document.getElementById("service_categ_id").value = data.id;
      document.getElementById("service_categ_descr").value = data.descr;

      if (data.active == 1) {
        document.getElementById("service_categ_active").checked = true;
      } else {
        document.getElementById("service_categ_active").checked = false;
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error service_categ: showServiceCategById" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log(
        "Failure service_categ: showServiceCategById" + " " + errMsg
      );
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function serviceCategUpdate() {
  // console.log('serviceCategUpdate');

  var currentValidId = document.getElementById("service_categ_id").value;
  var urlserviceCategUpdate =
    serverURL + "/servicecateg/updateServiceCateg/" + curr_service_categ_id;

  var serviceCategDescr = document.getElementById("service_categ_descr").value;

  var serviceCategIsActive = 0;
  if (document.getElementById("service_categ_active").checked == true) {
    serviceCategIsActive = 1;
  }

  var upd_service_categ = {
    id: currentValidId,
    descr: serviceCategDescr,
    active: serviceCategIsActive,
  };

  // AJAX MAGIC
  $.ajax({
    url: urlserviceCategUpdate,
    dataType: "json",
    type: "POST",
    contentType: "application/json",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify(upd_service_categ),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      // DO NOTHING
    },
    complete: function (data) {
      window.location.replace(
        "service_categ.html" + "?pid=" + generateRandomToken()
      );
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error service_categ: serviceCategUpdate" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure service_categ: serviceCategUpdate" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

// -------------------------- SERVICE_CATEG_NEW --------------------------

function serviceCategInsert() {
  var urlserviceCategInsert = serverURL + "/servicecateg/add/";
  var serviceCategDescr = document.getElementById("service_categ_descr").value;
  var serviceCategIsActive = 0;
  if (document.getElementById("service_categ_active").checked == true) {
    serviceCategIsActive = 1;
  }

  var insertserviceCateg = {
    id: 1,
    descr: serviceCategDescr,
    active: serviceCategIsActive,
  };

  // AJAX MAGIC
  $.ajax({
    url: urlserviceCategInsert,
    dataType: "json",
    type: "POST",
    contentType: "application/json",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify(insertserviceCateg),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      // DO NOTHING
    },
    complete: function (data) {
      window.location.replace(
        "service_categ.html" + "?pid=" + generateRandomToken()
      );
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error service_categ: serviceCategInsert" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure service_categ: serviceCategInsert" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

// -------------------------- DELETE SERVICE_CATEG --------------------------
function service_categ_check_before_delete(
  current_id,
  current_service_categ_details
) {
  // PREPARE URL
  var delURL = serverURL + "/servicecateg/canDelServiceCateg/" + current_id;
  // AJAX MAGIC
  $.ajax({
    url: delURL,
    type: "GET",
    success: function (data) {
      if (data == 0) {
        //// console.log('Cus can be deleted');
        document.getElementById("service_categ_id").innerHTML = current_id;
        document.getElementById("service_categ_details").innerHTML =
          current_service_categ_details;
        document.getElementById(
          "service_categ_delete_error_message"
        ).innerHTML = "ΕΠΙΒΕΒΑΙΩΣΗ ΔΙΑΓΡΑΦΗΣ";
        document.getElementById("btn_service_categ_delete").style.visibility =
          "visible";
      } else {
        //// console.log('Cus can NOT be deleted');
        document.getElementById("service_categ_id").innerHTML = current_id;
        document.getElementById("service_categ_details").innerHTML =
          current_service_categ_details;
        document.getElementById(
          "service_categ_delete_error_message"
        ).innerHTML = "ΑΠΑΓΟΡΕΥΣΗ ΔΙΑΓΡΑΦΗΣ";
        document.getElementById("btn_service_categ_delete").style.visibility =
          "hidden";
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error service_categ: service_categ_check_before_delete" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log(
        "Failure service_categ: service_categ_check_before_delete" +
          " " +
          errMsg
      );
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function service_categ_delete() {
  // console.log('in service_categ_delete');

  var current_id = document.getElementById("service_categ_id").innerHTML;
  var current_service_categ_details = document.getElementById(
    "service_categ_details"
  ).innerHTML;

  // PREPARE URL
  var delURL = serverURL + "/servicecateg/delServiceCateg/" + current_id;
  // AJAX MAGIC

  $.ajax({
    url: delURL,
    type: "GET",
    success: function (data) {
      var table = $("#serviceCategΤable").DataTable();
      var filteredData = table
        .rows()
        .indexes()
        .filter(function (value, index) {
          return table.row(value).data()[0] == current_id;
        });

      table.rows(filteredData).remove().draw();
      alert("H κατηγορία: " + current_service_categ_details + " διαγράφηκε. ");
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error service_categ: service_categ_delete" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log(
        "Failure service_categ: service_categ_delete" + " " + errMsg
      );
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function clickserviceIsActive() {
  // do nothing
}

// -------------------------- SERVICE_CATEG_GENERAL --------------------------
function serviceCategGetId() {
  let searchParams = new URLSearchParams(window.location.search);
  let paramId = searchParams.get("id");
  return paramId;
}
