const containerEl = $("#container");

function addTimeBlock (hr=0, type=""){
    hr = hr>12 ? hr-12 : hr || 12;
    
    const row = $("<div>");
    containerEl.append(row);

    const timeBlock = $("<div>");
    timeBlock.addClass("time-block d-flex justify-content-center");

    const hourEl = $("<div>");
    hourEl.addClass("hour");
    let am_pm = dayjs().format('A');
    hourEl.text(()=>{
        let hour = parseInt(dayjs().format('h'))+hr
        if (hour>12) {
            hour = hour-12
            am_pm = dayjs().format('A')==="AM" ? "PM" : "AM"
        }
        hr=type==="now"?hour:hr
        return `${hr}${am_pm}`
    });
    timeBlock.append(hourEl);

    const descriptionEl = $("<textarea>");
    descriptionEl.addClass("description");
    descriptionEl.text("DESCRIPTION");
    timeBlock.append(descriptionEl);

    const saveEl = $("<button>");
    saveEl.addClass("saveBtn");
    saveEl.text("SAVE");
    timeBlock.append(saveEl);

    row.append(timeBlock)
    return row;
}

function buildRows(type="", hours = 1, index = 0) {
    hours = parseInt(hours) || 1;
    if(index<hours){
        switch(type){           
            case scheduleType.business:
                containerEl.append(addTimeBlock(index+9, type))
                hours=9;
                break;            
            default:
                containerEl.append(addTimeBlock(index, type))
                break;
        }
        buildRows(type, hours, index+1)
    }
}

scheduleType = {
    business:"business",
    day:"day",
    now:"now",}

buildRows(scheduleType.business, 24)