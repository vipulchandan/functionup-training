function printDate() {
    console.log(new Date().toDateString());
}

function printMonth() {
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    console.log(month[new Date().getMonth()]);
}

function getBatchInfo() {
    const bacthName = "Tecnetium";
    const week = "W5D1";
    const topic = "Nodejs module system";
    console.log(`${bacthName}, ${week}, the topic for today is ${topic}`)
}

module.exports = { printDate, printMonth, getBatchInfo }