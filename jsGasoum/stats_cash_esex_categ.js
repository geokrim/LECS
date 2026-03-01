function initializeDates(){
    // INITIALIZE  DATES TO TODAY
    var currentDate = new Date();  
    $("#from_datepicker").datepicker("setDate",currentDate);
    $("#to_datepicker").datepicker("setDate",currentDate);

}

//---------- ESEX PIE CHARTS

function cashEsodaShowChart(){
    var fromDatePickerValue = document.getElementById("from_datepicker").value ;
    var toDatePickerValue   = document.getElementById("to_datepicker").value ;
    var fromDt = formatDateForMySQL(fromDatePickerValue);
    var toDt   = formatDateForMySQL(toDatePickerValue);

    // AJAX MAGIC
    $.ajax({
        url: serverURL + '/statsCashEsexcateg/esodaBetweenDates?from=' + fromDt + '&to=' + toDt,
        dataType: "json",
        cache: true,
        success: function (data) {
    
          // var data = generateEsodaExodaJSON(5) FOR TESTING PURPOSES;
          var esoda_data = getAmounts(data);
          // console.log('esoda_data', esoda_data);
          var esoda_lables = getLbls(data);
          var esoda_colors = generateRandomColors(data.length);
          
          // console.log('data.length', data.length);
          // console.log('data:', data);

          // ESODA
          if(data.length > 0){
            // console.log('data.length', data.length);
            // console.log('data:', data);
            $("canvas#pieEsoda").remove();
            $("div#cashChartEsExCateg").append('<canvas id="pieEsoda" width="400" height="400"></canvas>');
          
            const ctx = document.getElementById('pieEsoda').getContext('2d');
            var pieEsoda = new Chart(ctx, {
              type: 'pie',
              data: {
                labels: esoda_lables,
                datasets: [{
                  label: 'Έσοδα',
                  data: esoda_data,
                  backgroundColor: esoda_colors,
                  hoverOffset: 4
                }]
              }
            });
            document.getElementById("totalEsoda").innerText = formatMoney(arrayTotal(esoda_data));
            // pieEsoda.update();
          }else{
            initializeEsoda();
          }
        },
        error: function(jqXHR, textStatus, errorThrown){
            write_to_log('Error stats_cash_esex_categ_esoda' + ' ' + textStatus + " - " + errorThrown);
            alert('Error gasoum: ' + textStatus + ' - ' + errorThrown);
        },
        failure: function(errMsg) {
            write_to_log('Failure stats_cash: stats_cash_esex_categ_esoda' + ' ' + errMsg);
            alert('Failure: Ο server δεν ανταποκρίθηκε');
        }
    });
    
    // pieEsoda.update();
  }


  function cashExodaShowChart(){
    var fromDatePickerValue = document.getElementById("from_datepicker").value ;
    var toDatePickerValue   = document.getElementById("to_datepicker").value ;
    var fromDt = formatDateForMySQL(fromDatePickerValue);
    var toDt   = formatDateForMySQL(toDatePickerValue);

    // AJAX MAGIC
    $.ajax({
        url: serverURL + '/statsCashEsexcateg/exodaBetweenDates?from=' + fromDt + '&to=' + toDt,
        dataType: "json",
        cache: true,
        success: function (data) {
    
          // var data = generateEsodaExodaJSON(5) FOR TESTING PURPOSES;
          var exoda_data = getAmounts(data);
          // console.log('exoda_data', exoda_data);
          var exoda_lables = getLbls(data);
          var exoda_colors = generateRandomColors(data.length);
          
          // console.log('data.length', data.length);
          // console.log('data:', data);

          // EXODA
          if(data.length > 0){
            // console.log('data.length', data.length);
            // console.log('data:', data);
            $("canvas#pieExoda").remove();
            $("div#cashChartEsExCateg").append('<canvas id="pieExoda" width="400" height="400"></canvas>');
          
            const ctx = document.getElementById('pieExoda').getContext('2d');
            var pieEsoda = new Chart(ctx, {
              type: 'pie',
              data: {
                labels: exoda_lables,
                datasets: [{
                  label: 'Έξοδα',
                  data: exoda_data,
                  backgroundColor: exoda_colors,
                  hoverOffset: 4
                }]
              }
            });
            document.getElementById("totalExoda").innerText = formatMoney(arrayTotal(exoda_data));

            // pieExoda.update();
          }else{
            initializeExoda();
          }
        },
        error: function(jqXHR, textStatus, errorThrown){
            write_to_log('Error stats_cash stats_cash_esex_categ_exoda' + ' ' + textStatus + " - " + errorThrown);
            alert('Error gasoum: ' + textStatus + ' - ' + errorThrown);
        },
        failure: function(errMsg) {
            write_to_log('Failure stats_cash: stats_cash_esex_categ_exoda' + ' ' + errMsg);
            alert('Failure: Ο server δεν ανταποκρίθηκε');
        }
    });
    // pieExoda.update();
  }

  function initializeEsoda(){
    $("canvas#pieEsoda").remove();
    $("div#cashChartEsExCateg").append('<canvas id="pieEsoda" width="400" height="400"></canvas>'); 
    const ctx = document.getElementById('pieEsoda').getContext('2d');
            var pieEsoda = new Chart(ctx, {
              type: 'pie',
              data: {
                labels: ['',],
                datasets: [{
                  label: 'Έσοδα',
                  data: [1],
                  backgroundColor: ['rgb(54, 162, 235, 0.2)'],
                  hoverOffset: 4
                }]
              }
            });
            document.getElementById("totalEsoda").innerText = formatMoney(0);  
  }

    function initializeExoda(){
    $("canvas#pieExoda").remove();
    $("div#cashChartEsExCateg").append('<canvas id="pieExoda" width="400" height="400"></canvas>'); 
    const ctx = document.getElementById('pieExoda').getContext('2d');
            var pieEsoda = new Chart(ctx, {
              type: 'pie',
              data: {
                labels: ['',],
                datasets: [{
                  label: 'Έξοδα',
                  data: [1],
                  backgroundColor: ['rgb(255, 99, 132, 0.2)'],
                  hoverOffset: 4
                }]
              }
            });
            document.getElementById("totalExoda").innerText = formatMoney(0);  
  }



  // ---  GENERAL FUNCTIONS  ---
  // NOT IN USE YET
  function addSalesDataChart(myChart) {
    myChart.update();
  }

  function arrayTotal(arr){
    for(var i=0, sum=0; i<arr.length; sum+=arr[i++]);
    return sum; 
  } 

  function generateRandomColors(n) {
  const colors = [];
  for (let i = 0; i < n; i++) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    colors.push(`rgba(${r}, ${g}, ${b}, 0.2)`);
  }
  return colors;
}

function getLbls(jsonArray) {
  return jsonArray.map(item => item.lbl);
}

function getAmounts(jsonArray) {
  return jsonArray.map(item => item.amount);
}

// not working properly
function formatMoneyList(data) {
            return data.map(number => {
                if (typeof number !== 'number') {
                    console.warn(`Invalid input: ${number}.  Expected a number, skipping.`);
                    return null; // or handle invalid input differently, e.g., return the original value or a default value
                }
                return formatMoney(number);

            }); // .filter(item => item !== null); // Remove null values from invalid inputs

}

// FOT TESTING PURPOSES
function generateEsodaExodaJSON(n) {
  const result = [];

  // helper function to generate random text up to 10 chars
  function randomLabel(length = 10) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let str = "";
    const strLength = Math.floor(Math.random() * length) + 1; // 1 to 10 chars
    for (let i = 0; i < strLength; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;
  }

  for (let i = 1; i <= n; i++) {
    const item = {
      id: i,
      lbl: randomLabel(10),
      amount: parseFloat((Math.random() * 999999.99).toFixed(2)) // 0 to 999999.99
    };
    result.push(item);
  }

  return result;
}
 
