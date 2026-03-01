function information_system_constructor(show_sms_ypoloipo_menu, sms_ypoloipo) {
  lcObjLocalInfoSystem = JSON.parse(localStorage.getItem("lcObj"));
  expDate = formatDateForDatepicker(lcObjLocalInfoSystem.expDate);
  globalId =
    lcObjLocalInfoSystem.globalId +
    " [ " +
    lcObjLocalInfoSystem.plan +
    " ] - " +
    lcObjLocalInfoSystem.titlos;
  // smsYpoloipo = lcObjLocalInfoSystem.sms_ypoloipo;

  //Create the element using the createElement method.
  var lcInfoSystem = document.getElementById("lc_information_system");

  //Add your content to the DIV
  var lcInfoSystem_innerHTML_str =
    '<label class="sidebar-label pd-x-15 mg-t-25 mg-b-20 tx-info op-9">Πληροφοριες συστηματος</label>' +
    '<div class="info-list">' +
    '<div class="d-flex align-items-center justify-content-between pd-x-15">' +
    "<div>" +
    '<p class="tx-10 tx-roboto tx-uppercase tx-spacing-1 tx-white op-3 mg-b-2 space-nowrap">Εγκατάσταση</p>' +
    '<h8 class="tx-lato tx-white tx-normal mg-b-0"><!--### STRING_GLOBAL_ID ###--></h8>' +
    "</div>" +
    "<span></span>" +
    "</div><!-- d-flex -->" +
    '<div class="d-flex align-items-center justify-content-between pd-x-15">' +
    "<div>" +
    '<p class="tx-10 tx-roboto tx-uppercase tx-spacing-1 tx-white op-3 mg-b-2 space-nowrap">Ημερ.Λήξης Σύμβασης</p>' +
    '<h8 class="tx-lato tx-white tx-normal mg-b-0"><!--### STRING_HMER_LIKSIIS ###--></h8>' +
    "</div>" +
    "<span></span>" +
    "</div><!-- d-flex -->";

  if (show_sms_ypoloipo_menu) {
    lcInfoSystem_innerHTML_str =
      lcInfoSystem_innerHTML_str +
      '<div class="d-flex align-items-center justify-content-between pd-x-15">' +
      "<div>" +
      '<p class="tx-10 tx-roboto tx-uppercase tx-spacing-1 tx-white op-3 mg-b-2 space-nowrap">Υπόλοιπο SMS</p>' +
      '<h8 class="tx-lato tx-white tx-normal mg-b-0"><!--### STRING_SMS_YPOL ###--></h8>' +
      "</div>" +
      "<span></span>" +
      "</div><!-- d-flex -->";
  }

  lcInfoSystem_innerHTML_str =
    lcInfoSystem_innerHTML_str + "</div><!-- info-lst -->";

  lcInfoSystem_innerHTML_str = lcInfoSystem_innerHTML_str.replace(
    "<!--### STRING_HMER_LIKSIIS ###-->",
    expDate
  );
  lcInfoSystem_innerHTML_str = lcInfoSystem_innerHTML_str.replace(
    "<!--### STRING_GLOBAL_ID ###-->",
    globalId
  );
  lcInfoSystem_innerHTML_str = lcInfoSystem_innerHTML_str.replace(
    "<!--### STRING_SMS_YPOL ###-->",
    sms_ypoloipo
  );

  lcInfoSystem.innerHTML = lcInfoSystem_innerHTML_str;
}
