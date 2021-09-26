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
			let workHour = date.set("hour", i);
			let workHourText = workHour.format("hA");
			// Object.defineProperty(events, workHour, {value: ""});

			let timeBlock = $("<div>").addClass("row");

			let timeColumn = $("<h3>").text(workHourText).addClass("col-2 list-group-item text-right border-left-0");
			let textColumn = $("<textarea>").addClass("col-9 list-group-item");

			if (moment().hour() === date.hour()) {
				textColumn.addClass("list-group-item-warning");
			} else if (moment().isAfter(workHour)) {
				textColumn.addClass("list-group-item-secondary");
			} else if (workHour.isAfter(moment())) {
				textColumn.addClass("list-group-item-success");
			}

			let saveButton = $("<button>").addClass(
				"col-1 list-group-item list-group-item-action active fas fa-save text-center"
			);

			timeBlock.append(timeColumn);
			timeBlock.append(textColumn);
			timeBlock.append(saveButton);

			$("#timeBlockList").append(timeBlock);
		}
	}
};

loadPage();
