//imports
require('dotenv').config()
require('./db')
const express = require('express');
const app = express();
app.use(express.json())
app.get('/', (req, res) => {
    res.send('connected')
})
app.use("/movieuser", require('./Controllers/userController'))
app.use("/movie", require('./Controllers/movieController'))
app.use("/admin", require('./Controllers/adminController'))
app.listen(3000, () => {
    console.log('Server listening at port 3000')
})