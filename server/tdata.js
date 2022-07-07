/* Copyright (C) 2022 Scott Henshaw */
const Express = require('express')
const Result = require('../src/mixins/result')

const TDataRec = require('../src/store/TData.js')

const Router = Express.Router();

Router.delete('/single', ( request, response, next ) => {
    // fetch single rec for client
    const params = { ...request.params, ... request.query, ...request.body };

    response.send("something");
    next();
})


Router.get('/single', ( request, response, next ) => {
    // fetch single rec for client
    response.send("something");
    next();
})

Router.post('/single', ( request, response, next ) => {
    // addd/update single rec from client
    response.send("something");
    next();
})


Router.get('/multi', ( request, response, next ) => {
    // fetch page of xxx recs for client
    response.send("something");
    next();
})


module.exports = Router;