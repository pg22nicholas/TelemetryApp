/* Copyright (C) 2022 Nicholas Johnson */

'use strict'

import Connection from './connection.js'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

import { collection, getDocs, getDoc, doc, deleteDoc, addDoc, query  } from "firebase/firestore"; 
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

    read(request) {
        console.log(request)
        return new Promise(async ( resolve, reject ) => {

            try {
                if (request.includes("record_list")) {
                    let result = {}
                    let type = this.getLastParamfromHTTP(request)
                    const collectionRef = await collection(this.db, `telemetry/${type}/data`)
                    let collectionQuery = await query(collectionRef)
                    let querySnapshot = await getDocs(collectionQuery)
                    querySnapshot.forEach((doc) => {
                        result[doc.id] = doc.data()
                    })
                    resolve({data: result, status: 200})
                } else {
                    let collectionDataRef = await collection(this.db, `telemetry`)
                    let collectionQuery = await query(collectionDataRef)
                    let querySnapshot = await getDocs(collectionQuery)
                    let listOfTypes = []
                    querySnapshot.forEach((doc) => {
                        listOfTypes.push(doc.id)
                    })
                    resolve({data: listOfTypes, status: 200})
                }

            } catch (error) {
                console.log(error)
                reject(error)
            }
            
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

    // Hlper for retrieving the type param from an HTTP request
    getLastParamfromHTTP(request) {
        console.log(request)
        let split = request.split("/")
        let lastSplit = split[split.length - 1]
        let param = lastSplit.split("?")[0]
        return param
    }
}
