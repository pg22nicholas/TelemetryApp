/*
VUEX Data Store.
Copyright (c) 2022 Nicholas Johnson
*/
import Vue from 'vue'

import ExpressConnection from './ExpressConnection.js';
import FirebaseConnection from './FirebaseConnection.js';
import TData from './TData' // import POJS model objects
import { ChartTypes } from '../store/ChartData.js'

let db;
if (true)
    db = new ExpressConnection()
else
    db = new FirebaseConnection()

export default {
    // PRIVATE: model state of the application, a bunch of POJS objects
    state: {
        appTitle: "Game Telemetry Viewer",
        actionData: {},
        recordList: {},
        typeList: [],
        chartData: {
            0: [
                ['Year', 'Sales', 'Expenses'],
                ['2013', 1000, 400],
                ['2014', 1170, 460],
                ['2015', 660, 1120],
                ['2016', 1030, 540],
            ]
        },
    },

    // PUBLIC: injected into components
    // called to retrieve state data from the store
    getters: {
        title: state => state.appTitle,
        theInfo: state => state.actionData.info,
 
        recordList: state => state.recordList,
        typeList: state => state.typeList,
        actionSummary: state => state.chartData
    },

    // PUBLIC: injected into components
    // called to do things to the state via ajax and mutations
    actions: {
        deleteRecordFromStore( {commit }, data) {
            return new Promise(async( resolve, reject ) => {

                try {
                    let content = await db.delete(`/api/tdata/record/${data.type}`, { "id": data.id  })
                    commit('DELETE_RECORD', data.id)
                    resolve(content.status);
                } catch(error) {
                    console.log(error)
                    reject();
                }
            })
        },
        getRecords({ commit }, data) {
            return new Promise(async (resolve, reject) => {

                // TODO: data sent back in different form
                //  - convert to a list of records instead of object???
                try {
                    let validData = await db.read(`/api/tdata/record_list/${data.type}`)
                    commit('GET_RECORDS', validData.data)
                    resolve(validData);
                } catch(err) {
                    console.log(err)
                    reject(err)
                }

                
            })
        },
        getTypes({ commit }) {
            return new Promise(async (resolve, reject) => {
                try {
                    let validData = await db.read(`/api/tdata/type_list`)
                    commit('GET_TYPES', validData.data)
                    resolve(validData);
                } catch(err) {
                    console.log(err)
                    reject(err)
                }

                
            })
        },
        addRecord({ commit }, data) {
            return new Promise(async (resolve, reject) => {

                try {
                    let id = await db.add(`/api/tdata/record/${data.type}`, data.recordData)
                                        
                    let result = {};
                    data.recordData.id = id
                    result[id] = {...data.recordData}
                    commit('ADD_RECORD', result)
                    
                    resolve(id);
                } catch (errorData) {
                        console.log(errorData)
                        reject();
                }                
            })
        },
        
        /**
         * Store the chart data at an actionSummary index
         * @param {index: Number, chartType: String} params     Index number to store chart data, and the chart type
         * @returns Promise    
         */
        retrieveActionSummary({ commit }, params) {
            // post requset to server to get the data
            return new Promise(async (resolve, reject) => {
                
                let index = params.index
                let chartType = params.chartType
                try {
                    if (!chartType || !ChartTypes[chartType]) {
                        reject("Invalid ChartType: " + chartType)
                    }
                    let ChartData = ChartTypes[chartType]
                    let result = await db.read_chart(ChartData.endpoint)
                    let chartArray = ChartData.chartDataStruture({ ...result.data })
                    commit('UPDATE_ACTION_SUMMARY', { index: index, data: chartArray })
                    resolve()
                } catch (error) {
                    console.log(error)
                    reject(error)
                }
            })
        },
        // fetchActionSummary({commit}, params) {

        //     // post requset to server to get the data
        //     return new Promise((resolve, reject) => {
        //         // fill in the chartData once we get a response
        //         const id = 1234
        //         const session = '001'
        //         db.execute(`helloworld/:${id}/:${session}`)
        //             .then(result => {
        //                 commit('UPDATE_ACTION_SUMMARY', result.payload)
        //                 resolve(result.status)
        //             })
        //             .catch(error => {
        //                 console.log(error)
        //                 reject(error.status)
        //             })
        //     })
        // }
    },

    // PRIVATE: caled by actions to modify the state to prevent deadlock
    mutations: {
        SET_USER: (state, info) => { state.actionData.info = info },
        DELETE_RECORD: (state, id) => {
            Vue.delete(state.recordList, id)
        },
        GET_RECORDS: (state, data) => {
            state.recordList = data;
        },
        GET_TYPES: (state, data) => {
            state.typeList = data;
        },
        UPDATE_ACTION_SUMMARY: (state, info) => { 
            Vue.set(state.chartData, info.index, info.data) 
        },
        ADD_RECORD: (state, recordData) => { 
            let id = Object.keys(recordData)[0]
            Vue.set(state.recordList, id, recordData[id]) 
        }
    },

}
