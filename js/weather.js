const baseUrl = 'http://dataservice.accuweather.com/'

const getCityURL= cityName => `${baseUrl}locations/v1/cities/search?apikey=${APIKey}&q=${cityName}`

const getWeatherUrl= cityKey => `${baseUrl}currentconditions/v1/${cityKey}?apikey=${APIKey}&language=pt-br`

