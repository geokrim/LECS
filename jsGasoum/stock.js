// -------------------------- TABLE SHOW ALL STCK --------------------------
function stckGetAll() {
  // AJAX MAGIC
  $.ajax({
    url: serverURL + "/stck/all",
    dataType: "json",
    cache: true,
    success: function (data) {
      // data = JSON.parse(result);
      $.each(data, function (index, data) {
        if (data.active == 1) {
          //!!!--Here is the main catch------>fnAddData
          $("#stckTable")
            .dataTable()
            .fnAddData(
              [
                data.id,
                '<a href="stock_main.html?id=' +
                  data.id +
                  '">' +
                  data.code +
                  "</a>",
                '<a href="stock_main.html?id=' +
                  data.id +
                  '">' +
                  data.descr +
                  "</a>",
                '<a href="stock_main.html?id=' +
                  data.id +
                  '">' +
                  data.barcode +
                  "</a>",
                '<a href="stock_main.html?id=' +
                  data.id +
                  '">' +
                  data.price +
                  "</a>",
                '<i class="fa fa-check" aria-hidden="true"></i>',
                data.minStock,
                data.stock,
                '<span style="color: blue;"><i class="fa fa-plus" aria-hidden="true"></i></span>',
                '<span style="color: blue;"><i class="fa fa-minus" aria-hidden="true"></i></span>',
                '<span style="color: blue;"><i class="fa fa-save" aria-hidden="true"></i></span>',
                '<a href="" data-toggle="modal" data-target="#stock_delete_modal" onclick="stock_check_before_delete(' +
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
          //!!!--Here is the main catch------>fnAddData
          $("#stckTable")
            .dataTable()
            .fnAddData(
              [
                data.id,
                '<a href="stock_main.html?id=' +
                  data.id +
                  '">' +
                  data.code +
                  "</a>",
                '<a href="stock_main.html?id=' +
                  data.id +
                  '">' +
                  data.descr +
                  "</a>",
                '<a href="stock_main.html?id=' +
                  data.id +
                  '">' +
                  data.barcode +
                  "</a>",
                '<a href="stock_main.html?id=' +
                  data.id +
                  '">' +
                  data.price +
                  "</a>",
                "",
                data.minStock,
                data.stock,
                '<span style="color: blue;"><i class="fa fa-plus" aria-hidden="true"></i></span>',
                '<span style="color: blue;"><i class="fa fa-minus" aria-hidden="true"></i></span>',
                '<span style="color: blue;"><i class="fa fa-save" aria-hidden="true"></i></span>',
                '<a href="" data-toggle="modal" data-target="#stock_delete_modal" onclick="stock_check_before_delete(' +
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
      $("#stckTable").dataTable().fnDraw();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error stock : stckGetAll" + " " + textStatus + " - " + errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure stock : stckGetAll" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function stckGetAllOrders() {
  // AJAX MAGIC
  $.ajax({
    url: serverURL + "/stck/allForOrder",
    dataType: "json",
    cache: true,
    success: function (data) {
      // data = JSON.parse(result);
      $.each(data, function (index, data) {
        //!!!--Here is the main catch------>fnAddData
        $("#stckOrders")
          .dataTable()
          .fnAddData(
            [
              data.id,
              data.code, // '<a href="stock_main.html?id=' + data.id+ '">' + data.code    + '</a>',
              data.descr, // '<a href="stock_main.html?id=' + data.id+ '">' + data.descr + '</a>',
              data.barcode, //'<a href="stock_main.html?id=' + data.id+ '">' + data.barcode + '</a>',
              data.minStock,
              data.stock,
              data.minStock - data.stock,
              data.buyPrice.toFixed(2),
              ((data.minStock - data.stock) * data.buyPrice).toFixed(2),
            ],
            false
          );
      });
      // When second attribut of fnAddData == false, you need to fnDraw
      $("#stckOrders").dataTable().fnDraw();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error stock : stckGetAllOrders" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure stock : stckGetAllOrders" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

// -------------------------- TABLE PLUS MINUS UPDATE BY ID --------------------------
function stckTableYpoloipoPlusMinus() {
  var table = $("#stckTable").DataTable();
  $("#stckTable tbody").on("click", "td", function () {
    var rowIdx = table.cell(this).index().row;
    var columnIndex = table.cell(this).index().columnVisible;
    //  table.cell( rowIdx ).focus();

    // PLUS
    if (table.cell(this).index().columnVisible == 7) {
      // GET CURRENT PAGE NUMBER
      var pageNo = table.page.info().page;
      var prev_data = table.cell({ row: rowIdx, column: columnIndex }).data();
      prev_data = prev_data + 1;
      table.cell({ row: rowIdx, column: columnIndex }).data(prev_data).draw();
      // GO TO PAGE NUMBER
      table.page(pageNo).draw("page");
    }

    // MINUS
    if (table.cell(this).index().columnVisible == 8) {
      // GET CURRENT PAGE NUMBER
      var pageNo = table.page.info().page;
      var prev_data = table
        .cell({ row: rowIdx, column: columnIndex - 1 })
        .data();
      prev_data = prev_data - 1;
      table
        .cell({ row: rowIdx, column: columnIndex - 1 })
        .data(prev_data)
        .draw();
      // GO TO PAGE NUMBER
      table.page(pageNo).draw("page");
    }

    // SAVE
    if (table.cell(this).index().columnVisible == 9) {
      var stckId = table.cell({ row: rowIdx, column: 0 }).data();
      var ypoloipo = table
        .cell({ row: rowIdx, column: columnIndex - 2 })
        .data();

      updateStckYpoloipoById(stckId, ypoloipo);
    }
  });
}
// --------------------------  UPDATE STCK BY ID --------------------------

function showStckById() {
  // GET DATA TO UI
  // AJAX MAGIC
  var localcategId = 0;
  var localEsexCategId = 0;


  $.ajax({
    url: serverURL + "/stck/" + curr_stck_id,
    dataType: "json",
    success: function (data) {
      // GET DATA FROM JSON OBJECT
      document.getElementById("stck_id").value = data.id;
      document.getElementById("stck_code").value = data.code;
      document.getElementById("stck_descr").value = data.descr;
      document.getElementById("stck_barcode").value = data.barcode;
      if (data.active == 1) {
        document.getElementById("stck_active").checked = true;
      } else {
        document.getElementById("stck_active").checked = false;
      }
      document.getElementById("stck_comments").value = data.comments;
      localcategId = data.categId;
      localEsexCategId = data.esexCategId;
      if (data.forWeb == "0") {
        document.getElementById("stck_for_web").checked = false;
      } else {
        document.getElementById("stck_for_web").checked = true;
      }
      // document.getElementById("cus_address").value = data.categId;
      document.getElementById("buy_price").value = data.buyPrice;
      document.getElementById("stck_price").value = data.price;
      document.getElementById("stck_stock").value = data.stock;
      document.getElementById("stck_min_stock").value = data.minStock;

      showStckCategForUpdate(localcategId);
      showStckEsexCategForUpdate(localEsexCategId);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error stock : showStckById" + " " + textStatus + " - " + errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure stock : showStckById" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function showStckCategForUpdate(selectedCategId) {
  $.ajax({
    url: serverURL + "/stckcateg/all",
    dataType: "json",
    cache: false,
    success: function (data) {
      $.each(data, function (index, data) {
        if (data.id == selectedCategId) {
          var x = document.getElementById("stck_categ");
          var option = document.createElement("option");
          option.text = data.descr;
          option.value = data.id;
          option.selected = "selected";
          x.add(option);
        } else {
          var x = document.getElementById("stck_categ");
          var option = document.createElement("option");
          option.text = data.descr;
          option.value = data.id;
          x.add(option);
        }
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error stock : showStckCategForUpdate" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure stock : showStckCategForUpdate" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function showStckEsexCategForUpdate(selectedEsexCategId) {
  $.ajax({
    url: serverURL + "/esexcateg/allActiveEsoda",
    dataType: "json",
    cache: false,
    success: function (data) {
      $.each(data, function (index, data) {
        if (data.id == selectedEsexCategId) {
          var x = document.getElementById("stck_esex_categ");
          var option = document.createElement("option");
          option.text = data.descr;
          option.value = data.id;
          option.selected = "selected";
          x.add(option);
        } else {
          var x = document.getElementById("stck_esex_categ");
          var option = document.createElement("option");
          option.text = data.descr;
          option.value = data.id;
          x.add(option);
        }
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error stock : showStckEsexCategForUpdate" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure stock : showStckEsexCategForUpdate" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function updateStckById() {
  // PERFORM UPDATE
  var urlStcjUpdate = serverURL + "/stck/updateStckById/" + curr_stck_id;

  var stckActive = "0";
  if (document.getElementById("stck_active").checked == true) {
    stckActive = "1";
  }
  var stckForWebVar = "0";
  if (document.getElementById("stck_for_web").checked == true) {
    stckForWebVar = "1";
  }
  // categId
  var e = document.getElementById("stck_categ");
  var selectedCategId = e.options[e.selectedIndex].value;
  
  // esex category
  var e2 = document.getElementById("stck_esex_categ");
  var selectedEsexCategId = e2.options[e2.selectedIndex].value;


  // PREPARE JSON OBJECT
  var upd_stck = {
    id: curr_stck_id,
    code: $("#stck_code").val(),
    descr: $("#stck_descr").val(),
    barcode: $("#stck_barcode").val(),
    active: stckActive,
    comments: $("#stck_comments").val(),
    categId: selectedCategId,
    forWeb: stckForWebVar,
    buyPrice: $("#buy_price").val(),
    price: $("#stck_price").val(),
    stock: $("#stck_stock").val(),
    minStock: $("#stck_min_stock").val(),
    esexCategId: selectedEsexCategId,
  };

  // AJAX MAGIC
  $.ajax({
    url: urlStcjUpdate,
    dataType: "json",
    type: "POST",
    contentType: "application/json",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify(upd_stck),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      // window.location.replace("stock.html" + "?pid=" + generateRandomToken() );
    },
    complete: function (data) {
      window.location.replace("stock.html" + "?pid=" + generateRandomToken());
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error stock : updateStckById" + " " + textStatus + " - " + errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure stock : updateStckById" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

// --------------------------  INSERT NEW  STCK  --------------------------
function showStckCategForInsert() {
  $.ajax({
    url: serverURL + "/stckcateg/all",
    dataType: "json",
    cache: false,
    success: function (data) {
      $.each(data, function (index, data) {
        if (data.active == 1) {
          var x = document.getElementById("stck_categ");
          var option = document.createElement("option");
          option.text = data.descr;
          option.value = data.id;
          option.selected = "selected";
          x.add(option);
        }
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error stock : showStckCategForInsert" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure stock : showStckCategForInsert" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function showStckEsexCategForInsert() {
  $.ajax({
    url: serverURL + "/esexcateg/allActiveEsoda",
    dataType: "json",
    cache: false,
    success: function (data) {
      $.each(data, function (index, data) {
        if (data.active == 1) {
          var x = document.getElementById("stck_esex_categ");
          var option = document.createElement("option");
          option.text = data.descr;
          option.value = data.id;
          option.selected = "selected";
          x.add(option);
        }
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error stock : showStckEsexCategForInsert" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure stock : showStckEsexCategForInsert" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function insertNewStckInitialize() {
  document.getElementById("stck_active").checked = true;
  document.getElementById("stck_for_web").checked = true;
}

function checkIfBarcodeExistsBeforeInsert() {
  var new_barcode = document.getElementById("stck_barcode").value.toString();
  // PREPARE URL
  var checkBarcodeURL = serverURL + "/stck/barcode/" + new_barcode;
  // AJAX MAGIC
  $.ajax({
    url: checkBarcodeURL,
    type: "GET",
    success: function (data) {
      if (data == null) {
        insertNewStck();
      } else {
        alert(
          "To Barcode: " + new_barcode + " υπάρχει ήδη. Απαγόρευση εγγραφής."
        );
      }

      //;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error stock : checkIfBarcodeExistsBeforeInsert" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log(
        "Failure stock : checkIfBarcodeExistsBeforeInsert" + " " + errMsg
      );
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function insertNewStck() {
  // console.log('insertNewStck');

  // PERFORM UPDATE
  var urlStckInsert = serverURL + "/stck/add/";

  var stckActiveVar = "0";
  if (document.getElementById("stck_active").checked == true) {
    stckActiveVar = "1";
  }

  var stckForWebVar = "0";
  if (document.getElementById("stck_for_web").checked == true) {
    stckForWebVar = "1";
  }
  // categId
  var e = document.getElementById("stck_categ");
  var selectedCategId = e.options[e.selectedIndex].value;
  // esex category
  var e2 = document.getElementById("stck_esex_categ");  
  var selectedEsexCategId = e2.options[e2.selectedIndex].value;

  // PREPARE JSON OBJECT
  var ins_stck = {
    id: 1,
    code: $("#stck_code").val(),
    descr: $("#stck_descr").val(),
    barcode: $("#stck_barcode").val(),
    active: stckActiveVar,
    comments: $("#stck_comments").val(),
    categId: selectedCategId,
    forWeb: stckForWebVar,
    buyPrice: $("#buy_price").val(),
    price: $("#stck_price").val(),
    stock: $("#stck_stock").val(),
    minStock: $("#stck_min_stock").val(),
    esexCategId: selectedEsexCategId,
  };
  // console.log(ins_stck);

  // AJAX MAGIC
  $.ajax({
    url: urlStckInsert,
    dataType: "json",
    type: "POST",
    contentType: "application/json",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify(ins_stck),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      // window.location.replace("stock.html" + "?pid=" + generateRandomToken());
    },
    complete: function (data) {
      window.location.replace("stock.html" + "?pid=" + generateRandomToken());
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error stock : insertNewStck" + " " + textStatus + " - " + errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure stock : insertNewStck" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
  // window.location.replace("stock.html" + "?pid=" + generateRandomToken() );
}

// --------------------------  UPDATE STCK YPOLOIPO BY ID --------------------------
function updateStckYpoloipoById(curr_stck_id, currentYpoloipo) {
  var urlRaw = serverURL + "/stck/updateStckYpoloipo/" + curr_stck_id;
  // PREPARE UPDATE DATE
  var today = moment().format("DD/MM/YYYY");
  var todayMySqlMFormat = formatDateForMySQL(today);
  // PREPARE JSON OBJECT
  var upd_stck_ypoloipo = {
    id: curr_stck_id,
    code: 1,
    descr: "descr",
    barcode: "barcode",
    comments: "comments",
    active: 1,
    categId: 1,
    forWeb: 1,
    buyPrice: 10.0,
    price: 10.0,
    stock: currentYpoloipo,
    minStock: 1,
  };
  // AJAX MAGIC
  $.ajax({
    url: urlRaw,
    dataType: "json",
    type: "POST",
    contentType: "application/json",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify(upd_stck_ypoloipo),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      // DO NOTHING
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error stock : updateStckYpoloipoById" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure stock : updateStckYpoloipoById" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
  //alert('Η εγγραφή αποθηκεύτηκε');
  //alert('Id ' + curr_stck_id + ' with ypoloipo: ' + currentYpoloipo);

  var ordersTable = $("#stckOrders").DataTable();

  ordersTable.clear().draw();

  stckGetAllOrders();
}

// --------------------------  DELETE STCK BY ID --------------------------
function stock_check_before_delete(curr_stck_id, current_stock_details) {
  // PREPARE URL
  var delURL = serverURL + "/stck/canDelStck/" + curr_stck_id;
  // AJAX MAGIC
  $.ajax({
    url: delURL,
    type: "GET",
    success: function (data) {
      if (data == 0) {
        //// console.log('Cus can be deleted');
        document.getElementById("stock_id").innerHTML = curr_stck_id;
        document.getElementById("stock_details").innerHTML =
          current_stock_details;
        document.getElementById("stock_delete_error_message").innerHTML =
          "ΕΠΙΒΕΒΑΙΩΣΗ ΔΙΑΓΡΑΦΗΣ";
        document.getElementById("btn_stock_delete").style.visibility =
          "visible";
      } else {
        //// console.log('Cus can NOT be deleted');
        document.getElementById("stock_id").innerHTML = curr_stck_id;
        document.getElementById("stock_details").innerHTML =
          current_stock_details;
        document.getElementById("stock_delete_error_message").innerHTML =
          "ΑΠΑΓΟΡΕΥΣΗ ΔΙΑΓΡΑΦΗΣ";
        document.getElementById("btn_stock_delete").style.visibility = "hidden";
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error stock : stock_check_before_delete" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure stock : stock_check_before_delete" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function stock_delete() {
  var curr_stck_id = document.getElementById("stock_id").innerHTML;
  var current_stock_details =
    document.getElementById("stock_details").innerHTML;

  // PREPARE URL
  var delURL = serverURL + "/stck/delStck/" + curr_stck_id;
  // AJAX MAGIC

  $.ajax({
    url: delURL,
    type: "GET",
    success: function (data) {
      var table = $("#stckTable").DataTable();
      var filteredData = table
        .rows()
        .indexes()
        .filter(function (value, index) {
          return table.row(value).data()[0] == curr_stck_id;
        });

      table.rows(filteredData).remove().draw();
      alert("To Προιόν: " + current_stock_details + " διαγράφηκε. ");
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error stock : stock_delete" + " " + textStatus + " - " + errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure stock : stock_delete" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function stckGetId() {
  let searchParams = new URLSearchParams(window.location.search);
  let paramId = searchParams.get("id");
  return paramId;
}
