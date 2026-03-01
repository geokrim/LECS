function ajaxCusToTable() {
  return $.ajax({
    url: serverURL + "/cus/all",
    dataType: "json",
    cache: true,
    success: function (data) {
      // data = JSON.parse(result);
      $.each(data, function (index, data) {
        // CALCULATE DATE FROM LAST VISIT
        const date1 = Date.parse(new Date().toISOString().split("T")[0]);
        const date2 = Date.parse(data.dateLastVisit);
        const diffTime = Math.abs(date1 - date2);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        /* 
                // console.log('date1:' + date1);
                // console.log('date2:' + date2);
                // console.log(diffDays + " days"); 
                */
        //!!!--Here is the main catch------>fnAddData
        if (data.active == 1) {
          $("#datatable1")
            .dataTable()
            .fnAddData(
              [
                data.id,
                '<a href="cus_main.html?id=' +
                  data.id +
                  '">' +
                  data.name +
                  "</a>",
                '<a href="cus_main.html?id=' +
                  data.id +
                  '">' +
                  data.surname +
                  "</a>",
                '<i class="fa fa-check" aria-hidden="true"></i>',
                // '<a href="tel:' + data.mobile+ '">' + data.mobile  + '</a>',
                //'<a href="" data-toggle="modal" data-target="#cusVaFiMainModal" onclick="cusVafiMainModalSetCusHeaderInfo(' + data.id  + ')"><i class="fa fa-paint-brush" aria-hidden="true"></i> </a>',
                '<a href="cus_main.html?id=' +
                  data.id +
                  '">' +
                  diffDays +
                  "</a>",

                // '<span style="color: blue;"><i class="fa fa-arrow-up" aria-hidden="true"></i></span>',
                //'<span onclick="cus_check_before_delete(' + data.id +  ', \'' + data.surname + '\')" style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i></span>'
                '<a href="" data-toggle="modal" data-target="#cus_delete_modal" onclick="cus_check_before_delete(' +
                  "'" +
                  data.id +
                  "' ," +
                  "'" +
                  data.surname +
                  " " +
                  data.name +
                  "'" +
                  ')" style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i> </a>',
              ],
              false
            );
        } else {
          $("#datatable1")
            .dataTable()
            .fnAddData(
              [
                data.id,
                '<a href="cus_main.html?id=' +
                  data.id +
                  '">' +
                  data.name +
                  "</a>",
                '<a href="cus_main.html?id=' +
                  data.id +
                  '">' +
                  data.surname +
                  "</a>",
                "",
                // '<a href="tel:' + data.mobile+ '">' + data.mobile  + '</a>',
                // '<a href="" data-toggle="modal" data-target="#cusVaFiMainModal" onclick="cusVafiMainModalSetCusHeaderInfo(' + data.id  + ')"><i class="fa fa-paint-brush" aria-hidden="true"></i> </a>',
                '<a href="cus_main.html?id=' +
                  data.id +
                  '">' +
                  diffDays +
                  "</a>",

                // '<span style="color: blue;"><i class="fa fa-arrow-up" aria-hidden="true"></i></span>',
                //'<span onclick="cus_check_before_delete(' + data.id +  ', \'' + data.surname + '\')" style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i></span>'
                '<a href="" data-toggle="modal" data-target="#cus_delete_modal" onclick="cus_check_before_delete(' +
                  "'" +
                  data.id +
                  "' ," +
                  "'" +
                  data.surname +
                  " " +
                  data.name +
                  "'" +
                  ')" style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i> </a>',
              ],
              false
            );
        }
      });
      // When second attribut of fnAddData == false, you need to fnDraw
      console.log("ajaxCusToTable");
      $("#datatable1").dataTable().fnDraw();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error cus: ajaxCusToTable" + " " + textStatus + " - " + errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure cus: ajaxCusToTable" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function ajaxCusToTableCollab() {
  return $.ajax({
    url: serverURL + "/cus/all",
    dataType: "json",
    cache: true,
    success: function (data) {
      // data = JSON.parse(result);
      $.each(data, function (index, data) {
        // CALCULATE DATE FROM LAST VISIT
        const date1 = Date.parse(new Date().toISOString().split("T")[0]);
        const date2 = Date.parse(data.dateLastVisit);
        const diffTime = Math.abs(date1 - date2);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        /* 
                // console.log('date1:' + date1);
                // console.log('date2:' + date2);
                // console.log(diffDays + " days"); 
                */
        //!!!--Here is the main catch------>fnAddData
          $("#datatable1")
            .dataTable()
            .fnAddData(
              [
                '<a href="cus_main.html?id=' +
                  data.id +
                  '">' +
                  data.name +
                  "</a>",
                '<a href="cus_main.html?id=' +
                  data.id +
                  '">' +
                  data.surname +
                  "</a>",
                '<a href="cus_main.html?id=' +
                  data.id +
                  '">' +
                  data.mobile +
                  "</a>",
              ],
              false
            );

      });
      // When second attribut of fnAddData == false, you need to fnDraw
      console.log("ajaxCusToTableCollab");
      $("#datatable1").dataTable().fnDraw();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error cus: ajaxCusToTable" + " " + textStatus + " - " + errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure cus: ajaxCusToTable" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

async function executeCusToTable() {
  try {
    const resShowProgressBar = await show_progress_line();
    const resCusToTable = await ajaxCusToTable();
    const resHideProgressBar = await hide_progress_line();
  } catch (err) {
    console.log(err);
  }
}

async function executeCusToTableCollab() {
  try {
    const resShowProgressBar = await show_progress_line();
    const resCusToTable = await ajaxCusToTableCollab();
    const resHideProgressBar = await hide_progress_line();
  } catch (err) {
    console.log(err);
  }
}

function cusGetId() {
  let searchParams = new URLSearchParams(window.location.search);
  let paramId = searchParams.get("id");
  return paramId;
}

function ajaxShowCusById(current_cus_id) {
  return $.ajax({
    url: serverURL + "/cus/" + current_cus_id,
    dataType: "json",
    success: function (data) {
      // EMPTY ELEMENTS FIRST IN CASE ID DOES NOT EXIST
      document.getElementById("cus_id").value = "";
      document.getElementById("cus_name").value = "";
      document.getElementById("cus_surname").value = "";
      if (data.active == 1) {
        document.getElementById("cus_active").checked = true;
      } else {
        document.getElementById("cus_active").checked = false;
      }
      document.getElementById("cus_mobile").value = "";
      document.getElementById("cus_email").value = "";
      document.getElementById("cus_phone").value = "";
      document.getElementById("cus_address").value = "";
      document.getElementById("cus_disc_service").value = "0.00";
      document.getElementById("cus_disc_stock").value = "0.00";
      document.getElementById("cus_comments").value = "";
      document.getElementById("cus_days_from_last").value = "0";

      // GET DATA FROM JSON OBJECT
      document.getElementById("cus_id").value = data.id;
      document.getElementById("cus_name").value = data.name;
      document.getElementById("cus_surname").value = data.surname;
      if (data.sex == "M") {
        document.getElementById("cus_is_female").checked = false;
        document.getElementById("cus_is_male").checked = true;
      }
      if (data.sex == "F") {
        document.getElementById("cus_is_female").checked = true;
        document.getElementById("cus_is_male").checked = false;
      }

      var dobDateString = formatDateForDatepicker(data.dob);
      document.getElementById("dob_datepicker").value = dobDateString;
      document.getElementById("cus_mobile").value = data.mobile;
      document.getElementById("cus_phone").value = data.phone;
      document.getElementById("cus_email").value = data.email;
      document.getElementById("cus_address").value = data.address;
      document.getElementById("cus_disc_service").value = data.discountService;
      document.getElementById("cus_disc_stock").value = data.discountStck;
      if (data.gdpr == "Y") {
        document.getElementById("cus_gdpr").checked = true;
      }
      var gdprDateString = formatDateForDatepicker(data.gdprDt);
      document.getElementById("cus_gdpr_datepicker").value = gdprDateString;
      document.getElementById("cus_comments").value = data.comments;

      // CALCULATE DATE FROM LAST VISIT
      const date1 = Date.parse(new Date().toISOString().split("T")[0]);
      const date2 = Date.parse(data.dateLastVisit);
      const diffTime = Math.abs(date1 - date2);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      document.getElementById("cus_days_from_last").value = diffDays;
      //console.log('ajaxShowCusById');
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error cus: ajaxShowCusById" + " " + textStatus + " - " + errorThrown
      );
      alert("Error cus: ajaxShowCusById " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure cus: ajaxShowCusById" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function ajaxShowCusSurnameNameMobileById(current_cus_id) {
  return $.ajax({
    url: serverURL + "/cus/" + current_cus_id,
    dataType: "json",
    success: function (data) {
      document.getElementById("select_cus").value =
        data.surname + " " + data.name + " - " + data.mobile;
      //console.log('ajaxShowCusSurnameNameMobileById');
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error cus: ajaxShowCusSurnameNameMobileById" + " " + textStatus + " - " + errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure cus: ajaxShowCusSurnameNameMobileById" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

async function executeShowCusById(current_cus_id, page_location) {
  // page_location: 1 == cus_main.html, 2 == active_tabs_main, 3 == active_tabs_new, 4 == vafeio.html
  // PROGRESS BAR AND REDIRECT ONLY APPLIES FOR CUS.HMTML
  try {
    if (page_location == 1) {
      const resShowProgressBar = await show_progress_line();
    }
    const resCusShowByIid = await ajaxShowCusById(current_cus_id);
    if (page_location == 1) {
      const resHideProgressBar = await hide_progress_line();
    }
  } catch (err) {
    console.log(err);
  }
}

function clickCusSexFemale() {
  // document.getElementById("cus_is_female").checked = true;
  document.getElementById("cus_is_male").checked = false;
}

function clickCusSexMale() {
  document.getElementById("cus_is_female").checked = false;
  // document.getElementById("cus_is_male").checked = true;
}

function clickCusGdpr() {
  if (document.getElementById("cus_gdpr").checked == true) {
    document.getElementById("cus_gdpr_datepicker").value =
      moment().format("DD/MM/YYYY");
  }
  if (document.getElementById("cus_gdpr").checked == false) {
    document.getElementById("cus_gdpr_datepicker").value = "01/01/1700";
  }
}

function ajaxUpdateCusById(urlRaw, upd_cus) {
  return $.ajax({
    url: urlRaw,
    dataType: "json",
    type: "POST",
    contentType: "application/json",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify(upd_cus),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      // DO NOTHING
    },
    complete: function (data) {
      console.log("in complete");
      // hide_progress_line();
      if (curr_page == "cus") {
        // redirect("cus.html");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error cus: ajaxUpdateCusById" + " " + textStatus + " - " + errorThrown
      );
      alert("Error cus: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure cus: ajaxUpdateCusById" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

async function updateCusById() {
  var urlRaw = serverURL + "/cus/updateCus/" + current_cus_id;
  var activeVar = 0;
  if (document.getElementById("cus_active").checked == true) {
    activeVar = 1;
  }
  var sexVar = "F";
  if (document.getElementById("cus_is_male").checked == true) {
    sexVar = "M";
  }
  var gdprVar = "N";
  if (document.getElementById("cus_gdpr").checked == true) {
    gdprVar = "Y";
  }
  var dobDtHtmlFormat = document.getElementById("dob_datepicker").value;
  var dobDtMySqlMFormat = formatDateForMySQL(dobDtHtmlFormat);

  var gdprDtHtmlFormat = document.getElementById("cus_gdpr_datepicker").value;
  var gdprMySqlMFormat = formatDateForMySQL(gdprDtHtmlFormat);
  console.log("in updateCusById, current_cus_id: " + current_cus_id);

  // PREPARE JSON OBJECT
  var upd_cus = {
    id: current_cus_id,
    name: $("#cus_name").val().trimEnd().replaceAll(" ", ""),
    surname: $("#cus_surname").val().trimEnd().replaceAll(" ", ""),
    active: activeVar,
    sex: sexVar,
    dob: dobDtMySqlMFormat,
    mobile: $("#cus_mobile").val().trimEnd().replaceAll(" ", ""),
    phone: $("#cus_phone").val().trimEnd().replaceAll(" ", ""),
    email: $("#cus_email").val().trimEnd(),
    address: $("#cus_address").val().trimEnd(),
    discountService: $("#cus_disc_service").val(),
    discountStck: $("#cus_disc_stock").val(),
    gdpr: gdprVar,
    gdprDt: gdprMySqlMFormat,
    comments: $("#cus_comments").val().trimEnd(),
    dateLastVisit: $("2000-01-01").val(),
    dateInsert: $("2000-01-01").val(),
  };
  // AJAX MAGIC
  try {
    const res = await ajaxUpdateCusById(urlRaw, upd_cus);
  } catch (err) {
    console.log(err);
  }
}

async function execUpdateCusByIdFromCus(page_location) {
  // page_location: 1 == cus_main.html, 2 == active_tabs_main, 3 == active_tabs_new, 4 == index.html for collab
  // PROGRESS BAR AND REDIRECT ONLY APPLIES FOR CUS.HMTML
  try {
    if (page_location == 1) {
      const showProgressBar = await show_progress_line();
    }
    const resUpdateCusById = await updateCusById();
    if (page_location == 1) {
      const hideProgressBar = await hide_progress_line();
      const goToPage = await redirect("cus.html");
    }
    if (page_location == 4) {
     // const hideProgressBar = await hide_progress_line();
      const goToPage = await redirect("index.html");
    }
  } catch (err) {
    console.log(err);
  }
}

function cusNewInitialize() {
  document.getElementById("cus_id").value = "";
  document.getElementById("cus_name").value = "";
  document.getElementById("cus_surname").value = "";
  document.getElementById("cus_active").checked = true;

  var cus_sex = "F";
   if (localStorage.getItem("lcObj") !== null) {
    lcObjLocal = JSON.parse(localStorage.getItem("lcObj"));
    cus_sex = lcObjLocal.cusSex;
  }
  if (cus_sex == "M") {
    document.getElementById("cus_is_female").checked = false;
    document.getElementById("cus_is_male").checked = true; 
  } else {
  document.getElementById("cus_is_female").checked = true;
  document.getElementById("cus_is_male").checked = false;
  }
  
  var currentYear = new Date().getFullYear();
  document.getElementById("dob_datepicker").value = "01/01/" + currentYear;
  document.getElementById("cus_mobile").value = "";
  document.getElementById("cus_phone").value = "";
  document.getElementById("cus_email").value = "";
  document.getElementById("cus_address").value = "";
  document.getElementById("cus_disc_service").value = "0.00";
  document.getElementById("cus_disc_stock").value = "0.00";
  document.getElementById("cus_gdpr_datepicker").value = "01/01/1700";
  document.getElementById("cus_comments").value = "";
  document.getElementById("cus_days_from_last").value = "0";
}

function ajaxCusInsertNew(urlInsertRaw, insert_new_cus) {
  return $.ajax({
    url: urlInsertRaw,
    dataType: "json",
    type: "POST",
    contentType: "application/json",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify(insert_new_cus),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      // window.location.replace("cus.html" + "?pid=" + generateRandomToken());
    },
    /*
        // ERROR XTTIPAEI GIA KAPOIO LOGO ALLA DOULEUEI SOSTA
        error: function(jqXHR, textStatus, errorThrown){
            write_to_log('Error cus: cusInsertNew ' + ' ' + textStatus + " - " + errorThrown);
            alert('Error gasoum:  cusInsertNew ' + textStatus + ' - ' + errorThrown);
        },
        */
    failure: function (errMsg) {
      write_to_log("Failure cus: ajaxCusInsertNew" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}
async function cusInsertNew() {
  // console.log('cusInsertNew()');
  var urlInsertRaw = serverURL + "/cus/add/";
  var activeVar = 0;
  if (document.getElementById("cus_active").checked == true) {
    activeVar = 1;
  }
  var sexVar = "F";
  if (document.getElementById("cus_is_male").checked == true) {
    sexVar = "M";
  }
  var gdprVar = "N";
  if (document.getElementById("cus_gdpr").checked == true) {
    gdprVar = "Y";
  }
  var dobDtHtmlFormat = document.getElementById("dob_datepicker").value;
  var dobDtMySqlMFormat = formatDateForMySQL(dobDtHtmlFormat);

  var gdprDtHtmlFormat = document.getElementById("cus_gdpr_datepicker").value;
  var gdprMySqlMFormat = formatDateForMySQL(gdprDtHtmlFormat);

  var today = Date.parse(new Date());
  var todayMySqlMFormat = todayDateForMysql();

  // console.log('today: ' + today);
  // console.log('todayMySqlMFormat: ' + todayMySqlMFormat);

  // PREPARE JSON OBJECT
  var insert_new_cus = {
    id: 1,
    name: $("#cus_name").val().trimEnd().replaceAll(" ", ""),
    surname: $("#cus_surname").val().trimEnd().replaceAll(" ", ""),
    active: activeVar,
    sex: sexVar,
    dob: dobDtMySqlMFormat,
    mobile: $("#cus_mobile").val().trimEnd().replaceAll(" ", ""),
    phone: $("#cus_phone").val().trimEnd().replaceAll(" ", ""),
    email: $("#cus_email").val().trimEnd(),
    address: $("#cus_address").val().trimEnd(),
    discountService: $("#cus_disc_service").val(),
    discountStck: $("#cus_disc_stock").val(),
    gdpr: gdprVar,
    gdprDt: gdprMySqlMFormat,
    comments: $("#cus_comments").val().trimEnd(),
    dateLastVisit: todayMySqlMFormat,
    dateInsert: todayMySqlMFormat,
  };
  //  console.log(JSON.stringify(insert_new_cus));
  // console.log(insert_new_cus);
  // AJAX MAGIC
  try {
    const res = await ajaxCusInsertNew(urlInsertRaw, insert_new_cus);
  } catch (err) {
    // console.log(err);
  }
}
async function execCusInsertNew() {
  try {
    const showProgressBar = await show_progress_line();
    const resUpdateCusById = await cusInsertNew();
    const hideProgressBar = await hide_progress_line();
    const goToPage = await redirect("cus.html");
  } catch (err) {
    console.log(err);
  }
}

function cus_check_before_delete(current_id, current_cus_details) {
  // console.log('in cus_check_before_delete');
  // console.log(current_id + ' ' + current_cus_details);
  // PREPARE URL
  var delURL = serverURL + "/cus/canDelCus/" + current_id;
  // AJAX MAGIC

  $.ajax({
    url: delURL,
    type: "GET",
    success: function (data) {
      if (data == 0) {
        //// console.log('Cus can be deleted');
        document.getElementById("cus_id").innerHTML = current_id;
        document.getElementById("cus_details").innerHTML = current_cus_details;
        document.getElementById("cus_delete_error_message").innerHTML =
          "ΕΠΙΒΕΒΑΙΩΣΗ ΔΙΑΓΡΑΦΗΣ";
        document.getElementById("btn_cus_delete").style.visibility = "visible";
      } else {
        //// console.log('Cus can NOT be deleted');
        document.getElementById("cus_id").innerHTML = current_id;
        document.getElementById("cus_details").innerHTML = current_cus_details;
        document.getElementById("cus_delete_error_message").innerHTML =
          "ΑΠΑΓΟΡΕΥΣΗ ΔΙΑΓΡΑΦΗΣ";
        document.getElementById("btn_cus_delete").style.visibility = "hidden";
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error cus: cus_check_before_delete" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error cus: cus_check_before_delete" + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure cus: cus_check_before_delete" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function cus_delete() {
  // console.log('in cus_delete');

  var current_id = document.getElementById("cus_id").innerHTML;
  var current_cus_details = document.getElementById("cus_details").innerHTML;
  // console.log(current_id + ' ' + current_cus_details);

  // PREPARE URL
  var delURL = serverURL + "/cus/delCus/" + current_id;
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
      alert("Ο Πελάτης: " + current_cus_details + " διαγράφηκε. ");
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error cus: cus_delete" + " " + textStatus + " - " + errorThrown
      );
      alert("Error cus: cus_delete " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure cus: cus_delete" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function cusShowBafeioByCusId() {
  var curr_cus_id = document.getElementById("cus_id").value;
  var current_cus_full_name =
    document.getElementById("cus_surname").value +
    " " +
    document.getElementById("cus_name").value;
  window.location.replace(
    "cus_vafeio.html?id=" +
      curr_cus_id +
      "&name=" +
      current_cus_full_name +
      "&pid=" +
      generateRandomToken()
  );
}

function cusShowHistoryByCusId() {
  var curr_cus_id = document.getElementById("cus_id").value;
  var current_cus_full_name =
    document.getElementById("cus_surname").value +
    " " +
    document.getElementById("cus_name").value;
  window.location.replace(
    "cus_history.html?id=" +
      curr_cus_id +
      "&name=" +
      current_cus_full_name +
      "&pid=" +
      generateRandomToken()
  );
}

function checkIfCusExistsBeforeInsert() {
  // CHECK ON: name, surname, mobile
  var cus_name = document.getElementById("cus_name").value.toString();
  var cus_surname = document.getElementById("cus_surname").value.toString();
  var cus_mobile = document.getElementById("cus_mobile").value.toString();

  // PREPARE URL
  var checkCusExistURL =
    serverURL +
    "/cus/cusExists?name=" +
    cus_name +
    "&surname=" +
    cus_surname +
    "&mobile=" +
    cus_mobile;
  // AJAX MAGIC
  $.ajax({
    url: checkCusExistURL,
    type: "GET",
    success: function (data) {
      if (data == null) {
        execCusInsertNew();
      } else {
        alert(
          "Ο Πελάτης " +
            cus_name +
            " " +
            cus_surname +
            " με τηλέφωνο " +
            cus_mobile +
            " υπάρχει ήδη. Απαγόρευση εγγραφής."
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error cus: checkIfCusExistsBeforeInsert" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure cus: checkIfCusExistsBeforeInsert" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}
