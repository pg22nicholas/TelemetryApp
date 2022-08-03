const functions = require("firebase-functions");
const fb = require("firebase-admin") 

class TelemetryFunctions {

    constructor() {
        
        fb = initializeApp()
        this.db = getFirestore(fb)
    }

    exports() {
        return {
            helloWorld: functions.https.onRequest(this.helloWorld)
        }
    }

    helloWorld(request, response) {
        functions.logger.info("Hello logs!", {structuredData: true});
        response.send("Hello from Firebase!");
      }
}
const telemetry = new TelemetryFunctions()
exports = telemetry.exports

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions


