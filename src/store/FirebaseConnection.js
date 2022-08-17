/* Copyright (C) 2022 Nicholas Johnson */

'use strict'

import Connection from './connection.js'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

import { collection, getDocs, getDoc, doc, deleteDoc, addDoc  } from "firebase/firestore"; 
import { resolve } from 'path';

import axios from 'axios'
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
        // TODO: find proper URL
        const functionsURL = `https://us-central1-${this.fbConfig.projectId}.cloudfunctions.net`
        this.functions = axios.create({baseURL: functionsURL})
        this.fb = initializeApp(this.fbConfig)
        this.db = getFirestore(this.fb)
    }

    open() {

    }

    close() {

    }

    execute(request, data) {
        return new Primise((resolve, reject) => {
            this.functions.get('helloWorld')
                .then(data => {
                    console.log()
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    read(request, type) {

        return new Promise(async ( resolve, reject ) => {

            
            let result = {}
            try {
                const querySnapshot = await getDocs(collection(this.db, "telemetry"));
                querySnapshot.forEach((doc) => {
                    let data = doc.data()
                    data.id = doc.id
                    console.log(JSON.stringify(doc.data()))
                    //console.log(`${doc.id} => ${doc.data()}`);
                    result[doc.id] = data
                });
            } catch (error) {
                console.log(error)
                reject(error)
            }
            resolve({data: result, status: 200})
        })
    }

    delete(request, data) {
        return new Promise(async (resolve, reject) => {
            try {
                await deleteDoc(doc(this.db, "telemetry", data.id))
                resolve({ status: 100 })
            } catch(error) {
                console.log(error)
                reject(error)
            }
            
        })
    }

    add(request, data) {
        return new Promise(async (resolve, reject) => {
            try {
                // prevent adding record with no type key
                if (!data.type) {
                    reject("Record must have a type key")
                    return
                }

                let docTypeRef = await doc(this.db, `telemetry/${data.type}`)
                let docTypeSnapshot = await getDoc(docTypeRef)
                // prevent adding data to an invalid type key
                if (!docTypeSnapshot.exists()) {
                    reject("Record must have a type that already exists")
                    return
                }

                // find the data collection and add a new record document in it
                let collectionDataRef = await collection(this.db, `telemetry/${data.type}/data`)
                let docDataRef = await addDoc(collectionDataRef, {...data})
                resolve(docDataRef.id)
            } catch(error) {
                console.log(error)
                reject(error)
            }
        })
    }

    callCloudHello() {

    }
}
