const express = require("express")
const app = express()

require('dotenv').config();
const PORT = process.env.PORT || 4000;

const cookieParser = require('cookie-parser')
app.use(cookieParser());

const cors = require('cors');
app.use(cors({
    origin: 'https://employee-management-system-user.vercel.app',
    // origin: 'http://localhost:5173',
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