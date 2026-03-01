function smsKeimenaToTable() {
  // AJAX MAGIC
  $.ajax({
    url: serverURL + "/smsKeimena/all",
    dataType: "json",
    cache: true,
    success: function (data) {
      // data = JSON.parse(result);
      $.each(data, function (index, data) {
        // active_value = '<i class="fa fa-check" aria-hidden="true"></i>';
        if (data.active == 1) {
          active_value = '<i class="fa fa-check" aria-hidden="true"></i>';
        } else {
          active_value = '<i class="fa fa-minus" aria-hidden="true"></i>';
        }
        //!!!--Here is the main catch------>fnAddData
        $("#datatable1")
          .dataTable()
          .fnAddData(
            [
              data.id,
              '<a href="sms_keimena_main.html?id=' +
                data.id +
                '">' +
                data.title +
                "</a>",
              active_value,
              '<a href="sms_keimena_main.html?id=' +
                data.id +
                '">' +
                data.txt.substring(0, 50) +
                " ..." +
                "</a>",
              //'<a href="" data-toggle="modal" data-target="#sms_keimena_delete_modal"  style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i> </a>'
              '<a href="" data-toggle="modal" data-target="#sms_keimena_delete_modal" onclick="sms_keimena_modal_for_delete(' +
                "'" +
                data.id +
                "' ," +
                "'" +
                data.title +
                "'" +
                ')" style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i> </a>',
            ],
            false
          );
      });
      // When second attribut of fnAddData == false, you need to fnDraw
      $("#datatable1").dataTable().fnDraw();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error sms_keimena: smsKeimenaToTable" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure sms_keimena: smsKeimenaToTable" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function sms_keimena_modal_for_delete(
  current_sms_keimena_id,
  current_sms_keimena_title
) {
  document.getElementById("sms_keimena_id").innerHTML = current_sms_keimena_id;
  document.getElementById("sms_keimena_title").innerHTML =
    current_sms_keimena_title;
}

function smsKeimenaGetId() {
  let searchParams = new URLSearchParams(window.location.search);
  var paramId = searchParams.get("id");
  return paramId;
}

function showSmsKeimenaById(current_sms_keiimena_id) {
  console.log("current_cus_id: " + current_sms_keiimena_id);
  // AJAX MAGIC
  $.ajax({
    url: serverURL + "/smsKeimena/" + current_sms_keiimena_id,
    dataType: "json",
    success: function (data) {
      // EMPTY ELEMENTS FIRST IN CASE ID DOES NOT EXIST
      document.getElementById("sms_keimena_id").value = "";
      document.getElementById("sms_keimena_title").value = "";
      document.getElementById("sms_keimena_txt").value = "";
      if (data.active == 1) {
        document.getElementById("sms_keimena_active").checked = true;
      } else {
        document.getElementById("sms_keimena_active").checked = false;
      }

      // GET DATA FROM JSON OBJECT
      document.getElementById("sms_keimena_id").value = data.id;
      document.getElementById("sms_keimena_title").value = data.title;
      document.getElementById("sms_keimena_txt").value = data.txt;
      document.getElementById("sms_keimena_txt_len").innerHTML =
        data.txt.length;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error sms_keimena: showSmsKeimenaById" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure sms_keimena: showSmsKeimenaById" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function updateSmsKeimenaById() {
  var urlUpdateSmsKeimena =
    serverURL + "/smsKeimena/updateSmsKeimenoById/" + current_sms_keimena_id;
  var activeVar = 0;
  if (document.getElementById("sms_keimena_active").checked == true) {
    activeVar = 1;
  }
  var smsTitle = document.getElementById("sms_keimena_title").value;
  var smsTxt = document.getElementById("sms_keimena_txt").value;

  // PREPARE JSON OBJECT
  var upd_sms_keimena = {
    id: current_sms_keimena_id,
    active: activeVar,
    title: smsTitle,
    txt: smsTxt,
  };

  // AJAX MAGIC
  $.ajax({
    url: urlUpdateSmsKeimena,
    dataType: "json",
    type: "POST",
    contentType: "application/json",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify(upd_sms_keimena),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      // DO NOTHING
    },
    complete: function (data) {
      window.location.replace(
        "sms_keimena.html" + "?pid=" + generateRandomToken()
      );
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error sms_keimena: updateSmsKeimenaById" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure sms_keimena: updateSmsKeimenaById" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function smsKeimenaNewInitialize() {
  document.getElementById("sms_keimena_id").value = "";
  document.getElementById("sms_keimena_active").checked = true;
  document.getElementById("sms_keimena_title").value = "";
  document.getElementById("sms_keimena_txt").value = "";
}

function smsKeimenaInsertNew() {
  // console.log('smsKeimenaInsertNew()');
  var urlInsertSmsKeimena = serverURL + "/smsKeimena/add/";
  var activeVar = 0;
  if (document.getElementById("sms_keimena_active").checked == true) {
    activeVar = 1;
  }
  var smsTitle = document.getElementById("sms_keimena_title").value;
  var smsTxt = document.getElementById("sms_keimena_txt").value;

  // PREPARE JSON OBJECT
  var insert_sms_keimena = {
    id: 1,
    active: activeVar,
    title: smsTitle,
    txt: smsTxt,
  };

  // AJAX MAGIC
  $.ajax({
    url: urlInsertSmsKeimena,
    dataType: "json",
    type: "POST",
    contentType: "application/json",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify(insert_sms_keimena),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      // DO NOTHIING
    },
    complete: function (data) {
      window.location.replace(
        "sms_keimena.html" + "?pid=" + generateRandomToken()
      );
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error sms_keimena: smsKeimenaInsertNew" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure sms_keimena: smsKeimenaInsertNew" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function sms_keimena_delete() {
  var current_id = document.getElementById("sms_keimena_id").innerHTML;
  var current_sms_keimena_title =
    document.getElementById("sms_keimena_title").innerHTML;
  // console.log(current_id + ' ' + current_cus_details);

  // PREPARE URL
  var delURL = serverURL + "/smsKeimena/delSmsKeimeno/" + current_id;
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
          return table.row(value).data()[0] == current_id;
        });

      table.rows(filteredData).remove().draw();
      alert("To κείμενο: " + current_sms_keimena_title + " διαγράφηκε. ");
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error sms_keimena: sms_keimena_delete" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: sms_keimena_delete" + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure sms_keimena: sms_keimena_delete" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}
