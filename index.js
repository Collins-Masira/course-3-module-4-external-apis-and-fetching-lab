const weatherApi = "https://api.weather.gov/alerts/active?area=";

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("get-alerts");

  if (button) {
    button.addEventListener("click", handleClick);
  }
});

async function handleClick() {
  const input = document.getElementById("state-input");
  const state = input.value.trim().toUpperCase();

  clearUI();

  if (!state) {
    displayError("Please enter a state abbreviation");
    return;
  }

  try {
    const data = await fetchWeatherData(state);
    displayWeather(data);
    input.value = "";
  } catch (error) {
    displayError(error.message || "Network failure");
  }
}

async function fetchWeatherData(state) {
  const res = await fetch(weatherApi + state);

  if (!res.ok) {
    throw new Error("Network failure");
  }

  return await res.json();
}

function displayWeather(data) {
  const display = document.getElementById("alerts-display");
  const error = document.getElementById("error-message");

  error.textContent = "";
  error.classList.add("hidden");

  const alerts = data.features || [];

  display.textContent = `Weather Alerts: ${alerts.length}`;

  alerts.forEach(alert => {
    const p = document.createElement("p");
    p.textContent = alert.properties.headline;
    display.appendChild(p);
  });
}

function displayError(message) {
  const error = document.getElementById("error-message");

  error.textContent = message;
  error.classList.remove("hidden");
}

function clearUI() {
  document.getElementById("alerts-display").textContent = "";

  const error = document.getElementById("error-message");
  error.textContent = "";
  error.classList.add("hidden");
}