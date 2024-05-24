require("dotenv").config(); // Ensure this is called as early as possible

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./firebase"); // Ensure the path to firebase.js is correct
const twilioClient = require("./twilio"); // Ensure the path to twilio.js is correct

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Generate a random 6-digit access code
function generateAccessCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Route to create a new access code
app.post("/api/createNewAccessCode", async (req, res) => {
  const { phoneNumber } = req.body;
  const accessCode = generateAccessCode();

  try {
    // Save access code to Firestore
    await db.collection("accessCodes").doc(phoneNumber).set({ accessCode });

    // Send access code via SMS using Twilio
    await twilioClient.messages.create({
      body: `Your access code is ${accessCode}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    res.status(200).send({ message: "Access code sent to phone number" });
  } catch (error) {
    console.error("Error generating access code:", error);
    res.status(500).send({ error: "Failed to generate access code" });
  }
});

// Route to validate an access code
app.post("/api/validateAccessCode", async (req, res) => {
  const { accessCode, phoneNumber } = req.body;

  try {
    // Retrieve access code from Firestore
    const doc = await db.collection("accessCodes").doc(phoneNumber).get();

    if (!doc.exists) {
      return res
        .status(400)
        .send({ success: false, message: "Phone number not found" });
    }

    const savedAccessCode = doc.data().accessCode;

    // Validate access code
    if (savedAccessCode === accessCode) {
      // Clear the access code after successful validation
      await db
        .collection("accessCodes")
        .doc(phoneNumber)
        .update({ accessCode: "" });
      return res.status(200).send({ success: true });
    } else {
      return res
        .status(400)
        .send({ success: false, message: "Invalid access code" });
    }
  } catch (error) {
    console.error("Error validating access code:", error);
    res.status(500).send({ error: "Failed to validate access code" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
