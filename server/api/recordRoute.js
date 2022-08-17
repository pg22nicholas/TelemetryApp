/* Copyright (c) 2022 Nicholas Johnson */
const Express = require('express')
const Result = require('../../src/mixins/result.js')

import TData from "../../src/store/TData.js"
import { getNewIndex } from "../../src/store/TData.js"

const recordList = { player: TData.generateRecordList("player"), enemy: TData.generateRecordList("enemy") }

const Router = Express.Router();

// deletes a single record by ID
Router.delete('/record/:type', ( request, response, next ) => {
    
    /*
    { 
        params: {
            id: Int 
        }
        type: String
    }
    */
    const params = { ...request.params, ... request.query, ...request.body };
    console.log(params)

    let id = params.id
    let type = params.type

    // if id doesn't exist, failure
    if (!recordList[type][id]) {
        return response.status(101).end()
    }
    delete recordList[type][id]
    console.log(recordList)
    response.send("Successfully delete id: " + id);
    next();
})

// adds a new record
Router.post('/record/:type', ( request, response, next ) => {

    /*
    { 
        type: String
        params: {
            id: Int
            version: String            
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
    const params = { ...request.params, ... request.query, ...request.body};

    let id = getNewIndex()
    let type = params.type
    recordList[type][id] = { ...params.params }
    // update id to newly stored id
    recordList[type][id].id = id

    // add single rec from client
    response.send({ id: id });
    next();
})

// fetch specific page of records
Router.get('/record_list/:type', ( request, response, next ) => {
    
    /*
    {
        type: String
    }
    */
    const params = { ...request.params }
    console.log(params)
    response.send(recordList[params.type]);
    next();
})


module.exports = Router;