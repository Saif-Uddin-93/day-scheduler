const containerEl = $("#container");
//const today = new Date();
//const HOUR = today.getHours();
/* function am_pmFunc(hour)
{
    if(hour<12){return "AM"} else {return "PM"}
} */
let am_pm = "AM"

function addTimeBlock (type="", hr=0, index=hr){
    const row = $("<div>");
    containerEl.append(row);
    
    const timeBlock = $("<div>");
    timeBlock.addClass("time-block d-flex justify-content-center");
    
    const hourEl = $("<div>");
    hourEl.addClass("hour");

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
    
    const descriptionEl = $("<textarea>");
    descriptionEl.attr("id", "description "+dataIndex);
    descriptionEl.addClass("description");
    descriptionEl.attr("data-index", dataIndex);
    descriptionEl.text("Add memo");
    timeBlock.append(descriptionEl);
    
    const saveEl = $("<button>");
    saveEl.addClass("save-btn");
    saveEl.attr("data-index", dataIndex);
    saveEl.text("SAVE");
    timeBlock.append(saveEl);

    row.append(timeBlock)
    return row
}

function buildRows(type="", time=1, index = 0, startTime=0) {
    if(index<hours(type)){
        switch(type){
            case scheduleType.business:
                startTime=9;
                //hours = 9;
                break;
            case scheduleType.now:
                const dayJsHour = parseInt(dayjs().format('h'));
                startTime=dayJsHour;
                break;
            default:
                break;
        }
        containerEl.append(addTimeBlock(type, index+startTime))
        // build next row and increment index
        buildRows(type, hours(type), index+1)
    }
}

const scheduleType = {
    business:"business",
    day:"day",
    now:"now",
}

function hours (schedule){
    let remainingHours = /* parseInt($("#hours").val()) || */ 24 - (dayjs().format("A") ==="PM" ? parseInt(dayjs().format('h')) + 12 : parseInt(dayjs().format('h')))
    if (schedule == scheduleType.day /* && !parseInt($("#hours").val()) */) remainingHours = 24;
    if (schedule == scheduleType.business /* && !parseInt($("#hours").val()) */) remainingHours = 9;
    console.log(remainingHours);
    return remainingHours;
};

buildRows(scheduleType.business);