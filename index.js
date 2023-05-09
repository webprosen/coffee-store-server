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

// Create a MongoClient
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

    const coffeeCollection = client.db('coffeeDB').collection('coffee');

    app.post('/coffee', async (req, res) => {
      const coffee = req.body;
      const result = await coffeeCollection.insertOne(coffee);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Server is running...');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});