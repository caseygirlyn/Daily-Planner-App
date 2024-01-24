let currentDay = $('#currentDay');
let today = dayjs().format('dddd, MMMM Do');
let container = $('.container');
let startDate = dayjs().format('YYYY-MM-DD');
let startTime = dayjs(startDate + ' 9');
let currentTime = dayjs();
let hourlySchedule = JSON.parse(window.localStorage.getItem('hourlySchedule')) || [];
let cssClass = '';
let rowSchedule;
let alertMsg = `<div id="alert" class="alert alert-danger alert-dismissible fade show my-2 text-center" role="alert">
<i class="bi bi-exclamation-triangle-fill me-2"></i>Event is required. Please add your event in the timeblock.<button type="button" class="btn-close p-3" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;

currentDay.text(today);

// Loop for standard business hours
for (let index = 0; index <= 8; index++) {
    if (startTime.format('YYYY-MM-DD hA') == currentTime.format('YYYY-MM-DD hA')) {
        cssClass = 'present';
    } else if (currentTime.format('YYYY-MM-DDTHH:mm:ssZ[Z]') > startTime.format('YYYY-MM-DDTHH:mm:ssZ[Z]')) {
        cssClass = 'past';
    } else if (currentTime.format('YYYY-MM-DDTHH:mm:ssZ[Z]') < startTime.format('YYYY-MM-DDTHH:mm:ssZ[Z]'))  {
        cssClass = 'future';
    }

    rowSchedule = `
        <div class="row g-0">
            <div class="col-lg-1 col-xs-12 border-dashed d-lg-grid align-content-center p-3 text-lg-end text-center">
                ${startTime.format('hA')}
            </div>
            <div class="col-lg-10 col-xs-12 p-2 ${cssClass}">
            <textarea class="form-control bg-transparent border-0 shadow-none" id="textArea${index}" required></textarea>
            </div>
            <div class="col-lg-1 col-xs-12">
                <button type="button" class="w-100 h-100 saveBtn border-0 mt-2 mt-lg-0"><i
                class="bi bi-floppy2-fill white-text w-100 h-100 py-4 d-grid align-items-center"></i></button>
            </div>
        </div>`;
    cssClass = '';
    startTime = startTime.add(1, 'hour');
    container.append(rowSchedule);
}


//Save the event in local storage when the save button is clicked in that timeblock.
container.on('click', '.saveBtn', function (event) {
    event.preventDefault();
    let textAreaEl = $(event.target).parent().parent().siblings().eq(1).children();
    let textAreaVal = textAreaEl.val();
    let textAreaID = textAreaEl.attr('id');
    
    // let arrayIndex = textAreaID[8];
    // console.log(hourlySchedule[arrayIndex]);

    if (textAreaVal !== '' && event.target) {
        let saveSchedule = { textAreaID: textAreaID, textAreaVal: textAreaVal };
        hourlySchedule.push(saveSchedule);
        window.localStorage.setItem('hourlySchedule', JSON.stringify(hourlySchedule));
        $('#saveSuccess').modal('show');
    }else {
        $('.container-lg').html(alertMsg);
    }
});

// Persist events between refreshes of a page
function displaySchedule() {
    hourlySchedule.forEach(function (sched) {
        let textAreaIndex = sched.textAreaID;
        let textAreaVal = sched.textAreaVal;
        $('#' + textAreaIndex).val(textAreaVal);
    });
    if(hourlySchedule.length > 0){
        container.append(`<div class="mt-4 text-center"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="clearBtn">Clear Schedule</button></div>`)
    }
}
displaySchedule();

// Reload the page when user closes the modal
$('#closeModal').on('click', function () {
    location.reload();
});

// Additional feature: Clear event(s) from local storage
container.on('click', '#clearBtn', function (event) {
    event.preventDefault();
    localStorage.clear();
    location.reload();
});