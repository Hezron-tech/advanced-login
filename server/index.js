require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const errorMiddleware = require('./middlewares/error-middleware');

const app = express();

const port = process.env.PORT || 8000;


// routes
const userRouter = require('./router/index')

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', userRouter);
app.use(errorMiddleware);




const start = async () => {
    try {
        
        app.listen(port, () => console.log('Server created on port ' + port));
      
        await mongoose.connect(process.env.DB_URL, () => {
            console.log('Connected to db');
        });
    } catch (error) {
        console.log(error);
    }
}

start();