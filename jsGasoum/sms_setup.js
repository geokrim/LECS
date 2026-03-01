function showSmsSetupById() {
  // GET DATA TO UI
  // AJAX MAGIC
  $.ajax({
    url: serverURL + "/smsSetup/1",
    dataType: "json",
    success: function (data) {
      // GET DATA FROM JSON OBJECT
      document.getElementById("sms_setup_id").value = data.id;
      document.getElementById("sms_api_key").value = data.smsApiKey;
      document.getElementById("sms_sender").value = data.smsSender;
      document.getElementById("sms_balance_url").value = data.smsBalanceUrl;
      document.getElementById("sms_send_url").value = data.smsSendUrl;
      document.getElementById("sms_company").value = data.smsCompany;
      document.getElementById("sms_phone").value = data.smsPhone;
      document.getElementById("sms_url").value = data.smsUrl;
      document.getElementById("sms_email").value = data.smsEmail;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error sms_setup: showSmsSetupById" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure sms_setup: showSmsSetupById" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}

function updateSmsSetupById() {
  // PERFORM UPDATE
  document.getElementById("sms_setup_update").style.visibility = "hidden";
  var urlSmsSetupUpdate = serverURL + "/smsSetup/updateSmsSetupById/1";

  // PREPARE JSON OBJECT
  var upd_sms_setup = {
    id: $("#sms_setup_id").val(),
    smsApiKey: $("#sms_api_key").val(),
    smsSender: $("#sms_sender").val(),
    smsBalanceUrl: $("#sms_balance_url").val(),
    smsSendUrl: $("#sms_send_url").val(),

    smsCompany: $("#sms_company").val(),
    smsPhone: $("#sms_phone").val(),
    smsUrl: $("#sms_url").val(),
    smsEmail: $("#sms_email").val(),
  };

  // AJAX MAGIC
  $.ajax({
    url: urlSmsSetupUpdate,
    dataType: "json",
    type: "POST",
    contentType: "application/json",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify(upd_sms_setup),
    contentType: "application/json; charset=utf-8",
    success: function (data) {},
    complete: function (data) {
      window.location.replace(
        "settings_sms.html" + "?pid=" + generateRandomToken()
      );
    },
    error: function (jqXHR, textStatus, errorThrown) {
      write_to_log(
        "Error sms_setup: updateSmsSetupById" +
          " " +
          textStatus +
          " - " +
          errorThrown
      );
      alert("Error gasoum: " + textStatus + " - " + errorThrown);
    },
    failure: function (errMsg) {
      write_to_log("Failure sms_setup: updateSmsSetupById" + " " + errMsg);
      alert("Failure: Ο server δεν ανταποκρίθηκε");
    },
  });
}
