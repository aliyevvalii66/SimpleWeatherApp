const container = document.querySelector('.container');
const err = document.querySelector('.err');
const weatherBox = document.querySelector('.weather-box');
const btn = document.querySelector('.btn');



var day = new Date();

var days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
]
var month =[
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]


btn.addEventListener('click', () => {
    const input = document.querySelector('.input').value;
    if (input.trim() === '') {
        container.style.height = '90px';
        err.style.display = 'none';
        weatherBox.style.display = 'none'
        return;
    }
    input.trim();
    const key = '45f006a9f6651c2bd89393c3e1976b8c';
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${key}`;
    fetch(api).then(response => response.json()).then(data => {

        if (data.cod === '404') {
            container.style.height = '400px'
            err.style.display = 'block';
            weatherBox.style.display = 'none'
            return;
        }
        console.log(data);
        container.style.height = '550px';
        weatherBox.style.display = 'block'
        err.style.display = 'none';
        const img = document.querySelector('.weather-box .top img');
        const temp = document.querySelector('.weather-box .top .temperature');
        const des = document.querySelector('.weather-box .top .description');
        const wind = document.querySelector('.weather-box .bottom .wind p');
        const humidity = document.querySelector('.weather-box .bottom .humidity p');
        const pressure = document.querySelector('.weather-box .bottom .pressure p');
        const dateArea = document.querySelector('.date-area');
        console.log(data.weather[0].main);
        switch (data.weather[0].main) {
            case 'Clear':
                img.src = './assets/imgs/clear.png';
                break;

            case 'Rain':
                img.src = './assets/imgs/rain.png';
                break;

            case 'Snow':
                img.src = './assets/imgs/snow.png';
                break;

            case 'Clouds':
                img.src = './assets/imgs/cloud.png';
                break;

            case 'Haze':
                img.src = './assets/imgs/haze.png';
                break;

            default:
                img.src = '';
        }

        temp.innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`
        des.innerHTML = `${data.weather[0].description}`
        wind.innerHTML = `${Math.round(data.wind.speed)} km/h`
        humidity.innerHTML = `${data.main.humidity}%`
        pressure.innerHTML = `${data.main.pressure}hPa`
        dateArea.innerHTML = `${days[day.getDay() - 1]}, ${day.getDate()} ${month[day.getMonth()]}`
    }).catch(error=>console.log(error))

});

