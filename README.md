# Mongoose and Node.js Connection Tutorial

This tutorial will help you create a Node.js application using Mongoose. We will go through the steps to connect to MongoDB, create a model, and perform some basic operations.

## Step 1: Set Up Your Node.js Project

Create a new Node.js project: 

                        mkdir mongoose-tutorial
                        cd mongoose-tutorial
                        npm init -y
                        Install the required packages:


                       npm install express mongoose dotenv cors
### Step 2: Create the Project Structure
Create the following files and folders:

                        mongoose-tutorial/
                        │
                        ├── models/
                        │   └── item.js
                        │
                        ├── config/
                        │   └── mongodb.js
                        │
                        └── index.js
### Step 3: Set Up Environment Variables
Create a .env file in the root directory of the project and write your MongoDB connection string:

                        MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
Replace <username>, <password>, and <dbname> with your actual MongoDB credentials.

### Step 4: Create MongoDB Connection File
Add the following code to config/mongodb.js:


                        // config/mongodb.js
                        const mongoose = require('mongoose');

                        const connectDB = async () => {
                            try {
                                const uri = process.env.MONGODB_URI; // Get URI from environment variable
                                await mongoose.connect(uri, {
                                    useNewUrlParser: true,
                                    useUnifiedTopology: true,
                                });
                                console.log('Connected to MongoDB');
                            } catch (error) {
                                console.error('MongoDB connection error:', error);
                                process.exit(1); // Exit process on error
                            }
                        };

                        module.exports = connectDB;
### Step 5: Create the Model
Create a Mongoose model in models/item.js:


                            // models/item.js
                            const mongoose = require('mongoose');

                            const itemSchema = new mongoose.Schema({
                                name: { type: String, required: true },
                                status: { type: String, required: true },
                                date: { type: Date, default: Date.now },
                            });

                            const Item = mongoose.model('Item', itemSchema);

                            module.exports = Item;
### Step 6: Create the Main File
Add the following code to index.js:


                                // index.js
                                require('dotenv').config();
                                const express = require('express');
                                const cors = require('cors');
                                const connectDB = require('./config/mongodb');
                                const Item = require('./models/item');

                                const app = express();
                                const port = process.env.PORT || 5000;

                                // Middleware
                                app.use(cors());
                                app.use(express.json());

                                // Connect to MongoDB
                                connectDB();

                                // API routes
                                app.get("/items", async (req, res) => {
                                    try {
                                        const result = await Item.find();
                                        res.send(result);
                                    } catch (error) {
                                        res.status(500).send({ error: 'Failed to retrieve items' });
                                    }
                                });

                                app.post("/items", async (req, res) => {
                                    try {
                                        const newItem = new Item(req.body);
                                        const savedItem = await newItem.save();
                                        res.status(201).send(savedItem);
                                    } catch (error) {
                                        res.status(400).send({ error: 'Failed to create new item' });
                                    }
                                });

                                app.get("/", (req, res) => {
                                    res.send('Server is running');
                                });

                                app.listen(port, () => {
                                    console.log('Running on port', port);
                                });
### Step 7: Run the Application
Ensure your MongoDB cluster is running.
Make sure your .env file is correctly set up.
Start your application:

                           node index.js