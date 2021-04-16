const baseUrl = 'http://dataservice.accuweather.com/'
const APIKey = 'GGVAbRDXA8nyPauvqkGDNJlU5GWRxbtg'

const getCityURL= cityName => `${baseUrl}locations/v1/cities/search?apikey=${APIKey}&q=${cityName}`

const getWeatherUrl= cityKey => `${baseUrl}currentconditions/v1/${cityKey}?apikey=${APIKey}&language=pt-br`

const fetchData = async url => {
    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error('Não foi possível obter os dados!')
        }

        return response.json()
    } catch ({ name, message}) {
        alert(`${name}: ${message}`)
    }
}

const getCityName = cityName => {
    const cityUrl = getCityURL(cityName)
    return fetchData(cityUrl)
}

const getCityWeather = key => {
    const weatherUrl = getWeatherUrl(key)
    return fetchData(weatherUrl)
}
