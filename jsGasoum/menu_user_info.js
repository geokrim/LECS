function menu_user_info_constructor(){
  //// console.log('menu_user_info_constructor');
   
   //Create the element using the createElement method.
    var lcUserInfo = document.getElementById("lc_user_info");

        //Add your content to the DIV
        lcUserInfo.innerHTML =  '<a href="" class="nav-link nav-link-profile" data-toggle="dropdown">'+
            '<span class="logged-name hidden-md-down" id="username"> </span>'+
            '<img src="../img/user.png" class="wd-32 rounded-circle" alt="">'+
            '<span class="square-10 bg-success"></span>'+
          '</a>'+
          '<div class="dropdown-menu dropdown-menu-header wd-200">'+
            '<ul class="list-unstyled user-profile-nav">'+
              '<li><a href="index.html"><i class="icon ion-power"></i>Έξοδος</a></li>'+
            '</ul>'+
          '</div><!-- dropdown-menu -->';
}

