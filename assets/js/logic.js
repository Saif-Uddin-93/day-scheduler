$("#datepicker").datepicker({
    dateFormat: "dd/mm/yy"
});
let customDate = ()=> {
    let date = $("#datepicker").val();
    return !date ? dayjs().format('DD/MM/YYYY') : date;
};

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
                console.log(customDate());
                saveToLocal(toSave, saveIndex, customDate());
                return
            }
        }
    })
}

loadFromLocal(dayjs().format('DD/MM/YYYY'));
function loadFromLocal(customDate){
    // get correct key. current date.
    //let today// = dayjs().format('DD/MM/YYYY');
    // if there's any saved data for today.
    if(localStorage.getItem(customDate)){
        console.log(`today exists`, customDate);
        let data = JSON.parse(localStorage.getItem(customDate));
        dataKeys = Object.keys(data);
        dataValues = Object.values(data);
        let dataIndex=0;
        const description = document.querySelectorAll(".description");
        console.log(description.length)
        console.log(dataKeys[dataIndex], "not found yet")
        // loop through length of stored data
        for(let i=0; i<description.length; i++){
            if(parseInt(description[i].dataset.index)===parseInt(dataKeys[dataIndex])){
                console.log(dataKeys[dataIndex], "found")
                description[i].textContent = dataValues[dataIndex];
                dataIndex++;
                if (dataIndex===dataKeys.length)return
            }
        }
    }
    // if there's no saved data for custom date.
    else {
        console.log(`no saved data for custom date`);
    }
}

// saving data to local storage;
function saveToLocal(memo, index, date=dayjs().format('DD/MM/YYYY')) {
    let data;
    //let today = dayjs().format('DD/MM/YYYY');
    if(!localStorage.getItem(date)) data={}
    else data = JSON.parse(localStorage.getItem(date));
    data[index] = memo;
    localStorage.setItem(date, JSON.stringify(data));
}

// get schedule from dropdown list
let schedule;
$('.dropdown-item').on('click', function (eventObj){
    $("#dropdownMenuButton").text(eventObj.target.textContent);
    schedule = eventObj.target.dataset.type;
});

// load selected schedule with hours
//$('.submit').on('click', submit())
$('.submit').on('click', ()=>{
    submit();
})
function submit (){
    console.log("clicked!")
    console.log("schedule:", schedule)
    console.log($("#hours").val());
    const hours = ()=>{
        let remainingHours = parseInt($("#hours").val()) || 24 - (dayjs().format("A") ==="PM" ? parseInt(dayjs().format('h')) + 12 : parseInt(dayjs().format('h')))
        if (schedule == scheduleType.day && !parseInt($("#hours").val())) remainingHours = 24;
        return remainingHours;
    };
    console.log("remaining hours: "+hours())
    
    // load selected schedule or default to business schedule
    if(!schedule){
        schedule = scheduleType.business;
    }
    containerEl.html('');
    buildRows(scheduleType[schedule], hours());
    addSaveBtnEvent();
    
    // by default, load save data. default date is for current day.
    loadFromLocal(customDate());
};
colourCode()
function colourCode() {
    // date, hour and am/pm needs to match
    const presentHour = dayjs().format("h");
    const presentAMPM = dayjs().format("A");
    const displayedHours = $(".hour");
    const displayedDescription = $(".description");
    console.log(presentHour+presentAMPM);
    let present;
    for(let i=0; i<displayedHours.length; i++){
        if(displayedHours[i].textContent !== presentHour+presentAMPM && present
            ===undefined){
            displayedDescription[i].classList.add("past");
        }
        if(displayedHours[i].textContent === presentHour+presentAMPM){
            displayedDescription[i].classList.add("present");
            present=i;
        }
        if(displayedHours[i].textContent !== presentHour+presentAMPM && present!==undefined){
            displayedDescription[i].classList.add("future");
        }
    }
}