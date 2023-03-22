export const getYearsList = function() {
    const currentYear = new Date().getFullYear()
    const yearsList = []
    for(let i = currentYear; i <= currentYear + 15; i++) {
        yearsList.push(i)
    }
    return yearsList
}