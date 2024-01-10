const containerEl = $("#container");
//const today = new Date();
//const HOUR = today.getHours();
/* function am_pmFunc(hour)
{
    if(hour<12){return "AM"} else {return "PM"}
} */
let am_pm = "AM"

// creates each row for per hour
function addTimeBlock (type="", hr=0, index=hr){
    
    // contains the hour, description and save button for each row
    const timeBlock = $("<div>");
    timeBlock.addClass("time-block d-flex justify-content-center");
    containerEl.append(timeBlock);
    
    // displays hour and AM/PM
    const hourEl = $("<div>");
    hourEl.addClass("hour");

    // changes AM/PM
    if (hr<12)am_pm="AM"
    if (type===scheduleType.now && hr<12) am_pm = dayjs().format("A");
    while(hr>12)
    {hr=hr-12}
    hourEl.text(()=>{
        let hour = parseInt(dayjs().format('h'))+hr;
        hour = hr || 12;
        if (hour===12 && hr !== 0) am_pm = am_pm==="AM"?"PM":"AM"
        return `${hr||12}${am_pm}`
    });
    timeBlock.append(hourEl);

    // variable to keep track of the hour from the start of the day
    let dataIndex = index;
    console.log(dataIndex)
    if(type === scheduleType.now && dayjs().format("A") ==="PM") {dataIndex = dataIndex+12;}
    
    // textarea input for user to add information
    const descriptionEl = $("<textarea>");
    descriptionEl.attr("id", "description "+dataIndex);
    descriptionEl.addClass("description");
    descriptionEl.attr("data-index", dataIndex);
    descriptionEl.text("Add memo");
    timeBlock.append(descriptionEl);
    
    // save button to save memo with associated hour and date to local storage.
    const saveEl = $("<button>");
    saveEl.addClass("save-btn");
    saveEl.attr("data-index", dataIndex);
    saveEl.text("SAVE");
    timeBlock.append(saveEl);

    return timeBlock
}

// tail-recursive loop to build rows of hours
function buildRows(type, index=0, startTime=0) {
    if(index < hours(type)){
        switch(type){
            case scheduleType.business:
                // start time at 9AM
                startTime=9;
                break;
            case scheduleType.now:
                // start time at the current hour in the day
                const dayJsHour = parseInt(dayjs().format('h'));
                startTime=dayJsHour;
                break;
            default:
                break;
        }
        containerEl.append(addTimeBlock(type, index+startTime))
        // build next row and increment index
        buildRows(type, index+1)
    }
}

// schedule types
const scheduleType = {
    business:"business",
    day:"day",
    now:"now",
}

// determines how many hours to load according to the chosen schedule
function hours (schedule){
    const hoursInDay = 24;
    // Subtract from 24 depending on, if PM, add 12 to the hour returned by dayjs, else, if AM return the hour as is from dayjs. If 12AM, return 24
    let remainingHours = /* parseInt($("#hours").val()) || */ hoursInDay - (dayjs().format("A") ==="PM" ? parseInt(dayjs().format('h')) + 12 : parseInt(dayjs().format('h'))) || 24;
    if (schedule == scheduleType.day /* && !parseInt($("#hours").val()) */) remainingHours = 24;
    if (schedule == scheduleType.business /* && !parseInt($("#hours").val()) */) remainingHours = 9;
    //console.log(remainingHours);
    return remainingHours;
};

// initialise with business hours when page is refreshed or loads for the first time.
buildRows(scheduleType.business);