/* Copyright (c) 2022 Nicholas Johnson */
const Express = require('express')
const Result = require('../../src/mixins/result.js')

import TData from "../../src/store/TData.js"

const recordList = TData.generateRecordList()

const Router = Express.Router();

Router.get('/player/player_damage', (request, response, next) => {
    response.send({ crow_player: 100, pheonix_player: 1000 })
    next()
})

module.exports = Router;