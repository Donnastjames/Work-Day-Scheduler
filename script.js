// Create variables to add the current date and day of the week ...
var today = moment();
$("#currentDay").text(today.format('dddd MMMM Do YYYY'));

// Create an array representing the hours in the day ...

var hourIndex = 0;

const hourBlock = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];

var hourColumn = document.querySelector(".hour");

// Append buttons to 'hour' column ...
const currentHour = hourColumn[hourIndex];

for (let i = 0; i < hourBlock.length; i += 1) {
  const hour = document.createElement("div");
  hour.classList.add("hour");
  const hourTextNode = document.createTextNode(hourBlock[i]);
  hour.appendChild(hourTextNode);
  hourColumn.appendChild(hour);
} 