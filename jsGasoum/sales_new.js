// ----------------------- GENERAL -----------------------
function token_creator() {
  const rand = () => Math.random(0).toString(36).substr(2);
  const token = (length) =>
    (rand() + rand() + rand() + rand() + rand()).substr(0, length);

  return token(50);
}

function sales_new_initialize_dates() {
  // INITIALIZE  DATES TO TODAY
  var currentDate = new Date();
  $("#dt_datepicker").datepicker("setDate", currentDate);
}

function sales_new_initialize_fields() {
  document.getElementById("sale_cus_vafi").value = "";
  document.getElementById("sale_tot_service").value = document.getElementById(
    "sale_tot_service"
  ).value = (Math.round(0 * 100) / 100).toFixed(2);
  document.getElementById("sale_tot_stck").value = document.getElementById(
    "sale_tot_service"
  ).value = (Math.round(0 * 100) / 100).toFixed(2);
  document.getElementById("sale_tot").value = document.getElementById(
    "sale_tot_service"
  ).value = (Math.round(0 * 100) / 100).toFixed(2);
  document.getElementById("sale_eisp_metr").value = document.getElementById(
    "sale_tot_service"
  ).value = (Math.round(0 * 100) / 100).toFixed(2);
  document.getElementById("sale_eisp_karta").value = document.getElementById(
    "sale_tot_service"
  ).value = (Math.round(0 * 100) / 100).toFixed(2);
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
        "Error sales_new: add_cus_to_selection" +
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
      write_to_log("Failure sales_new: add_cus_to_selection" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });

  return promise; //Promise is returned
}

// Deprecated
function getCusIdOld() {
  current_cus_id = document.getElementById("select_cus_old").value;
  // alert('Current cus id is: ' + current_cus_id);
  executeShowCusById(current_cus_id, 3);
  cuslVafiMainModalGetVafesByCusIdForSales(current_cus_id);
  cuslHistoryMainModalGetHistoryByCusIdForSales(current_cus_id);
}

function getCusId() {
  var cus = document.getElementById("select_cus").value;
  var cusArray = cus.split(" ");
  var cus_name = cusArray[1];
  var cus_surname = cusArray[0];
  var dash = cusArray[2];
  var cus_mobile = cusArray[3];

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
      console.log("current_cus_id: " + current_cus_id);
      // alert( 'Επιλέχθηκε ο πελάτης: ' + current_cus_id ); 

      executeShowCusById(current_cus_id, 3);
      cuslVafiMainModalGetVafesByCusIdForSales(current_cus_id);
      cuslHistoryMainModalGetHistoryByCusIdForSales(current_cus_id);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error sales_new: getCusIdNew" + " " + textStatus + " - " + errorThrown
      );
      alert("Error gasoum getCusIdNew: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure sales_new: add_cus_to_selection" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });

  return promise; //Promise is returned
}

// ----------------------- SERVICES -----------------------
function sales_new_initialize_service_fields() {
  sale_current_service_id = 0;
  sale_current_service_amount = 0;
  sale_service_current_user_id = 0;

  document.getElementById("sale_service_axia").value = "0";
  document.getElementById("select_service").value = "0";
  document.getElementById("select_user_service").value = "0";
  document.getElementById("sale_service_requires_vafi").value = "0";
}

