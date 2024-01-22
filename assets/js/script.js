let currentDay = $('#currentDay');
let ordinalDate = getOrdinal(dayjs().format('D'));
let today = dayjs().format('dddd, MMMM D');
currentDay.text(today + ordinalDate);
function getOrdinal(n) {
    let ord = 'th';
    if (n % 10 == 1 && n % 100 != 11) {
        ord = 'st';
    }
    else if (n % 10 == 2 && n % 100 != 12) {
        ord = 'nd';
    }
    else if (n % 10 == 3 && n % 100 != 13) {
        ord = 'rd';
    }
    return ord;
}