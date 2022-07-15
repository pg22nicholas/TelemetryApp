/*
VUEX Data Store.
Copyright (c) 2022 Nicholas Johnson
*/
import Vue from 'vue'

import axios from 'axios'

import TData from './TData' // import POJS model objects

// const baseURL = `${LOCATION.PROTOCOL}//${LOCATION.HOSTNAME}:${LOCATION.PORT}`
// if (DEBUG) {
//     const baseURL = 'https://localhost:5000'
// }

const baseURL = 'http://127.0.0.1:5000/'
const dataStore = axios.create({baseURL: baseURL})

export default {
    // PRIVATE: model state of the application, a bunch of POJS objects
    state: {
        appTitle: "Game Telemetry Viewer",
        actionData: {},
        recordList: {}
    },

    // PUBLIC: injected into components
    // called to retrieve state data from the store
    getters: {
        title: state => state.appTitle,
        theInfo: state => state.actionData.info,
 
        recordList: state => state.recordList,
    },

    // PUBLIC: injected into components
    // called to do things to the state via ajax and mutations
    actions: {
        deleteRecordFromStore( {commit }, id) {
            return new Promise(( resolve, reject ) => {

                dataStore.delete('/api/tdata/record', { params: {"id": id }})
                    .then( content => {
                        console.log("Successfully deleted")
                        commit('DELETE_RECORD', id)
                        resolve(content.status);
                    })
                    .catch( error => {
                        console.log(error)
                        reject();
                    })
            })
        },
        getRecords( {commit}, params) {
            return new Promise(( resolve, reject ) => {

                dataStore.get('/api/tdata/record_list')
                    .then( content => {
                        console.log("Success")
                        commit('GET_RECORDS', content.data)
                        resolve(content.status);
                    })
                    .catch( error => {
                        console.log(error)
                        reject();
                    })
            })
        },
    },

    // PRIVATE: caled by actions to modify the state to prevent deadlock
    mutations: {
        SET_USER: ( state, info ) => { state.actionData.info = info },
        DELETE_RECORD: ( state, id ) => {
            Vue.delete(state.recordList, id)
        },
        GET_RECORDS: ( state, data ) => {
            state.recordList = data;
        }
    },

}
