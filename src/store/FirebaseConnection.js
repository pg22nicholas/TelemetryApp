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

    read(request) {
        console.log(request)
        return new Promise(async ( resolve, reject ) => {

            try {
                if (request.includes("record_list")) {
                    let result = {}
                    let type = this.getLastParamfromHTTP(request)
                    let querySnapshot = await this.getCollectionQuerySnapshot(`telemetry/${type}/data`)
                    querySnapshot.forEach((doc) => {
                        result[doc.id] = doc.data()
                    })
                    resolve({data: result, status: 200})
                } else {
                    let querySnapshot = await this.getCollectionQuerySnapshot(`telemetry`)
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
                if (request.includes('/api/tdata/record/')) {
                    let type = this.getLastParamfromHTTP(request)
                    let docRef = await doc(this.db, `telemetry/${type}/data/${data.id}`)
                    await deleteDoc(docRef)
                    resolve({ status: 100 })
                }
                
            } catch(error) {
                console.log(error)
                reject(error)
            }
        })
    }

    add(request, data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (request.includes("/api/tdata/record/")) {
                    let type = this.getLastParamfromHTTP(request)

                    // prevent adding record with no type key
                    if (!type) {
                        reject("Record must have a type key")
                        return
                    }

                    data.type = type

                    // prevent adding data to an invalid type key
                    if (!this.isDocumentExists(`telemetry/${type}`)) {
                        reject("Record must have a type that already exists")
                        return
                    }

                    // find the data collection and add a new record document in it
                    let collectionDataRef = await collection(this.db, `telemetry/${data.type}/data`)
                    let docDataRef = await addDoc(collectionDataRef, {...data})
                    resolve(docDataRef.id)
                }
                
            } catch(error) {
                console.log(error)
                reject(error)
            }
        })
    }

    // Hlper for retrieving the type param from an HTTP request
    getLastParamfromHTTP(request) {
        return this.getParamAtEndFromHTTP(request, 0)
    }

    /**
     * Get the params in http request from the end of the request
     * @param {Int} paramsFromLast  Number of params from the end to retrieve. 0 retrieves last param
     * @returns                     Param paramsFromLast from the end of requet
     */
    getParamAtEndFromHTTP(request, paramsFromLast) {
        console.log(request)
        let split = request.split("/")
        let lastSplit = split[split.length - 1 - paramsFromLast]
        let param = lastSplit.split("?")[0]
        return param
    }

    // Helper for retrieving a query snapshot of a collection
    // @param path  firestore path to collection
    // returns      Collection query snapshot
    async getCollectionQuerySnapshot(path) {
        const collectionRef = await collection(this.db, path)
        let collectionQuery = await query(collectionRef)
        return await getDocs(collectionQuery)
    }

    // checks if a document exists
    // @param path      firestore path to document
    // returns          True if the document exists
    async isDocumentExists(path) {
        let docTypeRef = await doc(this.db, path)
        let docTypeSnapshot = await getDoc(docTypeRef)
        // prevent adding data to an invalid type key
        return docTypeSnapshot.exists()
    }

    read_chart(request) {
        return new Promise(async (resolve, reject) => {

            let objectType = this.getParamAtEndFromHTTP(request, 1)
            let chartType = this.getParamAtEndFromHTTP(request, 0)
            let docSnap;
            try {
                let path = `telemetry/${objectType}`
                const docRef = await doc(this.db, path);
                docSnap = await getDoc(docRef);
            } catch (error) {
                console.log(error)
                reject(error)
            }
           
            if (docSnap.exists()) {
                resolve({ data: docSnap.data()[chartType], status: 200 })
            } else {
                reject("document doesn't exist")
            }
        })
    }
}
