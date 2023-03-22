export const getMonthList = function(year: number) {
    const months = []
    for(let i = 0; i <= 11; i++) {
        months.push(new Date(year, i).toLocaleString('default', {month: 'long'}))
    }
    return months
}