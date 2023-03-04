import express from "express"
import dotenv from 'dotenv';
import mongoose from "mongoose";
import movieRoutes from './routes/movies'
import Movie from "./models/movie";
import Database from './config/db'
const app = express();
dotenv.config();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use('/api',movieRoutes)
Database.getInstance()
app.get('/',(req,res)=>{
    res.send('Welcome to movie catalog API')
})

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{
    console.log(`Server running on port: ${PORT}`) 
})

