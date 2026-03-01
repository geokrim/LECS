function showCompanyById() {
  // GET DATA TO UI
  // AJAX MAGIC
  $.ajax({
    url: serverURL + "/company/1",
    dataType: "json",
    success: function (data) {
      // GET DATA FROM JSON OBJECT
      document.getElementById("company_id").value = data.id;
      document.getElementById("company_global_id").value = data.globalId;
      document.getElementById("company_eponymia").value = data.eponymia;
      document.getElementById("company_titlos").value = data.titlos;
      document.getElementById("company_address").value = data.address;
      document.getElementById("company_country").value = data.country;
      document.getElementById("company_afm").value = data.afm;
      document.getElementById("company_doy").value = data.doy;
      document.getElementById("company_ypeuthinos1").value = data.ypeuthinos1;
      document.getElementById("company_ypeuthinos2").value = data.ypeuthinos2;
      document.getElementById("company_tel1").value = data.tel1;
      document.getElementById("company_tel2").value = data.tel2;
      document.getElementById("company_mobile1").value = data.mobile1;
      document.getElementById("company_mobile2").value = data.mobile2;
      document.getElementById("company_email1").value = data.email1;
      document.getElementById("company_email2").value = data.email2;
      document.getElementById("company_url").value = data.url;
      document.getElementById("company_facebook").value = data.facebook;
      document.getElementById("company_ypoloipo").value = data.ypoloipo;
      var companyDateExpString = formatDateForDatepicker(data.expDate);
      document.getElementById("company_expDate").value = companyDateExpString;
      // document.getElementById("company_smsYpoloipo").value = data.smsYpoloipo;
      document.getElementById("company_ip").value = data.ip;
      document.getElementById("company_plan").value = data.plan;
      document.getElementById("company_timeout_seconds").value =
        data.timeoutsecs;
      document.getElementById("company_has_sms").checked =
        data.hasSms == 1 ? true : false;
      if (data.cusSex == "F") {
        document.getElementById("cus_is_female").checked = true;
        document.getElementById("cus_is_male").checked = false;
        console.log("data.cusSex: " + data.cusSex);
      } else {
        document.getElementById("cus_is_female").checked = false;
        document.getElementById("cus_is_male").checked = true;
        console.log("data.cusSex: " + data.cusSex);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error company: showCompanyById" +
          " " +
          textStatus +
          " - " +
          errorThrown,
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure company: showCompanyById" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function updateCompanyIpById() {
  document.getElementById("company_ip_update").style.visibility = "hidden";
  document.getElementById("company_ip").value = curr_ip_egatastasis;
  /*
    // console.log('curr_ip_egatastasis1: ' + curr_ip_egatastasis);
    curr_ip_egatastasis = document.getElementById("company_ip").value;
    // console.log('curr_ip_egatastasis2: ' + curr_ip_egatastasis);
*/
}

function updateCompanyById() {
  // PERFORM UPDATE
  document.getElementById("company_update").style.visibility = "hidden";
  var urlCompanyUpdate = serverURL + "/company/updateCompanyById/1";

  var cus_sex = "F";
  if (document.getElementById("cus_is_male").checked) {
    cus_sex = "M";
  } else {
    cus_sex = "F";
  }

  // PREPARE JSON OBJECT
  var upd_company = {
    id: $("#company_id").val(),
    globalId: $("#company_global_id").val(),
    eponymia: $("#company_eponymia").val(),
    titlos: $("#company_titlos").val(),
    address: $("#company_address").val(),
    country: $("#company_country").val(),
    afm: $("#company_afm").val(),
    doy: $("#company_doy").val(),
    ypeuthinos1: $("#company_ypeuthinos1").val(),
    ypeuthinos2: $("#company_ypeuthinos2").val(),
    tel1: $("#company_tel1").val(),
    tel2: $("#company_tel2").val(),
    mobile1: $("#company_mobile1").val(),
    mobile2: $("#company_mobile2").val(),
    email1: $("#company_email1").val(),
    email2: $("#company_email2").val(),
    url: $("#company_url").val(),
    facebook: $("#company_facebook").val(),
    ypoloipo: 0.0,
    expDate: "2020-01-01",
    smsYpoloipo: 10,
    directSale: 0,
    resellerId: 0,
    ip: $("#company_ip").val(),
    plan: $("#company_plan").val(),
    timeoutsecs: $("#company_timeout_seconds").val(),
    hasSms: document.getElementById("company_has_sms").checked ? 1 : 0,
    cusSex: cus_sex,
  };

  // AJAX MAGIC
  $.ajax({
    url: urlCompanyUpdate,
    dataType: "json",
    type: "POST",
    contentType: "application/json",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify(upd_company),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      //
    },
    complete: function (data) {
      window.location.replace("company.html" + "?pid=" + generateRandomToken());
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error company: updateCompanyById" +
          " " +
          textStatus +
          " - " +
          errorThrown,
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure company: updateCompanyById" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function clickCusSexFemale() {
  // document.getElementById("cus_is_female").checked = true;
  document.getElementById("cus_is_male").checked = false;
}

function clickCusSexMale() {
  document.getElementById("cus_is_female").checked = false;
  // document.getElementById("cus_is_male").checked = true;
}
