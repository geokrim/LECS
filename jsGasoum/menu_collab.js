function menuCollabGenerateRandomToken() {
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

function menu_constructor(){

    //Create the element using the createElement method.
    var lcCusCollabMenu = document.getElementById("lcCusCollabMenu");
    //var dobDtHtmlFormat = document.getElementById("dob_datepicker").value ;

     
    //Add your content to the DIV
 
     lcCusCollabMenu.innerHTML = "<!-- KARTELES  -->" +
                        ' <a href="cus.html?pid=' + menuCollabGenerateRandomToken() + '" id="lcCusCollab" class="br-menu-link "> ' +
                        '     <div class="br-menu-item"> ' +
                        '     <i class="menu-item-icon icon ion-ios-bookmarks-outline  tx-24"></i> ' +
                        '    <span class="menu-item-label">Πελάτες</span> ' +
                        '   </div><!-- menu-item -->    ' +
                        ' </a><!-- br-menu-link -->' +
                            "<!-- EXIT  --> " +
                        ' <a href="../app/index.html?pid=' + menuCollabGenerateRandomToken() + '" id="lcCollabExit" class="br-menu-link ">  ' +
                        '     <div class="br-menu-item"> ' +
                        '      <i class="menu-item-icon icon ion-power tx-22"></i> ' +
                        '    <span class="menu-item-label">Έξοδος</span> ' +
                        "   </div><!-- menu-item -->    " +
                        " </a><!-- br-menu-link -->";
                      


}