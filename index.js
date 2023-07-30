const express = require('express')
const cors = require('cors')
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
app.use(cors())

app.use(express.json());




const uri = "mongodb+srv://jobOpportunities:Kymo1ygAjkV5Vi1U@cluster0.jt15atw.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
     serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
     }
});

async function run() {
     //   try {
     // Connect the client to the server	(optional starting in v4.7)
     await client.connect();
     const JobCollection = client.db("jobOpportunities").collection("job");

     app.post('/job', async (req, res) => {
          const body = req.body;
          const result = await JobCollection.insertOne(body);
          res.send(result);
     })
     app.get('/job', async (req, res) => {

          const result = await JobCollection.find().toArray()
          res.send(result);
     })




     await client.db("admin").command({ ping: 1 });
     console.log("Pinged your deployment. You successfully connected to MongoDB!");
     //   } finally {
     //     // Ensures that the client will close when you finish/error
     //     await client.close();
     //   }
}
run().catch(console.dir);


app.get('/', function (req, res, next) {

     res.send("hello")
})

app.listen(port, function () {
     console.log(` CORS-enabled web server listening on port  ${port}`)
})