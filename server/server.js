const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
app.use(express.json()); // Add this line to parse JSON bodies
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// Routes
app.use('/user', require('./router/userRouter'));
app.use('/api', require('./router/categoryRoutes'));
// app.use('/api', require('./router/upload'))
app.use('/api', require('./router/productRoute'));


// Root endpoint
app.get('/', (req, res) => {
    res.send("Hello, world!");
});

// Connecting to MongoDB
const URL = process.env.MONGODB_URL;
console.log("MongoDB URL:", process.env.MONGODB_URL);

const connectDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log("Connected to MongoDB");

        // Start the server only if the database connection is successful
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (e) {
        console.error("Error connecting to MongoDB", e);
        process.exit(1); // Exit process with failure
    }
};

connectDB();
