/* Copyright (C) 2022 Nicholas Johnson */

'use strict'

import Connection from './connection.js'
import axios from 'axios'

const baseURL = 'http://127.0.0.1:5000/'

// const baseURL = `${LOCATION.PROTOCOL}//${LOCATION.HOSTNAME}:${LOCATION.PORT}`
// if (DEBUG) {
//     const baseURL = 'https://localhost:5000'
// }

// abstract class
export default class ExpressConnection extends Connection {

    constructor() {
        super()
        this.db = axios.create({baseURL: baseURL})
    }

    open() {

    }

    close() {

    }

    create(request, data) {

    }

    read(request) {
        return new Promise(( resolve, reject ) => {

            this.db.get(request)
                .then(content => {
                    resolve(content);
                })
                .catch(error => {
                    console.log(error)
                    reject(error);
                })
        })
    }

    update(request, data) {
        // assyme route on `/api/tdata/actionSummary/:id/:session
    }

    delete(request, data) {
        return new Promise((resolve, reject) => {

            this.db.delete(request)
                .then(content => {
                    resolve(content)
                })
                .catch(error => {
                    console.log(error)
                    reject(error);
                })
        })
    }
}
