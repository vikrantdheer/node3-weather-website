const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home page',
        name: 'Vikrant Dheer'
    })
})

app.get('/weather', (request, response) => {

    const address = request.query.address
    
    if(!address){
        return response.render('error', {
            title: 'Error',
            name: 'Vikrant Dheer',
            error : 'You must provide address !!'
        })
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        
        // if(error){
        //     return response.render(('error'), {
        //         title: 'Error',
        //         name: 'Vikrant Dheer',
        //         error: error 
        //     })
        // } 

        if(error){
            return response.send({
                title: 'Error',
                name: 'Vikrant Dheer',
                error: error
            })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return response.render(('error'), {
                    title: 'Error',
                    name: 'Vikrant Dheer',
                    error: error 
                })
            }

            // response.render(('weather'), {
            //     title: 'Weather summary',
            //     name: 'Vikrant Dheer',
            //     forecast: forecastData,
            //     location: address
            // })
            
            response.send({
                title: 'Weather summary',
                name: 'Vikrant Dheer',
                forecast: forecastData,
                location: address
            })
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Vikrant Dheer'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help section',
        name: 'Vikrant Dheer',
        helpMessage: 'Hi this is help page !!'
    })
})

app.get('/help/*', (req, res) => {
    res.render('helpDocs', {
        title: 'Help section',
        name: 'Vikrant Dheer',
        error: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'You are stuck !!',
        name: 'Vikrant Dheer',
        error: 'Page not found'
    })
})


app.listen(3001, () => {
    console.log('Server started on port 3001')
})