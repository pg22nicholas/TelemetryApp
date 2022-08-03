/*
VUEX Data Store.
Copyright (c) 2022 Nicholas Johnson
*/
import Vue from 'vue'



import ExpressConnection from './ExpressConnection.js';
import FirebaseConnection from './FirebaseConnection.js';
import TData from './TData' // import POJS model objects

import { DEBUG } from '../store.js';

let db;
if (false)
    db = new ExpressConnection()
else
    db = new FirebaseConnection()

export default {
    // PRIVATE: model state of the application, a bunch of POJS objects
    state: {
        appTitle: "Game Telemetry Viewer",
        actionData: {},
        recordList: {},
        chartData: [
            ['Year', 'Sales', 'Expenses'],
           ['2013', 1000, 400],
           ['2014', 1170, 460],
           ['2015', 660, 1120],
           ['2016', 1030, 540],
       ],
    },

    // PUBLIC: injected into components
    // called to retrieve state data from the store
    getters: {
        title: state => state.appTitle,
        theInfo: state => state.actionData.info,
 
        recordList: state => state.recordList,
        actionSummary: state => state.chartData
    },

    // PUBLIC: injected into components
    // called to do things to the state via ajax and mutations
    actions: {
        deleteRecordFromStore( {commit }, id) {
            return new Promise(async( resolve, reject ) => {

                try {
                    let content = await db.delete('/api/tdata/record', { "id": id  })
                    commit('DELETE_RECORD', id)
                    resolve(content.status);
                } catch(error) {
                    console.log(error)
                    reject();
                }
            })
        },
        getRecords({ commit }) {
            return new Promise(async (resolve, reject) => {

                // TODO: data sent back in different form
                //  - convert to a list of records instead of object???
                let validData = await db.read('/api/tdata/record_list')
                    .catch (errorData => {
                        console.log(errorData)
                        reject();
                    })

                console.log("data" + validData)
                commit('GET_RECORDS', validData.data)
                resolve(validData);
            })
        },
        fetchActionSummary({commit}, params) {

            // post requset to server to get the data
            return new Promise((resolve, reject) => {
                // fill in the chartData once we get a response
                const id = 1234
                const session = '001'
                db.execute(`helloworld/:${id}/:${session}`)
                    .then(result => {
                        commit('UPDATE_ACTION_SUMMRY', result.payload)
                        resolve(result.status)
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error.status)
                    })
            })
        }
    },

    // PRIVATE: caled by actions to modify the state to prevent deadlock
    mutations: {
        SET_USER: ( state, info ) => { state.actionData.info = info },
        DELETE_RECORD: ( state, id ) => {
            Vue.delete(state.recordList, id)
        },
        GET_RECORDS: ( state, data ) => {
            state.recordList = data;
        },
        UPDATE_ACTION_SUMMRY: (state, data) => { state.charData = data }
    },

}
