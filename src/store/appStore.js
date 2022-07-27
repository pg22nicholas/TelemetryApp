/*
VUEX Data Store.
Copyright (c) 2022 Nicholas Johnson
*/
import Vue from 'vue'



import ExpressConnection from './ExpressConnection.js';
import FirebaseConnection from './FirebaseConnection.js';
import TData from './TData' // import POJS model objects

const DEBUG = false

let db;
if (DEBUG)
    db = new ExpressConnection()
else
    db = new FirebaseConnection()

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
            return new Promise(async( resolve, reject ) => {

                let content = await this.db.delete('/api/tdata/record', { params: {"id": id  }})
                    .catch (errorData => {
                        console.log(errorData)
                        reject();
                    })

                commit('DELETE_RECORD', id)
                resolve(content.status);
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
