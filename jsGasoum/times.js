function insert_tms_active_tabs_new(){

    select_tm

    var option1 = document.createElement("option");
    option1.text = '08:00';
    option1.value = '08:00';
    var option2 = document.createElement("option");
    option2.text = '08:30';
    option2.value = '08:30';

    var option3 = document.createElement("option");
    option3.text = '09:00';
    option3.value = '09:00';
    var option4 = document.createElement("option");
    option4.text = '09:30';
    option4.value = '09:30';

    var option5 = document.createElement("option");
    option5.text = '10:00';
    option5.value = '10:00';
    var option6 = document.createElement("option");
    option6.text = '10:30';
    option6.value = '10:30';
    
    var option7 = document.createElement("option");
    option7.text = '11:00';
    option7.value = '11:00';
    var option8 = document.createElement("option");
    option8.text = '11:30';
    option8.value = '11:30';
    
    var option9 = document.createElement("option");
    option9.text = '12:00';
    option9.value = '12:00';
    var option10 = document.createElement("option");
    option10.text = '12:30';
    option10.value = '12:30';
    
    var option11 = document.createElement("option");
    option11.text = '13:00';
    option11.value = '13:00';
    var option12 = document.createElement("option");
    option12.text = '13:30';
    option12.value = '13:30';
    
    var option13 = document.createElement("option");
    option13.text = '14:00';
    option13.value = '14:00';
    var option14 = document.createElement("option");
    option14.text = '14:30';
    option14.value = '14:30';
    
    var option15 = document.createElement("option");
    option15.text = '15:00';
    option15.value = '15:00';
    var option16 = document.createElement("option");
    option16.text = '15:30';
    option16.value = '15:30';
    
    var option17 = document.createElement("option");
    option17.text = '16:00';
    option17.value = '16:00';
    var option18 = document.createElement("option");
    option18.text = '16:30';
    option18.value = '16:30';
    
    var option19 = document.createElement("option");
    option19.text = '17:00';
    option19.value = '17:00';
    var option20 = document.createElement("option");
    option20.text = '17:30';
    option20.value = '17:30';
    
    var option21 = document.createElement("option");
    option21.text = '18:00';
    option21.value = '18:00';
    var option22 = document.createElement("option");
    option22.text = '18:30';
    option22.value = '18:30';
    
    var option23 = document.createElement("option");
    option23.text = '19:00';
    option23.value = '19:00';
    var option24 = document.createElement("option");
    option24.text = '19:30';
    option24.value = '19:30';
    
    var option25 = document.createElement("option");
    option25.text = '20:00';
    option25.value = '20:00';
    var option26 = document.createElement("option");
    option26.text = '20:30';
    option26.value = '20:30';
        
    var option27 = document.createElement("option");
    option27.text = '21:00';
    option27.value = '21:00';
    var option28 = document.createElement("option");
    option28.text = '21:30';
    option28.value = '21:30';

    var option29 = document.createElement("option");
    option29.text = '22:00';
    option29.value = '22:00';
    var option30 = document.createElement("option");
    option30.text = '22:30';
    option30.value = '22:30';

    var option31 = document.createElement("option");
    option31.text = '23:00';
    option31.value = '23:00';
    var option32 = document.createElement("option");
    option32.text = '23:30';
    option32.value = '23:30';


    
    
    var select = document.getElementById("select_tm");
    select.appendChild(option1);
    select.appendChild(option2);
    select.appendChild(option3);
    select.appendChild(option4);
    select.appendChild(option5);
    select.appendChild(option6);
    select.appendChild(option7);
    select.appendChild(option8);
    select.appendChild(option9);
    select.appendChild(option10);

    select.appendChild(option11);
    select.appendChild(option12);
    select.appendChild(option13);
    select.appendChild(option14);
    select.appendChild(option15);
    select.appendChild(option16);
    select.appendChild(option17);
    select.appendChild(option18);
    select.appendChild(option19);
    select.appendChild(option20);

    select.appendChild(option21);
    select.appendChild(option22);
    select.appendChild(option23);
    select.appendChild(option24);
    select.appendChild(option25);
    select.appendChild(option26);
    select.appendChild(option27);
    select.appendChild(option28);
    select.appendChild(option29);
    select.appendChild(option30);

    select.appendChild(option31);
    select.appendChild(option32);

   



}


function setCurrentTime(){
    // GET CURRENT TIME AND SELECT IT
    var todayForTime = new Date(); 
    var finalMinutes = '00';
    if (todayForTime.getMinutes() >= 30){
        finalMinutes = '30';
    }
    var theTimeIs = todayForTime.getHours() + ":" + finalMinutes;
   // theTimeIs = theTimeIs.replace('8:', '08:');
   // theTimeIs = theTimeIs.replace('9:', '09:');
    // console.log('Time is: ' + theTimeIs);
    var mySelect = document.getElementById('select_tm');
    for(var i, j = 0; i = mySelect.options[j]; j++) {
        if(i.value == theTimeIs) {
            mySelect.selectedIndex = j;
            current_time = theTimeIs;
            break;
        }
    }
    
}
