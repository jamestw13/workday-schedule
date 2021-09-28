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
let date = moment();

// Create event
let createEvent = function (hour, text) {
	let timeBlock = $("<div>").addClass("row");

	let timeColumn = $("<h3>").text(hour).addClass("timeColumn col-2 list-group-item text-right border-left-0");
	let textColumn = $("<textarea>").val(text).addClass("textColumn col-9 list-group-item");

	let workHour = moment(hour, "hA");

	if (moment().format("hA") === hour) {
		textColumn.addClass("list-group-item-warning");
	} else if (moment().isAfter(workHour)) {
		textColumn.addClass("list-group-item-secondary");
	} else if (workHour.isAfter(moment())) {
		textColumn.addClass("list-group-item-success");
	}

	let saveButton = $("<button>").addClass(
		"save-button col-1 list-group-item list-group-item-action active fas fa-save text-center"
	);

	timeBlock.append(timeColumn);
	timeBlock.append(textColumn);
	timeBlock.append(saveButton);

	$("#timeBlockList").append(timeBlock);
};

// Save events data to localStorage
let saveEvents = function () {
	localStorage.setItem("events", JSON.stringify(events));
};

// Save button click handler
$("#timeBlockList").on("click", "button", function () {
	let time = $(this).siblings("h3").text().trim();
	console.log(time);
	let text = $(this).siblings("textarea").val().trim();
	console.log(text);

	events[time] = text;
	saveEvents();
});

let loadPage = function () {
	// Add current date to header
	$("#currentDay").text(date.format("dddd, MMMM, Do"));

	// Pull in events from localStorage
	savedEvents = JSON.parse(localStorage.getItem("events"));
	// If no events in localStorage create a new set
	if (savedEvents) {
		events = savedEvents;
	}
	for (let hourText in events) {
		createEvent(hourText, hourText.text);
		// Add Time Blocks
	}
};

loadPage();
