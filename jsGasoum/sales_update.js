// ----------------------- CUS & BASIKA STOIXEIA -----------------------
function add_cus_to_selection_with_promise() {
  // console.log('---- add_cus_to_selection ----');
  // AJAX MAGIC
  availableCustomers = new Array();
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
                var select = document.getElementById("select_cus");
                select.appendChild(option);
                */

        availableCustomers.push(
          data.surname + " " + data.name + " - " + data.mobile
        );
        $("#select_cus").autocomplete({
          source: availableCustomers,
        });
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("error add_cus_to_selection_with_promise");
      write_to_log(
        "Error sales_update: add_cus_to_selection_with_promise" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert(
        "Error gasoum: add_cus_to_selection_with_promise" + textStatus + " - " + errorThrown
      );
    },
    failure: function (errMsg) {
      console.log("failure add_cus_to_selection_with_promise");
      write_to_log(
        "Failure sales_update: add_cus_to_selection_with_promise" + " " + errMsg
      );
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
  return promise; //Promise is returned
}

function getCurrentCusIdAndCurrentSaleVafi() {
  // console.log('---tab_show_basika_stoixeia--- ');
  // AJAX MAGIC
  var promise = $.ajax({
    url: serverURL + "/sale/" + current_sale_id,
    dataType: "json",
    success: function (data) {
      // SHOW DATE
      var dtDateString = formatDateForDatepicker(data.dt);
      document.getElementById("dt_datepicker").value = dtDateString;
      // SHOW TIME
      var tmSelect = document.querySelector("#select_tm");
      Array.from(tmSelect.options).forEach(function (option, index) {
        if (option.value === data.tm) {
          tmSelect.selectedIndex = index;
        }
      });
      // tab_show_cus(data.cusId);
      current_cus_id = data.cusId;
      // console.log("getCurrentCusIdAndCurrentSaleVafi current_cus_id: " + current_cus_id);

      /*
             var cusSelect = document.querySelector('#select_cus');
             var tmpCus = data.surname + ' ' + data.name + ' - ' + data.mobile;
             var foundCus = availableCustomers.find(element => element = tmpCus) ;
             console.log("tab_show_basika_stoixeia foundCus: "+ foundCus);

             if (foundCus != undefined){
                document.querySelector('#select_cus').innerHTML = data.surname + ' ' + data.name + ' - ' + data.mobile;
             }
             */

      // SHOW CUS DEPRECATED
      /*
             var cusSelect = document.querySelector('#select_cus');
             // document.getElementById("ΑΓΓΕΛΙΔΟΥ ΑΝΝΑ").selected = true;
             // cusSelect.options[cusSelect.options.length] = new Option('ΑΓΓΕΛΙΔΟΥ ΑΝΝΑ', 'Value1');
             //usSelect.selectedIndex = 1;
             
             // console.log('data.cusId: ' + data.cusId);
             Array.from(cusSelect.options).forEach(function (option2, index) {
                // console.log('option.value: ' + option2.value);
                 if (option2.value == data.cusId) {
                     // console.log('option.value match: ' + option2.value);
                     cusSelect.selectedIndex = index;

                     // NEEDED FOR STOIXEIA PELATI & PROIGOUMENES VAFES
                     getCusId();
                     current_cus_id = data.cusId;
                     // console.log('In tab_show_basika_stoixeia current_cus_id: '+ current_cus_id);
                 }
             });
             */
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error sales_update: getCurrentCusIdAndCurrentSaleVafi" + " " + textStatus + " - " + errorThrown
      );
      alert(
        "Error gasoum tab_show_basika_stoixeia: " +
          textStatus +
          " - " +
          errorThrown
      );
    },
    failure: function (errMsg) {
      write_to_log(
        "Failure sales_update: getCurrentCusIdAndCurrentSaleVafi" + " " + errMsg
      );
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });

  // GET VAFI FOR CURRENT SALE
  // AJAX MAGIC
  $.ajax({
    url: serverURL + "/cusvafi/vafiBySaleId/" + current_sale_id,
    dataType: "json",
    success: function (data) {
      //  CHECK IF VAFI EXISTS AT ALL
      if (data != null) {
        document.getElementById("sale_cus_vafi").value = data.descr;
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error sales_update: getCurrentCusIdAndCurrentSaleVafi" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert(
        "Error gasoum getCurrentCusIdAndCurrentSaleVafi: " +
          textStatus +
          " - " +
          errorThrown
      );
    },
    failure: function (errMsg) {
      write_to_log(
        "Failure sales_update: getCurrentCusIdAndCurrentSaleVafi" + " " + errMsg
      );
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });

  return promise; //Promise is returned
}

function tab_show_cus_and_basika_stoixeia() {
  // console.log("tab_show_cus_and_basika_stoixeia current_cus_id: " + current_cus_id);

  // SHOW CUSTOMER SELECTED
  ajaxShowCusSurnameNameMobileById(current_cus_id);
  executeShowCusById(current_cus_id, 2);
  cuslVafiMainModalGetVafesByCusIdForSales(current_cus_id);
  cuslHistoryMainModalGetHistoryByCusIdForSales(current_cus_id);
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

function tab_show_services() {
  var promise =
    // AJAX MAGIC
    $.ajax({
      url: serverURL + "/saleServiceMov/bySaleId/" + current_sale_id,
      dataType: "json",
      success: function (data) {
        $.each(data, function (index, data) {
          // GET rowCount
          var tblRowCound = document.getElementById("salesTableServices");
          var rowCount = tblRowCound.rows.length - 1;
          //// console.log('rowCount: ' + rowCount);

          // GET tbody tag of table element
          var tbodyRef = document
            .getElementById("salesTableServices")
            .getElementsByTagName("tbody")[0];

          // Insert a row at the end of table
          var newRow = tbodyRef.insertRow(rowCount);
          newRow.id = rowCount;

          // Insert a cell at the end of the row
          // var newCell = newRow.insertCell();
          var service_id_cell = newRow.insertCell(0);
          var service_cell = newRow.insertCell(1);
          var user_id_cell = newRow.insertCell(2);
          var user_cell = newRow.insertCell(3);
          var price_cell = newRow.insertCell(4);
          var requires_vafi_cell = newRow.insertCell(5);
          var delete_cell = newRow.insertCell(6);

          service_id_cell.innerHTML = data.serviceId;
          var servicePromise = getServiceDescrByIdAsync(data.serviceId);
          servicePromise.success(function (data1) {
            var serviceDescr = data1.descr;
            service_cell.innerHTML = serviceDescr;
          });

          user_id_cell.innerHTML = data.userId;
          var userPromise = getUserNameByIdAsync(data.userId);
          userPromise.success(function (data1) {
            var userName = data1.surname + " " + data1.name;
            user_cell.innerHTML = userName;
          });
          // OLD WAY WITH SYNC AJAX
          //user_cell.innerHTML=getUserNameByIdSync(data.userId);
          price_cell.innerHTML = data.amount;
          //TODO: NEEDS TO BE FIXED 2025-07-23
          requires_vafi_cell.innerHTML = data.requiresVafi;
          // delete_cell.innerHTML="<button id=\"btn_" + sale_service_table_aa + "\" onclick=\"delete_sale_service_row_from_table(" + 'this'  + ")\">Click here</button>  ";
          delete_cell.innerHTML =
            '<span id="btnService_' +
            sale_service_table_aa +
            '" onclick="delete_sale_service_row_from_table(' +
            sale_service_table_aa +
            ')" style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i></span>  ';
          // Comes from global var and is unique
          sale_service_table_aa = sale_service_table_aa + 1;

          price_cell.setAttribute("contentEditable", false);
        });
        // When second attribut of fnAddData == false, you need to fnDraw
        //$("#datatable1").dataTable().fnDraw();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        write_to_log(
          "Error sales_update: tab_show_services" +
            " " +
            textStatus +
            " - " +
            errorThrown
        );
        alert("Error gasoum: " + textStatus + " - " + errorThrown);
      },
      failure: function (errMsg) {
        write_to_log("Failure sales_update: tab_show_services" + " " + errMsg);
        alert("Failure: Ο server δεν ανταποκρίθηκε");
      },
    });

  return promise; //Promise is returned
}

function change_sale_service_axia() {
  sale_current_service_amount =
    document.getElementById("sale_service_axia").value;
}

// ----------------------- STCK -----------------------
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

function tab_show_stck() {
  // AJAX MAGIC
  $.ajax({
    url: serverURL + "/saleStckMov/bySaleId/" + current_sale_id,
    dataType: "json",
    success: function (data) {
      $.each(data, function (index, data) {
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

        stock_id_cell.innerHTML = data.stckId;
        var stockPromise = getStckDescrByIdAsync(data.stckId);
        stockPromise.success(function (data1) {
          var stockDescr = data1.descr;
          stock_cell.innerHTML = stockDescr;
        });
        // OLD WAY WITH SYNC AJAX
        //stock_cell.innerHTML= getStckDescrByIdSync(data.stckId);
        user_id_cell.innerHTML = data.userId;
        var userPromise = getUserNameByIdAsync(data.userId);
        userPromise.success(function (data1) {
          var userName = data1.surname + " " + data1.name;
          user_cell.innerHTML = userName;
        });
        // OLD WAY WITH SYNC AJAX
        //user_cell.innerHTML=getUserNameByIdSync(data.userId);
        price_cell.innerHTML = data.amount;
        // delete_cell.innerHTML="<button id=\"btn_" + sale_service_table_aa + "\" onclick=\"delete_sale_service_row_from_table(" + 'this'  + ")\">Click here</button>  ";
        delete_cell.innerHTML =
          '<span id="btnStock_' +
          sale_stock_table_aa +
          '" onclick="delete_sale_stock_row_from_table(' +
          sale_stock_table_aa +
          ')" style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i></span>  ';
        // Comes from global var and is unique
        sale_stock_table_aa = sale_stock_table_aa + 1;

        price_cell.setAttribute("contentEditable", false);
      });
      // When second attribut of fnAddData == false, you need to fnDraw
      //$("#datatable1").dataTable().fnDraw();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error sales_update: tab_show_stck" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert(
        "Error gasoum: /saleStckMov/bySaleId/" +
          textStatus +
          " - " +
          errorThrown
      );
    },
    failure: function (errMsg) {
      write_to_log("Failure sales_update: tab_show_stck" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}
// ----------------------- TOTALS -----------------------
function tab_show_totals() {
  // NO NEED FOR ANYTHING
}
// ----------------------- EISP -----------------------
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

function tab_show_eisp() {
  document.getElementById("sale_eisp_metr").value = "0.00";
  document.getElementById("sale_eisp_karta").value = "0.00";
  // AJAX MAGIC
  $.ajax({
    url: serverURL + "/cashMov/bySaleId/" + current_sale_id,
    dataType: "json",
    success: function (data) {
      var numberOfEntries = data.length;
      // console.log('IsCashEntries: ' + numberOfEntries);
      // CASE WHERE ONLY CASH OR KARTA
      if (numberOfEntries == 1) {
        var kind = data[0].isCash;
        // console.log('kind is: ' + kind);
        if (kind == 1) {
          document.getElementById("sale_eisp_metr").value =
            data[0].amount.toFixed(2);
          document.getElementById("sale_eisp_karta").value = "0.00";
        }
        if (kind == 2) {
          document.getElementById("sale_eisp_metr").value = "0.00";
          document.getElementById("sale_eisp_karta").value =
            data[0].amount.toFixed(2);
        }
      }
      // CASE WHEN BOTH CASH AND KARTA
      if (numberOfEntries == 2) {
        $.each(data, function (index, data) {
          // GET TYPE

          var kind = data.isCash;
          // console.log('kind is: ' + kind);
          if (kind == 1) {
            document.getElementById("sale_eisp_metr").value = data.amount;
          }
          if (kind == 2) {
            document.getElementById("sale_eisp_karta").value = data.amount;
          }
        });
      }
      // When second attribut of fnAddData == false, you need to fnDraw
      //$("#datatable1").dataTable().fnDraw();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error sales_update: tab_show_eisp" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: tab_show_eisp" + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure sales_update: tab_show_eisp" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

// ----------------------- GENERAL -----------------------
function saleGetId() {
  let searchParams = new URLSearchParams(window.location.search);
  let paramId = searchParams.get("id");
  return paramId;
}

function getServiceDescrByIdAsync(serviceId) {
  // AJAX MAGIC
  return $.ajax({
    url: serverURL + "/service/" + serviceId,
    dataType: "json",
  });
}
// Sync is very slow
function getServiceDescrByIdSync(serviceId) {
  var descr = "";
  // AJAX MAGIC
  $.ajax({
    async: false,
    url: serverURL + "/service/" + serviceId,
    dataType: "json",
    success: function (data) {
      descr = data.descr;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error sales_update: getServiceDescrByIdSync" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert(
        "Error gasoum: getServiceDescrByIdSync" +
          textStatus +
          " - " +
          errorThrown
      );
    },
    failure: function (errMsg) {
      write_to_log(
        "Failure sales_update: getServiceDescrByIdSync" + " " + errMsg
      );
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
  // console.log ('descr is:' + descr);
  return descr;
}

function getStckDescrByIdAsync(stckId) {
  // AJAX MAGIC
  return $.ajax({
    url: serverURL + "/stck/" + stckId,
    dataType: "json",
  });
}
// Sync is very slow
function getStckDescrByIdSync(stckId) {
  var descr = "";
  // AJAX MAGIC
  $.ajax({
    async: false,
    url: serverURL + "/stck/" + stckId,
    dataType: "json",
    success: function (data) {
      descr = data.descr;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error sales_update: getStckDescrByIdASync" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert(
        "Error gasoum: getStckDescrByIdASync" + textStatus + " - " + errorThrown
      );
    },
    failure: function (errMsg) {
      write_to_log("Failure sales_update: getStckDescrByIdSync" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
  //// console.log ('descr is:' + descr);
  return descr;
}
function getUserNameByIdAsync(userId) {
  // AJAX MAGIC
  return $.ajax({
    url: serverURL + "/user/" + userId,
    dataType: "json",
  });
}
// Sync is very slow
function getUserNameByIdSync(userId) {
  var surnameName = "";
  // AJAX MAGIC
  $.ajax({
    async: false,
    url: serverURL + "/user/" + userId,
    dataType: "json",
    success: function (data) {
      surnameName = data.surname + " " + data.name;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error sales_update: getUserNameByIdSync" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert(
        "Error gasoum: getUserNameByIdSync" + textStatus + " - " + errorThrown
      );
    },
    failure: function (errMsg) {
      write_to_log("Failure sales_update: getUserNameByIdSync" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
  //// console.log ('descr is:' + durnameName);
  return surnameName;
}

// -------------------------- UPDATE --------------------------
function sale_update_save(is_open) {
  var amount = document.getElementById("sale_tot").value;
  var sale_eisp_metr = document.getElementById("sale_eisp_metr").value;
  var sale_eisp_karta = document.getElementById("sale_eisp_karta").value;
  var sale_eisp_total = (
    parseFloat(sale_eisp_metr) + parseFloat(sale_eisp_karta)
  ).toFixed(2);
  // console.log('sale_eisp_total: ' + sale_eisp_total);

  var check_amount_equals_sale_eisp_total = 1;
  // CHECK IF AMOUNT EQUALS EISP TOTAL
  // is_open = 1 means that the sale klisomo
  check_amount_equals_sale_eisp_total = check_amount_equals_eisp_tot(
    is_open,
    amount,
    sale_eisp_total
  );

  var all_good_with_services_and_sintagi_vafis = check_requires_vafi();
  if (
    all_good_with_services_and_sintagi_vafis == 1 &&
    check_amount_equals_sale_eisp_total == 1
  ) {
    document.getElementById("sale_new_save").style.visibility = "hidden";
    document.getElementById("sale_new_close").style.visibility = "hidden";

    // update_sale_basika_stoixeia(is_open);
    tab_delete_movs();

    //DELAY 2 SECONDS TO INSERT MOVEMENTS
    setTimeout(function () {
      // console.log('2 seconds delay to insert movements');
      
      // ALL INSERT FUNCTIONS COME FROM sales_new.js?ver=492
      insert_cus_vafi_from_sale_update(current_sale_id);
      insert_sale_service_mov_from_sale_update(current_sale_id);
      insert_sale_stck_mov_from_sale_update(current_sale_id);

      // NEEDS TO BE DONE WITH PROMISE
      // on_update_minus_stock_mov(current_sale_id);
      insert_cash_mov_metrita_from_sale_update(current_sale_id);
      insert_cash_mov_karta_from_sale_update(current_sale_id);

      cus_update_date_last_visit();

      // DELAY 1.5 SECONDS TO UPDATE BASIKA STOIXEIA AND REDIRECT
      update_sale_basika_stoixeia(is_open);
    }, 3000);


  } else {
    document.getElementById("sale_new_save").style.visibility = "visible";
    document.getElementById("sale_new_close").style.visibility = "visible";
    // document.getElementById("sale_cus_vafi").focus();
    // alert("ΠΡΟΣΟΧΗ: Απαιτείται συνταγή βαφής. ");
  }
}

function insert_cus_vafi_from_sale_update(curr_sale_id) {
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

    console.log("success insert_cus_vafi_from_sale_update");
    console.log(JSON.stringify(newCusVafi));

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
        console.log("error urlInsertCusVafi");
        write_to_log(
          "Error sales_new: insert_cus_vafi_from_sale_update" +
            " " +
            textStatus +
            " - " +
            errorThrown
        );
        alert(
          "Error gasoum insert_cus_vafi_from_sale_update: " + textStatus + " - " + errorThrown
        );
      },
      failure: function (errMsg) {
        console.log("failure urlInsertCusVafi");
        write_to_log("Failure sales_new: insert_cus_vafi_from_sale_update " + " " + errMsg);
        alert("Failure: Ο server δεν ανταποκρίθηκε");
      },
    });
  } // END IF
}

function insert_sale_service_mov_from_sale_update(curr_sale_id) {
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

    var curr_requiresVafi = tbl.rows[i].cells[5].innerHTML;

    var newSaleServiceMov = {
      id: 1,
      dt: dtSqlMFormat,
      saleId: curr_sale_id,
      serviceId: curr_service_id,
      userId: curr_user_id,
      amount: curr_amount,
      requiresVafi: curr_requiresVafi,
    };

    console.log("success insert_sale_service_mov_from_sale_update");
    console.log(JSON.stringify(newSaleServiceMov));

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
        console.log("error urlInsertSaleServiceMov");
        write_to_log(
          "Error sales_new: insert_sale_service_mov_from_sale_update" +
            " " +
            textStatus +
            " - " +
            errorThrown
        );
        alert(
          "Error gasoum insert_sale_service_mov_from_sale_update: " +
            textStatus +
            " - " +
            errorThrown
        );
      },
      failure: function (errMsg) {
        console.log("failure urlInsertSaleServiceMov");
        write_to_log(
          "Failure sales_new: insert_sale_service_mov_from_sale_update" + " " + errMsg
        );
        alert("Failure: Ο server δεν ανταποκρίθηκε");
      },
    });
  } // FOR LOOP
}

function insert_sale_stck_mov_from_sale_update(curr_sale_id) {
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

    console.log("success insert_sale_stck_mov_from_sale_update");
    console.log(JSON.stringify(newSaleStckMov));

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
        console.log("error urlInsertSaleStckMov");
        write_to_log(
          "Error sales_new: insert_sale_stck_mov_from_sale_update" +
            " " +
            textStatus +
            " - " +
            errorThrown
        );
        alert(
          "Error gasoum insert_sale_stck_mov_from_sale_update: " +
            textStatus +
            " - " +
            errorThrown
        );
      },
      failure: function (errMsg) {
        console.log("failure urlInsertSaleStckMov");
        write_to_log("Failure sales_new: insert_sale_stck_mov_from_sale_update" + " " + errMsg);
        alert("Failure: Ο server δεν ανταποκρίθηκε");
      },
    });
  } // FOR LOOP
}

function insert_cash_mov_metrita_from_sale_update(curr_sale_id) {
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

    console.log("success insert_cash_mov_metrita_from_sale_update");
    console.log(JSON.stringify(newCashMov));

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
        console.log("error urlInsertCashMov");
        write_to_log(
          "Error sales_new: insert_cash_mov_metrita_from_sale_update" +
            " " +
            textStatus +
            " - " +
            errorThrown
        );
        alert(
          "Error gasoum insert_cash_mov_metrita_from_sale_update: " +
            textStatus +
            " - " +
            errorThrown
        );
      },
      failure: function (errMsg) {
        console.log("failure urlInsertCashMov");
        write_to_log(
          "Failure sales_new: insert_cash_mov_metrita_from_sale_update" + " " + errMsg
        );
        alert("Failure: Ο server δεν ανταποκρίθηκε");
      },
    });
  } // END IF
}

function insert_cash_mov_karta_from_sale_update(curr_sale_id) {
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

    console.log("success insert_cash_mov_karta_from_sale_update");
    console.log(JSON.stringify(newCashMov));

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
        console.log("error urlInsertCashMov");
        write_to_log(
          "Error sales_new: insert_cash_mov_karta_from_sale_update" +
            " " +
            textStatus +
            " - " +
            errorThrown
        );
        alert(
          "Error gasoum insert_cash_mov_karta_from_sale_update: " +
            textStatus +
            " - " +
            errorThrown
        );
      },
      failure: function (errMsg) {
        console.log("failure urlInsertCashMov");
        write_to_log("Failure sales_new: insert_cash_mov_karta_from_sale_update" + " " + errMsg);
        alert("Failure: Ο server δεν ανταποκρίθηκε");
      },
    });
  } // END IF
}

