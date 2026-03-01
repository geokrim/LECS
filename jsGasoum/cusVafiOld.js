function cusVafiMainModalSetCusHeaderInfo(current_id){
    // cus_current_modal_id = current_id;
    document.getElementById("cus_modal_id").innerHTML= current_id;
    document.getElementById("cus_modal_id").style = "hidden";

    // AJAX MAGIC
    $.ajax({
        url: serverURL + '/cus/' + current_id,
        dataType: 'json',
        success: function(data) {
            document.getElementById("cus_modal_name").innerHTML = data.surname + ' ' + data.name;
            cuslVafiMainModalGetVafesByCusId();
        },
        error: function(jqXHR, textStatus, errorThrown){
            // alert('Error: ' + textStatus + ' - ' + errorThrown);
        }
    });

}

function cuslVafiMainModalGetVafesByCusId() {

    document.getElementById('cus_vafi_new_group').style.visibility = "hidden";
    document.getElementById('cus_vafi_update_group').style.visibility = "hidden";

    // Remove previous data
    $("#cusVafesTable tbody tr").remove();
  
    // AJAX MAGIC 
    $.ajax({
        url: serverURL + '/cusvafi/vafiByCusId/' + document.getElementById("cus_modal_id").innerHTML,
        dataType: 'json',
        cache: true,
        success: function(data) {  
            var trHTML = '';
            $.each(data, function (i, item) {
                if(item.saleToken == '0'){ 
                trHTML +=   '<tr><td>' + item.id  + '</td>' +
                            '<td>' + item.vafiDt  + '</td>' +
                            '<td>' + item.descr  + '</td>' +
                            '<td><span onclick="cusVafiUpdateGroupVisible(' + item.id  + ')" style="color: blue;"><i class="fa fa-edit" aria-hidden="true"></i></span>' + '</td>' +
                            '<td><span onclick="cuslVafiMainModalVafiDeleteById(' + item.id  + ')" style="color: red;"><i class="fa fa-trash" aria-hidden="true"></i></span>' + '</td></tr>';
                }else{
                trHTML +=   '<tr><td>' + item.id  + '</td>' +
                            '<td>' + item.vafiDt  + '</td>' +
                            '<td>' + item.descr  + '</td>' +
                            '<td><span onclick="cusVafiUpdateGroupVisible(' + item.id  + ')" style="color: blue;"><i class="fa fa-edit" aria-hidden="true"></i></span>' + '</td>' +
                            '<td> </td></tr>';
    

                }
           
             });
            $('#cusVafesTable').append(trHTML);
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert('Error gasoum: ' + textStatus + ' - ' + errorThrown);
        }
        
    });

}


function cuslVafiMainModalGetVafesByCusIdForSales(cus_current_id) {

    // Remove previous data
    $("#cusVafesTableSales tbody tr").remove();
  
    // AJAX MAGIC 
    $.ajax({
        url: serverURL + '/cusvafi/vafiByCusId/' + cus_current_id,
        dataType: 'json',
        cache: true,
        success: function(data) {  
            var trHTML = '';
            $.each(data, function (i, item) {
                trHTML +=   '<tr><td>' + item.vafiDt  + '</td>' +
                            '<td>' + item.descr  + '</td>';

             });
            $('#cusVafesTableSales').append(trHTML);
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert('Error gasoum: ' + textStatus + ' - ' + errorThrown);
        }
        
    });

}




function cuslVafiMainModalVafiUpdateById(cus_vafi_id){
    // console.log('cuslVafiMainModalVafiUpdateById: ' + cus_vafi_id);
}



// -------------------------- CUS_VAFI_DELETE --------------------------
function cuslVafiMainModalVafiDeleteById(cus_vafi_id){
    // console.log('cuslVafiMainModalVafiDeleteById: ' + cus_vafi_id);
    // PREPARE URL
    var delVafiURL = serverURL + '/cusvafi/delCusVafi/' + cus_vafi_id;
    // AJAX MAGIC
    $.ajax({
        url: delVafiURL,
        type: 'GET',
        success: function(data){
            // RELOAD THE TABLE
            cuslVafiMainModalGetVafesByCusId();
        }
    });

}

// -------------------------- CUS_VAFI_NEW --------------------------
function cusVafiNewGroupVisible(){
    // console.log('cusVafiNewGroupVisible');
    document.getElementById('cus_vafi_new_group').style.visibility = "visible";
    document.getElementById('cus_vafi_update_group').style.visibility = "hidden";
    document.getElementById('btn_cus_vafi_new').style.visibility = "hidden";

    var today = moment().format('DD/MM/YYYY');
    var todayMySqlMFormat = formatDateForMySQL(today);
    //// console.log('cusVafiNewGroupVisible today: ' + today);
    //// console.log('cusVafiNewGroupVisible todayMySqlMFormat: ' + todayMySqlMFormat);

    document.getElementById("cus_vafi_new_datepicker").value = today;

    document.getElementById("cus_vafi_new_descr").value = '';
    

}

