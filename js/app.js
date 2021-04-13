const form = document.querySelector('[data-js="change-location"]')
const cityName = document.querySelector('[data-js="city-name"]')
const cityTemperature = document.querySelector('[data-js="city-temperature"]')
const cityWeather = document.querySelector('[data-js="city-weather"]')
const cityCard = document.querySelector('[data-js="city-card"]')

const imgTime = document.querySelector('[data-js="time"]')
const imgIcon = document.querySelector('[data-js="time-icon"]')

const showCityWeather = async inputValue => {
    const [{ Key, LocalizedName, AdministrativeArea }] = await getCityName(inputValue)
    const [{ IsDayTime, Temperature, WeatherIcon, WeatherText }] = await getCityWeather(Key)
    const stateUf =  AdministrativeArea.ID

    cityName.textContent = `${LocalizedName} - ${stateUf}`
    cityTemperature.textContent = Temperature.Metric.Value
    cityWeather.textContent = WeatherText

    addImage(WeatherIcon, IsDayTime)
}

const addImage = (WeatherIcon, IsDayTime) => {
    imgIcon.innerHTML = `<img src="/src/icons/${WeatherIcon}.svg" />`
    imgTime.src = IsDayTime ? '/src/day.svg' : '/src/night.svg'
}

const showCardInfo = () => {
    const invisibleCard = cityCard.classList.contains('d-none')
    if(invisibleCard) {
        cityCard.classList.remove('d-none')
    }
}

form.addEventListener('submit', event => {
    event.preventDefault()
    const inputValue = event.target.city.value

    if(!inputValue) {
        return
    }

    showCardInfo()
    showCityWeather(inputValue)
    form.reset()
})