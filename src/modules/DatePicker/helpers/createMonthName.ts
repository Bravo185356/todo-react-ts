export const createMonthName = function(year: number, monthIndex: number) {
    let monthName = new Date(year, monthIndex).toLocaleString('default', {month: 'long'})
    return monthName[0].toUpperCase() + monthName.slice(1)
}