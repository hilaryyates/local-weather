let temp;
let skies;
const celciusToFahrenheit = (tempC) => {
  const tempF = Math.round((tempC * 9) / 5 + 32);
  return tempF;
};

const geolocationSuccess = async (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=4357a9de1daf129b0a785f2957cbafac&units=metric`
  );
  const responseText = await response.text();
  const responseBody = JSON.parse(responseText);
  console.log(responseBody);
  temp = Math.round(responseBody.main.temp);
  document.getElementById("weather__temp").innerText = temp;
  skies = responseBody.weather[0].main;
  console.log(skies);

  if (skies === "Clouds") {
    document.getElementById("weather__sky").src = "./images/cloud.png";
  }

  if (skies === "Clear") {
    document.getElementById("weather__sky").src = "./images/sun.png";
  }
};

navigator.geolocation.getCurrentPosition(geolocationSuccess);

document.getElementById("fahrenheit").onclick = () => {
  document.getElementById("weather__temp").innerText = celciusToFahrenheit(
    temp
  );
};

document.getElementById("celcius").onclick = () => {
  document.getElementById("weather__temp").innerText = temp;
};
