const form = document.querySelector('[data-js="change-location"]')
const cityName = document.querySelector('[data-js="city-name"]')
const cityTemperature = document.querySelector('[data-js="city-temperature"]')
const cityWeather = document.querySelector('[data-js="city-weather"]')
const cityCard = document.querySelector('[data-js="city-card"]')

const imgTime = document.querySelector('[data-js="time"]')
const imgIcon = document.querySelector('[data-js="time-icon"]')

const addImage = (WeatherIcon, IsDayTime) => {
    imgIcon.innerHTML = `<img src="/src/icons/${WeatherIcon}.svg" />`
    imgTime.src = IsDayTime ? '/src/day.svg' : '/src/night.svg'
}

const showCityLocalStorage = () => {
    const savedCity = localStorage.getItem('searchedCity')

    if (savedCity) {
        showCityWeather(savedCity)
    }
}

const showCardInfo = () => {
    const invisibleCard = cityCard.classList.contains('d-none')

    if(invisibleCard) {
        cityCard.classList.remove('d-none')
    }
}

const showCityWeather = async inputValue => {
    const [{ Key, LocalizedName, AdministrativeArea }] = await getCityName(inputValue)
    const [{ IsDayTime, Temperature, WeatherIcon, WeatherText }] = await getCityWeather(Key)
    const stateUf =  AdministrativeArea.ID

    cityName.textContent = `${LocalizedName} - ${stateUf}`
    cityTemperature.textContent = Temperature.Metric.Value
    cityWeather.textContent = WeatherText

    showCardInfo()
    addImage(WeatherIcon, IsDayTime)
}

form.addEventListener('submit', event => {
    event.preventDefault()

    const inputValue = event.target.city.value

    if(!inputValue) {
        return
    }

    showCityWeather(inputValue)

    localStorage.setItem('searchedCity', inputValue)

    form.reset()
})

showCityLocalStorage()