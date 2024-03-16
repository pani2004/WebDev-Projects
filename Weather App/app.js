const apiKey = "44adf9d4183b693deb0abc5ce2d72257"
const url = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q="
let temp = document.querySelector(".temp")
let cityElement = document.querySelector(".city")
let humidity = document.querySelector(".humidity")
let wind = document.querySelector(".wind")
let search = document.querySelector(".search input")
let button = document.querySelector(".btn")
const weatherIcon = document.querySelector(".weather-icon")
async function checkWeather(city){
    const respone = await fetch(url+city+`&appid=${apiKey}`)
    if(respone.status == 404){
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    }
    else{
        let data = await respone.json()
        console.log(data)
        cityElement.innerText = data.name
        temp.innerText = Math.round(data.main.temp)+"°c"
        humidity.innerText = data.main.humidity+"%"
        wind.innerText = data.wind.speed+"km/hr"
        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "clouds.png"
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "clear.png"
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "rain.png"
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "mist.png"
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "drizzle.png"
        }
        else if(data.weather[0].main == "Snow"){
            weatherIcon.src = "snow.png"
        }
        document.querySelector(".weather").style.display = "block"
        document.querySelector(".error").style.display = "none"
    }
}
button.addEventListener("click",()=>{
    checkWeather(search.value)
})