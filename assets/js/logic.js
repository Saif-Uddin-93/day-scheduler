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

let toSave;
$(".save-btn").on('click', (eventObj)=>{
    const index = eventObj.target.dataset.index;
    const info = document.querySelectorAll(".description");
    for (let i = 0; i < info.length+9; i++) {
        if(info[i].dataset.index===index){
            toSave = info[i].value;
            console.log(info[i]);
            console.log(toSave);
            return
        }
    }
})