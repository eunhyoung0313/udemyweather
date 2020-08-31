const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=4102c0d8a8fcc02e530ab472bf878fdc&query=${longitude},${latitude}&units=f`
    request({ url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connetc to weather services')
        }else if ( body.error ){
            callback('Unable to find weather. Try another search!!!', undefined)

        }else{
            callback(undefined, body.current.weather_descriptions[0] + ". Today, temperature is " + body.current.temperature  +" and it feels like " + body.current.feelslike)
        }
    })
}
module.exports= forecast