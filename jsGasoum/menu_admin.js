function menuAdminGenerateRandomToken() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < 12; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  // console.log('menuAdminGenerateRandomToken: ' + result);
  return result;
}


function menu_constructor() {
  //Create the element using the createElement method.
  var lcMenu = document.getElementById("lc_menu");
  //var dobDtHtmlFormat = document.getElementById("dob_datepicker").value ;
  lcObjLocalMenuAdmin = JSON.parse(localStorage.getItem("lcObj"));
  seeStats = lcObjLocalMenuAdmin.seeStats;
  seeUser = lcObjLocalMenuAdmin.seeUser;
  seeCash = lcObjLocalMenuAdmin.seeCash;
  seeSms = lcObjLocalMenuAdmin.seeSms;
  seeSettings = lcObjLocalMenuAdmin.seeSettings;
  seeCusVafi = lcObjLocalMenuAdmin.seeCusVafi;
  plan = lcObjLocalMenuAdmin.plan;
  hasSms = lcObjLocalMenuAdmin.hasSms;

  // console.log('seeStats:' + seeStats);
  // console.log('seeUser:' + seeUser);

  //Add your content to the DIV
  lcMenu_html_str =
    "<!-- KARTELES  --> " +
    "<!--### STRING_KARTELES ###-->" +
    "<!-- CUSTOMERS  --> " +
    '<a href="#" id="lcCusMenu" class="br-menu-link"> ' +
    '    <div  class="br-menu-item"> ' +
    '   <i class="menu-item-icon icon ion-ios-bookmarks-outline  tx-24"></i> ' +
    '   <span class="menu-item-label">Πελάτες</span> ' +
    '   <i class="menu-item-arrow fa fa-angle-down"></i> ' +
    "   </div><!-- menu-item --> " +
    "</a><!-- br-menu-link --> " +
    '<ul class="br-menu-sub nav flex-column"> ' +
    '   <li  class="nav-item"><a href="cus.html?pid=' + menuAdminGenerateRandomToken() + '" id="lcCus" class="nav-link">Πελάτες</a></li> ' +
    "<!--### STRING_VAFEIO ###-->" +
    "<!--### STRING_CUS_STATS ###-->" +
    "</ul> " +
    " " +
    "<!--### STRING_STUFF ###-->" +
    "<!-- SERVICES  -->" +
    "<!--### STRING_SERVICES ###-->" +
    "<!-- STOCK  -->" +
    "<!--### STRING_STOCK ###-->" +
    "<!-- CASH  -->" +
    "<!--### STRING_CASH ###-->" +
    " " +
    "<!-- STATISTIKA  --> " +
    "<!--### STRING_STATISTIKA ###-->" +
    "<!-- SMS  --> " +
    "<!--### STRING_SMS ###-->" +
    "<!-- SETTINGS  --> " +
    "<!--### STRING_SETTINGS ###-->" +
    "<!-- EXIT  --> " +
    ' <a href="index.html?pid=' + menuAdminGenerateRandomToken() + '" id="lcMenuExit" class="br-menu-link ">  ' +
    '     <div class="br-menu-item"> ' +
    '      <i class="menu-item-icon icon ion-power tx-22"></i> ' +
    '    <span class="menu-item-label">Έξοδος</span> ' +
    "   </div><!-- menu-item -->    " +
    " </a><!-- br-menu-link -->";

  karteles_str =
    "<!-- KARTELES  -->" +
    ' <a href="active_tabs.html?pid=' + menuAdminGenerateRandomToken() + '" id="lcMenuMain" class="br-menu-link ">  ' +
    '     <div class="br-menu-item"> ' +
    '      <i class="menu-item-icon icon ion-ios-home-outline tx-22"></i> ' +
    '    <span class="menu-item-label">Καρτέλες</span> ' +
    "   </div><!-- menu-item -->    " +
    " </a><!-- br-menu-link -->" ;


  services_str =
    "<!-- SERVICES  -->" +
    '<a href="#" id="lcServicesMenu" class="br-menu-link">' +
    '    <div class="br-menu-item">' +
    '    <i class="menu-item-icon ion-ios-list-outline tx-24"></i>' +
    '    <span class="menu-item-label">Υπηρεσίες</span>' +
    '   <i class="menu-item-arrow fa fa-angle-down"></i> ' +
    "    </div><!-- menu-item -->" +
    "</a><!-- br-menu-link -->" +
    '<ul class="br-menu-sub nav flex-column">' +
    '    <li class="nav-item"><a href="service.html?pid=' + menuAdminGenerateRandomToken() + '" id="lcServices" class="nav-link">Υπηρεσίες</a></li>' +
    '    <li class="nav-item"><a href="service_categ.html?pid=' + menuAdminGenerateRandomToken() + '" id="lcSettingsServiceCateg" class="nav-link">Κατηγορίες Υπηρεσιών</a></li>' +
    "<!--### STRING_SERVICE_STATS ###-->" +
    "<!--### STRING_SERVICE_CATEG_STATS ###-->" +
    "</ul>" +
    " " ;

  stock_str =
    "<!-- STOCK  -->" +
    '<a href="#" id="lcStockMenu" class="br-menu-link">' +
    '    <div class="br-menu-item">' +
    '    <i class="menu-item-icon ion-ios-box tx-24"></i>' +
    '    <span class="menu-item-label">Προιόντα</span>' +
    '    <i class="menu-item-arrow fa fa-angle-down"></i> ' +
    "    </div><!-- menu-item -->" +
    "</a><!-- br-menu-link -->" +
    '<ul class="br-menu-sub nav flex-column">' +
    '    <li class="nav-item"><a href="stock.html?pid=' + menuAdminGenerateRandomToken() + '" id="lcStock" class="nav-link">Προιόντα</a></li>' +
    '    <li class="nav-item"><a href="stock_categ.html?pid=' + menuAdminGenerateRandomToken() + '" id="lcSettingsStockCateg" class="nav-link">Κατηγορίες Προιόντων</a></li>' +
    "<!--### STRING_STOCK_STATS ###-->" +
    "<!--### STRING_STOCK_CATEG_STATS ###-->" +
    "</ul>" +
    " " ;

  stuff_str =
    "<!-- STUFF  -->" +
    '<a href="#" id="lcPeopleMenu" class="br-menu-link">' +
    '    <div class="br-menu-item">' +
    '    <i class="menu-item-icon ion-person-stalker tx-24"></i>' +
    '    <span class="menu-item-label">Προσωπικό</span>' +
    '   <i class="menu-item-arrow fa fa-angle-down"></i> ' +
    "    </div><!-- menu-item -->" +
    "</a><!-- br-menu-link -->" +
    '<ul class="br-menu-sub nav flex-column">' +
    '    <li class="nav-item"><a href="people.html?pid=' + menuAdminGenerateRandomToken() + '" id="lcPeople" class="nav-link">Προσωπικό</a></li>' +
    "<!--### STRING_STUFF_STATS_GROUP ###-->" +
    "</ul>" +
    " ";

  settings_str =
    "<!-- SETTINGS  -->" +
    '<a href="#" id="lcSettingsMenu" class="br-menu-link">' +
    '    <div class="br-menu-item">' +
    '    <i class="menu-item-icon ion-ios-settings tx-24"></i>' +
    '    <span class="menu-item-label">Ρυθμίσεις</span>' +
    '    <i class="menu-item-arrow fa fa-angle-down"></i> ' +
    "    </div><!-- menu-item -->" +
    "</a><!-- br-menu-link -->" +
    '<ul class="br-menu-sub nav flex-column">' +
    '    <li class="nav-item"><a href="company.html?pid=' + menuAdminGenerateRandomToken() + '" id="lcCompany" class="nav-link">Στοιχεία Εταιρίας</a></li> ' +
    "<!--### STRING_SETTINGS_SMS ###-->" +
    "</ul>";

  cash_str =
    "<!-- CASH  -->" +
    '<a href="#" id="lcCashMenu" class="br-menu-link">' +
    '    <div class="br-menu-item">' +
    '    <!-- <i class="menu-item-icon ion-ios-compose tx-24"></i> -->' +
    '    <i class="menu-item-icon ion-ios-shuffle tx-24"></i>' +
    '    <span class="menu-item-label">Ταμείο</span>' +
    '    <i class="menu-item-arrow fa fa-angle-down"></i> ' +
    "    </div><!-- menu-item -->" +
    "</a><!-- br-menu-link -->" +
    '<ul class="br-menu-sub nav flex-column">' +
    '    <li class="nav-item"><a href="cash.html?pid=' + menuAdminGenerateRandomToken() + '" id="lcCash" class="nav-link">Ταμείο</a></li>' +
    "<!--### STRING_CASH_ESEX_CATEG ###-->" +
    "<!--### STRING_CASH_STATS ###-->" +
    "<!--### STRING_CASH_STATS_ESEX_CATEG ###-->" +
    "</ul>";

  statistika_str =
   "<!--### STRING_STATISTIKA ###-->" +
    '<a href="sales.html?pid=' + menuAdminGenerateRandomToken() + '" id="lcStatsMenu" class="br-menu-link">' +
    '    <div class="br-menu-item">' +
    '    <i class="menu-item-icon fa fa-pie-chart tx-24"></i>' +
    '    <span class="menu-item-label">Στατιστικά</span>' +
    '   <i class="menu-item-arrow fa fa-angle-down"></i> ' +
    "    </div><!-- menu-item -->" +
    "</a><!-- br-menu-link -->" +
    '<ul class="br-menu-sub nav flex-column">' +
    //  '    <li class="nav-item"><a href="sales.html?pid=" ' + menuAdminGenerateRandomToken() + ' id="lcSales" class="nav-link">Πωλήσεις</a></li>'+
    "<!--### STRING_STATS_STATS ###-->" +
    "<!--### STRING_SERVICE_STCK ###-->" +
    "</ul>" +
    " " ;

  sms_srt =
    "<!-- SMS  -->" +
    '<a href="#" id="lcSmsMenu" class="br-menu-link">' +
    '    <div class="br-menu-item">' +
    '    <i class="menu-item-icon ion-ios-chatboxes-outline tx-24"></i>' +
    '    <span class="menu-item-label">SMS</span>' +
    '   <i class="menu-item-arrow fa fa-angle-down"></i> ' +
    "    </div><!-- menu-item -->" +
    "</a><!-- br-menu-link -->" +
    '<ul class="br-menu-sub nav flex-column">' +
    '    <li class="nav-item"><a href="sms_campaign.html?pid=' + menuAdminGenerateRandomToken() + '" id="lcSmsCampaign" class="nav-link">Καμπάνιες</a></li>' +
    '    <li class="nav-item"><a href="sms_keimena.html?pid=' + menuAdminGenerateRandomToken() + '" id="lcSmsKeimena" class="nav-link">Κείμενα</a></li>' +
    '    <li class="nav-item"><a href="sms_sent.html?pid=' + menuAdminGenerateRandomToken() + '" id="lcSmsSent" class="nav-link">Απεσταλμένα</a></li>' +
    "</ul>";

  cus_stats_str =
    ' <li  class="nav-item"><a href="cus_stats.html?pid=' + menuAdminGenerateRandomToken() + '" id="lcCusStats" class="nav-link">Στατιστικά Πελατών</a></li> ';
  vafeio_str =
    ' <li  class="nav-item"><a href="vafeio.html?pid=' + menuAdminGenerateRandomToken() + '" id="lcVafeio" class="nav-link">Βαφείο</a></li> ';
 
  stuff_stats_str_group =
    ' <li class="nav-item"><a href="people_stats.html?pid=' + menuAdminGenerateRandomToken() + '" id="lcPeopleStatsGroup" class="nav-link">Στατ.Προσωπικού</a></li> ';
  service_stats_str =
    ' <li class="nav-item"><a href="service_stats.html?pid=' + menuAdminGenerateRandomToken() + '" id="lcServicesStats"  class="nav-link">Στατιστικά Υπηρεσιών</a></li>';
  service_categ_stats_str =
    ' <li class="nav-item"><a href="service_categ_stats.html?pid=' + menuAdminGenerateRandomToken() + '" id="lcServicesCategStats"  class="nav-link">Στατ.Κατηγορ.Υπηρεσιών</a></li>';
  stock_stats_str =
    ' <li class="nav-item"><a href="stock_stats.html?pid=' + menuAdminGenerateRandomToken() + '" id="lcStockStats" class="nav-link">Στατιστικά Προιόντων</a></li>';
  stock_categ_stats_str =
    ' <li class="nav-item"><a href="stock_categ_stats.html?pid=' + menuAdminGenerateRandomToken() + '" id="lcStockCategStats" class="nav-link">Στατ.Κατηγ.Προιόντων</a></li>';
  cash_esexCateg_str =
    ' <li class="nav-item"><a href="cash_esex_categ.html?pid=' + menuAdminGenerateRandomToken() + '" id="lcCashEsexCateg" class="nav-link">Κατηγορίες Εσ.Εξ. Ταμείου</a></li>';
  cash_stats_esexCateg_str =
    ' <li class="nav-item"><a href="cash_stats_esex_categ.html?pid=' + menuAdminGenerateRandomToken() + '" id="lcCashEsExCategStats" class="nav-link">Στατ/κά Κατηγοριών</a></li>';

  stats_service_stck_str =
    ' <li class="nav-item"><a href="stats_service_stck.html?pid=' + menuAdminGenerateRandomToken() + '" id="lcStatsServiceStck" class="nav-link">Στατ. Υπηρ & Προιόντων</a></li>';
  stats_stats_str =
    ' <li class="nav-item"><a href="stats.html?pid=' + menuAdminGenerateRandomToken() + '" id="lcStatsStats" class="nav-link">Γενικά Στατιστικά</a></li>';

  settings_sms_str =
    '    <li class="nav-item"><a href="settings_sms.html?pid=' + menuAdminGenerateRandomToken() + '" id="lcSettingsSms" class="nav-link">Ρυθμίσεις SMS</a></li>';
  
  
  // ------------------------ PLAN RESTRICTIONS
  // KARTELES
  if (plan == 'S' || plan == 'M') {    
  } else {
    lcMenu_html_str = lcMenu_html_str.replace(
      "<!--### STRING_KARTELES ###-->",
      karteles_str
    );
  }
  // SERVICES & STOCK
  if (plan == 'S' || plan == 'M') {    
  } else {
    lcMenu_html_str = lcMenu_html_str.replace(
      "<!--### STRING_SERVICES ###-->",
      services_str
    );
    lcMenu_html_str = lcMenu_html_str.replace(
      "<!--### STRING_STOCK ###-->",
      stock_str
    );
  }
  // TAMEIO
  if (plan == 'S') {
    cash_str = "";
  }
  /*
   lcMenu_html_str = lcMenu_html_str.replace(
      "<!--### STRING_CASH ###-->",
      cash_str
    );
    */
  // STATISTIKA
  if (plan == 'S') {
    statistika_str = "";
    stuff_stats_str_group = "";
    cus_stats_str = "";
  }
  if (plan == 'M') {
    stats_service_stck_str = "";
    stuff_stats_str_group = "";
    cus_stats_str = "";
  }
   lcMenu_html_str = lcMenu_html_str.replace(
      "<!--### STRING_STATISTIKA ###-->",
      statistika_str
    );

  // SMS
  if (hasSms == 0) {
    sms_srt = "";
    settings_sms_str = "";
  }
  /*
  lcMenu_html_str = lcMenu_html_str.replace(
      "<!--### STRING_SMS ###-->",
      sms_srt
    );
  */




  // -----------------------------------USER RIGHTS  
  if (seeCusVafi == 1) {
    lcMenu_html_str = lcMenu_html_str.replace(
      "<!--### STRING_VAFEIO ###-->",
      vafeio_str
    );
  }
  if (seeUser == 1) {
    lcMenu_html_str = lcMenu_html_str.replace(
      "<!--### STRING_STUFF ###-->",
      stuff_str
    );
  }
  if (seeSettings == 1) {
    lcMenu_html_str = lcMenu_html_str.replace(
      "<!--### STRING_SETTINGS ###-->",
      settings_str
    );
    lcMenu_html_str = lcMenu_html_str.replace(
      "<!--### STRING_SETTINGS_SMS ###-->",
      settings_sms_str
    );

  }

  if (seeCash == 1) {
    lcMenu_html_str = lcMenu_html_str.replace(
      "<!--### STRING_CASH ###-->",
      cash_str
    );
    lcMenu_html_str = lcMenu_html_str.replace(
      "<!--### STRING_CASH_ESEX_CATEG ###-->",
      cash_esexCateg_str
    );
  }
  if (seeSms == 1) {
    lcMenu_html_str = lcMenu_html_str.replace(
      "<!--### STRING_SMS ###-->",
      sms_srt
    );
  }

  if (seeStats == 1) {
    lcMenu_html_str = lcMenu_html_str.replace(
      "<!--### STRING_CUS_STATS ###-->",
      cus_stats_str
    );
    lcMenu_html_str = lcMenu_html_str.replace(
      "<!--### STRING_STUFF_STATS_GROUP ###-->",
      stuff_stats_str_group
    );
    lcMenu_html_str = lcMenu_html_str.replace(
      "<!--### STRING_SERVICE_STATS ###-->",
      service_stats_str
    );
    lcMenu_html_str = lcMenu_html_str.replace(
      "<!--### STRING_SERVICE_CATEG_STATS ###-->",
      service_categ_stats_str
    );
    lcMenu_html_str = lcMenu_html_str.replace(
      "<!--### STRING_STOCK_STATS ###-->",
      stock_stats_str
    );
    lcMenu_html_str = lcMenu_html_str.replace(
      "<!--### STRING_STOCK_CATEG_STATS ###-->",
      stock_categ_stats_str
    );

    lcMenu_html_str = lcMenu_html_str.replace(
      "<!--### STRING_CASH_STATS_ESEX_CATEG ###-->",
      cash_stats_esexCateg_str
    );

    lcMenu_html_str = lcMenu_html_str.replace(
      "<!--### STRING_SERVICE_STCK ###-->",
      stats_service_stck_str
    );
    lcMenu_html_str = lcMenu_html_str.replace(
      "<!--### STRING_STATS_STATS ###-->",
      stats_stats_str
    );

  }

  lcMenu.innerHTML = lcMenu_html_str;
}