function cusVafiNewSave(){
    // console.log('cusVafiNewSave');
    document.getElementById('cus_vafi_new_group').style.visibility = "hidden";
    document.getElementById('btn_cus_vafi_new').style.visibility = "visible";

    var today = moment().format('DD/MM/YYYY');
    var todayMySqlMFormat = formatDateForMySQL(today);
    //// console.log('cusVafiNewGroupVisible today: ' + today);
    //// console.log('cusVafiNewGroupVisible todayMySqlMFormat: ' + todayMySqlMFormat);

    document.getElementById("cus_vafi_new_datepicker").value = today;


    // PREPARE JSON OBJECT && URL
    var newVafiDt = document.getElementById("cus_vafi_new_datepicker").value;
    // console.log(newVafiDt);
    // console.log('newVafiDt');
    var newVafiDtMuysqlFormat = formatDateForMySQL(newVafiDt);
    var newCusId = document.getElementById("cus_modal_id").innerHTML;
    var newCusVafiDescr = document.getElementById("cus_vafi_new_descr").value;

    var urlInsertCusVafi = serverURL + '/cusvafi/add/';
    
    var newCusVafi = {
        id:1,
        cusId:newCusId,
        descr:newCusVafiDescr,
        vafiDt:newVafiDtMuysqlFormat,
        userInsert:'gs',
        userUpdate:'gs',
        dateInsert:todayMySqlMFormat,
        dateUpdate:todayMySqlMFormat
    }
    // console.log( newCusVafi);

     // AJAX MAGIC
     $.ajax({
        url: urlInsertCusVafi,
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json',
        // The key needs to match your method's input parameter (case-sensitive).
        data: JSON.stringify(newCusVafi),
        contentType: "application/json; charset=utf-8",
        success: function(data){
                // RELOAD THE TABLE
                //cuslVafiMainModalGetVafesByCusId();
                alert('All good');
                
        },
        failure: function(errMsg) {
            alert('Error: Η εγγραφή δεν αποθηκεύτηκε.');
        }
    });
    $('#cusVaFiMainModal').modal('hide');


}

function cusVafiNewClose(){
    // console.log('cusVafiNewClose');
    document.getElementById('cus_vafi_new_group').style.visibility = "hidden";
    document.getElementById('btn_cus_vafi_new').style.visibility = "visible";
}

// -------------------------- CUS_VAFI_UPDATE --------------------------
function cusVafiUpdateGroupVisible(cusVafiId){
    // console.log('cusVafiUpdateGroupVisible');
    document.getElementById('cus_vafi_new_group').style.visibility = "hidden";
    document.getElementById('cus_vafi_update_group').style.visibility = "visible";
    document.getElementById('btn_cus_vafi_new').style.visibility = "visible";

    // GET VAFI BY ID AND PUT IT INTO ELEMENTS
    var urlVafiById = serverURL + '/cusvafi/' + cusVafiId;
    $.ajax({
        url: urlVafiById,
        dataType: 'json',
        success: function(data) {
            // GET DATA FROM JSON OBJECT
            document.getElementById("cus_vafi_update_id").value = data.id;
            var vafiDateString = formatDateForDatepicker (data.vafiDt);
            document.getElementById("cus_vafi_update_datepicker").value = vafiDateString;
            document.getElementById("cus_vafi_update_descr").value = data.descr;
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert('Error: ' + textStatus + ' - ' + errorThrown);
        }
    });
}


function cusVafiUpdateSave(){
    // console.log('cusVafiUpdateSave');


    var currentVadiId = document.getElementById("cus_vafi_update_id").value
    var urlCusVafiUpdate = serverURL + '/cusvafi/updateCusVafi/' + currentVadiId;

    var cusVafiDtHtmlFormat = document.getElementById("cus_vafi_update_datepicker").value ;
    var cusVafiDtMySqlMFormat = formatDateForMySQL(cusVafiDtHtmlFormat);

    var vafiDescr = document.getElementById("cus_vafi_update_descr").value;

    var today = moment().format('DD/MM/YYYY');
    var todayMySqlMFormat = formatDateForMySQL(today);

    var upd_cus_vafi = {
        id:currentVadiId,
        cusId:'99', // DOES NOT GET UPDATED
        descr:vafiDescr,
        vafiDt:cusVafiDtMySqlMFormat,
        userInsert:'99',  // DOES NOT GET UPDATED
        userUpdate:'gs',  //TODO localStorage
        dateInsert:'99',  // DOES NOT GET UPDATED
        dateUpdate:todayMySqlMFormat
    }

    // AJAX MAGIC
    $.ajax({
        url: urlCusVafiUpdate,
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json',
        // The key needs to match your method's input parameter (case-sensitive).
        data: JSON.stringify(upd_cus_vafi),
        contentType: "application/json; charset=utf-8",
        success: function(data){
           // window.location.replace("cus.html");
        },
        failure: function(errMsg) {
            alert('Error: Η εγγραφή δεν αποθηκεύτηκε.');
        }
    });
    document.getElementById('cus_vafi_update_group').style.visibility = "hidden";

    $('#cusVaFiMainModal').modal('hide');
    
    // cuslVafiMainModalGetVafesByCusId(); // IT IS SUPPOSED TO DO THIS BUT !!!!

}

function cusVafiUpdateClose(){
    // console.log('cusVafiUpdateClose');
    document.getElementById('cus_vafi_update_group').style.visibility = "hidden";
}