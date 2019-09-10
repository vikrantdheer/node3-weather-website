const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/5b9b6d60074ecd3e2c9cb57829893509/' + latitude + ',' + longitude + '?units=si'

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service', undefined)
        } else if (body.error){
            callback('The given location is invalid.', undefined)
        } else {
            const temperature = body.currently.temperature
            const rainProbabilty = body.currently.precipProbability
            const visibilty = body.currently.visibility
            callback(undefined, body.daily.data[0].summary 
                + ' It is currently ' + temperature 
            + ' degrees out. There is a ' + rainProbabilty 
            + '% chance of rain with a visibilty of ' + visibilty)
        }
    })
}

module.exports = forecast