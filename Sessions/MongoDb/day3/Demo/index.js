const DB = require('./DB');
const User = require('./Models/User')
const express = require('express')
const app = express()
const port = 3000
DB.connectDB();
const quizRoute = require('./routes/quizRoute');
const userRoute = require('./routes/userRoute');
const isAmdin = require('./middlewares/adminAuth');
const cors = require('cors');

app.use(cors());


User.create({ name: 'negm', email: "negm@gmail.com", age: 40, role: "Admin", address: "aswan" }).then(res => console.log("created"))
// User.deleteMany({ name: 'ahmed' }).then(res => console.log(res));
//User.updateOne({ name: "negm" }, { age: 30 }).then(res => console.log(res))
app.use(express.json());
app.use(express.urlencoded())
// app.use('/quiz', isAmdin, quizRoute);
app.use('/user', userRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

