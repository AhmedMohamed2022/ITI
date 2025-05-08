const {MongoClient}=require("mongodb");
const { log } = require("node:console");
const uri="mongodb://localhost:27017"
const Client=new MongoClient(uri);

async function ConnectDb()
{
    await Client.connect();
    // return Client.db("University");
    return Client.db("Orders");
}

async function Main()
{
    const db= await ConnectDb();
    // let student=await db.collection("student").insertOne({
    //     id:'1'
    // });
    // let faculty=await db.collection("faculty").insertOne({
    //     id:'2'
    // });
    // let course= await db.collection("course").insertOne({
    //     id:'3'
    // });
//    let ordersInfo=await db.collection("ordersInfo")
//    .insertMany([
// {
//     "order":"o1","year":2020,"paid":"Y","cost":{"price":30,"currency":"NOK"},
//     "items":[{"product":"p1","colours":["blue","black"],"quantity":15}],"delivery_days":5
// },

// {"order":"o2","year":2020,"paid":"Y","cost":{"price":13,"currency":"EUR"},
// "items":[{"product":"p2","colours":["white"],"quantity":4},
// {"product":"p3","colours":["white","black"],"quantity":1}],"delivery_days":4},

// {"order":"o3","year":2018,"paid":"N","cost":{"price":33,"currency":"EUR"},
// "items":[{"product":"p3","colours":["blue","black"],"quantity":4}], "delivery_days":4},

// {"order":"o4","year":2017,"paid":"Y","cost":{"price":17,"currency":"NOK"},
// "items":[{"product":"p2","colours":["pink","black"],"quantity":14},
// {"product":"p4","colours":["white"],"quantity":1}], "delivery_days":2},

// {"order":"o5","year":2020,"paid":"Y","cost":{"price":19,"currency":"NOK"}, "items":[{"product":"p1","quantity":15}], "delivery_days":3}

//    ])
    let all=await db.collection("ordersInfo").find({}).toArray();
    // console.log(student);
    // console.log(faculty);
    // console.log(course);

    // console.log(all);
    // let q1=await db.collection("ordersInfo").aggregate([{$match:{"year":{$gt:2017}}},{$group:{_id:"$year",total:{$sum:"$delivery_days"}}}]).toArray();
    // console.log(q1);
    // let q2 = await db.collection("ordersInfo").aggregate([{$match:{"paid":"Y"}},{$group:{_id:"$year",totalNumberOfDeliveryDays:{$sum:"$delivery_days"}}}]).toArray();
    // console.log(q2);
    // let q3 = await db.collection("ordersInfo").aggregate([{$group:{_id:"$cost.currency",totalPrice:{$sum:"$cost.price"}}}]).toArray();
    // console.log(q3);
    let ordersInfo = await db.collection("ordersInfo");
    // let items=(await ordersInfo.aggregate([{$unwind:"$items"} ,{$unwind:"$items.colours"},{$match:{"items.colours":"black"}}]).toArray()).length;
    // // let colors = await ordersInfo.aggregate([{$unwind:items}]).toArray();
    // console.log(items);
    // let q5= await ordersInfo.aggregate([{$match:{"items.colours":"black"}},{$group:{_id:"$items.colours",Colorblack:{$sum:"$items.colours"}}}]).toArray();
    // console.log(q5);
    // let q6=await db.collection("ordersInfo").aggregate([{$match:{"year" : {$gte :2017,$lte:2018}}},{$group:{_id:null,totalPrice:{$sum:"$cost.price"}}}]).toArray();
    // // let q6=await db.collection("ordersInfo").aggregate([{$sum:"$cost.price"}]).toArray();
    // console.log(q6);
    
    let q7=((await ordersInfo.aggregate([{$match:{"year":{$gte:2018,$lte:2020}}},{$match:{"paid" :"Y"}},{ $count: "count"}]).toArray()));
    console.log(q7);
    // let q10=((await ordersInfo.aggregate([{$match:{"cost.currency":"NOK"}},{$match:{"cost.price" :{$gte:20}}}]).toArray()).length);
    // console.log(q10);
    // let q11=await ordersInfo.aggregate([{$match:{"year":2020}},{$group:{_id:null,avgDelivery:{$avg:"$delivery_days"}}}]).toArray();
    // console.log(q11);
    // let q12=await ordersInfo.aggregate([{$match:{"delivery_days":{$lte:4}}},{$group:{_id:null,avgPrice:{$avg:"$cost.price"}}}]).toArray();
    // console.log(q12);
    // let q13= await ordersInfo.find({}).toArray();
    // console.log(q13);
    // let q14= await ordersInfo.find({}).limit(5).skip(3).toArray();
    // console.log(q14);
    // let q15= await ordersInfo.find({"paid":"Y"}).toArray();
    // console.log(q15);

    // let q16= await ordersInfo.aggregate([{$match:{"year":2019}},{$match:{"paid":"Y"}}]).toArray();
    // let q16= await ordersInfo.find({"year":2019},{"paid":"Y"}).toArray();
    // let q16= await ordersInfo.find({"year":2019,"paid":"Y"}).toArray();
    // console.log(q16);
    // let q10= await ordersInfo.find({$or:[{"year":{$lte:2019}},{"paid":"N"}]}).toArray();
    // console.log(q10);
    // let q11= await ordersInfo.find({"cost.currency":"NOK","cost.price":18}).toArray();
    // console.log(q11);
    // let q13= await ordersInfo.updateMany({"items.product":"p1"},{"cost.price":7}).toArray();
    // console.log(q13); 
    // let q14= await ordersInfo.deleteMany({"items.quantity":4}).toArray();
    // console.log(q14);  

    // let q15= await ordersInfo.find({"items.colours.0":"blue"}).toArray();
    // console.log(q15);    

}

Main();
