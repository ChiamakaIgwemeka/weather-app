// API key and base URL for OpenWeatherMap API
const apiKey = "f53c4701ae092fbcb6da40d9185fd2e2";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

// Get references to DOM elements
const searchBox = document.querySelector(".search input") 
const searchBtn = document.querySelector(".search button") 
const weatherIcon = document.querySelector(".weather-icon"); 

// Function to fetch and display weather data for a given city
async function checkWeather(city) {
    // Fetch weather data from the API
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    // Check if the city is found
    if(response.status == 404){
        // Display error message and hide weather info
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
        
    else {
        // Parse JSON response
        var data = await response.json();

        // Update DOM elements with weather data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";    
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Update weather icon based on weather condition   
        if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "/images/clouds.png" 
        }
        else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "/images/clear.png" 
        }
        else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "/images/rain.png" 
        }
        else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "/images/drizzle.png" 
        }
        else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "/images/mist.png" 
        }

        // Display weather info and hide error message
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Add event listener to search button
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})

checkWeather();