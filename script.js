let temp;
let skies;
const celciusToFahrenheit = (tempC) => {
  const tempF = Math.round((tempC * 9) / 5 + 32);
  return tempF;
};

const geoSuccess = async (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=4357a9de1daf129b0a785f2957cbafac&units=metric`
  );
  const responseText = await response.text();
  const responseBody = JSON.parse(responseText);
  console.log(responseBody);
  temp = Math.round(responseBody.main.temp);
  document.getElementById("temp").innerText = temp;
  skies = responseBody.weather[0].main;

  if (skies === "Clouds") {
    document.getElementById("sky").src = "./images/cloud.png";
  }

  if (skies === "Clear") {
    document.getElementById("sky").src = "./images/sun.png";
  }
};

navigator.geolocation.getCurrentPosition(geoSuccess);

document.getElementById("fahrenheit").onclick = () => {
  document.getElementById("temp").innerText = celciusToFahrenheit(temp);
};

document.getElementById("celcius").onclick = () => {
  document.getElementById("temp").innerText = temp;
};
