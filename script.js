
const HOURS_PER_WORKDAY = 9;
const START_OF_WORKDAY_HOUR = 9;

// Create variables to add the current date and day of the week ...
var today = moment();
$("#currentDay").text(today.format('dddd MMMM Do YYYY'));

const containerEl = document.querySelector(".container");
const templateHtml = containerEl.innerHTML;

// Start at index 1, so we can leave the first templateHtml innerHTML
// where it was, but duplicate it for all the remaining HOURS_PER_WORKDAY.
for (let i = 1; i < HOURS_PER_WORKDAY; i += 1) {
  containerEl.innerHTML += templateHtml;
}

const hourEls = document.getElementsByClassName("hour");
const descriptionEls = document.getElementsByClassName("description");
const saveButtonEls = document.getElementsByClassName("saveBtn");

// First assume all descriptions for each hour are empty '' ...
var hourDescriptions = Array(HOURS_PER_WORKDAY).fill('');

// Try to read my 'hourDescriptions' from localStorage.
// If it comes back as null, just leave it as the default above.
// hourDescriptions[] will always be an accurate representation
// of what I want to keep in localStorage.

// https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage
var hourDescriptionsStr = localStorage.getItem('hourDescriptions');
if (hourDescriptionsStr) {
  // Assume this hourDescriptionStr contains a stringified version of
  // what the hourDescriptons[] array should be ...
  hourDescriptions = JSON.parse(hourDescriptionsStr);
}

function saveHourDescription(hourIndex, description) {
  console.log(`saveHourDesciption(${hourIndex}, "${description}")`);
  hourDescriptions[hourIndex] = description;
  localStorage.setItem('hourDescriptions', JSON.stringify(hourDescriptions));
}

// Safely assuming the following should be somewhere between 0 and 23,
// before it rolls back to 0 for the next day ...
const presentHour = Number.parseInt(moment().format('HH'));

for (let i = 0; i < HOURS_PER_WORKDAY; i += 1) {
  // 'h' to reference the starting hour of the day ...
  const h = START_OF_WORKDAY_HOUR + i;
  hourEls[i].textContent = moment().hour(h).format('h A');
  let colorClassName;
  if (h < presentHour) {
    colorClassName = "past";
  } else if (h === presentHour) {
    colorClassName = "present";
  } else {
    colorClassName = "future";
  }

  descriptionEls[i].classList.add(colorClassName);
  descriptionEls[i].textContent = hourDescriptions[i];

  // Every time you add an eventListener, pass i as an index
  // so that your function up above knows which index to save to ...
  saveButtonEls[i].addEventListener("click", function() {
    console.log('i', i);
    console.log('descriptionEls[i].value', descriptionEls[i].value);
    saveHourDescription(i, descriptionEls[i].value);
  });
}
