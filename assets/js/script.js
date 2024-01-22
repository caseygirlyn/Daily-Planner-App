let currentDay = $('#currentDay');
let ordinalDate = getOrdinal(dayjs().format('D'));
let today = dayjs().format('dddd, MMMM D');
let container = $('.container');
let startDate = dayjs().format('YYYY-MM-DD');
let startTime = dayjs(startDate + ' 9');

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

// Loop for standard business hours

for (let index = 0; index <= 8; index++) {
    rowSchedule = `
        <div class="row g-0">
            <div class="col-lg-1 col-xs-12 border-dashed d-lg-grid align-content-center p-3 text-lg-end text-center">
                ${startTime.format('hA')}
            </div>
            <div class="col-lg-10 col-xs-12 p-2">
            <textarea class="form-control bg-transparent border-0 shadow-none" id="textArea" required></textarea>
            </div>
            <div class="col-lg-1 col-xs-12">
                <button type="button" class="w-100 h-100 saveBtn border-0 py-4 mt-2 mt-lg-0"><i
                class="bi bi-floppy2-fill white-text"></i></button>
            </div>
        </div>`;
    startTime = startTime.add(1, 'hour');
    container.append(rowSchedule);
}