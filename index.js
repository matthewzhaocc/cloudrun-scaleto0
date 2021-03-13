const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
// gcp firestore
const admin = require("firebase-admin")
// generate uuids
const  uuidv4 = require("uuid").v4;
admin.initializeApp({
    credential: admin.credential.applicationDefault()
})


// le database
const db = admin.firestore()
let app = express()
app.use(express.json())
// logging
app.use(morgan("common"))
app.use(cors())
// index route return hello
app.get("/", (req, res) => {
    res.setHeader("Content-Type", "application/json")
    res.send(JSON.stringify({"message": "hello"}))
})

// standard health route
app.get("/health", (req, res) => {
    res.setHeader("Content-Type", "application/json")
    res.setHeader("Application-Status", "healthy")
    res.send(JSON.stringify({"status": "up"}))
})
// new spidertron
app.post("/spidertron/new", (req, res) => {
    let name = req.body.name
    let docname = uuidv4()
    const docRef = db.collection(process.env.COLLECTION).doc(docname)
    docRef.set({
        name: name
    })
    res.send(docname)
})

// all spidys
app.get("/spidertron", async (req, res) => {
    let pl = []
    const ss = db.collection(process.env.COLLECTION).get()
    await ss.forEach((doc) => {
        pl.push(doc)
    })
    res.send(pl)
    res.setHeader("Content-Type", "text/plain")
})

// update spidys
app.post("/spidertron/update", (req, res) => {
    let name = req.body.name
    let uuid = req.body.uuid

})
// start listening
app.listen(process.env.PORT || 3000, function() {
    console.log(`application started running on :${process.env.PORT || 3000}`)
})