const admin = require("firebase-admin");

// Import the service account key JSON file
const serviceAccount = require("../serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://skiplitest-44b47.firebaseio.com",
});

const db = admin.firestore();
module.exports = db;
