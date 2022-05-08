const express = require('express');
const cors = require( 'cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();


app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSCODE}@cluster0.afo5v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
        try{
            await client.connect();
            const equiptmentCollection = client.db('football-universe').collection('equipment');
            
            app.get('/equipment', async(req,res)=>{
            const query = {};
            const cursor = equiptmentCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
            })
        }

        finally{

        }
}


run().catch(console.dir);

app.get('/', (req, res) =>{
    res.send('football universe server')
});


app.listen(port, ()=>{
    console.log('We all are listening', port);
})