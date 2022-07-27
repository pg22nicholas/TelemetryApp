/* Copyright (C) 2022 Nicholas Johnson */

'use strict'

import Connection from './connection.js'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

import { collection, getDocs } from "firebase/firestore"; 
import { resolve } from 'path';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// abstract class
export default class FirebaseConnection extends Connection {

    
    constructor() {
        super()

        this.fbConfig = {
            apiKey: "AIzaSyBuopamct0dtwY6qTEekyOIWN2yRYQstWU",
            authDomain: "telemetryapp-26ab5.firebaseapp.com",
            projectId: "telemetryapp-26ab5",
            storageBucket: "telemetryapp-26ab5.appspot.com",
            messagingSenderId: "899925976647",
            appId: "1:899925976647:web:0b1160ff53ed2a61dd3362",
            measurementId: "G-2S0K235ZR3"
        }
        this.fb = initializeApp(this.fbConfig)
        this.db = getFirestore(this.fb)
    }

    open() {

    }

    close() {

    }

    create(request, data) {

    }

    read(request) {

        return new Promise(async ( resolve, reject ) => {

            let result = {}
            try {
                const querySnapshot = await getDocs(collection(this.db, "telemetry"));
                querySnapshot.forEach((doc) => {
                    let data = doc.data()
                    console.log(JSON.stringify(doc.data()))
                    //console.log(`${doc.id} => ${doc.data()}`);
                    result[data.id] = data
                });
            } catch (error) {
                console.log(error)
                reject(error)
            }
            resolve({data: result, status: 200})
            

            

            resolve({data: "", error: 101})
            // // request is /api/tdData/recordList
            // return new Promise((resolve, reject) => {

            //     this.db.automaticDataCollectionEnabled('telemetry')
            //         .then(collection => {
            //             resolve(collection)
            //         })
            //         .catch(error => {
            //             console.log(error)
            //             reject(error)
            //         })
            // })
        })
    }

    update(request, data) {

    }

    delete(request, data) {

    }
}
