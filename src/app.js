const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode= require('./utils/geocode')
const forecast = require('./utils/forecast')
console.log(__dirname)
console.log(path.join(__dirname, '../public'))
const app = express()
//express가 알아듣게 경로 설정 views path 는 vies 안에 hbs 파일 읽을 수있게 설정
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')
//hadlebar 설정, views 가 어딨는지 customize중
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Andrew"
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'eun'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: "eun",
        content: 'This is a help page for this app'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : "you must send an address!"
        })
    }
    geocode( req.query.address , ( error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send( {error} );
        } 
        forecast( latitude, longitude, (error, forecastdata) => {
          if (error) {
            return res.send({error });
          }
         res.send({  location: location,
                     forecast: forecastdata,
                     latitude,
                     longitude,
                     address: req.query.address}) 
           
        });
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error : "You must provide a search term"
        })
    } 
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: "error page",
        name: "eun",
        errorMessage: "Help article not found"})
})
app.get('*', (req, res) => {
 res.render('error', {
    title: "error page",
    name: "eun",
    errorMessage: "Page not found"
})
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})