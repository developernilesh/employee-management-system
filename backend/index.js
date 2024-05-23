const express = require("express")
const app = express()

require('dotenv').config();
const PORT = process.env.PORT || 4000;

const cookieParser = require('cookie-parser')
app.use(cookieParser());

const cors = require('cors');

const origin = String(process.env.FRONT_END_URL)
console.log(origin);

app.use(cors({
    // origin: 'http://localhost:5173',
    origin: origin,
    credentials: true
}))

app.use(express.json());

require('./config/database').connect();

const user = require('./routes/main')
app.use('/api', user)

app.listen(PORT, () => {
    console.log(`server started at port: ${PORT}`);
})

app.get("/", (req, res) => res.send("Emplyee Management System"));

module.exports = app;