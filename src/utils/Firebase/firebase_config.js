const admin = require("firebase-admin");
//const serviceAccount = require("./firebase_sdk.json");

const serviceAccount = require("../../../etc/secrets/firebase_sdk.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();
module.exports = auth;
