const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
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
// start listening
app.listen(process.env.PORT || 3000, function() {
    console.log(`application started running on :${process.env.PORT || 3000}`)
})