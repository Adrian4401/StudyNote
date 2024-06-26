export const createDate = () => {
    var day = (new Date().getDate()).toString().padStart(2, '0');
    var month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    var year = new Date().getFullYear();

    var todayDate = day + '.' + month + '.' + year;

    return todayDate;
}