function update_sale_basika_stoixeia(is_open) {
  var dtDtHtmlFormat = document.getElementById("dt_datepicker").value;
  var dtDtMySqlMFormat = formatDateForMySQL(dtDtHtmlFormat);
  var current_time = document.getElementById("select_tm").value;
  // current_cus_id =  document.getElementById("select_cus").value; // INPUT IS DISABLED THUS CANNOT BE CHANGED
  var amount = document.getElementById("sale_tot").value;

  // PREPARE JSON OBJECT
  var upd_sale = {
    id: 1,
    open: is_open,
    dt: dtDtMySqlMFormat,
    tm: current_time,
    token: 1,
    cusId: current_cus_id,
    amount: amount,
  };

  console.log("success update_sale_basika_stoixeia");
  console.log(JSON.stringify(upd_sale));

  // AJAX MAGIC
  var urlRaw = serverURL + "/sale/updateSale/" + current_sale_id;
  $.ajax({
    url: urlRaw,
    dataType: "json",
    type: "POST",
    contentType: "application/json",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify(upd_sale),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      // window.location.replace("active_tabs.html" + "?pid=" + generateRandomToken());
    },
    complete: function (data) {
      //  COMMENT LINE BELLOW FOR DEBUGGING
      // DELAY 5 SECONDS TO UPDATE BASIKA STOIXEIA AND REDIRECT
      //TODO: COMMENT OUT FOR DEV PURPOSES
      console.log("Redirecting to active_tabs.html in 5 seconds");
      
      setTimeout(function () {
        window.location.replace(
          "active_tabs.html" + "?pid=" + generateRandomToken()
        );
      }, 3000);
      
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("error update_sale_basika_stoixeia");
      write_to_log(
        "Error sales_update: update_sale_basika_stoixeia" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert(
        "Error gasoum: update_sale_basika_stoixeia" + textStatus + " - " + errorThrown
      );
    },
    failure: function (errMsg) {
      console.log("failure update_sale_basika_stoixeia");
      write_to_log(
        "Failure sales_update: update_sale_basika_stoixeia" + " " + errMsg
      );
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function tab_delete_movs() {
  var id = current_sale_id;
  // var cus_id = document.getElementById("select_cus").value; // INPUT IS DISABLED THIS CANNOT BE CHANGED

  //---------- DELETE FROM SALE_SERVICE_MOV
  // PREPARE URL FOR SALE_SERVICE_MOV
  var delURLServiceMov =
    serverURL + "/saleServiceMov/delSaleServiceMovBySaleId/" + id;

  console.log("success tab_delete_movs");
  console.log("url: " + delURLServiceMov);

  // AJAX MAGIC
  $.ajax({
    url: delURLServiceMov,
    type: "GET",
    success: function (data) {
      // DO NOTTHING AT ALL JUST CALL THE API
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("error delURLServiceMov");
      write_to_log(
        "Error sales_update: tab_delete_movs" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert(
        "Error gasoum tab_delete_movs : " + textStatus + " - " + errorThrown
      );
    },
    failure: function (errMsg) {
      console.log("failure delURLServiceMov");
      write_to_log("Failure sales_update: tab_delete_movs" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });

  //---------- DELETE FROM SALE_STCK_MOV
  // PREPARE URL FOR SALE_STCK_MOV
  var delURLStckMov = serverURL + "/saleStckMov/delSaleStckMovBySaleId/" + id;
  // AJAX MAGIC
  $.ajax({
    url: delURLStckMov,
    type: "GET",
    success: function (data) {
      // DO NOTTHING AT ALL JUST CALL THE API
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error sales_update: tab_delete_movs" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum delURLStckMov: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure sales_update: tab_delete_movs" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });

  //---------- DELETE FROM CUS VAFES
  // PREPARE URL FOR CUS VAFES
  var delURLCusVafes = serverURL + "/cusvafi/delCusVafiBySaleId/" + id;
  // AJAX MAGIC
  $.ajax({
    url: delURLCusVafes,
    type: "GET",
    success: function (data) {
      // DO NOTTHING AT ALL JUST CALL THE API
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error sales_update: tab_delete_movs" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum delURLCusVafes: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure sales_update: tab_delete_movs" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });

  //---------- DELETE FROM CASH_MOV
  //TODO: DELETE FROM CASH_MOV
  // PREPARE URL FOR SALE
  var delURLCashMov = serverURL + "/cashMov/delCashMovBySaleId/" + id;
  // AJAX MAGIC
  $.ajax({
    url: delURLCashMov,
    type: "GET",
    success: function (data) {
      // DO NOTTHING AT ALL JUST CALL THE API
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error sales_update: tab_delete_movs" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum delURLCashMov: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure sales_update: tab_delete_movs" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });

  //---------- UPDATE CUS->DATE_LAST_VISIT
}

function cus_update_date_last_visit() {
  // var cus_id = document.getElementById("select_cus").value;
  var cus_id = current_cus_id;

  // PREPARE URL FOR SALE
  var delURLCusVafes = serverURL + "/cus/updateDateLastVisit/" + cus_id;
  // AJAX MAGIC
  $.ajax({
    url: delURLCusVafes,
    type: "GET",
    success: function (data) {
      // DO NOTTHING AT ALL JUST CALL THE API
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("error cus_update_date_last_visit");
      write_to_log(
        "Error sales_update: cus_update_date_last_visit" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert(
        "Error gasoum cus_update_date_last_visit: " +
          textStatus +
          " - " +
          errorThrown
      );
    },
    failure: function (errMsg) {
      console.log("failure cus_update_date_last_visit");
      write_to_log(
        "Failure sales_update: cus_update_date_last_visit" + " " + errMsg
      );
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function add_cus_to_selection() {
  //// console.log('---- add_cus_to_selection ----');
  // AJAX MAGIC

  $.ajax({
    url: serverURL + "/cus/allActiveOrdered",
    dataType: "json",
    cache: true,
    success: function (data) {
      // data = JSON.parse(result);
      $.each(data, function (index, data) {
        var option = document.createElement("option");
        option.text = data.surname + " " + data.name;
        option.value = data.id;
        var select = document.getElementById("select_cus");
        select.appendChild(option);
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("error add_cus_to_selection");
      write_to_log(
        "Error sales_update: add_cus_to_selection" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert(
        "Error gasoum: add_cus_to_selection" + textStatus + " - " + errorThrown
      );
    },
    failure: function (errMsg) {
      console.log("failure add_cus_to_selection");
      write_to_log("Failure sales_update: add_cus_to_selection" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}



function failureCallbackGetCusId(error) {
  // console.log("Error generating audio file: " + error);
}

function failureCallbackTabShowBasikaStoixeia(error) {
  // console.log("Error generating audio file: " + error);
}

function on_update_plus_old_stock_mov(current_sale_id) {
  // AJAX MAGIC
  $.ajax({
    url: serverURL + "/saleStckMov/bySaleId/" + current_sale_id,
    dataType: "json",
    success: function (data) {
      $.each(data, function (index, data) {
        // console.log('In 1 AJAX delete_old_stock_mov');
        // console.log('data.saleId' + data.saleId);
        // console.log('data.stckId' + data.stckId);

        var urlToPlusStckYpoloipo =
          serverURL + "/stck/updateStckYpoloipoPlusOne/" + data.stckId;
        // AJAX MAGIC
        $.ajax({
          url: urlToPlusStckYpoloipo,
          dataType: "json",
          success: function (data2) {
            $.each(data2, function (index, data2) {
              // console.log('In 2 AJAX delete_old_stock_mov');
            });
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log("error on_update_plus_old_stock_mov");
            alert("Error: " + textStatus + " - " + errorThrown);
          },
        });
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("error on_update_plus_old_stock_mov");
      write_to_log(
        "Error sales_update: on_update_plus_old_stock_mov" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert(
        "Error gasoum: on_update_plus_old_stock_mov" +
          textStatus +
          " - " +
          errorThrown
      );
    },
    failure: function (errMsg) {
      console.log("failure on_update_plus_old_stock_mov");
      write_to_log(
        "Failure sales_update: on_update_plus_old_stock_mov" + " " + errMsg
      );
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function on_update_minus_stock_mov(current_sale_id) {
  // AJAX MAGIC
  $.ajax({
    url: serverURL + "/saleStckMov/bySaleId/" + current_sale_id,
    dataType: "json",
    success: function (data) {
      $.each(data, function (index, data) {
        //console.log('In 1 AJAX delete_old_stock_mov');
        //console.log('data.saleId' + data.saleId);
        //console.log('data.stckId' + data.stckId);

        var urlToPlusStckYpoloipo =
          serverURL + "/stck/updateStckYpoloipoMinusOne/" + data.stckId;
        // AJAX MAGIC
        $.ajax({
          url: urlToPlusStckYpoloipo,
          dataType: "json",
          success: function (data2) {
            $.each(data2, function (index, data2) {
              // console.log('In 2 AJAX delete_old_stock_mov');
            });
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log("error on_update_minus_stock_mov");
            alert("Error: " + textStatus + " - " + errorThrown);
          },
        });
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("error on_update_minus_stock_mov");
      write_to_log(
        "Error sales_update: on_update_minus_stock_mov" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert(
        "Error gasoum: on_update_minus_stock_mov" +
          textStatus +
          " - " +
          errorThrown
      );
    },
    failure: function (errMsg) {
      console.log("failure on_update_minus_stock_mov");
      write_to_log(
        "Failure sales_update: on_update_minus_stock_mov" + " " + errMsg
      );
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
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
function check_requires_vafi() {
  console.log("In check_requires_vafi");
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
      //  console.log("element_with_vafi 4 :" + element_with_vafi);
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
