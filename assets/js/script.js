const containerEl = $("#container");

function addTimeBlockFromNow (hr=0){
    hr = hr>12 ? hr-12 : hr;
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
        } return `${hour}${am_pm}`
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

function addTimeBlock (hr=1){
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
        } return `${hr}${am_pm}`
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

function buildRows(size = 1, cb="", index = 0) {
    if(index<size){
        switch(cb){
            case "addTimeBlockFromNow":
                containerEl.append(addTimeBlockFromNow(index))
                break;
            case "addTimeBlock":
                containerEl.append(addTimeBlock(index))
                break;            
            default:
                //containerEl.append(addTimeBlock(index))
                break;
        }
        buildRows(size, cb, index+1)
    }
}

//buildRows(24, "addTimeBlockFromNow")
buildRows(24, "addTimeBlock")