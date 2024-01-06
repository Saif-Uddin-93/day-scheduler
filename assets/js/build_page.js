const containerEl = $("#container");
//const today = new Date();
//const HOUR = today.getHours();
/* function am_pmFunc(hour)
{
    if(hour<12){return "AM"} else {return "PM"}
} */
let am_pm = dayjs().format("A");

function addTimeBlock (type="", hr=0, index=hr){
    const row = $("<div>");
    containerEl.append(row);
    
    const timeBlock = $("<div>");
    timeBlock.addClass("time-block d-flex justify-content-center");
    
    const hourEl = $("<div>");
    hourEl.addClass("hour");

    if (type!==scheduleType.now && hr<12)am_pm="AM" ////////////////////////
    while(hr>12)
    {hr=hr-12}
    hourEl.text(()=>{
        let hour = parseInt(dayjs().format('h'))+hr;
        if(type!==scheduleType.now) hour = hr || 12;
        while(hour>12) hour=hour-12
        if (hour===12 && hr !== 0) am_pm = am_pm==="AM"?"PM":"AM" /////////
        hr=type===scheduleType.now?hour:hr
        return `${hr||12}${am_pm}`
    });
    timeBlock.append(hourEl);

    // variable to keep track of the hour from the start of the day
    let dataIndex = index;
   
    if (type===scheduleType.now && am_pm == "AM") {
        dataIndex = index + parseInt(dayjs().format('h'));
    }
    if (type===scheduleType.now && am_pm == "PM") { 
        dataIndex = index + parseInt(dayjs().format('h')) + 12;
    }
    
    const descriptionEl = $("<textarea>");
    descriptionEl.addClass("description");
    descriptionEl.attr("data-index", dataIndex);
    descriptionEl.text("DESCRIPTION");
    timeBlock.append(descriptionEl);
    
    const saveEl = $("<button>");
    saveEl.addClass("save-btn");
    saveEl.attr("data-index", dataIndex);
    saveEl.text("SAVE");
    timeBlock.append(saveEl);

    row.append(timeBlock)
    return row
}

function buildRows(type="", hours=1, index = 0) {
    if(index<hours){
        switch(type){
            case scheduleType.business:
                const startTime=9;
                hours = startTime;
                containerEl.append(addTimeBlock(type, index+startTime))
                break;
            default:
                containerEl.append(addTimeBlock(type, index))
                break;
        }
        // build next row and increment index
        buildRows(type, hours, index+1)
    }
}

const scheduleType = {
    business:"business",
    day:"day",
    now:"now",
}

buildRows(scheduleType.business);