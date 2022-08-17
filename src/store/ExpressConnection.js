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

    read(request, type) {
        return new Promise(( resolve, reject ) => {

            this.db.get(request + `/${type}`)
                .then(content => {
                    resolve(content);
                })
                .catch(error => {
                    console.log(error)
                    reject(error);
                })
        })
    }

    delete(request, data, type) {
        return new Promise((resolve, reject) => {

            this.db.delete(request + `/${type}`, {"params": { ...data }} )
                .then(content => {
                    resolve(content)
                })
                .catch(error => {
                    console.log(error)
                    reject(error);
                })
        })
    }

    add(request, data, type) {
        console.log(data)
        return new Promise((resolve, reject) => {

            this.db.post(request + `/${type}`, {"params": { ...data }} )
                .then(content => {
                    resolve(content.data.id)
                })
                .catch(error => {
                    console.log(error)
                    reject(error);
                })
        })
    }

}
