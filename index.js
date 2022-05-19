// Your code here
function createEmployeeRecord(employee) {
    let empRecord = {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []        
    };
    return empRecord;
}

function createEmployeeRecords(employees) {
    return employees.map((employee) => createEmployeeRecord(employee));
}

function createTimeInEvent(employeeRecord, stamp) {
    let [date, time] = stamp.split(' ');
    let clockIn = {
        type: 'TimeIn',
        hour: parseInt(time),
        date: date
    }
    employeeRecord.timeInEvents.push(clockIn);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, stamp) {
    let [date, time] = stamp.split(' ');
    let clockOut = {
        type: 'TimeOut',
        hour: parseInt(time),
        date: date
    }
    employeeRecord.timeOutEvents.push(clockOut);
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, stamp) {
    let clockIn = employeeRecord.timeInEvents.find((timeIn) => timeIn.date == stamp);
    let clockOut = employeeRecord.timeOutEvents.find((timeOut) => timeOut.date == stamp);
    return(clockOut.hour - clockIn.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, stamp) {
    return hoursWorkedOnDate(employeeRecord, stamp) * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
    let hoursWorked = [];
    for (let each of employeeRecord.timeInEvents) {
        let daysWages = wagesEarnedOnDate(employeeRecord, each.date);
        hoursWorked.push(daysWages);
    }
    return hoursWorked.reduce((total, num) => total + num);
}

function calculatePayroll(employeeRecord) {
    let employeeWages = [];
    for (let employee of employeeRecord) {
        employeeWages.push(allWagesFor(employee));
    }
    return employeeWages.reduce((total, num) => total + num);
}