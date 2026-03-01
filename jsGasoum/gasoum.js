


    function showTable() {
        // AJAX MAGIC
        $.ajax({
            url: serverURL + '/quote/all',
            dataType: 'json',
            success: function(data) {
                for (var i=0; i<data.length; i++) {
                    var row = $('<tr><td>' + data[i].id+ '</td><td>' + data[i].descr + '</td><td>' + data[i].author + '</td></tr>');
                    $('#myTable').append(row);
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('Error: ' + textStatus + ' - ' + errorThrown);
            }
        });
    }


    function getQuoteRandomReal() {
        // AJAX MAGIC
        $.ajax({
            url: serverURL + '/quote/random',
            dataType: 'json',
            success: function(data) {
                for (var i=0; i<data.length; i++) {
                    $("#random_quote").text(data[i].descr + ' - ' + data[i].author );
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('Error: ' + textStatus + ' - ' + errorThrown);
            }
        });
    }


    function getQuoteRandom() {
        // AJAX MAGIC
        $.ajax({
            url: serverURL + '/quote/random',
            dataType: 'json',
            success: function(data) {
                for (var i=0; i<data.length; i++) {
                    // var row = $('<tr><td>' + data[i].id+ '</td><td>' + data[i].descr + '</td><td>' + data[i].author + '</td></tr>');
                    $("#test1").text(data[i].id );
                    $("#test2").text(data[i].descr );
                    $("#test3").text(data[i].author );
                    // $('#myTable').append(row);
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('Error: ' + textStatus + ' - ' + errorThrown);
            }
        });
    }


    function showQuoteById(){
        // console.log('showQuoteById' + '  ' + document.getElementById("single_id").value);
        // AJAX MAGIC
        $.ajax({
            url: serverURL + '/quote/' + document.getElementById("single_id").value,
            dataType: 'json',
            success: function(data) {
                // EMPTY ELEMENTS FIRST IN CASE ID DOES NOT EXIST
                document.getElementById("single_id").value = '';
                document.getElementById("single_descr").value = '';
                document.getElementById("single_author").value = '';
                // GET DATA FROM JSON OBJECT
                document.getElementById("single_id").value = data.id;
                document.getElementById("single_descr").value = data.descr;
                document.getElementById("single_author").value = data.author;
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('Error: ' + textStatus + ' - ' + errorThrown);
            }
        });
    }

    function updateShow(){
        
        // console.log('updateShow');
        // AJAX MAGIC
        $.ajax({
            url: serverURL + '/quote/random',
            dataType: 'json',
            success: function(data) {
                for (var i=0; i<data.length; i++) {
                    // var row = $('<tr><td>' + data[i].id+ '</td><td>' + data[i].descr + '</td><td>' + data[i].author + '</td></tr>');
                    document.getElementById("upd_id").value = data[i].id;
                    document.getElementById("upd_descr").value = data[i].descr;
                    document.getElementById("upd_author").value = data[i].author;
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('Error: ' + textStatus + ' - ' + errorThrown);
            }
        });

    }

    function updateQuoteById(){
        // PREPARE URL
        var urlRaw = serverURL + '/quote/updateQuote/' + document.getElementById("upd_id").value;

        // PREPARE JSON OBJECT
        var upd_quote = {
            id:$("#upd_id").val(),
            descr:$("#upd_descr").val(),
            author:$("#upd_author").val()
        }

        // console.log(upd_quote);
        // console.log(urlRaw);

        // AJAX MAGIC
        $.ajax({
            url: urlRaw,
            dataType: 'json',
            type: 'POST',
            contentType: 'application/json',
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify(upd_quote),
            contentType: "application/json; charset=utf-8",
            success: function(data){
                // alert(data);
            },
            failure: function(errMsg) {
                alert(errMsg);
            }
        });
        
    }



    function insertQuote(){
        // PREPARE URL
        var urlRaw = serverURL + '/quote/add';

        // PREPARE JSON OBJECT
        var ins_quote = {
            id: 600,
            descr:$("#ins_descr").val(),
            author:$("#ins_author").val()
        }
        // console.log(ins_quote);
        // console.log(urlRaw);

        // AJAX MAGIC
        $.ajax({
            url: urlRaw,
            dataType: 'json',
            type: 'POST',
            traditional: true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(ins_quote),
            success: function(data){
               // alert(data);
            }
            ,
            failure: function(errMsg) {
                alert(errMsg);
            }
        });

        document.getElementById("ins_descr").value = '';
        document.getElementById("ins_author").value = '';


        
    }

    function deleteQuoteById(){
        // PREPARE URL
        var delURL = serverURL + '/quote/delQuote/' + document.getElementById("del_id").value;
        // AJAX MAGIC
        $.ajax({
            url: delURL,
            type: 'GET',
            success: function(data){
                // alert(data);
             }
        });
        document.getElementById("del_id").value = '';
    }

    function getQuoteCount(){
        $.ajax({
            type: "GET",
            url: "http://localhost/quote/count/",
            data: {},
            success: function(quotesCount){
                // alert( "Data Saved: " + quotesCount );
                $("#quote_count").text(quotesCount);
            }

        });
        
    }