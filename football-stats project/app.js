const handleSubmit = document.querySelector(".button");
const articleTitle = document.querySelector(".hidden");
const footballStats = document.querySelector(".records");
const footballNews = document.querySelector(".sport-news");
const newsButton = document.querySelector(".news-button");
const addingNews = document.querySelector(".add-news");
const recordsList = document.querySelector(".records");
const innerDiv = document.querySelector(".inner-div");
const homePage = document.querySelectorAll(".home-button");


homePage.forEach((item => item.addEventListener("click", () => window.location.reload())));


function teamValues() {
	const selectedValue = document.querySelector(".teams").value;
	console.log(selectedValue);
	return parseInt(selectedValue);
}


handleSubmit.addEventListener("click", function (e) {
	e.preventDefault();

	//recordsList.classList.remove("hidden")
	addingNews.classList.add("hidden")		 // hiding news content
	footballNews.classList.add("hidden");    //  hiding home content 
	articleTitle.classList.remove("hidden"); // unhide article title  

	recordsList.innerHTML = "";
	const values = teamValues();   // returned function`s value
	displayInfos(values);
	//innerDiv.classList.remove("hidden");
	//footballStats.classList.add("hidden");
})


async function displayInfos(param) {
	const response = await fetch(`https://football-web-pages1.p.rapidapi.com/records.json?comp=1&team=${param}`, {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "football-web-pages1.p.rapidapi.com",
			"x-rapidapi-key": "15df9ecb03msh097422f6642db45p19d073jsnb43a973cd83f"
		}
	})
	if (response.status > 400) {
		console.error("ERROR");
	} else {
		const data = await response.json();
		console.log(data);
		const arrOfObjects = Object.values(data.records.records);
		console.log(arrOfObjects);
		arrOfObjects.forEach(element => {
			// if (element.description !== 'Highest Attendance' || element.description !== 'Lowest Attendance') {
			if (element.matches.length !== 0) {
				recordsList.innerHTML +=
					`
					
				<h2 class="description"> DESCRIPTION: ${element.description}<span class="match-type2"> - ${element.type.toUpperCase()} </span></h2> 
				<p> The match:
				${element.matches[0]["away-team"]["name"]} vs. ${element.matches[0]["home-team"]["name"]} 
				, score: ${element.matches[0]["away-team"]["score"]}-${element.matches[0]["home-team"]["score"]}</p> 
				<p> Match attendance: ${element.matches[0]["attendance"]} </p>
				<p> Match date:  ${element.matches[0]["date"]}  </p>
				
				`
			}
		});
		//footballStats.classList.remove("hidden");
	}
}


async function displayNews() {
	const response = await fetch("https://chelsea-fc-news-live.p.rapidapi.com/news", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "chelsea-fc-news-live.p.rapidapi.com",
			"x-rapidapi-key": "15df9ecb03msh097422f6642db45p19d073jsnb43a973cd83f"
		}
	})
	if (response.status > 400) {
		console.error("ERROR");
	} else {
		const data = await response.json();
		console.log(data);

		for (let i = data.length - 200; i < data.length - 180; i++) {
			addingNews.innerHTML += `
			<p> News title: ${data[i].title} </p>
			<span> Source name: ${data[i].sourceName} </span>
			<p> News url: ${data[i].url} </p>
			`
		}
	}
}

newsButton.addEventListener("click", function (e) {
	//e.preventDefault;

	addingNews.classList.remove("hidden")
	addingNews.innerHTML = "";

	//recordsList.classList.add("hidden")
	recordsList.innerHTML = "";
	footballNews.classList.add("hidden");
	articleTitle.classList.add("hidden");
	displayNews();
})

















// console.log(selectByValue());




