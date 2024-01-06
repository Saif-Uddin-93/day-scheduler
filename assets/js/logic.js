addSaveBtnEvent();
// add event listener. save day description with correct index
//let toSave;
function addSaveBtnEvent(){
    $('.save-btn').on('click', (eventObj)=>{
        console.log("save");
        const saveIndex = parseInt(eventObj.target.dataset.index);
        const description = document.querySelectorAll(".description");
        for (let i = 0; i < Infinity; i++) {
            const descriptionIndex = parseInt(description[i].dataset.index);
            if(descriptionIndex===saveIndex){
                let toSave = description[i].value;
                console.log(description[i]);
                console.log(toSave);
                saveToLocal(toSave, saveIndex);
                return
            }
        }
    })
}

// saving data to local storage;
function saveToLocal(memo, index) {
    let data;
    let today = dayjs().format('DD/MM/YYYY');
    if(!localStorage.getItem(today)) data={}
    else data = JSON.parse(localStorage.getItem(today));
    data[index] = memo;
    localStorage.setItem(today, JSON.stringify(data));
}

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