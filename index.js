let dataEmployees = [
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Darcey", "Lewis", "Intern", 15],
    ["Jarvis", "Stark", "CIO", 125],
    ["Anthony", "Stark", "Angel Investor", 300],
    ["Byron", "Poodle", "Mascot", 3],
    ["Julius", "Caesar", "General", 27],
    ["Rafiki", "", "Aide", 10],
    ["Simba", "", "King", 100]
  ]

//   const csvTimesIn = [
//     ["Thor", ["2018-01-01 0800", "2018-01-02 0800", "2018-01-03 0800"]],
//     ["Loki", ["2018-01-01 0700", "2018-01-02 0700", "2018-01-03 0600"]],
//     ["Natalia", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1300"]],
//     ["Darcey", ["2018-01-01 0700", "2018-01-02 0800", "2018-01-03 0800"]],
//     ["Jarvis", ["2018-01-01 0500", "2018-01-02 0500", "2018-01-03 0500"]],
//     ["Anthony", ["2018-01-01 1400", "2018-01-02 1400", "2018-01-03 1400"]]
//   ]

let objectEmployees = []


function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(data) {
    return data.map(data => createEmployeeRecord(data))
}

function createTimeInEvent(employee, date) {
    let newDate = date.split(' ') 
    employee.timeInEvents.push({
        type: 'TimeIn',
        hour: +newDate[1],
        date: newDate[0]
    })
    return employee
}

function createTimeOutEvent(employee, date) {
    let newDate = date.split(' ')
    employee.timeOutEvents.push({
        type: 'TimeOut',
        hour: +newDate[1],
        date: newDate[0]
    })
    return employee
}

function hoursWorkedOnDate(employee, checkDate) {
    let timeIn = employee.timeInEvents.find(element => element.date === checkDate)
    let timeOut = employee.timeOutEvents.find(element => element.date === checkDate)
    const hoursWorked = timeOut.hour - timeIn.hour
    return hoursWorked / 100
}


function wagesEarnedOnDate(employee, date) {
    const earnings = hoursWorkedOnDate(employee, date) * employee.payPerHour
    return earnings 
}

function allWagesFor(employee) {
    let totalSum =0
    for(let i = 0; i < employee.timeInEvents.length; i++){
        currentHours = employee.timeOutEvents[i].hour - employee.timeInEvents[i].hour
        totalSum += currentHours
    }
    console.log(totalSum / 100) *employee.payPerHour
    return (totalSum / 100) * employee.payPerHour
}


function calculatePayroll(employee) {
    totalPay = 0
    for(let i = 0; i < allWagesFor(employee); i++){
        totalPay += wagesEarnedOnDate(employee, employee.timeInEvents[i].date)
        console.log(totalPay)
    }
}

createEmployeeRecord(dataEmployees)
