/* Copyright (c) 2022 Nicholas Johnson */
const Express = require('express')
const Result = require('../../src/mixins/result.js')

import FirebaseConnection from '../../src/store/FirebaseConnection.js'
const db = new FirebaseConnection()

const Router = Express.Router()

import { v4 as uuidv4 } from 'uuid'

// retrieve a new record and send to Firebase to store
Router.post('/record_list', ( request, response, next ) => {
    
    /*
    {
        data: 
        [
            {
            objectType: Int, (ex. Player, Enemy, Damage, ...),
            sessionID: String (year.month.day:sessionID),
            ...
            },
            ...
        ]
    } 
    */
    const params = { ...request.body }
    const data = params.data

    for (let record in data) {
        // TODO: Send data to firebase
        console.log(data[record].objectType, data[record].sessionID)
        //db.add(`/api/tdata/record/${record.objectType}`, record)
    }
    
    response.send()
    next()
})

// Generate a new unique session ID
Router.get('/generate-session-id', ( request, response, next ) => {
    
    let date_time = new Date()

    // get current date
    // adjust 0 before single digit date
    let day = ("0" + date_time.getDate()).slice(-2)

    // get current month
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2)

    // get current year
    let year = date_time.getFullYear()

    response.send(`${year}-${month}-${day}:${uuidv4()}`)
    next()
})


module.exports = Router;