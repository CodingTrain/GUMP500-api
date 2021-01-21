const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

console.log('hello GUMP500! 🤖');

// Get environment variables from .env for Twitter/MongoDB creds
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_CONNECTION_URI);
let runnersDB;

connectDB().catch(console.error);

async function connectDB() {
  try {
    // Connect to the MongoDB cluster
    await mongoClient.connect();
    // Make the appropriate DB calls
    databasesList = await mongoClient.db().admin().listDatabases();
    databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
    runnersDB = mongoClient.db('GUMP500').collection('people');
    const all = await getRunners();
    console.log(`There are ${all.length} database entries`);
  } catch (e) {
    console.error(`MongoDB connection error: ${e}`);
  } finally {
    // await mongoClient.close();
  }
}

// Return all runners from datbase as an array
async function getRunners() {
  // await mongoClient.connect();
  // runnersDB = mongoClient.db("GUMP500").collection("people");
  const cursor = runnersDB.find();
  const all = await cursor.toArray();
  return all;
}

// Create Express web application at port 3000
const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

// Return all runners as json on /api web request
app.get('/api', async (request, response) => {
  // const cursor = runnersDB.find();
  // const all = await cursor.toArray();
  const all = await getRunners();
  console.log(all);
  response.json(all);
});
