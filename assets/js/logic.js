let schedule;

$('.dropdown-item').on('click', function (eventObj){
    $("#dropdownMenuButton").text(eventObj.target.textContent);
    schedule = eventObj.target.dataset.type;
});

$('.submit').on('click', function (eventObj){
    //$("#dropdownMenuButton").text(eventObj.target.textContent);
    //let schedule = eventObj.target.dataset.type;
    console.log("clicked!")
    console.log(schedule)
    const hours = $("#hours").val();
    if(schedule){
        containerEl.html('');
        buildRows(scheduleType[schedule], hours||1);
    }
});