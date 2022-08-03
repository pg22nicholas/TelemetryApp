/* Copyright (c) 2022 Nicholas Johnson */
const Express = require('express')
const Result = require('../../src/mixins/result.js')

import TData from "../../src/store/TData.js"

const recordList = TData.generateRecordList()

const Router = Express.Router();

Router.get('/action-chart:/:id/:session', (request, response, next) => {
    // fetch page of xxx recs for clinet
    // for a session for a user, get all action counts

    /*
    returns {
        state: [],      // count of items
        deltaTime: []   // time in each state cumulative
    }

    states = { IDLE: 0, WALK: 1, RUN: 2, ATTACKING: 3, DODGING: 4, ... }
    */
})

module.exports = Router;