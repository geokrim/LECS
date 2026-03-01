// -------------------------- TABLE SHOW ALL service --------------------------
function serviceGetAll() {
  // console.log(serviceCategDescrById(1));

  // AJAX MAGIC
  $.ajax({
    url: serverURL + "/service/all",
    dataType: "json",
    cache: true,
    success: function (data) {
      // data = JSON.parse(result);
      $.each(data, function (index, data) {
        //!!!--Here is the main catch------>fnAddData
        if (data.active == 1) {
          $("#serviceTable")
            .dataTable()
            .fnAddData(
              [
                data.id,
                '<a href="service_main.html?id=' +
                  data.id +
                  '">' +
                  data.code +
                  "</a>",
                '<a href="service_main.html?id=' +
                  data.id +
                  '">' +
                  data.descr +
                  "</a>",
                '<i class="fa fa-check" aria-hidden="true"></i>',
                data.categDescr,
                data.price,
                // '<span onclick="serviceDelete(' + data.id +  ', \'' + data.descr + '\')" style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i></span>'
                '<a href="" data-toggle="modal" data-target="#service_delete_modal" onclick="service_check_before_delete(' +
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
          $("#serviceTable")
            .dataTable()
            .fnAddData(
              [
                data.id,
                '<a href="service_main.html?id=' +
                  data.id +
                  '">' +
                  data.code +
                  "</a>",
                '<a href="service_main.html?id=' +
                  data.id +
                  '">' +
                  data.descr +
                  "</a>",
                "",
                data.categDescr,
                data.price,
                //'<span onclick="serviceDelete(' + data.id +  ', \'' + data.descr + '\')" style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i></span>'
                '<a href="" data-toggle="modal" data-target="#service_delete_modal" onclick="service_check_before_delete(' +
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
      $("#serviceTable").dataTable().fnDraw();
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

function serviceCategDescrById(serviceCategId) {
  // GET service_CATEG BY ID AND PUT IT INTO ELEMENTS
  var urlserviceCategById = serverURL + "/servicecateg/" + serviceCategId;
  var serviceCategDescr = "";
  var jqXhr = $.ajax({
    url: urlserviceCategById,
    dataType: "json",
    success: function (data) {},
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error service: serviceCategDescrById" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure service: serviceCategDescrById" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });

  jqXhr.done(function (data) {
    // console.log(data.descr);
    // serviceCategDescr = data.descr;
    return data.descr;
  });

  //// console.log(data.descr);
  // return serviceCategDescr;
}

// --------------------------  UPDATE service BY ID --------------------------

function showserviceById() {
  // GET DATA TO UI
  // AJAX MAGIC
  var localcategId = 0;
  var localExexCategId = 0;

  $.ajax({
    url: serverURL + "/service/" + curr_service_id,
    dataType: "json",
    success: function (data) {
      // GET DATA FROM JSON OBJECT
      document.getElementById("service_id").value = data.id;
      document.getElementById("service_code").value = data.code;
      document.getElementById("service_descr").value = data.descr;
      if (data.active == "0") {
        document.getElementById("service_active").checked = false;
      } else {
        document.getElementById("service_active").checked = true;
      }
      document.getElementById("service_comments").value = data.comments;
      localcategId = data.categId;
      if (data.forWeb == "0") {
        document.getElementById("service_for_web").checked = false;
      } else {
        document.getElementById("service_for_web").checked = true;
      }
      localExexCategId = data.esexCategId;
      if (data.requiresVafi == "0") {
        document.getElementById("service_requires_vafi").checked = false;
      } else {
        document.getElementById("service_requires_vafi").checked = true;
      }

      // document.getElementById("cus_address").value = data.categId;
      document.getElementById("service_price").value = data.price;

      showserviceCategForUpdate(localcategId);
      showserviceEsexCategForUpdate(localExexCategId);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error service: showserviceById" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure service: showserviceById" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function showserviceCategForUpdate(selectedCategId) {
  $.ajax({
    url: serverURL + "/servicecateg/all",
    dataType: "json",
    cache: false,
    success: function (data) {
      $.each(data, function (index, data) {
        if (data.id == selectedCategId) {
          var x = document.getElementById("service_categ");
          var option = document.createElement("option");
          option.text = data.descr;
          option.value = data.id;
          option.selected = "selected";
          x.add(option);
        } else {
          var x = document.getElementById("service_categ");
          var option = document.createElement("option");
          option.text = data.descr;
          option.value = data.id;
          x.add(option);
        }
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error service: showserviceCategForUpdate" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure service: showserviceCategForUpdate" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function showserviceEsexCategForUpdate(selectedCategId) {
  $.ajax({
    url: serverURL + "/esexcateg/allActiveEsoda",
    dataType: "json",
    cache: false,
    success: function (data) {
      $.each(data, function (index, data) {
        if (data.id == selectedCategId) {
          var x = document.getElementById("esex_categ");
          var option = document.createElement("option");
          option.text = data.descr;
          option.value = data.id;
          option.selected = "selected";
          x.add(option);
        } else {
          var x = document.getElementById("esex_categ");
          var option = document.createElement("option");
          option.text = data.descr;
          option.value = data.id;
          x.add(option);
        }
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error service: showserviceEsexCategForUpdate" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure service: showserviceEsexCategForUpdate" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function updateserviceById() {
  // PERFORM UPDATE
  var urlServicrUpdate =
    serverURL + "/service/updateServiceById/" + curr_service_id;

  var serviceForWebVar = "0";
  if (document.getElementById("service_for_web").checked == true) {
    serviceForWebVar = "1";
  }

  var serviceRequiresVafi = "0";
  if (document.getElementById("service_requires_vafi").checked == true) {
    serviceRequiresVafi = "1";
  }

  // categId
  var e = document.getElementById("service_categ");
  var selectedCategId = e.options[e.selectedIndex].value;

  // esex categId
  var e2 = document.getElementById("esex_categ"); 
  var selectedEsexCategId = e2.options[e2.selectedIndex].value;

  var activeVar = "0";
  if (document.getElementById("service_active").checked == true) {
    activeVar = "1";
  }

  // PREPARE JSON OBJECT
  var upd_service = {
    id: curr_service_id,
    code: $("#service_code").val(),
    descr: $("#service_descr").val(),
    active: activeVar,
    comments: $("#service_comments").val(),
    categId: selectedCategId,
    forWeb: serviceForWebVar,
    requiresVafi: serviceRequiresVafi,
    esexCategId: selectedEsexCategId,
    price: $("#service_price").val(),
  };

  // AJAX MAGIC
  $.ajax({
    url: urlServicrUpdate,
    dataType: "json",
    type: "POST",
    contentType: "application/json",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify(upd_service),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      // window.location.replace("service.html" + "?pid=" + generateRandomToken());
    },
    complete: function (data) {
      window.location.replace("service.html" + "?pid=" + generateRandomToken());
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error service: updateserviceById" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure service: updateserviceById" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

// --------------------------  INSERT NEW SERVICE  --------------------------
function showServiceCategForInsert() {
  $.ajax({
    url: serverURL + "/servicecateg/all",
    dataType: "json",
    cache: false,
    success: function (data) {
      $.each(data, function (index, data) {
        if (data.active == 1) {
          var x = document.getElementById("service_categ");
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
        "Error service: showServiceCategForInsert" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure service: showServiceCategForInsert" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function showServiceEsexCategForInsert() {
  $.ajax({
    url: serverURL + "/esexcateg/allActiveEsoda",
    dataType: "json",
    cache: false,
    success: function (data) {
      $.each(data, function (index, data) {
        if (data.active == 1) {
          var x = document.getElementById("esex_categ");
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
        "Error service: showServiceEsexCategForInsert" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure service: showServiceEsexCategForInsert" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function insertNewserviceInitialize() {
  document.getElementById("service_for_web").checked = true;
  document.getElementById("service_active").checked = true;
  document.getElementById("service_requires_vafi").checked = false;
}

function insertNewservice() {
  // console.log('insertNewservice');

  // PERFORM UPDATE
  var urlserviceInsert = serverURL + "/service/add/";

  var serviceForWebVar = "0";
  if (document.getElementById("service_for_web").checked == true) {
    serviceForWebVar = "1";
  }
  var serviceRequiresVafi = "0";
  if (document.getElementById("service_requires_vafi").checked == true) {
    serviceRequiresVafi = "1";
  }

  var activeVar = "0";
  if (document.getElementById("service_active").checked == true) {
    activeVar = "1";
  }

  // categId
  var e = document.getElementById("service_categ");
  var selectedCategId = e.options[e.selectedIndex].value;

  // esex categId
  var e2 = document.getElementById("esex_categ");
  var selectedEsexCategId = e2.options[e2.selectedIndex].value;

  // PREPARE JSON OBJECT
  var ins_service = {
    id: 1,
    code: $("#service_code").val(),
    descr: $("#service_descr").val(),
    active: activeVar,
    comments: $("#service_comments").val(),
    categId: selectedCategId,
    forWeb: serviceForWebVar,
    requiresVafi: serviceRequiresVafi,
    esexCategId: selectedEsexCategId,
    price: $("#service_price").val(),
  };
  // console.log(ins_service);

  // AJAX MAGIC
  $.ajax({
    url: urlserviceInsert,
    dataType: "json",
    type: "POST",
    contentType: "application/json",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify(ins_service),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      // window.location.replace("service.html" + "?pid=" + generateRandomToken());
    },
    complete: function (data) {
      window.location.replace("service.html" + "?pid=" + generateRandomToken());
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error service: insertNewservice" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure service: insertNewservice" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

// --------------------------  DELETE service BY ID --------------------------
function service_check_before_delete(current_id, current_service_details) {
  // console.log('in cus_check_before_delete');
  // console.log(current_id + ' ' + current_cus_details);
  // PREPARE URL
  var delURL = serverURL + "/service/canDelService/" + current_id;
  // AJAX MAGIC

  $.ajax({
    url: delURL,
    type: "GET",
    success: function (data) {
      if (data == 0) {
        //// console.log('Cus can be deleted');
        document.getElementById("service_id").innerHTML = current_id;
        document.getElementById("service_details").innerHTML =
          current_service_details;
        document.getElementById("service_delete_error_message").innerHTML =
          "ΕΠΙΒΕΒΑΙΩΣΗ ΔΙΑΓΡΑΦΗΣ";
        document.getElementById("btn_service_delete").style.visibility =
          "visible";
      } else {
        //// console.log('Cus can NOT be deleted');
        document.getElementById("service_id").innerHTML = current_id;
        document.getElementById("service_details").innerHTML =
          current_service_details;
        document.getElementById("service_delete_error_message").innerHTML =
          "ΑΠΑΓΟΡΕΥΣΗ ΔΙΑΓΡΑΦΗΣ";
        document.getElementById("btn_service_delete").style.visibility =
          "hidden";
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error service: service_check_before_delete" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log(
        "Failure service: service_check_before_delete" + " " + errMsg
      );
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function service_delete() {
  // console.log('in service_delete');
  var current_id = document.getElementById("service_id").innerHTML;
  var current_service_details =
    document.getElementById("service_details").innerHTML;

  // PREPARE URL
  var delURL = serverURL + "/service/delService/" + current_id;
  // AJAX MAGIC

  $.ajax({
    url: delURL,
    type: "GET",
    success: function (data) {
      var table = $("#serviceTable").DataTable();
      var filteredData = table
        .rows()
        .indexes()
        .filter(function (value, index) {
          return table.row(value).data()[0] == current_id;
        });

      table.rows(filteredData).remove().draw();
      alert("Η υπηρεσία: " + current_service_details + " διαγράφηκε. ");
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error service: service_delete" + " " + textStatus + " - " + errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure service: service_delete" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function serviceGetId() {
  let searchParams = new URLSearchParams(window.location.search);
  let paramId = searchParams.get("id");
  return paramId;
}
