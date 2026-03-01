function footer_constructor(){

    //Create the element using the createElement method.
    var lcFooter = document.getElementById("lc_footer");
    //var dobDtHtmlFormat = document.getElementById("dob_datepicker").value ;
    var curr_year = new Date().getFullYear();


    // FB
    //  ' <a target="_blank" class="pd-x-5" href="https://www.facebook.com/sharer/sharer.php?u=http%3A//themepixels.me/bracket/intro"><i class="fa fa-facebook tx-20"></i></a> ' +
     
    //Add your content to the DIV
    lcFooter.innerHTML =        ' <footer class="br-footer"> ' +
                                ' <div class="footer-center mx-auto"> '+
                                ' <div>Copyright &copy; 2019 - ' + curr_year + '. lecs.gr All Rights Reserved</div> ' +
                                // ' <div>Attentively and carefully made by gasoum.com.</div> '+
                                ' </div> '+
                                ' <div class="footer-right d-flex align-items-center"> '+
                                ' <span class="tx-uppercase mg-r-10">Visit US:</span> '+
                                ' <a target="_blank" class="pd-x-5" href="https://www.gasoum.com"><i class="fa fa-bullseye"  tx-20" aria-hidden="true"></i></a> ' +
                                ' <a target="_blank" class="pd-x-5" href="https://www.linkedin.com/in/gasoum/"><i class="fa fa-linkedin" tx-20"></i></a> ' +
                                ' </div> ' +
                                ' </footer> ' ;
}