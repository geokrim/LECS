// ------------------------- SALES_NEW_UPDATE SERVICE
function validate_number_service_sales(element){
    console.log('In validate_number_service_sales: ' + element);

    // CHANGE , TO .
    sale_current_service_amount = sale_current_service_amount.replace(',', '.');
    // IF NOT FLOAT THEN MAKE IT FLOAT
     var isnumeric_isinteger = isNumeric(sale_current_service_amount);
     var is_numeric = isnumeric_isinteger[0];
     var is_integer = isnumeric_isinteger[1];

    if(is_numeric){
        if(is_integer){
            sale_current_service_amount = fromIntegerToFloat(sale_current_service_amount);
        }
        sale_current_service_amount_valid = true;
    }else{
        sale_current_service_amount_valid = false;
        document.getElementById("sale_service_axia").focus();
        alert('Μη επιτρεπόμενη τιμή στο πεδίο αξία');
    }

    // console.log('sale_current_service_amount   ' + sale_current_service_amount + '    ' + isNumeric(sale_current_service_amount) );           // ???
    // console.log('sale_current_service_amount_valid   ' + sale_current_service_amount_valid  );      
}


// ------------------------- SALES_NEW_UPDATE STOCK
function validate_number_stock_sales(element){
    console.log('In validate_number_stock_sales: ' + element);

    // CHANGE , TO .
    sale_current_stock_amount = sale_current_stock_amount.replace(',', '.');
    // IF NOT FLOAT THEN MAKE IT FLOAT
     var isnumeric_isinteger = isNumeric(sale_current_stock_amount);
     var is_numeric = isnumeric_isinteger[0];
     var is_integer = isnumeric_isinteger[1];

    if(is_numeric){
        if(is_integer){
            sale_current_stock_amount = fromIntegerToFloat(sale_current_stock_amount);
        }
        sale_current_stock_amount_valid = true;
    }else{
        sale_current_stock_amount_valid = false;
        document.getElementById("sale_stock_axia").focus();
        alert('Μη επιτρεπόμενη τιμή στο πεδίο αξία');
    }

    // console.log('sale_current_service_amount   ' + sale_current_service_amount + '    ' + isNumeric(sale_current_service_amount) );           // ???
    // console.log('sale_current_service_amount_valid   ' + sale_current_service_amount_valid  );     
}





// ------------------------- GENERAL PURPOSE
// FIRST VALUE IS FOR ISNUMERIC SECOND IS FOR IS INTEGER
function isNumeric(value) {
    if(value.match(/^-?\d+$/)){
        //valid integer (positive or negative)
        fromIntegerToFloat(value);
        return [true, true];
        //    }else if(value.match(/^\d+\.\d+$/)){ only positive valid floats
    }else if(value.match(/^-?\d+\.\d+$/)){
        //valid float both negative and positive
        return [true, false];
    }else{
        //not valid number
        return [false, false];
    }
}

function fromIntegerToFloat(value){
    value = value + '.00';
    console.log('fromIntegerToFloat: ' + value);
    return value;
}
