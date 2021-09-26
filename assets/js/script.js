let events = {};
const START_HOUR = 9;
const END_HOUR = 17;
let date = moment().local();

let loadPage = function () {
	// Add current date to header
	$("#currentDay").text(date.format("dddd, MMMM, Do"));

	// Add Time Blocks
	events = JSON.parse(localStorage.getItem("events"));

	// Check if event are in localStorage
	if (!events) {
		// If not, create an events object
		let events = {};

		for (let i = START_HOUR; i <= END_HOUR; i++) {
			let workHour = date.set("hour", i).format("hA");
			// Object.defineProperty(events, workHour, {value: ""});

			let timeBlock = $("<div>").addClass("row");

			let timeColumn = $("<div>").text(workHour).addClass("col-2 list-group-item");
			let textColumn = $("<div>").addClass("col-8 list-group-item");
			textColumn.text("textColumn");
			let saveButton = $("<div>").addClass("col-2 list-group-item");
			saveButton.text("saveButton");

			timeBlock.append(timeColumn);
			timeBlock.append(textColumn);
			timeBlock.append(saveButton);

			$("#timeBlockList").append(timeBlock);
		}
	}
};

loadPage();
