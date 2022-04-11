function getDate()
{
    let currentDate = new Date();
    let cMonth = currentDate.getMonth() + 1;
    let cDay = currentDate.getDate();
    let cYear = currentDate.getFullYear();

    return cMonth + "/" + cDay + "/" + cYear;
}

let weather = {
    apiKey: "1411ab1012b3a7e76377f336228285ce",
    fetchWeatherByZipCode: function (zipCode) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + "&units=imperial&appid=" + this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }

                console.log(response.name);
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity, temp_max, temp_min } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.querySelector(".current-date").innerText = getDate();
        let zipcode = document.querySelector(".search-bar").value;
        document.querySelector(".zipcode").innerText = 'Zip Code: ' + zipcode;
        document.querySelector(".temp-hi").innerText = "Highest Temperature: " + temp_max + "°F";
        document.querySelector(".temp-lo").innerText = "Lowest Temperature: " + temp_min + "°F";
    },
    search: function () {
        this.fetchWeatherByZipCode(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });


document.querySelector(".search-bar").value = "28213";
weather.search()