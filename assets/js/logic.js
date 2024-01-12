$("#datepicker").datepicker({
    // JQuery UI element. Display date in UK format.
    dateFormat: "dd/mm/yy"
});
let customDate = ()=> {
    let year = dayjs().format("YYYY");
    let month = dayjs().format("MM");
    let day = dayjs().format("DD");
    let date = $("#datepicker").val();
    // store date as year, month, day to make it easier to check for past and future dates.
    // if date not selected in the calendar, default to today's date.
    return !date ? year+month+day : date.substring(6,10)+date.substring(3,5)+date.substring(0,2);
};

addSaveBtnEvent();
// add event listener. save day description with correct index
function addSaveBtnEvent(){
    $('.save-btn').on('click', (eventObj)=>{
        console.log("save");
        const saveIndex = parseInt(eventObj.target.dataset.index);
        const description = $(".description");
        // loop until reached the correct index assciated with save button is found
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

loadFromLocal(customDate());
function loadFromLocal(saveInfo){
    // get correct key. current date.
    //let today// = dayjs().format('DD/MM/YYYY');
    // if there's any saved data for today.
    if(localStorage.getItem(saveInfo)){
        console.log(`saved info exists`, saveInfo);
        let data = JSON.parse(localStorage.getItem(saveInfo));
        dataKeys = Object.keys(data);
        dataValues = Object.values(data);
        const description = $(".description");
        console.log(description[0].dataset.index);
        // loop through length of stored data
        for(let i=0; i<description.length; i++){
            let dataIndex = dataKeys.indexOf(description[i].dataset.index)
            console.log(parseInt(description[i].dataset.index), parseInt(dataKeys[dataIndex]))
            if(parseInt(description[i].dataset.index)===parseInt(dataKeys[dataIndex])){
                console.log(dataKeys[dataIndex], "found")
                description[i].textContent = dataValues[dataIndex];
            }
        }
    }
    // if there's no saved data for custom date.
    else {
        console.log(`no saved data for ${customDate()}`);
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
    console.log("submitted!")
    console.log("schedule:", schedule)
    //console.log($("#hours").val());
    
    console.log("remaining hours: "+hours(schedule))
    
    // load selected schedule or default to business schedule
    if(!schedule){
        schedule = scheduleType.business;
    }
    // clear rows of hours
    containerEl.html('');
    // populate rows with hours of selected schedule
    buildRows(scheduleType[schedule]);
    // add save button event listener to recreated elements
    addSaveBtnEvent();
    // by default, load save data. default date is for current day.
    loadFromLocal(customDate());
    // add colour classes to rows representing past, present & future hours
    colourCode(customDate())
};
let track=0; // keep track of number of times function is called
//colourCode(customDate())
function colourCode(date) {
    track++;
    console.log(track);
    const presentHour = dayjs().format("h");
    const presentAMPM = dayjs().format("A");
    const displayedHours = $(".hour"); // all hours on page
    const displayedDescriptions = $(".description"); // all descriptions on page
    // apply colour classes for schedules in the current day.
    if(date === dayjs().format('YYYYMMDD')){
        console.log(presentHour+presentAMPM);
        let present;
        // loop through all hours on page
        for(let i=0; i<displayedHours.length; i++){
            // if hour & AM/PM doesn't match with present hour & AM/PM, and present has not yet been defined, add "past" class
            if(displayedHours[i].textContent !== presentHour+presentAMPM && present===undefined){
                displayedDescriptions[i].classList.add("past");
            }
            // if hour & AM/PM matches with present hour & AM/PM, add "present" class
            if(displayedHours[i].textContent === presentHour+presentAMPM){
                displayedDescriptions[i].classList.add("present");
                // define present
                present=i;
            }
            // if hour & AM/PM doesn't match with present hour & AM/PM, and present has been defined, add "future" class
            if(displayedHours[i].textContent !== presentHour+presentAMPM && present!==undefined){
                displayedDescriptions[i].classList.add("future");
            }
        }
    }
    // else if date is less than the present date, apply "past" class
    else if (parseInt(date) < parseInt(dayjs().format('YYYYMMDD'))){
        for(let i=0; i<displayedHours.length; i++) displayedDescriptions[i].classList.add("past");
    }
    // else if date is greater than the present date, apply "future" class
    else if (parseInt(date) > parseInt(dayjs().format('YYYYMMDD'))){
        for(let i=0; i<displayedHours.length; i++) displayedDescriptions[i].classList.add("future");
    }
}

// display current date on the page.
$("#currentDay").html("Today is: " + dayjs().format("dddd") + "<br>" + dayjs().format(dayjs().format('DD/MM/YYYY')));

// gets called every new hour
updateLoop(colourCode(customDate())); //colour code updates the classes for past/present/future hours
function updateLoop(){
    const minsInHour = 60; //60 minutes
    const secsInMin = 60; //60 seconds
    const secsInHour = secsInMin*minsInHour; //seconds in an hour
    const currentMin = parseInt(dayjs().format(`mm`)); // minute of the current time
    const currentSec = parseInt(dayjs().format(`ss`)); // second of the current time
    const remainingSecs = ((minsInHour - currentMin) * secsInMin)-currentSec // remaining seconds until the next hour.
    console.log(`${remainingSecs} until Timeout cb is called`);
    setTimeout(()=>{
        console.log("callback is being called");
        colourCode(customDate());
        setInterval(() => {
            console.log("callback is being called");
            colourCode(customDate());
        }, secsInHour*1000);
    }, remainingSecs*1000)
}
