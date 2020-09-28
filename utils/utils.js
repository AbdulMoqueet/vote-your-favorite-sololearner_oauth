const ezLocalTime = require('ez-local-time');

module.exports.getDateTime = () => {
    const dateTime = ezLocalTime('Asia/Kolkata');

    const day =  dateTime.date.split('/');
    
    const formattedDate = 
    `${day[1] < 10 ? '0' + day[1]  : day[1] }-${dateTime.month.substring(0,3)}-${day[2]}`;

    return `${formattedDate} | ${dateTime.time}`;
}