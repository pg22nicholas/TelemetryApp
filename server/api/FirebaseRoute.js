/* Copyright (c) 2022 Nicholas Johnson */
const Express = require('express')
const Result = require('../../src/mixins/result.js')

import FirebaseConnection from '../../src/store/FirebaseConnection.js';
const db = new FirebaseConnection()

const Router = Express.Router();

import { v4 as uuidv4 } from 'uuid';

// retrieve a new record and send to Firebase to store
Router.post('/record_list', ( request, response, next ) => {
    
    /*
    [
        {
            objectType: Int, (ex. Player, Enemy, Damage, ...)
            sessionID: String (year.month.day:sessionID)
            data { 
                ...
            }
        },
    ...,
    ]      
    */
    const params = { ...request.params, ... request.query, ...request.body };
    
    // TODO: Send data to firebase
    console.log(params[0].objectType, params[0].sessionID)
    next();
})

// Generate a new unique session ID
Router.get('/generate-session-id', ( request, response, next ) => {
    
    let date_time = new Date();

    // get current date
    // adjust 0 before single digit date
    let day = ("0" + date_time.getDate()).slice(-2);

    // get current month
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

    // get current year
    let year = date_time.getFullYear();

    response.send(`${year}-${month}-${day}:${uuidv4()}`);
    next();
})


module.exports = Router;