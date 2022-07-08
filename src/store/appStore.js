/*
VUEX Data Store.
Copyright (c) 2019. Scott Henshaw, Kibble Online Inc. All Rights Reserved.
*/
import Vue from 'vue'
import Vuex from 'vuex'

import Axios from 'axios'

//const baseURL = `${LOCATION.PROTOCOL}//${LOCATION.HOSTNAME}:${LOCATION.PORT}`;
//const Remote = Axios.create( { baseURL: baseURL });

import TData from './TData' // import POJS model objects



export default {
    // PRIVATE: model state of the application, a bunch of POJS objects
    state: {
        appTitle: "Game Telemetry Viewer",
        actionData: {},
        rec: new TData(), // TODO: convert to list of records
        recordList: TData.generateRecordList(),
    },

    // PUBLIC: injected into components
    // called to retrieve state data from the store
    getters: {
        title: state => state.appTitle,
        theInfo: state => state.actionData.info,
 
        singleRec: state => state.rec,  // TODO: Should be a list of records
        recordList: state => state.recordList,
    },

    // PUBLIC: injected into components
    // called to do things to the state via ajax and mutations
    actions: {

        updateSingle( { commit }, rec ) {

            commit('UPDATE_RECORD', rec );
        },

        doAction({ commit }, params ) {
            // return promises here if required,
            // this is also where to use AJAX to call a server
            /*
            return new Promise(( resolve, reject ) => {

                Axios.post('/api/model/action', params )
                    .then( response => response.data )
                    .then( data => (data.error ? error => { throw( error ) }: data.payload ))
                    .then( content => {
                        commit('SET_USER', content.info )
                        resolve( content.status );
                    })
                    .catch( error => {
                        console.log('Seems that role has already been taken.')
                        reject();
                    })
            })
            */
        }
    },

    // PRIVATE: caled by actions to modify the state to prevent deadlock
    mutations: {
        SET_USER: ( state, info ) => { state.actionData.info = info },
        UPDATE_RECORD: ( state, rec ) => { state.rec = rec },
    },

}
