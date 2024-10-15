// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongodb');
const Item = require('./models/item');
const Products = require('./models/product')

const app = express();
const port = process.env.PORT || 5000;
 
// Middleware
app.use(cors());
app.use(express.json());

// MongoDB এর সাথে সংযোগ স্থাপন করুন
connectDB();

// API রুট
app.get("/items", async (req, res) => {
    try {
        const result = await Item.find();
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: 'আইটেমগুলি নিয়ে আসতে ব্যর্থ' });
    }
});
app.get("/products", async (req, res) => {
    try {
        const result = await Products.find();
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: 'আইটেমগুলি নিয়ে আসতে ব্যর্থ' });
    }
});

app.post("/items", async (req, res) => {
    try {
        const newItem = new Item(req.body);
        const savedItem = await newItem.save();
        res.status(201).send(savedItem);
    } catch (error) {
        res.status(400).send({ error: 'নতুন আইটেম তৈরি করতে ব্যর্থ' });
    }
});
app.post("/products", async (req, res) => {
    try {
        const newItem = new Products(req.body);
        const savedItem = await newItem.save();
        res.status(201).send(savedItem);
    } catch (error) {
        res.status(400).send({ error: 'নতুন আইটেম তৈরি করতে ব্যর্থ' });
    }
});
 
app.get("/", (req, res) => {
    res.send('server is running');
});

app.listen(port, () => {
    console.log('connect with port', port);
});

