/* Copyright (C) 2022 Scott Henshaw */
const Express = require('express')
const Result = require('../src/mixins/result.js')

const TDataRec = require('./TData.js')

const recordList = TDataRec.TData.generateRecordList()

const Router = Express.Router();

Router.delete('/record', ( request, response, next ) => {
    
    /*
    { 
        id: Int 
    }
    */
    const params = { ...request.params, ... request.query, ...request.body };

    let id = params.id

    // if id doesn't exist, failure
    if (!recordList[id]) {
        return response.status(101).end()
    }
    delete recordList[id]
    console.log(recordList)
    response.send("Successfully delete id: " + id);
    next();
})

Router.post('/record', ( request, response, next ) => {

    /*
    { 
        record: { version: String            
                sessionId: Int
                eventId: EventTriggerEnum
                location: { X: Int, Y: Int },  
                mapName: String
                actor: {
                    id: Int
                    state: AnimationStateEnum
                    health: Int
                    damageDone: Int
                    weapon: Int
                    heading: { X: Int, Y: Int, Z: Int },        
                    lookingVector: { X: Int, Y: Int, Z: Int },    
                    spawnAt: { X: Int, Y: Int, Z: Int },          
                    travelled: Int
                }   
            }
    }
    */
    const params = { ...request.params, ... request.query, ...request.body };

    // prevent adding record if incorrect structure
    if (!params.record) {
        return response.status(402).end()
    }

    let id = TDataRec.getNewIndex()
    recordList[id] = params.record

    console.log(recordList)

    // add single rec from client
    response.send("Added new record");
    next();
})

// fetch specific page of records
Router.get('/record_list', ( request, response, next ) => {
    
    const params = { ...request.params, ... request.query, ...request.body };
    response.send(recordList);

    next();
})


module.exports = Router;