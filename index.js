// Init
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

// Port
const port = process.env.PORT || 5000;

// Middlewire
app.use(cors());
app.use(express.json());

// Database credentials
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ww5yfzh.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client
    await client.connect();

    // Connection check
    await client.db("admin").command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

// Routes
app.get('/', (req, res)=>{
    res.send('Server is running...');
});

// Listening
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});