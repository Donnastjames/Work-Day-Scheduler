
const HOURS_PER_WORKDAY = 9;
const START_OF_WORKDAY_HOUR = 9;

const containerEl = document.querySelector(".container");

// Create variables to add the current date and day of the week ...
var today = moment();
$("#currentDay").text(today.format('dddd MMMM Do YYYY'));

// console.log('containerEl.innerHtml', containerEl.innerHTML);

const templateHtml = containerEl.innerHTML;

// Start at index 1, so we can leave the first templateHtml innerHTML
// where it was, but duplicate it for all the remaining HOURS_PER_WORKDAY.
for (let i = 1; i < HOURS_PER_WORKDAY; i += 1) {
  containerEl.innerHTML += templateHtml;
}

const hourEls = document.getElementsByClassName("hour");
const descriptionEls = document.getElementsByClassName("description");

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
}
