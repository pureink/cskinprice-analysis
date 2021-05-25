// Import Dependencies
const url = require("url");
const MongoClient = require("mongodb").MongoClient;

// Create cached connection variable
let cachedDb = null;

// A function for connecting to MongoDB,
// taking a single parameter of the connection string
async function connectToDatabase(uri) {
  // If the database connection is cached,
  // use it instead of creating a new connection
  if (cachedDb) {
    return cachedDb;
  }

  // If no connection is cached, create a new one
  const client = await MongoClient.connect(uri, { useNewUrlParser: true });

  // Select the database through the connection,
  // using the database path of the connection string
  const db = await client.db("knife");

  // Cache the database connection and return the connection
  cachedDb = db;
  return db;
}

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
module.exports = async (req, res) => {
  const {
    query: { id },
  } = req;
  // Get a database connection, cached or otherwise,
  // using the connection string environment variable as the argument
  const db = await connectToDatabase(process.env.mongourl);

  // Select the "users" collection from the database
  const collection = await db.collection("knife");

  // Select the users collection from the database
  const knifes = await collection.find({ _id: id }).toArray();
  var price;
  if (knifes[0].hasOwnProperty("steam")) {
    const resp = await fetch(
      "http://api.scraperapi.com/?api_key=bd34bcd86583b46c76dc5c9c24c5af26&url=" +
        knifes[0].steam.href.substring(6)
    );
    const pricetext = await resp.text();
    price = pricetext.match(/\[\[(.*)\]\]/g)[0];
  } else {
    price = null;
  }
  // Respond with a JSON string of all users in the collection
  res.status(200).json({ knifes, price: JSON.parse(price) });
};
