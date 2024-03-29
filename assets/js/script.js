let currentDay = $('#currentDay');
let container = $('.container');
let businessDate = dayjs().format('YYYY-MM-DD');
let businessHour = dayjs(businessDate + ' 9');
let currentTime = dayjs();
let cssClass = '';
let lsData = 0;

currentDay.text(dayjs().format('dddd, MMMM Do'));

// Loop for standard business hours
for (let index = 0; index <= 8; index++) {
    if (currentTime.format('YYYY-MM-DD hA') === businessHour.format('YYYY-MM-DD hA')) {
        cssClass = 'present';
    } else if (currentTime.format('YYYY-MM-DDTHH:mm:ssZ[Z]') > businessHour.format('YYYY-MM-DDTHH:mm:ssZ[Z]')) {
        cssClass = 'past';
    } else if (currentTime.format('YYYY-MM-DDTHH:mm:ssZ[Z]') < businessHour.format('YYYY-MM-DDTHH:mm:ssZ[Z]')) {
        cssClass = 'future';
    }

    let storedText = localStorage.getItem(`${businessHour.format('hA')}`);
    if (storedText === null) {
        storedText = '';
    } else {
        lsData++;
    }
    let rowSchedule = `
        <div class="row g-0">
            <div class="col-lg-1 col-xs-12 border-dashed d-lg-grid align-content-center p-3 text-lg-end text-center">${businessHour.format('hA')}</div>
            <div class="col-lg-10 col-xs-12 p-2 ${cssClass}">
            <textarea class="form-control bg-transparent border-0 shadow-none" id="event${businessHour.format('hA')}" required >${storedText}</textarea>
            </div>
            <div class="col-lg-1 col-xs-12">
                <button type="button" class="w-100 h-100 saveBtn border-0 mt-2 mt-lg-0"><i
                class="bi bi-floppy2-fill white-text w-100 h-100 py-4 d-grid align-items-center"></i></button>
            </div>
        </div>`;

    cssClass = '';
    businessHour = businessHour.add(1, 'hour');
    container.append(rowSchedule);
}

if (lsData > 0) {
    container.append(`<div class="mt-4 text-center"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="clearBtn">Clear Schedule</button></div>`);
}

//Save the event in local storage when the save button is clicked in that timeblock.
container.on('click', '.saveBtn', function (event) {
    event.preventDefault();
    let textAreaEl = $(event.target).parent().parent().siblings().eq(1).children();
    let blockTime = $(event.target).parent().parent().siblings().eq(0).text();
    let textAreaVal = textAreaEl.val();

    if (textAreaVal !== '' && event.target) {
        localStorage.setItem(blockTime, textAreaVal);
        $('#saveSuccess').modal('show');
    } else {
        let alertMsg = `<div id="alert" class="alert alert-danger alert-dismissible fade show my-2 text-center" role="alert">
<i class="bi bi-exclamation-triangle-fill me-2"></i>Event is required. Please add your event in the timeblock.<button type="button" class="btn-close p-3" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;
        $('.container-lg').html(alertMsg);
    }
});

// Additional feature: Clear event(s) from local storage
container.on('click', '#clearBtn', function (event) {
    event.preventDefault();
    localStorage.clear();
    location.reload();
});