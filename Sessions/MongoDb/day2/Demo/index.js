const { MongoClient } = require('mongodb')
const uri = "mongodb://localhost:27017"; // Replace with your URI
const client = new MongoClient(uri);
const dbName = "shop";

async function connectDB() {
    await client.connect();
    return client.db("ITI")
}


async function main() {
    try {
        const posts = await postsCollection.aggregate([
            {
                $lookup: {
                    from: 'users',          // Join with 'users' collection
                    localField: 'authorId', // Field in 'posts'
                    foreignField: '_id',    // Field in 'users'
                    as: 'author'            // Resulting array
                }
            },
            { $unwind: '$author' }         // Flatten the resulting array
        ]).toArray();
        const db = await connectDB();
        //   const orders = db.collection("orders");
        // db.collection("books").createIndex({ borough: 1 })
        // const o = await db.collection("restaurants").find({ borough: "Bronx" }).explain("executionStats")
        const o = await db.collection("restaurants").aggregate([
            { $unwind: '$grades', },
            { $group: { _id: '$borough', avgScore: { $avg: '$grades.score' } } },
            { $sort: { avgScore: -1 } }
        ]).toArray()
        console.log(o)
    }
    catch (err) {
        console.log(err)
    }
}

main()