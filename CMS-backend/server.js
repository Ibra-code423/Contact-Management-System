const express = require('express');
require('./config/dbconn.js')
const cors = require('cors')
const morgan = require('morgan');
const connectDB = require('./config/dbconn.js');
require('dotenv').config({path : "./config/config.env"})
const auth = require("./middlewares/auth.js")

//middleware function
const app = express();
app.use(express.json());
app.use(cors())
app.use(morgan("tiny"))
// routes
app.use('/api/' , require('./routes/auth.js'));
app.use('contacts', require('./models/contacts.js'))
app.get('/protected', auth , (req , res) => {
     return res.status(200).json({ ...req.user._doc})
})


app.listen(4600, async () =>{
    await connectDB();
    console.log('Server running on port 4600')
});