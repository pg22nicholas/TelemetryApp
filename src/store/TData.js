// Copyright (c) 2022 Nicholas Johnson

// temp data
export const rec = {
    // event triggered telemetry data
    type: "player",
    id: -1,                                     // auto generated unique rec id
    version: "2022.07.06-1234",                 // (string from data matching game)-session
    sessionId: 1234,                            // session within version
    eventId: 1,                                 // Event triggered by telemetry data (ENUM)
    location: { X: 0, Y: 0 },                   // location at event call   
    mapName: "base_map",                        // Name of map
    actor: {
        player_type: "crow_player",
        id: 0,                                  // actor id within session
        state: 0,                               // Animation state (ENUM)
        health: 100,                            // Current health
        damageDone: 50,                          // Damage done over actor's lifetime
        weapon: 2,                              // Current weapon equipped
        heading: { X: 0, Y: 0, Z: 0 },          // Vector where actor is going
        lookingVector: { X: 0, Y: 0, Z: 0 },    // Direction actor is looking (Normalized)
        spawnAt: { X: 0, Y: 0, Z: 0 },          // Actor initial spawn location
        travelled: 100,                         // Total distance actor travelled since spawn
    }   
}

export default class TData {

    constructor() {
        this.rec = { ...rec }
    }

    serialize() {
        return JSON.stringify(this.rec)
    }

    // generate a list of recs for testing
    static generateRecordList(type) {
        let result = {}
        for (let i = 0; i < 10; i++) {
            let data = {...new TData().rec }
            data.type = type
            data.id = i;
            result[i] = data
            index++
        }
        return result
    }
}

let index = 0
export const getNewIndex = () => {
    return index++;
}
