const DB = require('./DB');
const express = require('express')
const app = express()
const port = 3001
DB.connectDB();
const todoRoute = require('./routes/todoRoute');
const userRoute = require('./routes/userRoute');
const cors = require('cors');

app.use(cors());



app.use(express.json());
app.use(express.urlencoded())
app.use('/todo', todoRoute);
app.use('/user', userRoute);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

