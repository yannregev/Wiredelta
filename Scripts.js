
var date = new Date();
var Day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
var Month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

/*Inspirational quotes to give a little motivation for the day*/
var quotes = ["Only I can change my life. No one can do it for me.","Optimism is the faith that leads to achievement. Nothing can be done without hope and confidence.","The past cannot be changed. The future is yet in your power.","It always seems impossible until it's done.","Keep your eyes on the stars, and your feet on the ground.","Accept the challenges so that you can feel the exhilaration of victory.","The way get started is to quit talking and begin doing."]

function getOrdinal(num) {
		switch (num) {
			case 1:
			case 21:
			case 31:
				return "st";
			case 2:
			case 22:
				return "nd";
			case 3:
			case 23:
				return "rd";
			default:
				return "th";
	}
}

// Creates an interval to update the date and time every seconds
setInterval(createDate, 1000);

// Adds the date and time to the page
function createDate() {
	date = new Date();
	var nav = document.getElementById("dateAndTime");
	var string = "Today is " + Day[date.getDay()] + " " + date.getDate() + getOrdinal(date.getDate()) + " " + Month[date.getMonth()] + " " + date.getFullYear();
	string += ", "+ date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });	
	nav.innerHTML = string;
}



function loadQuote() {
	var insparational = document.getElementById("insparational");
	insparational.innerHTML += quotes[date.getDay()];
}

function weather() {
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=Copenhagen,dk&appid=e1ce730145e406d1e9a5a0f8dc892932&units=metric");
	xhttp.responseType = "json";
	xhttp.send();
	
	/*Once a response is recieved from the weather server add the relevant text to the page*/
	xhttp.onload = function() {
		var weather = xhttp.response;
		var datebar = document.getElementById("weather");
		datebar.innerHTML += weather["name"] + " weather: " + weather["weather"][0]["description"] + ", Temprature: " + weather["main"]["temp"];

  }
}

/*Find the relevevant tasks for today and adds the elements a table on the page*/
function loadTasks() {


	var todayTasks = tasks.filter(function(e) {
		return e.day == Day[date.getDay()];
	});

	var tasksTable = document.getElementById("tasksTable");
	var entries =   "<thead>"+
					"<tr>"+
					"<th>Time</th>"+
					"<th>Description</th>"+
					"<th>Edit</th>"+
					"</tr>"+
					"</thead>"+
					"<tbody>";

	for (var i = 0; i < todayTasks.length; i++) {
		entries += "<tr>" +
				   "<td>" + todayTasks[i].time + "</td>" +
				   "<td>" + todayTasks[i].description + "</td>" +
				   "<td><button type='button' onclick='removeTask(this)'>X</button></td>" +
				   "</tr>";
	}
	entries +=   "</tbody>" +
				 "<tfoot>" +
				 "<td><input type='time' id='newTime'></td>" +
				 "<td><input type='text' id='newTask'></td>" +
				 "<td><button type='submit' onclick='addTask(this)'>Add</td>" +
				 "</tfoot>";
	tasksTable.innerHTML = entries;
  
}

/*Combines the values of the time and description fields in to a table row and adds to the table
  ordered by the time of the activity*/
function addTask() {
	
	
	var table = document.getElementById("tasksTable").getElementsByTagName("tbody")[0];
	var time = document.getElementById("newTime");
	var task = document.getElementById("newTask");
	
	if (time.value == "" || task.value == "") {
		window.alert("Time and Task cannot be empty");
		return;
	}
	
	var newRow = null;
	
	for (var i = 0; i < table.rows.length; i++) {
		if (table.rows[i].cells[0].innerHTML > time.value) {
			newRow = table.insertRow(i);
			break;
		}
	}
	
	newRow = newRow == null ? table.insertRow(table.rows.length) : newRow;
	
	newRow.innerHTML = "<td>" + time.value + "</td>" +
				 "<td>" + task.value + "</td>" +
				 "<td><button type='button' onclick='removeTask(this)'>X</button></td>";
	
	time.value = "";
	task.value = "";
}

function removeTask(elm) {
	var table = document.getElementById("tasksTable");
	table.deleteRow(elm.closest('tr').rowIndex);
}

function changeTitle() {
	var newTitle = document.getElementById("newTitle").value;
	var title = document.getElementById("pageTitle");
	title.innerHTML = newTitle;
	document.getElementById("newTitle").value = "";
}

function changeBackground() {
	var chosenColorIndex = document.getElementById("backgroundColor").selectedIndex;
	var chosenColorOption = document.getElementById("backgroundColor").options;
	document.body.style.backgroundColor = chosenColorOption[chosenColorIndex].value;
}

/*Similar functionallity to loadTasks but advances the day by one and loads to a different table*/
function openTomorrow() {
    var content = document.getElementById("tabcontent");
    var tasksButton = document.getElementById("tablink");
    if (content.style.maxHeight){
		content.style.maxHeight = null;
		tasksButton.className = "";
    } else {
		var todayTasks = tasks.filter(function(e) {
			return e.day == Day[date.getDay()+1];
		});

		var entries = "<tr><th>Time</th><th>Description</th></tr>";

		for (var i = 0; i < todayTasks.length; i++) {
			entries += "<tr>" +
					   "<th>"+ todayTasks[i].time + "</th>" +
					   "<th>"+ todayTasks[i].description + "</th>" +
					   "</tr>";
		}
		
		var tasksTable = document.getElementById("tomorrowsTasksTable");
		tasksTable.innerHTML = entries;
		tasksButton.className += " active";
		tasksButton.style.hover
		content.style.maxHeight = "100%";
  }
}

