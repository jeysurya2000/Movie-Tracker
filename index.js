//imports
require('dotenv').config()
const path = require('path');
require('./db')
const cors = require('cors')
const express = require('express');
const app = express();
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get('/', (req, res) => {
    res.send('connected')
})
app.use(cors({ origin: ["http://localhost:5173", "http://192.168.29.161:5173", " http://172.19.208.1:5173", "http://10.80.135.81:5173"] }))
app.use("/movieuser", require('./Controllers/userController'))
app.use("/movie", require('./Controllers/movieController'))
app.use("/admin", require('./Controllers/adminController'))
app.listen(3000, () => {
    console.log('Server listening at port 3000')
})