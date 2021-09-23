let events = {};
const START_HOUR = 9;
const END_HOUR = 17;

let loadPage = function () {
	// Add current date to header
	let date = moment().local();

	console.log(date);
	$("#currentDay").text(date.format("dddd, MMMM, Do"));

	// Add Time Blocks
	events = JSON.parse(localStorage.getItem("events"));

	if (!events) {
		let events = {};
		for (let i = START_HOUR; i <= END_HOUR; i++) {
			let workHour = date.set("hour", i).format("hA");
			Object.defineProperty(events, workHour, {value: ""});
		}

		// let timeBlock = $("<li>").addClass("row list-group-item");

		// let timeColumn = $("<div>").text(date.set("hour", i).format("HA")).addClass("col");
		// let textColumn = $("<div>").addClass("btn-success col");
		// let saveButton = $("<div>").addClass("btn-primary col");

		// timeBlock.add(timeColumn);
		// timeBlock.add(textColumn);
		// timeBlock.add(saveButton);
		// $("#timeBlockList").add(timeBlock);

		console.log(events);
	}
};

loadPage();
