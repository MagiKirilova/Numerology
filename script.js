// global
const formEl = document.querySelector('.form_num');
const resEl = document.querySelector('.res');
const resTextEl = document.querySelector('.res-text');
const resSectionEl = document.querySelector('.result');
const spinnerEl = document.querySelector('.lds-dual-ring');
const dayEl = document.querySelector('.day');
const monthEl = document.querySelector('.month');
const yearEl = document.querySelector('.year');

// check if the date is valid
const isDate = (day, month, year) => {
    let d = new Date(year, month - 1, day);
    return month == d.getMonth() + 1;
};

// input path number to html element resTextEl
const renderLifePathNumber = renderLifePathNumberItem => {

    resTextEl.textContent = renderLifePathNumberItem;
};

// on submit form event
formEl.addEventListener('submit', async (event) => {
    event.preventDefault(event);
    
    let dayForm = dayEl.value;
    let monthForm = monthEl.value;
    let yearForm = yearEl.value;

    
    if(isDate(dayForm, monthForm, yearForm)){
        spinnerEl.style.display = 'inline-block';
        resSectionEl.classList.remove('result--visible');

        // wait for 1.5 seconds
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // remove spinner
        spinnerEl.style.display = 'none';
        resSectionEl.classList.add('result--visible');

        // all values into one
        let bday = dayForm + monthForm + yearForm;
        // result = 0
        let res = 0;

        // we need the life path number, which is the sum of all the birthday numbers
        // and it is 1 digit long
        for(let i = 0; i < bday.length; i++){
            res = res + parseInt(bday[i]);
        };
        res = res % 9 || 9;
        resEl.textContent = res;

        // get the life path from local json file
        fetch('./data.json')
        .then(response => {
            if (!response.ok) {
                console.log('Something went wrong');
                renderLifePathNumber('Възникна проблем! Моля опитайте отново.');
                return;
            }

            return response.json();
        })
        .then(data => {
            // extract life path items
            const { path } = data;

            renderLifePathNumber(path[res]);
        })
        .catch(error => console.log(error)); 
    }else {
        window.alert('Грешна дата, моля опитайте пак!');

        // reset date of birth values
        dayEl.value = '';
        monthEl.value = '';
        yearEl.value = '';
    }
});