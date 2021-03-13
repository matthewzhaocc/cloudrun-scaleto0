const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const bodyParser = require("body-parser")
// gcp firestore
const admin = require("firebase-admin")
admin.initializeApp({
    credential: admin.credential.applicationDefault()
})
// le database
const db = admin.firestore()
const docRef = db.collection(process.env.COLLECTION).doc(process.env.DOC)
let app = express()
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
    docRef.set({
        name: name
    })
    res.send("success")
})

// all spidys
app.get("/spidertron", (req, res) => {
    let pl = []
    const ss = docRef.get()
    ss.forEach((doc) => {
        pl.push(doc)
    })
    res.send(pl)
    res.setHeader("Content-Type", "text/plain")
})
// start listening
app.listen(process.env.PORT || 3000, function() {
    console.log(`application started running on :${process.env.PORT || 3000}`)
})