const ezLocalTime = require('ez-local-time');

module.exports.getDateTime = () => {
    const dateTime = ezLocalTime('Asia/Kolkata');
    return `${dateTime.date} | ${dateTime.time}`;
}