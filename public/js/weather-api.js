// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

// Api key c92821d2f7ca54e80450a9b4d12bc458

let weather = {
    apiKey: "c92821d2f7ca54e80450a9b4d12bc458",
    fetchWeather: function () {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?lat=59.9342802&lon=30.3350986&lang=ru&appid=" + this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    alert("Weather information coludn't be found");
                    throw new Error("Weather information coludn't be found");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        let DescriptionToUpper = description;
        document.querySelector(".description").innerText = DescriptionToUpper[0].toUpperCase()+DescriptionToUpper.slice(1);
        document.querySelector(".temp").innerText = parseInt(temp)-273 + "°C";
        document.querySelector(".humidity").innerText = "Влажность: " + humidity + "%";
        document.querySelector(".wind").innerText = "Скорость ветра: " + Math.round(parseInt(speed) * 5 / 18) + "м/c";
    },
};


weather.fetchWeather();