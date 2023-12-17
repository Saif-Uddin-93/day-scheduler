const containerEl = $("#container");

function addTimeBlock (hr=0){
    const row = $("<div>");
    containerEl.append(row);

    const timeBlock = $("<div>");
    timeBlock.addClass("time-block d-flex justify-content-center");

    const hourEl = $("<div>");
    hourEl.addClass("hour");
    let am_pm = dayjs().format('A');//dayjs().format('A')==="AM" ? "PM" : "AM"
    hourEl.text(()=>{
        let temp = parseInt(dayjs().format('h'))+hr
        if (temp>12) {
            temp = (parseInt(dayjs().format('h')))+hr-12
            am_pm = dayjs().format('A')==="AM" ? "PM" : "AM"
        } return `${temp}${am_pm}`
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

function buildRows(size = 1, index = 0) {
    if(index<size){
        containerEl.append(addTimeBlock(index))
        buildRows(size, index+1)
    }
}

buildRows(12)


























