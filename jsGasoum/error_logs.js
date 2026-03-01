function write_to_log(position, message){

    if (localStorage.getItem("lcErrors") === null) {
        createLcErrorArr();
      }

    // Retrieve the object from storage to add a new error
    var retrievedObject = localStorage.getItem("lcErrors");
    var stored          = JSON.parse(retrievedObject);

    // DT Format
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var hours = today.getHours();
    var mins = today.getMinutes();
    var secs = today.getSeconds();
    today = yyyy + '/' + mm + '/' + dd + ' - ' + hours + ':' + mins + ':' + secs;

    var newError = [{
        "dt"        : today,
        "position"  : position,
        "msg"       : message
    }];

    // var stored = Object.assign(stored, newError);
    stored.push(newError);


    // Update the storage
    localStorage.setItem("lcErrors", JSON.stringify(stored));

    // Console localStorage Array
    // var result = localStorage.getItem("lcErrors");
    // console.log(result);


      

}

function  createLcErrorArr(){

    // DT Format
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '/' + mm + '/' + dd;

    var dfltMsg = [{
        "dt"        : today,
        "position"  : 'INITIALIZE',
        "msg"       : 'LC'
    }];

    localStorage.setItem("lcErrors", JSON.stringify(dfltMsg));


}
