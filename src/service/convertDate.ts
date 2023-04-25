export function convertDate(time: string) {
    return time!.split(",")[0].split(".").reverse().join("-") + "T" + time!.split(" ")[1];
}