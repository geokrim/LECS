// -------------------------- STCK_CATEG_SHOW_MAIN_TABLE --------------------------
function stckCategGetAll() {
  // AJAX MAGIC

  $.ajax({
    url: serverURL + "/stckcateg/all",
    dataType: "json",
    cache: false,
    success: function (data) {
      // data = JSON.parse(result);
      $.each(data, function (index, data) {
        //!!!--Here is the main catch------>fnAddData
        var stckCategActive = "ΝΑΙ";
        if (data.active == "0") {
          stckCategActive = "ΟΧΙ";
        }
        $("#stckCategΤable")
          .dataTable()
          .fnAddData(
            [
              data.id,
              '<a href="stock_categ_main.html?id=' +
                data.id +
                '">' +
                data.descr +
                "</a>",
              stckCategActive,
              // OLD WAY WITH MODAL
              // '<a href=""  data-toggle="modal" data-target="#stckCategMainModal" onclick="stckCategMainModalSetHeaderInfoForUpdate(' + data.id  + ')">'+ data.descr+ '</a>',
              // '<a href=""  data-toggle="modal" data-target="#stckCategMainModal" onclick="stckCategMainModalSetHeaderInfoForUpdate(' + data.id  + ')">'+ stckCategActive + '</a>',
              // '<span  onclick="stckCategDeleteById(' + data.id +  ', \'' + data.descr + '\')" style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i></span>'
              '<a href="" data-toggle="modal" data-target="#stock_categ_delete_modal" onclick="stock_categ_check_before_delete(' +
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
      $("#stckCategΤable").dataTable().fnDraw();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error stock_catetg : stckCategGetAll" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure stock_catetg : stckCategGetAll" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

// -------------------------- STCK_CATEG_UPDATE --------------------------

function showStckCategById() {
  // GET DATA TO UI
  // AJAX MAGIC

  $.ajax({
    url: serverURL + "/stckcateg/" + curr_stck_categ_id,
    dataType: "json",
    success: function (data) {
      // GET DATA FROM JSON OBJECT
      document.getElementById("stck_categ_id").value = data.id;
      document.getElementById("stck_categ_descr").value = data.descr;

      if (data.active == 1) {
        document.getElementById("stck_categ_active").checked = true;
      } else {
        document.getElementById("stck_categ_active").checked = false;
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error stock_catetg : showStckCategById" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure stock_catetg : showStckCategById" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function stckCategUpdate() {
  // console.log('stckCategUpdate');

  var currentValidId = document.getElementById("stck_categ_id").value;
  var urlStckCategUpdate =
    serverURL + "/stckcateg/updateStckCateg/" + currentValidId;

  var stckCategDescr = document.getElementById("stck_categ_descr").value;

  var stckCategIsActive = 0;
  if (document.getElementById("stck_categ_active").checked == true) {
    stckCategIsActive = 1;
  }

  var upd_stck_categ = {
    id: currentValidId,
    descr: stckCategDescr,
    active: stckCategIsActive,
  };

  // AJAX MAGIC
  $.ajax({
    url: urlStckCategUpdate,
    dataType: "json",
    type: "POST",
    contentType: "application/json",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify(upd_stck_categ),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      // DO NOTHING
    },
    complete: function (data) {
      window.location.replace(
        "stock_categ.html" + "?pid=" + generateRandomToken()
      );
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error stock_catetg : stckCategUpdate" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure stock_catetg : stckCategUpdate" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

// -------------------------- STCK_CATEG_NEW --------------------------

function stckCategInsert() {
  var urlStckCategInsert = serverURL + "/stckcateg/add/";
  var stckCategDescr = document.getElementById("stck_categ_descr").value;
  var stckCategIsActive = 0;
  if (document.getElementById("stck_categ_active").checked == true) {
    stckCategIsActive = 1;
  }

  var insertStckCateg = {
    id: 1,
    descr: stckCategDescr,
    active: stckCategIsActive,
  };

  // AJAX MAGIC
  $.ajax({
    url: urlStckCategInsert,
    dataType: "json",
    type: "POST",
    contentType: "application/json",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify(insertStckCateg),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      // DO NOTHING
    },
    complete: function (data) {
      window.location.replace(
        "stock_categ.html" + "?pid=" + generateRandomToken()
      );
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error stock_catetg : stckCategInsert" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure stock_catetg : stckCategInsert" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

// -------------------------- STCK_CATEG_DELETE --------------------------
function stock_categ_check_before_delete(
  curr_stck_categ_id,
  current_stock_categ_details
) {
  // PREPARE URL
  var delURL = serverURL + "/stckcateg/canDelStckCateg/" + curr_stck_categ_id;
  // AJAX MAGIC

  $.ajax({
    url: delURL,
    type: "GET",
    success: function (data) {
      if (data == 0) {
        //// console.log('Cus can be deleted');
        document.getElementById("stock_categ_id").innerHTML =
          curr_stck_categ_id;
        document.getElementById("stock_categ_details").innerHTML =
          current_stock_categ_details;
        document.getElementById("stock_categ_delete_error_message").innerHTML =
          "ΕΠΙΒΕΒΑΙΩΣΗ ΔΙΑΓΡΑΦΗΣ";
        document.getElementById("btn_stock_categ_delete").style.visibility =
          "visible";
      } else {
        //// console.log('Cus can NOT be deleted');
        document.getElementById("stock_categ_id").innerHTML =
          curr_stck_categ_id;
        document.getElementById("stock_categ_details").innerHTML =
          current_stock_categ_details;
        document.getElementById("stock_categ_delete_error_message").innerHTML =
          "ΑΠΑΓΟΡΕΥΣΗ ΔΙΑΓΡΑΦΗΣ";
        document.getElementById("btn_stock_categ_delete").style.visibility =
          "hidden";
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error stock_catetg : stock_categ_check_before_delete" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log(
        "Failure stock_catetg : stock_categ_check_before_delete" + " " + errMsg
      );
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function stock_categ_delete() {
  // console.log('in cus_delete');

  var curr_stck_categ_id = document.getElementById("stock_categ_id").innerHTML;
  var current_stock_details = document.getElementById(
    "stock_categ_details"
  ).innerHTML;
  // console.log(curr_stck_categ_id + ' ' + current_cus_details);

  // PREPARE URL
  var delURL = serverURL + "/stckcateg/delStckcateg/" + curr_stck_categ_id;
  // AJAX MAGIC

  $.ajax({
    url: delURL,
    type: "GET",
    success: function (data) {
      var table = $("#stckCategΤable").DataTable();
      var filteredData = table
        .rows()
        .indexes()
        .filter(function (value, index) {
          return table.row(value).data()[0] == curr_stck_categ_id;
        });

      table.rows(filteredData).remove().draw();
      alert("H κατηγορία:  " + current_stock_details + " διαγράφηκε. ");
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error stock_catetg : stock_categ_delete" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure stock_catetg : stock_categ_delete" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function clickStckIsActive() {
  // do nothing
}

// -------------------------- STCK_CATEG_GENERAL --------------------------
function stckCategGetId() {
  let searchParams = new URLSearchParams(window.location.search);
  let paramId = searchParams.get("id");
  return paramId;
}
