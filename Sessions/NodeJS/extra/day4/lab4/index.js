const express=require("express");
const DB = require('./DB');

const app=express()
const port = 3000
const productRoute = require('./routes/productRoute');
app.use('/uploads', express.static('uploads'));

const cors = require('cors');



DB.connectDB();

app.use(cors());

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());


app.use(express.json());
app.use(express.urlencoded())
app.use('/product',productRoute);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
