$("#datepicker").datepicker({
    dateFormat: "dd/mm/yy"
});
let customDate = ()=> {
    let year = dayjs().format("YYYY");
    let month = dayjs().format("MM");
    let day = dayjs().format("DD");
    let date = $("#datepicker").val();
    return !date ? year+month+day : date.substring(6,10)+date.substring(3,5)+date.substring(0,2);
};

addSaveBtnEvent();
// add event listener. save day description with correct index
//let toSave;
function addSaveBtnEvent(){
    $('.save-btn').on('click', (eventObj)=>{
        console.log("save");
        const saveIndex = parseInt(eventObj.target.dataset.index);
        const description = $(".description");
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
        const description = $(".description");
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
    //console.log($("#hours").val());
    
    console.log("remaining hours: "+hours(schedule))
    
    // load selected schedule or default to business schedule
    if(!schedule){
        schedule = scheduleType.business;
    }
    containerEl.html('');
    buildRows(scheduleType[schedule], hours(schedule));
    addSaveBtnEvent();
    // by default, load save data. default date is for current day.
    loadFromLocal(customDate());
    colourCode(customDate())
};

colourCode(customDate())
function colourCode(date) {
    const presentHour = dayjs().format("h");
    const presentAMPM = dayjs().format("A");
    const displayedHours = $(".hour");
    const displayedDescription = $(".description");
    console.log(parseInt(dayjs().format('YYYYMMDD')));
    console.log(parseInt(date));
    if(date === dayjs().format('YYYYMMDD')){
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
    else if (parseInt(date) < parseInt(dayjs().format('YYYYMMDD'))){
        for(let i=0; i<displayedHours.length; i++) displayedDescription[i].classList.add("past");
    }
    else if (parseInt(date) > parseInt(dayjs().format('YYYYMMDD'))){
        for(let i=0; i<displayedHours.length; i++) displayedDescription[i].classList.add("future");
    }
}

$("#currentDay").html("Today is: " + dayjs().format("dddd") + "<br>" + dayjs().format(dayjs().format('DD/MM/YYYY')));