export const getHoursList = function() {
    const hours = []
    for(let i = 0; i < 24; i++) {
        if(i < 10) {
            hours.push(`0${i}:00`)
        } else {
            hours.push(`${i}:00`)
        }
    }
    return hours
}