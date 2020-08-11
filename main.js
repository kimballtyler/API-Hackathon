var dataObj;

var searchButton = document.getElementById("search-button");
var loadingButton = document.getElementById("loading-button");
var searchPage = document.getElementById("search-page");
var searchElement = document.getElementById("search-input");
var searchForm = document.getElementById("search-form");
var eventsPage = document.getElementById("events-page");
var finalPage = document.getElementById("final-page");
var modalOverlay = document.getElementById("modal-overlay");
var modalButton = document.getElementById("modal-button");
var modalHeader = document.getElementById("modal-header");
var searchValue;
var searchValueNew;
var maxLoops = 6;

var comicText;
var dateText;

var finalName = document.getElementById("final-name");
var finalDate = document.getElementById("final-date");
var finalTime = document.getElementById("final-time");
var finalLocation = document.getElementById("final-location");
var ticketLinkElement = document.getElementById("ticket-link");
var mapsElement = document.getElementById("maps");
var finalEventImage = document.getElementById("final-event-image");
var venueName;
var venueNameNew;

searchForm.addEventListener("submit", searchEvent);
function searchEvent(event) {
  event.preventDefault();
  searchValue = searchElement.value;
  $.ajax({
    dataType: "json",
    url: 'https://app.ticketmaster.com/discovery/v2/events?apikey=1kOFB5BhhOCVNaqEPsgmnJq0QqmiEWVr&locale=*&classificationName=comedy&city=' + searchValue,
    method: 'GET',
    success: handleEventsErrorCheck,
    error: handleEventsError
  })
}

function handleEventsErrorCheck(events) {
  if (!events._embedded) {
    modalHeader.textContent = "No results were found, please try a different city.";
    modalOverlay.classList.remove("hidden");
    searchElement.value = "";
  } else if (searchValue === "") {
  } else {
    searchButton.classList.add("hidden");
    loadingButton.classList.remove("hidden");
    dataObj = events;
    eventsWithoutAttractions(dataObj);
    setTimeout(function() {
      handleEventsSuccess(dataObj);
    }, 1000);
  }
}

function handleEventsError() {
  modalOverlay.classList.remove("hidden");
  modalHeader.textContent = "Could not connect to the server, try again later.";
}

modalButton.addEventListener("click", function() {
  modalOverlay.classList.add("hidden");
  searchElement.value = "";
})

function searchValueSpaces(searchValue) {
  searchValueNew = searchValue.replace(/ /g, "+");
}

function maxLoopsDefine() {
  if (dataObj._embedded.events.length < 6) {
    maxLoops = dataObj._embedded.events.length;
  }
}

function eventsWithoutAttractions(dataObj) {
  for (var i = 0; i < maxLoops; i++) {
    if (!dataObj._embedded.events[i]._embedded.attractions) {
      dataObj._embedded.events.splice(i, 1);
      i--;
      maxLoopsDefine();
    }
  }
}

function handleEventsSuccess(dataObj) {
  searchButton.classList.remove("hidden");
  loadingButton.classList.add("hidden");
  searchPage.classList.add("hidden");
  eventsPage.classList.remove("hidden");
  searchValueSpaces(searchValue);
  displayEvents();
  for (var i = 0; i < maxLoops; i++) {
    comicText = document.getElementById("comic-name-text" + (i+1));
    comicText.textContent = dataObj._embedded.events[i]._embedded.attractions[0].name;
    dateText = document.getElementById("date-text" + (i+1));
    dateText.textContent = dataObj._embedded.events[i].dates.start.localDate;
  }
}

function displayEvents() {
  for (var i = 0; i < maxLoops; i++) {
    var row = document.createElement("div");
    row.setAttribute("class", "row pt-4 ml-1 text-center");
    eventsPage.appendChild(row);
    var col1 = document.createElement("div");
    col1.setAttribute("class", "col");
    row.appendChild(col1);
    var p1 = document.createElement("p");
    var addI = i + 1;
    var nameId = "comic-name-text" + addI;
    p1.setAttribute("id", nameId);
    col1.appendChild(p1);
    var p2 = document.createElement("p");
    var dateId = "date-text" + addI;
    p2.setAttribute("id", dateId);
    col1.appendChild(p2);
    var col2 = document.createElement("div");
    col2.setAttribute("class", "col pt-2");
    row.appendChild(col2);
    var btn = document.createElement("button");
    var btnId = "choose-event" + addI;
    btn.setAttribute("id", btnId);
    btn.setAttribute("type", "button");
    btn.setAttribute("class", "btn btn-primary");
    btn.setAttribute("index", i);
    btn.textContent = "Choose Event";
    btn.addEventListener("click", function(event) {
      var btnIndex = event.target.getAttribute("index");
      finalPageEvent(btnIndex, dataObj);
    });
    col2.appendChild(btn);
  }
}

function venueSpaces(venueName) {
  venueNameNew = venueName.replace(/ /g, "+");
}

function finalPageEvent(i, dataObj) {
  eventsPage.classList.add("hidden");
  finalPage.classList.remove("hidden");
  finalName.textContent = dataObj._embedded.events[i]._embedded.attractions[0].name;
  finalDate.textContent = dataObj._embedded.events[i].dates.start.localDate;
  finalTime.textContent = dataObj._embedded.events[i].dates.start.localTime;
  venueName = dataObj._embedded.events[i]._embedded.venues[0].name;
  finalLocation.textContent = venueName;
  venueSpaces(venueName);
  ticketLinkElement.setAttribute("href", dataObj._embedded.events[i].url);
  mapsElement.src = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAQoF_dYg3u7HEQ4rDWwedyML_11N9feeQ&q=" + searchValueNew + "," + venueNameNew;
  finalEventImage.src = dataObj._embedded.events[i].images[0].url;
}