function add_service_to_selection() {
  // AJAX MAGIC
  $.ajax({
    url: serverURL + "/service/allActiveOrdered",
    dataType: "json",
    cache: true,
    success: function (data) {
      // data = JSON.parse(result);
      $.each(data, function (index, data) {
        var option = document.createElement("option");
        option.text = data.descr;
        option.value = data.id;
        var select = document.getElementById("select_service");
        select.appendChild(option);
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error sales_new: add_service_to_selection" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert(
        "Error gasoum add_service_to_selection: " +
          textStatus +
          " - " +
          errorThrown
      );
    },
    failure: function (errMsg) {
      write_to_log(
        "Failure sales_new: add_service_to_selection" + " " + errMsg
      );
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function add_user_to_selection_for_services() {
  // AJAX MAGIC
  $.ajax({
    url: serverURL + "/user/allActiveOrdered",
    dataType: "json",
    cache: true,
    success: function (data) {
      // data = JSON.parse(result);
      $.each(data, function (index, data) {
        if(data.isCollaborator == 1) {
          var option = document.createElement("option");
          option.text = data.surname + " " + data.name;
          option.value = data.id;
          var selectService = document.getElementById("select_user_service");
          selectService.appendChild(option);
        }
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error sales_new: add_user_to_selection_for_services" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert(
        "Error gasoum add_user_to_selection_for_services: " +
          textStatus +
          " - " +
          errorThrown
      );
    },
    failure: function (errMsg) {
      write_to_log(
        "Failure sales_new: add_user_to_selection_for_services" + " " + errMsg
      );
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function getServiceDetatilsById(selectObject) {
  var service_id = parseInt(selectObject.value);
  sale_current_service_id = service_id;
  //// console.log('service_id: ' + service_id);
  // AJAX MAGIC
  $.ajax({
    url: serverURL + "/service/" + service_id,
    dataType: "json",
    cache: true,
    success: function (data) {
      sale_current_service_amount = (
        data.price -
        data.price * (document.getElementById("cus_disc_service").value / 100)
      ).toFixed(2);
      document.getElementById("sale_service_axia").value =
        sale_current_service_amount;
      document.getElementById("sale_service_requires_vafi").innerHTML =
        data.requiresVafi;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error sales_new: getServiceDetatilsById" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert(
        "Error gasoum getServiceDetatilsById: " +
          textStatus +
          " - " +
          errorThrown
      );
    },
    failure: function (errMsg) {
      write_to_log("Failure sales_new: getServiceDetatilsById" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function getUserForService(selectObject) {
  var user_id = parseInt(selectObject.value);
  sale_service_current_user_id = user_id;
}

function sale_service_add_to_table() {
  // console.log('sale_current_service_id: ' + sale_current_service_id);
  // console.log('sale_service_current_user_id: '+ sale_service_current_user_id);
  if (sale_current_service_amount_valid) {
    if (sale_current_service_id != 0 && sale_service_current_user_id != 0) {
      // GET tbody tag of table element
      var tbodyRef = document
        .getElementById("salesTableServices")
        .getElementsByTagName("tbody")[0];
      //var tbodyRef = document.getElementById('salesTableServices');

      // GET rowCount
      // var rowCount = tblRowCount.rows.length - 1;
      var rowCount = tbodyRef.rows.length;
      //console.log('rowCount: ' + rowCount);

      // Insert a row at the end of table
      var newRow = tbodyRef.insertRow(rowCount);
      // newRow.id = rowCount;

      // Insert a cell at the end of the row
      // var newCell = newRow.insertCell();
      var service_id_cell = newRow.insertCell(0);
      var service_cell = newRow.insertCell(1);
      var user_id_cell = newRow.insertCell(2);
      var user_cell = newRow.insertCell(3);
      var price_cell = newRow.insertCell(4);
      var requires_vafi_cell = newRow.insertCell(5);
      var delete_cell = newRow.insertCell(6);

      service_id_cell.innerHTML = sale_current_service_id;
      service_cell.innerHTML = $("#select_service option:selected").text();
      user_id_cell.innerHTML = sale_service_current_user_id;
      user_cell.innerHTML = $("#select_user_service option:selected").text();
      price_cell.innerHTML = sale_current_service_amount;
      requires_vafi_cell.innerHTML = document.getElementById(
        "sale_service_requires_vafi"
      ).innerHTML;
      // delete_cell.innerHTML="<button id=\"btn_" + sale_service_table_aa + "\" onclick=\"delete_sale_service_row_from_table(" + 'this'  + ")\">Click here</button>  ";
      delete_cell.innerHTML =
        '<span id="btnService_' +
        sale_service_table_aa +
        '" onclick="delete_sale_service_row_from_table(' +
        sale_service_table_aa +
        ')" style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i></span>  ';
      // Comes from global var and is unique
      sale_service_table_aa = sale_service_table_aa + 1;

      price_cell.setAttribute("contentEditable", true);
      // price_cell.onchange
      sales_new_initialize_service_fields();
    } else {
      if (sale_current_service_id == 0) {
        alert("Δεν έχετε επιλέξει υπηρεσίια.");
      }
      if (sale_service_current_user_id == 0) {
        alert("Δεν έχετε επιλέξει συνεργάτη.");
      }
    }
  }
}
function recalc_sale_service_total() {
  // console.log('recalc_sale_service_total');
  if (sale_current_service_amount_valid) {
    var table = document
      .getElementById("salesTableServices")
      .getElementsByTagName("tbody")[0];
    sale_service_amount_final_sum = 0;
    if (table.rows.length > 0) {
      for (var r = 0, n = table.rows.length; r < n; r++) {
        sale_service_amount_final_sum =
          sale_service_amount_final_sum +
          parseFloat(table.rows[r].cells[4].innerHTML);
      }
      // console.log('TotalServiceAmount: ' + sale_service_amount_final_sum);
      document.getElementById("sale_tot_service").value = (
        Math.round(sale_service_amount_final_sum * 100) / 100
      ).toFixed(2);

      var curr_service_total = sale_service_amount_final_sum;
      var curr_stck_total = (
        Math.round(document.getElementById("sale_tot_stck").value * 100) / 100
      ).toFixed(2);

      // console.log('Service total: ' + curr_service_total);
      // console.log('Stck total: ' + curr_stck_total);

      var curr_total =
        parseFloat(curr_service_total) + parseFloat(curr_stck_total);
      document.getElementById("sale_tot").value = curr_total.toFixed(2);
      // document.getElementById("sale_eisp_metr").value = curr_total.toFixed(2);
    } else {
      document.getElementById("sale_tot_service").value = "0.00";
      document.getElementById("sale_tot").value = "0.00";
    }
  }
}

function delete_sale_service_row_from_table(row_id) {
  var idenitfier = "btnService_" + row_id;
  // console.log('row_id: ' + row_id );
  for (var i = 0, row; (row = salesTableServices.rows[i]); i++) {
    // console.log('Btn id: ' + row.cells[5].firstChild.id);
    if (row.cells[6].firstChild.id == idenitfier) {
      row.parentNode.removeChild(row);
    }
  }

  recalc_sale_service_total();
  sales_update_analysis();
}

function change_sale_service_axia() {
  sale_current_service_amount =
    document.getElementById("sale_service_axia").value;
}

// ----------------------- STOCK -----------------------
function sales_new_initialize_stock_fields() {
  sale_current_stock_id = 0;
  sale_current_stock_amount = 0;
  sale_stock_current_user_id = 0;

  document.getElementById("sale_stock_axia").value = "0";

  document.getElementById("select_stock").value = "0";
  document.getElementById("select_user_stock").value = "0";
}

function add_stock_to_selection() {
  // AJAX MAGIC
  $.ajax({
    url: serverURL + "/stck/allActiveOrdered",
    dataType: "json",
    cache: true,
    success: function (data) {
      // data = JSON.parse(result);
      $.each(data, function (index, data) {
        var option = document.createElement("option");
        option.text = data.descr;
        option.value = data.id;
        var select = document.getElementById("select_stock");
        select.appendChild(option);
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error sales_new: add_stock_to_selection" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert(
        "Error gasoum add_stock_to_selection: " +
          textStatus +
          " - " +
          errorThrown
      );
    },
    failure: function (errMsg) {
      write_to_log("Failure sales_new: add_stock_to_selection" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function add_user_to_selection_for_stock() {
  // AJAX MAGIC
  $.ajax({
    url: serverURL + "/user/allActiveOrdered",
    dataType: "json",
    cache: true,
    success: function (data) {
      // data = JSON.parse(result);
      $.each(data, function (index, data) {
        if(data.isCollaborator == 1) {
          var option = document.createElement("option");
          option.text = data.surname + " " + data.name;
          option.value = data.id;
          var selectService = document.getElementById("select_user_stock");
          selectService.appendChild(option);
        }
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error sales_new: add_user_to_selection_for_stock" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert(
        "Error gasoum add_user_to_selection_for_stock: " +
          textStatus +
          " - " +
          errorThrown
      );
    },
    failure: function (errMsg) {
      write_to_log(
        "Failure sales_new: add_user_to_selection_for_stock" + " " + errMsg
      );
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function getStockDetatilsById(selectObject) {
  var stock_id = parseInt(selectObject.value);
  sale_current_stock_id = stock_id;
  //// console.log('stock_id: ' + stock_id);
  // AJAX MAGIC
  $.ajax({
    url: serverURL + "/stck/" + stock_id,
    dataType: "json",
    cache: true,
    success: function (data) {
      sale_current_stock_amount = (
        data.price -
        data.price * (document.getElementById("cus_disc_stock").value / 100)
      ).toFixed(2);
      document.getElementById("sale_stock_axia").value =
        sale_current_stock_amount;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error sales_new: getStockDetatilsById" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert(
        "Error gasoum getStockDetatilsById: " + textStatus + " - " + errorThrown
      );
    },
    failure: function (errMsg) {
      write_to_log("Failure sales_new: getStockDetatilsById" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function getUserForStock(selectObject) {
  var user_id = parseInt(selectObject.value);
  sale_stock_current_user_id = user_id;
}

function sale_stock_add_to_table() {
  // console.log('sale_current_stock_id: ' + sale_current_stock_id);
  // console.log('sale_stock_current_user_id: '+ sale_stock_current_user_id);
  if (sale_current_stock_amount_valid) {
    if (sale_current_stock_id != 0 && sale_stock_current_user_id != 0) {
      // GET rowCount
      var tblRowCound = document.getElementById("salesTableStock");
      var rowCount = tblRowCound.rows.length - 1;
      //// console.log('rowCount: ' + rowCount);

      // GET tbody tag of table element
      var tbodyRef = document
        .getElementById("salesTableStock")
        .getElementsByTagName("tbody")[0];

      // Insert a row at the end of table
      var newRow = tbodyRef.insertRow(rowCount);
      newRow.id = rowCount;

      // Insert a cell at the end of the row
      // var newCell = newRow.insertCell();
      var stock_id_cell = newRow.insertCell(0);
      var stock_cell = newRow.insertCell(1);
      var user_id_cell = newRow.insertCell(2);
      var user_cell = newRow.insertCell(3);
      var price_cell = newRow.insertCell(4);
      var delete_cell = newRow.insertCell(5);

      stock_id_cell.innerHTML = sale_current_stock_id;
      stock_cell.innerHTML = $("#select_stock option:selected").text();
      user_id_cell.innerHTML = sale_stock_current_user_id;
      user_cell.innerHTML = $("#select_user_stock option:selected").text();
      price_cell.innerHTML = sale_current_stock_amount;
      // delete_cell.innerHTML="<button id=\"btn_" + sale_service_table_aa + "\" onclick=\"delete_sale_service_row_from_table(" + 'this'  + ")\">Click here</button>  ";
      delete_cell.innerHTML =
        '<span id="btnStock_' +
        sale_stock_table_aa +
        '" onclick="delete_sale_stock_row_from_table(' +
        sale_stock_table_aa +
        ')" style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i></span>  ';
      // Comes from global var and is unique
      sale_stock_table_aa = sale_stock_table_aa + 1;

      price_cell.setAttribute("contentEditable", true);
      sales_new_initialize_stock_fields();
    } else {
      if (sale_current_stock_id == 0) {
        alert("Δεν έχετε επιλέξει προιόν.");
      }
      if (sale_stock_current_user_id == 0) {
        alert("Δεν έχετε επιλέξει συνεργάτη.");
      }
    }
  }
}
function recalc_sale_stock_total() {
  // console.log('recalc_sale_service_total');
  if (sale_current_stock_amount_valid) {
    var table = document
      .getElementById("salesTableStock")
      .getElementsByTagName("tbody")[0];
    sale_stock_amount_final_sum = 0;
    if (table.rows.length > 0) {
      for (var r = 0, n = table.rows.length; r < n; r++) {
        sale_stock_amount_final_sum =
          sale_stock_amount_final_sum +
          parseFloat(table.rows[r].cells[4].innerHTML);
      }
      // console.log('TotalStockAmount: ' + sale_stock_amount_final_sum);
      document.getElementById("sale_tot_stck").value =
        sale_stock_amount_final_sum.toFixed(2);

      var curr_stck_total = sale_stock_amount_final_sum;
      var curr_service_total = (
        Math.round(document.getElementById("sale_tot_service").value * 100) /
        100
      ).toFixed(2);

      // console.log('Service total: ' + curr_service_total);
      // console.log('Stck total: ' + curr_stck_total);

      var curr_total =
        parseFloat(curr_service_total) + parseFloat(curr_stck_total);
      document.getElementById("sale_tot").value = curr_total.toFixed(2);
      // document.getElementById("sale_eisp_metr").value = curr_total.toFixed(2);
    } else {
      document.getElementById("sale_tot_stck").value = "0.00";
      document.getElementById("sale_tot").value = "0.00";
    }
  }
}

function change_sale_stock_axia() {
  sale_current_stock_amount = document.getElementById("sale_stock_axia").value;
}

function delete_sale_stock_row_from_table(row_id) {
  var idenitfier = "btnStock_" + row_id;
  // console.log('row_id: ' + row_id );
  for (var i = 0, row; (row = salesTableStock.rows[i]); i++) {
    // console.log('Btn id: ' + row.cells[5].firstChild.id);
    if (row.cells[5].firstChild.id == idenitfier) {
      row.parentNode.removeChild(row);
    }
  }

  recalc_sale_stock_total();
  sales_update_analysis();
}

function stck_barcode_search() {
  var barcode = document.getElementById("stck_barcode").value;
  if (event.keyCode == 13) {
    // AJAX MAGIC
    $.ajax({
      url: serverURL + "/stck/barocde/" + barcode,
      dataType: "json",
      cache: true,
      success: function (data) {
        //alert("Barcode typed: " + barcode + ' : ' +  data.descr) ;
        $("#select_stock").val(data.id);
        document.getElementById("sale_stock_axia").value = data.price;
        sale_current_stock_amount = data.price;
        sale_current_stock_id = data.id;
      },
      error: function (jqXHR, textStatus, errorThrown) {
        write_to_log(
          "Error sales_new: stck_barcode_search" +
            " " +
            textStatus +
            " - " +
            errorThrown
        );
        alert(
          "Error gasoum stck_barcode_search: " +
            textStatus +
            " - " +
            errorThrown
        );
      },
      failure: function (errMsg) {
        write_to_log("Failure sales_new: stck_barcode_search" + " " + errMsg);
        alert("Failure: Ο server δεν ανταποκρίθηκε");
      },
    });

    document.getElementById("stck_barcode").value = "";
  }
}

// ----------------------- EISPRAKSEIS -----------------------

function karta_dbl_click() {
  document.getElementById("sale_eisp_metr").value = "0.00";
  document.getElementById("sale_eisp_karta").value =
    document.getElementById("sale_tot").value;
}

function karta_ypol_click() {
  var num =
    document.getElementById("sale_tot").value -
    document.getElementById("sale_eisp_metr").value;
  document.getElementById("sale_eisp_karta").value = num.toFixed(2);
}

function metritat_dbl_click() {
  document.getElementById("sale_eisp_karta").value = "0.00";
  document.getElementById("sale_eisp_metr").value =
    document.getElementById("sale_tot").value;
}

function metritat_ypol_click() {
  var num =
    document.getElementById("sale_tot").value -
    document.getElementById("sale_eisp_karta").value;
  document.getElementById("sale_eisp_metr").value = num.toFixed(2);
}

// ----------------------- KLEISIMO KARTELAS -----------------------

function get_current_time() {
  current_time = document.getElementById("select_tm").value;
  // console.log('Current time:' + current_time);
}

// IT'S THE SAME AS CLOSE BUT LEAVES THE TAB ACTIVE
function sale_new_save() {
  sale_new_close(1);
}

function sale_new_close(leave_tab_active) {
  document.getElementById("sale_new_save").style.visibility = "hidden";
  document.getElementById("sale_new_close").style.visibility = "hidden";
  insert_sale(leave_tab_active);
}

function insert_sale(leave_tab_active) {
  var dtDtHtmlFormat = document.getElementById("dt_datepicker").value;
  var dtSqlMFormat = formatDateForMySQL(dtDtHtmlFormat);
  var amount = document.getElementById("sale_tot").value;
  var sale_eisp_metr = document.getElementById("sale_eisp_metr").value;
  var sale_eisp_karta = document.getElementById("sale_eisp_karta").value;
  var sale_eisp_total = (
    parseFloat(sale_eisp_metr) + parseFloat(sale_eisp_karta)
  ).toFixed(2);
  // console.log('sale_eisp_total: ' + sale_eisp_total);

  var check_amount_equals_sale_eisp_total = 1;
  check_amount_equals_sale_eisp_total = check_amount_equals_eisp_tot(
    leave_tab_active,
    amount,
    sale_eisp_total
  );
  /*
    // GLOBAL VARS
    // console.log('Open: ' +leave_tab_active);
    // console.log('Dt: ' + dtSqlMFormat);
    // console.log('current_time: ' + current_time);
    // console.log('current_token: ' + current_token);
    // console.log('current_cus_id: ' + current_cus_id);
    // console.log('amount: ' + amount);
*/
  // CHECK IF THERE IS SINTAGI VAFIS IF THERE IS A SERVICE WITH requires_vafi = 0
  var all_good_with_services_and_sintagi_vafis = check_requires_vafi();
  if (
    all_good_with_services_and_sintagi_vafis == 1 &&
    check_amount_equals_sale_eisp_total == 1
  ) {
    // PREPARE JSON OBJECT
    var insert_new_sale = {
      id: 1,
      open: leave_tab_active,
      dt: dtSqlMFormat,
      tm: current_time,
      token: current_token,
      cusId: current_cus_id,
      amount: amount,
    };

    var urlInsertRaw = serverURL + "/sale/add/";
    // AJAX MAGIC
    $.ajax({
      url: urlInsertRaw,
      dataType: "json",
      type: "POST",
      contentType: "application/json",
      // The key needs to match your method's input parameter (case-sensitive).
      data: JSON.stringify(insert_new_sale),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        //// console.log('ajax success: ' + data.id);
        curr_sale_id_for_insert = data.id;
        insert_cus_vafi(curr_sale_id_for_insert);
        insert_sale_service_mov(curr_sale_id_for_insert);
        insert_sale_stck_mov(curr_sale_id_for_insert);
        insert_cash_mov_metrita(curr_sale_id_for_insert);
        insert_cash_mov_karta(curr_sale_id_for_insert);
        get_sale_by_id(curr_sale_id_for_insert);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        write_to_log(
          "Error sales_new: insert_sale" +
            " " +
            textStatus +
            " - " +
            errorThrown
        );
        alert("Error gasoum insert_sale: " + textStatus + " - " + errorThrown);
      },
      failure: function (errMsg) {
        write_to_log("Failure sales_new: insert_sale" + " " + errMsg);
        alert("Failure: Ο server δεν ανταποκρίθηκε");
      },
    });
  } else {
    document.getElementById("sale_new_save").style.visibility = "visible";
    document.getElementById("sale_new_close").style.visibility = "visible";
    // document.getElementById("sale_cus_vafi").focus();
    // alert("ΠΡΟΣΟΧΗ: Απαιτείται συνταγή βαφής. ");
  }
}

function check_requires_vafi() {
  // console.log('In check_requires_vafi');
  var all_good_with_services = 1;
  var tbl = document.getElementById("salesTableServices");
  var element_with_vafi = 0;
  // console.log("element_with_vafi 1 :" + element_with_vafi);

  var sintagi_length = document.getElementById("sale_cus_vafi").value.length;
  // console.log("sintagi_length 2 :" + sintagi_length);

  // READ SERVICE TABLE
  for (var i = 1; i < tbl.rows.length; i++) {
    var curr_requires_vafi = tbl.rows[i].cells[5].innerHTML;
    // console.log("curr_requires_vafi 3 :" + curr_requires_vafi);
    if (curr_requires_vafi == 1) {
      element_with_vafi = 1;
      // console.log("element_with_vafi 4 :" + element_with_vafi);
    }
  }
  if (element_with_vafi == 1 && sintagi_length == 0) {
    all_good_with_services = 0;
    alert("ΠΡΟΣΟΧΗ: Απαιτείται συνταγή βαφής. Παρακαλώ συμπληρώστε την.");
    document.getElementById("sale_cus_vafi").focus();
  }
  // console.log("all_good_with_services 5 :" + all_good_with_services);

  return all_good_with_services;
}

function insert_cus_vafi(curr_sale_id) {
  // console.log('In insert_cus_vafi :' + curr_sale_id);
  // CHECK IF THERE IS A VAFI AT ALL
  if (document.getElementById("sale_cus_vafi").value != "") {
    // PREPARE JSON OBJECT && URL
    var dtVafiDtHtmlFormat = document.getElementById("dt_datepicker").value;
    var dtVafiSqlMFormat = formatDateForMySQL(dtVafiDtHtmlFormat);
    var today = moment().format("DD/MM/YYYY");
    var todayMySqlMFormat = formatDateForMySQL(today);
    var new_vafi_descr = document.getElementById("sale_cus_vafi").value;

    var urlInsertCusVafi = serverURL + "/cusvafi/add/";

    var newCusVafi = {
      id: 1,
      cusId: current_cus_id,
      descr: new_vafi_descr,
      vafiDt: dtVafiSqlMFormat,
      saleId: curr_sale_id,
      userInsert: "gs",
      userUpdate: "gs",
      dateInsert: todayMySqlMFormat,
      dateUpdate: todayMySqlMFormat,
    };

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
        // DO NOTHING
      },
      error: function (jqXHR, textStatus, errorThrown) {
        write_to_log(
          "Error sales_new: insert_cus_vafi" +
            " " +
            textStatus +
            " - " +
            errorThrown
        );
        alert(
          "Error gasoum insert_cus_vafi: " + textStatus + " - " + errorThrown
        );
      },
      failure: function (errMsg) {
        write_to_log("Failure sales_new: insert_cus_vafi" + " " + errMsg);
        alert("Failure: Ο server δεν ανταποκρίθηκε");
      },
    });
  } // END IF
}

function insert_sale_service_mov(curr_sale_id) {
  // console.log('In insert_sale_service_mov :' + curr_sale_id);

  // PREPARE JSON OBJECT && URL
  var dtDtHtmlFormat = document.getElementById("dt_datepicker").value;
  var dtSqlMFormat = formatDateForMySQL(dtDtHtmlFormat);

  var urlInsertSaleServiceMov = serverURL + "/saleServiceMov/add/";

  var tbl = document.getElementById("salesTableServices");

  // READ SERVICE TABLE
  for (var i = 1; i < tbl.rows.length; i++) {
    var curr_service_id = tbl.rows[i].cells[0].innerHTML;
    //var curr_service    = tbl.rows[i].cells[1].innerHTML;
    var curr_user_id = tbl.rows[i].cells[2].innerHTML;
    //var curr_user       = tbl.rows[i].cells[3].innerHTML;
    var curr_amount = tbl.rows[i].cells[4].innerHTML;

    var curr_requires_vafi = tbl.rows[i].cells[5].innerHTML;

    var newSaleServiceMov = {
      id: 1,
      dt: dtSqlMFormat,
      saleId: curr_sale_id,
      serviceId: curr_service_id,
      userId: curr_user_id,
      amount: curr_amount,
      requiresVafi: curr_requires_vafi,
    };

    //console.log('success insert_sale_service_mov');
    // console.log(JSON.stringify(newSaleServiceMov));

    // AJAX MAGIC
    $.ajax({
      url: urlInsertSaleServiceMov,
      dataType: "json",
      type: "POST",
      contentType: "application/json",
      // The key needs to match your method's input parameter (case-sensitive).
      data: JSON.stringify(newSaleServiceMov),
      //data: JSON.parse(newSaleServiceMov),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        // DO NOTHING
      },
      error: function (jqXHR, textStatus, errorThrown) {
        write_to_log(
          "Error sales_new: insert_sale_service_mov" +
            " " +
            textStatus +
            " - " +
            errorThrown
        );
        alert(
          "Error gasoum insert_sale_service_mov: " +
            textStatus +
            " - " +
            errorThrown
        );
      },
      failure: function (errMsg) {
        write_to_log(
          "Failure sales_new: insert_sale_service_mov" + " " + errMsg
        );
        alert("Failure: Ο server δεν ανταποκρίθηκε");
      },
    });
  } // FOR LOOP
}

function insert_sale_stck_mov(curr_sale_id) {
  // console.log('In insert_sale_stck_mov :' + curr_sale_id);

  // PREPARE JSON OBJECT && URL
  var dtDtHtmlFormat = document.getElementById("dt_datepicker").value;
  var dtSqlMFormat = formatDateForMySQL(dtDtHtmlFormat);

  var urlInsertSaleStckMov = serverURL + "/saleStckMov/add/";

  var tbl = document.getElementById("salesTableStock");

  // READ SERVICE TABLE
  for (var i = 1; i < tbl.rows.length; i++) {
    var curr_stck_id = tbl.rows[i].cells[0].innerHTML;
    //var curr_service    = tbl.rows[i].cells[1].innerHTML;
    var curr_user_id = tbl.rows[i].cells[2].innerHTML;
    //var curr_user       = tbl.rows[i].cells[3].innerHTML;
    var curr_amount = tbl.rows[i].cells[4].innerHTML;

    var newSaleStckMov = {
      id: 1,
      dt: dtSqlMFormat,
      saleId: curr_sale_id,
      stckId: curr_stck_id,
      userId: curr_user_id,
      amount: curr_amount,
    };

    // AJAX MAGIC
    $.ajax({
      url: urlInsertSaleStckMov,
      dataType: "json",
      type: "POST",
      contentType: "application/json",
      // The key needs to match your method's input parameter (case-sensitive).
      data: JSON.stringify(newSaleStckMov),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        // DO NOTHING
      },
      error: function (jqXHR, textStatus, errorThrown) {
        write_to_log(
          "Error sales_new: insert_sale_stck_mov" +
            " " +
            textStatus +
            " - " +
            errorThrown
        );
        alert(
          "Error gasoum insert_sale_stck_mov: " +
            textStatus +
            " - " +
            errorThrown
        );
      },
      failure: function (errMsg) {
        write_to_log("Failure sales_new: insert_sale_stck_mov" + " " + errMsg);
        alert("Failure: Ο server δεν ανταποκρίθηκε");
      },
    });
  } // FOR LOOP
}

function insert_cash_mov_metrita(curr_sale_id) {
  // console.log('In insert_cus_vafi :' + curr_sale_id);
  // CHECK IF THERE SHOULD BE A CASH_MOV
  if (
    document.getElementById("sale_eisp_metr").value != "" &&
    document.getElementById("sale_eisp_metr").value != "0.00"
  ) {
    // PREPARE JSON OBJECT && URL
    var dtDtHtmlFormat = document.getElementById("dt_datepicker").value;
    var dtSqlMFormat = formatDateForMySQL(dtDtHtmlFormat);

    var amount = document.getElementById("sale_eisp_metr").value;
    var comment =
      "ΕΙΣΠΡΑΞΗ ΑΠΟ " +
      document.getElementById("cus_surname").value +
      " " +
      document.getElementById("cus_name").value;

    var urlInsertCashMov = serverURL + "/cashMov/add/";

    var newCashMov = {
      id: 1,
      isCash: 1,
      dt: dtSqlMFormat,
      type: 1,
      amount: amount,
      comment: comment,
      saleId: curr_sale_id,
    };

    // AJAX MAGIC
    $.ajax({
      url: urlInsertCashMov,
      dataType: "json",
      type: "POST",
      contentType: "application/json",
      // The key needs to match your method's input parameter (case-sensitive).
      data: JSON.stringify(newCashMov),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        // DO NOTHING
      },
      error: function (jqXHR, textStatus, errorThrown) {
        write_to_log(
          "Error sales_new: insert_cash_mov_metrita" +
            " " +
            textStatus +
            " - " +
            errorThrown
        );
        alert(
          "Error gasoum insert_cash_mov_metrita: " +
            textStatus +
            " - " +
            errorThrown
        );
      },
      failure: function (errMsg) {
        write_to_log(
          "Failure sales_new: insert_cash_mov_metrita" + " " + errMsg
        );
        alert("Failure: Ο server δεν ανταποκρίθηκε");
      },
    });
  } // END IF
}

function insert_cash_mov_karta(curr_sale_id) {
  // console.log('In insert_cash_mov_karta :' + curr_sale_id);

  // CHECK IF THERE SHOULD BE A CASH_MOV
  if (
    document.getElementById("sale_eisp_karta").value != "" &&
    document.getElementById("sale_eisp_karta").value != "0.00"
  ) {
    // PREPARE JSON OBJECT && URL
    var dtDtHtmlFormat = document.getElementById("dt_datepicker").value;
    var dtSqlMFormat = formatDateForMySQL(dtDtHtmlFormat);

    var amount = document.getElementById("sale_eisp_karta").value;
    var comment =
      "ΚΑΤΑΘΕΣΗ ΑΠΟ " +
      document.getElementById("cus_surname").value +
      " " +
      document.getElementById("cus_name").value;

    var urlInsertCashMov = serverURL + "/cashMov/add/";

    var newCashMov = {
      id: 1,
      isCash: 2,
      dt: dtSqlMFormat,
      type: 1,
      amount: amount,
      comment: comment,
      saleId: curr_sale_id,
    };

    // AJAX MAGIC
    $.ajax({
      url: urlInsertCashMov,
      dataType: "json",
      type: "POST",
      contentType: "application/json",
      // The key needs to match your method's input parameter (case-sensitive).
      data: JSON.stringify(newCashMov),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        // DO NOTHING
      },
      error: function (jqXHR, textStatus, errorThrown) {
        write_to_log(
          "Error sales_new: insert_cash_mov_karta" +
            " " +
            textStatus +
            " - " +
            errorThrown
        );
        alert(
          "Error gasoum insert_cash_mov_karta: " +
            textStatus +
            " - " +
            errorThrown
        );
      },
      failure: function (errMsg) {
        write_to_log("Failure sales_new: insert_cash_mov_karta" + " " + errMsg);
        alert("Failure: Ο server δεν ανταποκρίθηκε");
      },
    });
  } // END IF
}

// THIS FUNCTION EXISTS JUST TO RUN WINDOWS.LOCATION TO ACTIVE_TABS.HTML AFTER ALL AJAX INSERTS ARE DONE
function get_sale_by_id(curr_sale_id_for_insert) {
  // PREPARE JSON OBJECT && URL
  var urlSale = serverURL + "/sale/" + curr_sale_id_for_insert;

  // AJAX MAGIC
  $.ajax({
    url: urlSale,
    dataType: "json",
    success: function (data) {
      // ALL IS DONE FOR THIS TO WORK AFTER ALL INSERTS
      //TODO: TEMPORARY OUT FOR DEV REASONS
      // TODO: MAYBE IT SHOULD BE REMOVED
      window.location.replace(
        "active_tabs.html" + "?pid=" + generateRandomToken()
      );
    },
    complete: function (data) {
      // ALL IS DONE FOR THIS TO WORK AFTER ALL INSERTS
      //TODO: TEMPORARY OUT FOR DEV REASONS
      window.location.replace(
        "active_tabs.html" + "?pid=" + generateRandomToken()
      );
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error sales_new: get_sale_by_id" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum get_sale_by_id: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure sales_new: get_sale_by_id" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function sales_update_analysis() {
  if (sale_current_service_amount_valid || sale_current_stock_amount_valid) {
    document.getElementById("sale_analysis").value = "Updated";
    var analysisStr = "";
    analysisStr = analysisStr + "--- ΥΠΗΡΕΣΙΕΣ ---\n";
    var counter = 0;

    var tableServices = document
      .getElementById("salesTableServices")
      .getElementsByTagName("tbody")[0];
    if (tableServices.rows.length > 0) {
      for (var r = 0, n = tableServices.rows.length; r < n; r++) {
        // console.log('r = ' + r + '  n = ' + n);
        counter = counter + 1;
        analysisStr =
          analysisStr +
          counter +
          ". " +
          tableServices.rows[r].cells[1].innerHTML +
          ": " +
          tableServices.rows[r].cells[4].innerHTML +
          "\n";
      }
    }

    analysisStr = analysisStr + "\n--- ΠΡΟΙΟΝΤΑ ---\n";
    var tableStock = document
      .getElementById("salesTableStock")
      .getElementsByTagName("tbody")[0];
    if (tableStock.rows.length > 0) {
      for (var r = 0, n = tableStock.rows.length; r < n; r++) {
        counter = counter + 1;
        analysisStr =
          analysisStr +
          counter +
          ". " +
          tableStock.rows[r].cells[1].innerHTML +
          ": " +
          tableStock.rows[r].cells[4].innerHTML +
          "\n";
      }
    }

    analysisStr = analysisStr + "\n--- ΣΥΝΟΛΟ ---\n";
    analysisStr =
      analysisStr + document.getElementById("sale_tot").value + " ευρώ.";

    document.getElementById("sale_analysis").value = analysisStr;
  }
}

function check_amount_equals_eisp_tot(
  leave_tab_active,
  amount,
  sale_eisp_total
) {
  // leave_tab_active == 0 means that the tab will be closed after the sale is saved

  if (
    parseFloat(amount) != parseFloat(sale_eisp_total) &&
    leave_tab_active == 0
  ) {
    alert(
      "ΠΡΟΣΟΧΗ: Το σύνολο της πώλησης δεν είναι ίσο με το σύνολο των εισπράξεων. " +
        "Σύνολο πώλησης: " +
        amount +
        " - Σύνολο εισπράξεων: " +
        sale_eisp_total
    );
    return 0;
  } else {
    // console.log('Amounts are equal');
    return 1;
  }
}
