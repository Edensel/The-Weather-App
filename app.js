const accessKey = "1bab57f3decff0e83ae797ad16e4243c";

const weatherDataEl = document.getElementById("weather-data")
const cityInputEl = document.getElementById("city-input")

const formEl = document.querySelector("form")

formEl.addEventListener("submit", (e) =>{
    e.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
})

async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${accessKey}&units=metric`);

        if (!response.ok){
            throw new Error ("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);

        const country = data.name
        const temperature = Math.round(data.main.temp)
        const description = data.weather[0].description
        const icon = data.weather[0].icon

        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Speed: ${data.wind.speed} m/s`,
        ]

        weatherDataEl.querySelector(".country").innerHTML = country;
        weatherDataEl.querySelector(".icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;
        weatherDataEl.querySelector(".description").textContent = description;

        weatherDataEl.querySelector(".details").innerHTML = details
        .map((detail) => `<div>${detail}</div>`)
        .join("");
        

    }catch (error) {
        weatherDataEl.querySelector(".country").textContent = "";
        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(".temperature").textContent = "";
        weatherDataEl.querySelector(".description").textContent = "Please enter a valid city name!";

        weatherDataEl.querySelector(".details").innerHTML = "";
    }
}