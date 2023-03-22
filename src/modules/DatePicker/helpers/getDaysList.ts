export const getDaysList = function(year: number, monthIndex: number) {
    const days = []
    let maxDays = 35
    // const lastDayOfMonth = new Date(year, monthIndex + 1, 0).getDate()
    // День недели первого дня месяца
    let indexOfFirstDay = new Date(year, monthIndex, 1).getDay()
    let indexOfLastDay = new Date(year, monthIndex + 1, 0).getDate()
    // Если первый день месяца - воскресенье, то меняем ему индекс на 7
    // таким образом отрисовка начнётся с -5 (или 6 дней предыдущего месяца, т.к 0 это последний день предыдущего месяца)
    if(indexOfFirstDay === 0) {
        indexOfFirstDay = 7
    }
    if(indexOfFirstDay - 1 + indexOfLastDay > 35) {
        maxDays = 42
    }
    for(let i = 1; i <= maxDays; i++) {
        // Находим дни предыдущего месяца. Количество дней предыдущего месяца не может быть больше, чем
        // индекс первого дня текущего месяца
        if(i < indexOfFirstDay) {
            days.push({month: 'prev', day: new Date(year, monthIndex, 1 - indexOfFirstDay + i).getDate()})
        } else if(i > indexOfLastDay + indexOfFirstDay - 1) {
            days.push({month: 'next', day: new Date(year, monthIndex, 1 - indexOfFirstDay + i).getDate()})
        } else {
            days.push({month: 'curr', day: new Date(year, monthIndex, 1 - indexOfFirstDay + i).getDate()})
        }
    }
    return days
}