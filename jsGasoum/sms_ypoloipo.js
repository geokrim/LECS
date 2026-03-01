function   information_system_constructor_with_sms_ypoloipo(show_sms_ypoloipo_menu){
    // AJAX MAGIC
    $.ajax({
        url: serverURL + '/smsSetup/1',
        dataType: 'json',
        success: function(data) {
            // ON GET SMS BALANCE URL SUCCESS
            var sms_balance_url = data.smsBalanceUrl + data.smsApiKey;
            //console.log("getSmsBalanceUrl sms_balance_url " + sms_balance_url);
            $.ajax({
                url: sms_balance_url,
                dataType: 'json',
                success: function(data) {
                    // ON GET SMS YPOLOIPO SUCCESS
                    var sms_ypoloipo = 0;
                    if(data.status == 1 && data.error == 0){
                        sms_ypoloipo = data.balance;
                    }else{
                        sms_ypoloipo = 0; 
                    }
                    sms_ypoloipo = data.balance;
                    // console.log("sms_ypoloipo " + sms_ypoloipo);
                    // console.log('information_system_constructor_with_sms_ypoloipo:sms_ypoloipo: ' + sms_ypoloipo);
                    global_sms_ypoloipo = sms_ypoloipo;
                    information_system_constructor(show_sms_ypoloipo_menu, sms_ypoloipo);

                },
                error: function(jqXHR, textStatus, errorThrown){
                    write_to_log('Error sms_ypoloipo: information_system_constructor_with_sms_ypoloipo' + ' ' + textStatus + " - " + errorThrown);
                    alert('Error gasoum: ' + textStatus + ' - ' + errorThrown);
                },
                failure: function(errMsg) {
                    write_to_log('Failure sms_ypoloipo: information_system_constructor_with_sms_ypoloipo' + ' ' + errMsg);
                    alert('Failure: Ο server δεν ανταποκρίθηκε');
                }
            });




        },
        error: function(jqXHR, textStatus, errorThrown){
            write_to_log('Error sms_ypoloipo: getSmsBalanceUrl' + ' ' + textStatus + " - " + errorThrown);
            alert('Error gasoum: ' + textStatus + ' - ' + errorThrown);
        },
        failure: function(errMsg) {
            write_to_log('Failure sms_ypoloipo: getSmsBalanceUrl' + ' ' + errMsg);
            alert('Failure: Ο server δεν ανταποκρίθηκε');
        }
    });

}


/*

function get_sms_ypoloipo(){
    // AJAX MAGIC
    $.ajax({
        url: serverURL + '/smsSetup/1',
        dataType: 'json',
        success: function(data) {
            // ON GET SMS BALANCE URL SUCCESS
            var sms_balance_url = data.smsBalanceUrl + data.smsApiKey;
            //console.log("getSmsBalanceUrl sms_balance_url " + sms_balance_url);
            $.ajax({
                url: sms_balance_url,
                dataType: 'json',
                success: function(data) {
                    // ON GET SMS YPOLOIPO SUCCESS
                    var sms_ypoloipo = 0;
                    if(data.status == 1 && data.error == 0){
                        sms_ypoloipo = data.balance;
                    }else{
                        sms_ypoloipo = 0; 
                    }
                    sms_ypoloipo = data.balance;
                    document.getElementById("company_smsYpoloipo").value = sms_ypoloipo;

                },
                error: function(jqXHR, textStatus, errorThrown){
                    write_to_log('Error sms_ypoloipo: getSmsYpoloipo' + ' ' + textStatus + " - " + errorThrown);
                    alert('Error gasoum: ' + textStatus + ' - ' + errorThrown);
                },
                failure: function(errMsg) {
                    write_to_log('Failure sms_ypoloipo: getSmsYpoloipo' + ' ' + errMsg);
                    alert('Failure: Ο server δεν ανταποκρίθηκε');
                }
            });




        },
        error: function(jqXHR, textStatus, errorThrown){
            write_to_log('Error sms_ypoloipo: getSmsBalanceUrl' + ' ' + textStatus + " - " + errorThrown);
            alert('Error gasoum: ' + textStatus + ' - ' + errorThrown);
        },
        failure: function(errMsg) {
            write_to_log('Failure sms_ypoloipo: getSmsBalanceUrl' + ' ' + errMsg);
            alert('Failure: Ο server δεν ανταποκρίθηκε');
        }
    });
    return  sms_ypoloipo;

}




*/







