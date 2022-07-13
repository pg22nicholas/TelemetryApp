/* Copyright (C) 2022 Scott Henshaw */
const Express = require('express')
const Result = require('../src/mixins/result.js')

const TDataRec = require('./TData.js')

const recordList = TDataRec.TData.generateRecordList()

const Router = Express.Router();

Router.delete('/record', ( request, response, next ) => {
    
    const params = { ...request.params, ... request.query, ...request.body };

    response.send("something");
    next();
})

Router.post('/record', ( request, response, next ) => {

    /*
    { record: { version: "2022.07.06-1234",                 // (string from data matching game)-session
                sessionId: 1234,                            // session within version
                eventId: 1,                                 // Event triggered by telemetry data (ENUM)
                location: { X: 0, Y: 0 },                   // location at event call   
                mapName: "base_map",                        // Name of map
                actor: {
                    id: 0,                                  // actor id within session
                    state: 0,                               // Animation state (ENUM)
                    health: 100,                            // Current health
                    damageDone: 0,                          // Damage done over actor's lifetime
                    weapon: 2,                              // Current weapon equipped
                    heading: { X: 0, Y: 0, Z: 0 },          // Vector where actor is going
                    lookingVector: { X: 0, Y: 0, Z: 0 },    // Direction actor is looking (Normalized)
                    spawnAt: { X: 0, Y: 0, Z: 0 },          // Actor initial spawn location
                    travelled: 100,                         // Total distance actor travelled since spawn
                }   
            }
    }
    */
    const params = { ...request.params, ... request.query, ...request.body };

    let id = TDataRec.getNewIndex()
    recordList[id] = params.record

    console.log(recordList)

    // add single rec from client
    response.send("Added new record");
    next();
})


Router.get('/record_list', ( request, response, next ) => {
    // fetch page of xxx recs for client
    response.send(recordList);

    next();
})


module.exports = Router;