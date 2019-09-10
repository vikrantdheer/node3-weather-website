const request = require('request')

const geocode = (address, callback) => {
    
    const url = 'https://geocode.xyz/Hauptstr.,+57632+' + address + '?json=1%27'

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to Geolocation service', undefined)
        } else if(body.error){
            callback('Unable to find the coordinates', undefined)
        } else {
            callback(undefined, {
                latitude: body.latt,
                longitude: body.longt,
                location: body.standard.city + ', '+ body.standard.prov + ', '+ body.standard.countryname
            })
        }
    })
}

module.exports = geocode