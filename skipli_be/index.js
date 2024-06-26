require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./services/firebase");
const twilioClient = require("./services/twilio");
const transporter = require("./services/nodemailer");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Open chat with Gemini and set Token
async function startChat(messages) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const chat = model.startChat({
    history: messages,
    generationConfig: {
      maxOutputTokens: 200,
    },
  });
  return chat;
}

// (POST) GeneratePostCaptions
app.post("/api/generatePostCaptions", async (req, res) => {
  const { socialNetwork, subject, tone } = req.body;
  const messages = [
    {
      role: "user",
      parts: [
        {
          text: `Generate captions for ${socialNetwork} about ${subject} with a ${tone} tone.`,
        },
      ],
    },
  ];

  try {
    const chat = await startChat(messages);
    const result = await chat.sendMessage("");
    const response = await result.response;
    const text = response.text();
    res.status(200).send({ captions: text.split("\n") });
  } catch (error) {
    console.error("Error generating post captions:", error);
    res.status(500).send({ error: "Failed to generate post captions" });
  }
});

// (POST) GetPostIdeas
app.post("/api/getPostIdeas", async (req, res) => {
  const { topic } = req.body;
  const messages = [
    {
      role: "user",
      parts: [
        {
          text: `Generate a bulleted list of items 10 post ideas about ${topic}. Each idea just need 1 sentence, should be unique and start with index number. (Do not need to go into detail, just a brief idea.). Start with the first idea.`,
        },
      ],
    },
  ];

  try {
    const chat = await startChat(messages);
    const result = await chat.sendMessage("");
    const response = await result.response;
    const text = response.text();
    res.status(200).send({ ideas: text.split("\n") });
  } catch (error) {
    console.error("Error generating post ideas:", error);
    res.status(500).send({ error: "Failed to generate post ideas" });
  }
});

// (POST) CreateCaptionsFromIdeas
app.post("/api/createCaptionsFromIdeas", async (req, res) => {
  const { idea } = req.body;
  const messages = [
    {
      role: "user",
      parts: [{ text: `Generate captions for the idea: ${idea}.` }],
    },
  ];

  try {
    const chat = await startChat(messages);
    const result = await chat.sendMessage("");
    const response = await result.response;
    const text = response.text();
    res.status(200).send({ captions: text.split("\n") });
  } catch (error) {
    console.error("Error generating captions from idea:", error);
    res.status(500).send({ error: "Failed to generate captions from idea" });
  }
});

// (POST) SaveGeneratedContent
app.post("/api/saveGeneratedContent", async (req, res) => {
  const { topic, data, userIdentifier } = req.body; // Include userIdentifier in the request body

  try {
    await db
      .collection("generatedContents")
      .add({ topic, data, userIdentifier });
    res.status(200).send({ success: true });
  } catch (error) {
    console.error("Error saving generated content:", error);
    res.status(500).send({ error: "Failed to save generated content" });
  }
});

// (GET) GetUserGeneratedContents
app.get("/api/getUserGeneratedContents", async (req, res) => {
  const { userIdentifier } = req.query; // Use userIdentifier in the query parameters

  try {
    const snapshot = await db
      .collection("generatedContents")
      .where("userIdentifier", "==", userIdentifier)
      .get();
    const contents = snapshot.docs.map((doc) => doc.data());
    res.status(200).send(contents);
  } catch (error) {
    console.error("Error fetching user generated contents:", error);
    res.status(500).send({ error: "Failed to fetch user generated contents" });
  }
});

// (POST) UnSaveContent
app.post("/api/unSaveContent", async (req, res) => {
  const { captionId } = req.body;

  try {
    await db.collection("generatedContents").doc(captionId).delete();
    res.status(200).send({ success: true });
  } catch (error) {
    console.error("Error deleting generated content:", error);
    res.status(500).send({ error: "Failed to delete generated content" });
  }
});

// Generate a random 6-digit access code
function generateAccessCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Validate phone number and email format
function isValidPhoneNumber(phoneNumber) {
  return typeof phoneNumber === "string" && phoneNumber.trim().length > 0;
}

function isValidEmail(email) {
  return (
    typeof email === "string" && email.includes("@") && email.includes(".")
  );
}

// (POST) Create a new access code and send via SMS
app.post("/api/sendAccessCodeViaPhone", async (req, res) => {
  const { phoneNumber } = req.body;

  if (!isValidPhoneNumber(phoneNumber)) {
    return res.status(400).send({ error: "Invalid phone number" });
  }

  const accessCode = generateAccessCode();

  try {
    await db.collection("accessCodes").doc(phoneNumber).set({ accessCode });

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

// (POST) Create a new access code and send via Email
app.post("/api/sendAccessCodeViaEmail", async (req, res) => {
  const { email } = req.body;

  if (!isValidEmail(email)) {
    return res.status(400).send({ error: "Invalid email address" });
  }

  const accessCode = generateAccessCode();

  try {
    await db.collection("accessCodes").doc(email).set({ accessCode });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Access Code",
      text: `Your access code is ${accessCode}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res
          .status(500)
          .send({ error: "Failed to send access code via email" });
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).send({ message: "Access code sent to email" });
  } catch (error) {
    console.error("Error generating access code:", error);
    res.status(500).send({ error: "Failed to generate access code" });
  }
});

// (POST) Validate an access code
app.post("/api/validateAccessCode", async (req, res) => {
  const { accessCode, phoneNumber, email } = req.body;

  try {
    let doc;

    if (phoneNumber) {
      if (!isValidPhoneNumber(phoneNumber)) {
        return res.status(400).send({ error: "Invalid phone number" });
      }

      doc = await db.collection("accessCodes").doc(phoneNumber).get();
    } else if (email) {
      if (!isValidEmail(email)) {
        return res.status(400).send({ error: "Invalid email address" });
      }

      doc = await db.collection("accessCodes").doc(email).get();
    } else {
      return res
        .status(400)
        .send({ error: "Phone number or email is required" });
    }

    if (!doc.exists) {
      return res
        .status(400)
        .send({ success: false, message: "Document not found" });
    }

    const savedAccessCode = doc.data().accessCode;

    if (savedAccessCode === accessCode) {
      await db
        .collection("accessCodes")
        .doc(phoneNumber || email)
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
