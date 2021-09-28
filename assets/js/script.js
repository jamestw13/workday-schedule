// Global template data structure
let events = {
	"9AM": "",
	"10AM": "",
	"11AM": "",
	"12PM": "",
	"1PM": "",
	"2PM": "",
	"3PM": "",
	"4PM": "",
	"5PM": "",
};

// Moment object
let date = moment();

// Create an event row
let createEvent = function (hour) {
	// Time block row
	let timeBlock = $("<div>").addClass("row");

	// Column for Time
	let timeColumn = $("<h3>").text(hour).addClass("timeColumn col-2 list-group-item text-right border-left-0");

	// Column for Text
	let textColumn = $("<textarea>").val(events[hour]).addClass("textColumn col-9 list-group-item");
	// Setting textColumn coloration
	let workHour = moment(hour, "hA");
	// Hour slot is the current hour
	if (moment().format("hA") === hour) {
		textColumn.addClass("list-group-item-warning");
	}
	// Hour slot is in past
	else if (moment().isAfter(workHour)) {
		textColumn.addClass("list-group-item-secondary");
	}
	// Hour slot is in future
	else if (workHour.isAfter(moment())) {
		textColumn.addClass("list-group-item-success");
	}

	// Column for save buttons
	let saveButton = $("<button>").addClass(
		"save-button col-1 list-group-item list-group-item-action active fas fa-save text-center"
	);

	// Add columns to row
	timeBlock.append(timeColumn);
	timeBlock.append(textColumn);
	timeBlock.append(saveButton);
	// Add row to container
	$("#timeBlockList").append(timeBlock);
};

// Save events data to localStorage
let saveEvents = function () {
	localStorage.setItem("events", JSON.stringify(events));
};

// Save button click handler
$("#timeBlockList").on("click", "button", function () {
	// Get time of hour slot
	let time = $(this).siblings("h3").text().trim();
	// Get text from hour slot
	let text = $(this).siblings("textarea").val().trim();

	// Add info back into global
	events[time] = text;

	// Update localStorage with new global info
	saveEvents();
});

// Set the initial page information
let loadPage = function () {
	// Add current date to header
	$("#currentDay").text(date.format("dddd, MMMM, Do"));

	// Pull in events from localStorage
	savedEvents = JSON.parse(localStorage.getItem("events"));

	// If no events in localStorage create a new blank set
	if (savedEvents) {
		events = savedEvents;
	}

	// Iterate over events to create the hour slot elements
	for (let hour in events) {
		createEvent(hour);
	}
};

// Begin loading the page content
loadPage();
