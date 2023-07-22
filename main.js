// Project : Wheather App
const card = document.querySelector(".card");
const input = document.querySelector("input:first-of-type");
const submitBtn = document.querySelector("form input+i");
const form = document.querySelector("form");
const APIKey = "7935b8f9c2be31ec30bb3267279418d4";
const content = document.querySelector(".content");
const weatherImg = document.querySelector(".first img");
const temp = document.querySelector(".temp span");
const desc = document.querySelector(".desc");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind-speed");
const note = document.querySelector("h4.note");
const errorImg = document.querySelector(".status img");

submitBtn.addEventListener("click", function (e) {
  submitForm(e);
});
form.addEventListener("submit", function (e) {
  submitForm(e);
});

// func
function submitForm(e) {
  e.preventDefault();
  content.style.display = "none";
  errorImg.style.display = "none";
  card.classList.remove("show");
  note.textContent = "";
  if (input.value === "") {
    note.textContent = "Input Cannot Be Empty !!";
    return;
  }
  fetchData();
  async function fetchData() {
    try {
      let myData = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${input.value.trim()}&units=metric&appid=${APIKey}`
      );
      card.classList.add("show");
      let jsData = await myData.json();
      weatherImg.src = `imgs/${jsData.weather[0].main.toLowerCase()}.png`;
      temp.textContent = `${Math.round(jsData.main.temp)}`;
      desc.textContent = jsData.weather[0].description;
      humidity.textContent = `${jsData.main.humidity}%`;
      windSpeed.textContent = `${jsData.wind.speed} Km/h`;
      content.style.display = "flex";
    } catch (error) {
      errorImg.style.display = "block";
      note.textContent = "Invalid Input";
      console.log(error);
    }
  }
}
