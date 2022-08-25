const functions = require("firebase-functions");
const admin = require("firebase-admin") 
admin.initializeApp()

const db = admin.firestore()


class TelemetryFunctions {
    
    constructor() {}

    exports() {
        return {
            //helloWorld: functions.https.onRequest(this.helloWorld),
            damagerPerPlayer: functions.firestore.document('Telemetry/player/data/{documentID}').onDelete((change, context) => {
                // let afterSnap = change.after
                // this.db.doc('telemetry/player').add({ test: "test" })
                functions.logger.log("Hello from info. Here's an object:")
            }),
            // testFunc: functions.pubsub.schedule('every 1 minutes').onRun(this.testScheduleFunc)
            
        }
    }

    helloWorld(request, response) {
        functions.logger.info("Hello logs!", {structuredData: true});
        response.json({ result: "Hello from Firebase!" });
      }

    damagerPerPlayer(change, context) {
        // let afterSnap = change.after
        // this.db.doc('telemetry/player').add({ test: "test" })
        functions.logger.log("Hello from info. Here's an object:")
    }

    testScheduleFunc(context) {
        console.log("test schedule func")
    }
}

exports.damagerPerPlayer = functions.firestore
    .document('telemetry/player/data/{documentID}')
    .onCreate(async (change, context) => {
        let damageDone = change.get("actor.damageDone")
        let playerType = change.get("actor.player_type")
        // let afterSnap = change.after
        let snapShot = await db.doc('telemetry/player').get()
        if (snapShot.exists) {
            let currDamage = snapShot.get(`player_damage.${playerType}`)
            db.doc('telemetry/player').update(`player_damage.${playerType}`, currDamage + damageDone)
            functions.logger.log(snapShot.get("player_damage"))
        }
    })

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions


