var dataObj;

var searchButton = document.getElementById("search-button");
var searchPage = document.getElementById("search-page");
var searchElement = document.getElementById("search-input");
var eventsPage = document.getElementById("events-page");
var finalPage = document.getElementById("final-page");
var searchValue;

var comicText1 = document.getElementById("comic-name-text1");
var comicText2 = document.getElementById("comic-name-text2");
var comicText3 = document.getElementById("comic-name-text3");
var comicText4 = document.getElementById("comic-name-text4");
var comicText5 = document.getElementById("comic-name-text5");
var comicText6 = document.getElementById("comic-name-text6");
var dateText1 = document.getElementById("date-text1");
var dateText2 = document.getElementById("date-text2");
var dateText3 = document.getElementById("date-text3");
var dateText4 = document.getElementById("date-text4");
var dateText5 = document.getElementById("date-text5");
var dateText6 = document.getElementById("date-text6");
var chooseEventButton1 = document.getElementById("choose-event1");
var chooseEventButton2 = document.getElementById("choose-event2");
var chooseEventButton3 = document.getElementById("choose-event3");
var chooseEventButton4 = document.getElementById("choose-event4");
var chooseEventButton5 = document.getElementById("choose-event5");
var chooseEventButton6 = document.getElementById("choose-event6");

var finalName = document.getElementById("final-name");
var finalDate = document.getElementById("final-date");
var finalTime = document.getElementById("final-time");
var finalLocation = document.getElementById("final-location");




searchButton.addEventListener("click", searchEvent);
function searchEvent() {
  searchPage.classList.add("hidden");
  eventsPage.classList.remove("hidden");
  searchValue = searchElement.value;
  $.ajax({
    dataType: "json",
    url: 'https://app.ticketmaster.com/discovery/v2/events?apikey=1kOFB5BhhOCVNaqEPsgmnJq0QqmiEWVr&locale=*&classificationName=comedy&startDateTime=2020-08-05T17:59:00Z&endDateTime=2020-12-31T17:59:00Z&city=' + searchValue,
    method: 'GET',
    success: handleEventsSuccess,
    error: console.log
  })
}



function handleEventsSuccess(events) {
  console.log(events);
  dataObj = events;
  comicText1.textContent = events._embedded.events[0]._embedded.attractions[0].name;
  dateText1.textContent = events._embedded.events[0].dates.start.localDate;
  comicText2.textContent = events._embedded.events[1]._embedded.attractions[0].name;
  dateText2.textContent = events._embedded.events[1].dates.start.localDate;
  comicText3.textContent = events._embedded.events[2]._embedded.attractions[0].name;
  dateText3.textContent = events._embedded.events[2].dates.start.localDate;
  comicText4.textContent = events._embedded.events[3]._embedded.attractions[0].name;
  dateText4.textContent = events._embedded.events[3].dates.start.localDate;
  comicText5.textContent = events._embedded.events[4]._embedded.attractions[0].name;
  dateText5.textContent = events._embedded.events[4].dates.start.localDate;
  comicText6.textContent = events._embedded.events[5]._embedded.attractions[0].name;
  dateText6.textContent = events._embedded.events[5].dates.start.localDate;
  chooseEventButton1.addEventListener("click", function() {
    eventEvent1(dataObj)});
  chooseEventButton2.addEventListener("click", function() {
    eventEvent2(dataObj)});
  chooseEventButton3.addEventListener("click", function() {
    eventEvent3(dataObj)});
  chooseEventButton4.addEventListener("click", function() {
    eventEvent4(dataObj)});
  chooseEventButton5.addEventListener("click", function() {
    eventEvent5(dataObj)});
  chooseEventButton6.addEventListener("click", function() {
    eventEvent6(dataObj)});
}

function eventEvent1(dataObj) {
  eventsPage.classList.add("hidden");
  finalPage.classList.remove("hidden");
  finalName.textContent = dataObj._embedded.events[0]._embedded.attractions[0].name;
  finalDate.textContent = dataObj._embedded.events[0].dates.start.localDate;
  finalTime.textContent = dataObj._embedded.events[0].dates.start.localTime;
  finalLocation.textContent = dataObj._embedded.events[0]._embedded.venues[0].name;
}
function eventEvent2(eventsObj) {
  eventsPage.classList.add("hidden");
  finalPage.classList.remove("hidden");
  finalName.textContent = dataObj._embedded.events[1]._embedded.attractions[0].name;
  finalDate.textContent = dataObj._embedded.events[1].dates.start.localDate;
  finalTime.textContent = dataObj._embedded.events[1].dates.start.localTime;
  finalLocation.textContent = dataObj._embedded.events[1]._embedded.venues[0].name;
}
function eventEvent3(eventsObj) {
  eventsPage.classList.add("hidden");
  finalPage.classList.remove("hidden");
  finalName.textContent = dataObj._embedded.events[2]._embedded.attractions[0].name;
  finalDate.textContent = dataObj._embedded.events[2].dates.start.localDate;
  finalTime.textContent = dataObj._embedded.events[2].dates.start.localTime;
  finalLocation.textContent = dataObj._embedded.events[2]._embedded.venues[0].name;
}
function eventEvent4(eventsObj) {
  eventsPage.classList.add("hidden");
  finalPage.classList.remove("hidden");
  finalName.textContent = dataObj._embedded.events[3]._embedded.attractions[0].name;
  finalDate.textContent = dataObj._embedded.events[3].dates.start.localDate;
  finalTime.textContent = dataObj._embedded.events[3].dates.start.localTime;
  finalLocation.textContent = dataObj._embedded.events[3]._embedded.venues[0].name;
}
function eventEvent5(eventsObj) {
  eventsPage.classList.add("hidden");
  finalPage.classList.remove("hidden");
  finalName.textContent = dataObj._embedded.events[4]._embedded.attractions[0].name;
  finalDate.textContent = dataObj._embedded.events[4].dates.start.localDate;
  finalTime.textContent = dataObj._embedded.events[4].dates.start.localTime;
  finalLocation.textContent = dataObj._embedded.events[4]._embedded.venues[0].name;
}
function eventEvent6(eventsObj) {
  eventsPage.classList.add("hidden");
  finalPage.classList.remove("hidden");
  finalName.textContent = dataObj._embedded.events[5]._embedded.attractions[0].name;
  finalDate.textContent = dataObj._embedded.events[5].dates.start.localDate;
  finalTime.textContent = dataObj._embedded.events[5].dates.start.localTime;
  finalLocation.textContent = dataObj._embedded.events[5]._embedded.venues[0].name;
}
