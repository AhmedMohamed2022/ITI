const { MongoClient } = require('mongodb')
const uri = "mongodb://localhost:27017" // 
// create instajce form 
const client = new MongoClient(uri);

async function connectDB() {
    await client.connect();

    return client.db("ITI");
}
async function main() {
    const db = await connectDB();
    let o = await db.collection("orders").insertOne({ name: "o100", price: 100 });
    let avg = await db.collection("orders").aggregate([{ $group: { _id: "$year", avg: { $avg: "$cost.price" } } }]).toArray()
    console.log(avg);
    // let orders = await db.collection("orders").find().toArray();
    // console.log(orders);


}

main();