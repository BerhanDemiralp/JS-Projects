const apikey = "7f4a59187df2482597e154938253105";

const infoPageEl = document.querySelector(".infoPage");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector(".form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputEl.value;
  console.log(cityValue);
  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${cityValue}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    const feelsLike = Math.round(data.current.feelslike_c);
    const humidity = data.current.humidity;
    const windSpeed = data.current.wind_mph;

    const temperature = Math.round(data.current.temp_c);
    const iconUrl = data.current.condition.icon.includes("64x64")
      ? data.current.condition.icon.replace("64x64", "128x128")
      : data.current.condition.icon;
    const desc = data.current.condition.text;

    infoPageEl.innerHTML = `
      <div class="icon">
          <img
            src=${iconUrl}
            alt="weather-icon"
          />
        </div>
        <div class="degree">${temperature}&degC</div>
        <div class="quickInfo">${desc}</div>
        <div class="infoBoxes">
          <div class="box">Feels like: ${feelsLike}&degC</div>
          <div class="box">Humidity: ${humidity}%</div>
          <div class="box">Wind speed: ${windSpeed} m/s</div>
        </div>
    `;
  } catch (error) {
    infoPageEl.innerHTML = `
      <div class="quickInfo"> "An error happened, please try again"</div>
    `;
  }
}
