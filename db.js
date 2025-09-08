const mongoose = require('mongoose')
const connectionString = "mongodb://localhost:27017/MovieTracker"
mongoose.connect(connectionString)
const db = mongoose.connection
db.on("error", (e) => {
    console.log("Database Error", e)
})
db.once('open', () => {
    console.log("Connection established");
})
