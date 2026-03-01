function formatDateForDatepicker(input) {
  var datePart = input.match(/\d+/g),
    year = datePart[0],
    month = datePart[1],
    day = datePart[2];
  return day + "/" + month + "/" + year;
}

function formatDateForMySQL(input) {
  return input.split("/").reverse().join("-");
}

function doubleForFrontEnd(amnt) {
  return amnt.toFixed(2);
}

function todayDateForMysql() {
  var date;
  date = new Date();

  return (
    date.getUTCFullYear() +
    "-" +
    ("00" + (date.getUTCMonth() + 1)).slice(-2) +
    "-" +
    ("00" + date.getUTCDate()).slice(-2)
  );
}

//TODO: CHECK IF THIS IS STILL NEEDED
function redirect(page) {
  // console.log('in redirect');
  // return console.log('in redirect');
  return window.location.replace(page);
}

function formatMoney(amount) {
  if (amount == null) {
    amount = 0;
  }

  return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
