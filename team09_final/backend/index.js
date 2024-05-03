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
const dbName = "team09_final_db";
const client = new MongoClient(url);
const db = client.db(dbName);

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});

// Get all courses
app.get("/courses/", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = {};
    const results = await db
        .collection("courses")
        .find(query)
        .limit(100)
        .toArray();
    console.log(results);
    res.status(200);
    res.send(results);
});

// Get course by ID
app.get("/courses/:id", async (req, res) => {
    const courseid = Number(req.params.id);
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = { "id": courseid };
    const results = await db.collection("courses")
        .findOne(query);
    console.log("Results :", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
});

// Delete course by ID
app.delete("/courses/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        await client.connect();
        console.log("Course to delete: ", id);
        const query = { id: id };
        // delete
        const results = await db.collection("courses").deleteOne(query);
        res.status(200);
        res.send(results);
    }
    catch (error) {
        console.error("Error deleting course:", error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Post course
app.post("/courses/", async (req, res) => {
    try {
        await client.connect();
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);

        const newDocument = {
            "id": values[0],
            "title": values[1],
            "courseCode": values[2],
            "majorID": values[3],
            "description": values[4],
            "imageURL": values[5]
        };
        console.log(newDocument);

        const results = await db
            .collection("courses")
            .insertOne(newDocument);
        res.status(200);
        res.send(results);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send({ error: 'An internal server error occurred' });
    }
});

// Get all ratings
app.get("/ratings", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = {};
    const results = await db
        .collection("ratings")
        .find(query)
        .limit(100)
        .toArray();
    console.log(results);
    res.status(200);
    res.send(results);
});

// Get ratings by course ID
app.get("/ratings/:id", async (req, res) => {
    const courseid = Number(req.params.id);
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = { "courseID": courseid };
    const results = await db.collection("ratings")
        .find(query)
        .limit(100)
        .toArray();
    console.log("Results: ", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
});


// Put: Add Helpful
app.put("/ratings/helpful/:id", async (req, res) => {
    const id = Number(req.params.id);
    const query = { id: id };
    await client.connect();
    console.log("Rating to Update: ", id);
    // Data for updating the document, typically comes from the request body
    console.log(req.body);
    const updateData = {
        $set: {
            "helpful": parseInt(req.body.helpful)
        }
    };
    // read data from rating to update to send to frontend
    const ratingUpdated = await db.collection("ratings").findOne(query);
    // Add options if needed, for example { upsert: true } to create a document if it doesn't exist
    const options = {};
    const results = await db.collection("ratings").updateOne(query, updateData, options);
    // If no document was found to update, you can choose to handle it by sending a 404 response
    if (results.matchedCount === 0) {
        return res.status(404).send({ message: 'Rating not found' });
    }
    res.status(200);
    res.status(200).json({ results, updatedRating: ratingUpdated });
});

// Put: Add unhelpful
app.put("/ratings/unhelpful/:id", async (req, res) => {
    const id = Number(req.params.id);
    const query = { id: id };
    await client.connect();
    console.log("Rating to Update: ", id);
    // Data for updating the document, typically comes from the request body
    console.log(req.body);
    const updateData = {
        $set: {
            "unhelpful": parseInt(req.body.unhelpful)
        }
    };
    // read data from rating to update to send to frontend
    const ratingUpdated = await db.collection("ratings").findOne(query);
    // Add options if needed, for example { upsert: true } to create a document if it doesn't exist
    const options = {};
    const results = await db.collection("ratings").updateOne(query, updateData, options);
    // If no document was found to update, you can choose to handle it by sending a 404 response
    if (results.matchedCount === 0) {
        return res.status(404).send({ message: 'Rating not found' });
    }
    res.status(200);
    res.status(200).json({ results, updatedRating: ratingUpdated });
});


// Post rating
app.post("/ratings", async (req, res) => {
    try {
        await client.connect();
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);

        const collection = db.collection('ratings');
        const maxIdDoc = await collection.findOne({}, { sort: { id: -1 } });
        const maxId = maxIdDoc ? maxIdDoc.id : 0;

        const newId = maxId + 1;

        const newDocument = {
            "id": newId,
            "courseID": values[0],
            "date": values[1],
            "semester": values[2],
            "professor": values[3],
            "stars": parseInt(values[4]),
            "helpful": 0,
            "unhelpful": 0,
            "comment": values[5]
        };
        console.log(newDocument);


        const results = await db
            .collection("ratings")
            .insertOne(newDocument);
        res.status(200);
        res.send(results);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send({ error: 'An internal server error occurred' });
    }
});

// Delete rating by ID
app.delete("/ratings/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        await client.connect();
        console.log("Rating to delete: ", id);
        const query = { id: id };
        // delete
        const results = await db.collection("ratings").deleteOne(query);
        res.status(200);
        res.send(results);
    }
    catch (error) {
        console.error("Error deleting rating:", error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

/* Backend for Questions view */

// Get all questions
app.get("/questions", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = {};
    const results = await db
        .collection("questions")
        .find(query)
        .limit(100)
        .toArray();
    console.log(results);
    res.status(200);
    res.send(results);
});

// Get questions by course ID
app.get("/questions/:id", async (req, res) => {
    const courseid = Number(req.params.id);
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = { "courseID": courseid };
    const results = await db.collection("questions")
        .find(query)
        .limit(100)
        .toArray();
    console.log("Results: ", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
});

// Post questions
app.post("/questions", async (req, res) => {
    try {
        await client.connect();
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);

        const collection = db.collection('questions');
        const maxIdDoc = await collection.findOne({}, { sort: { id: -1 } });
        const maxId = maxIdDoc ? maxIdDoc.id : 0;

        const newId = maxId + 1;

        const newDocument = {
            "id": newId,
            "courseID": values[0],
            "date": values[1],
            "question": values[2],
            "answers": values[3]
        };
        console.log(newDocument);


        const results = await db
            .collection("questions")
            .insertOne(newDocument);
        res.status(200);
        res.send(results);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send({ error: 'An internal server error occurred' });
    }
});

/* Backend for Tips view */

// Get all tips
app.get("/tips", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = {};
    const results = await db
        .collection("tips")
        .find(query)
        .limit(100)
        .toArray();
    console.log(results);
    res.status(200);
    res.send(results);
});

// Get tips by course ID
app.get("/tips/:id", async (req, res) => {
    const courseid = Number(req.params.id);
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = { "courseID": courseid };
    const results = await db.collection("tips")
        .find(query)
        .limit(100)
        .toArray();
    console.log("Results: ", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
});

// Post tips
app.post("/tips", async (req, res) => {
    try {
        await client.connect();
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);

        const collection = db.collection('tips');
        const maxIdDoc = await collection.findOne({}, { sort: { id: -1 } });
        const maxId = maxIdDoc ? maxIdDoc.id : 0;

        const newId = maxId + 1;

        const newDocument = {
            "id": newId,
            "courseID": values[0],
            "date": values[1],
            "comment": values[2]
            // "helpful": 0,
            // "unhelpful": 0
        };
        console.log(newDocument);


        const results = await db
            .collection("tips")
            .insertOne(newDocument);
        res.status(200);
        res.send(results);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send({ error: 'An internal server error occurred' });
    }
});
