var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";
const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});

app.get("/listProducts", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = {};
    const results = await db
    .collection("fakestore_catalog")
    .find(query)
    .limit(100)
    .toArray();
    console.log(results);
    res.status(200);
    res.send(results);
    });

app.get("/:id", async (req, res) => {
    const productid = Number(req.params.id);
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = {"id": productid };
    const results = await db.collection("fakestore_catalog")
    .findOne(query);
    console.log("Results :", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
    
    });

app.delete("/deleteProduct/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        await client.connect();
        // console.log("Robot to delete :",id);
        const query = { id: id };
        // delete
        const results = await db.collection("fakestore_catalog").deleteOne(query);
        res.status(200);
        res.send(results);
    }
    catch (error){
        console.error("Error deleting product:", error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Post product
app.post("/addProduct", async (req, res) => {
    try {
        await client.connect();
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);

        const newDocument = {
            "id": values[0],
            "title": values[1],
            "price": values[2],
            "description": values[3],
            "category": values[4],
            "imageUrl": values[5],
            "rating": values[6]
        };
        console.log(newDocument);

        const results = await db
            .collection("fakestore_catalog")
            .insertOne(newDocument);
        res.status(200);
        res.send(results);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send({ error: 'An internal server error occurred' });
    }
});