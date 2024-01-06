// get schedule from dropdown list
let schedule;
$('.dropdown-item').on('click', function (eventObj){
    $("#dropdownMenuButton").text(eventObj.target.textContent);
    schedule = eventObj.target.dataset.type;
});

// load selected schedule with hours
$('.submit').on('click', function (){
    //$("#dropdownMenuButton").text(eventObj.target.textContent);
    //let schedule = eventObj.target.dataset.type;
    console.log("clicked!")
    console.log(schedule)
    const hours = $("#hours").val();
    if(schedule && hours){
        containerEl.html('');
        buildRows(scheduleType[schedule], hours);
    }
    addSaveBtnEvent();
});