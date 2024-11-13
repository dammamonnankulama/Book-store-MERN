import express, { request, response } from "express";
import {mongoDBURL, PORT} from "./config.js";
import mongoose from 'mongoose';
import { Book } from "./models/bookModel.js";
import  booksRoute  from "./routes/booksRoute.js";
import cors from "cors";

const app =express();

//Parsing Request body
app.use(express.json());

//To allow all origins
app.use(cors());

/*
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type'],

  })
  
);
*/

app.get('/',(request, response) =>{
    console.log(request);
    return response.status(234).send('Welcome To MERN Stack');

});

app.use('/books',booksRoute);

mongoose
 .connect(mongoDBURL)
 .then(() =>{
    console.log('App Connected to DB');
    app.listen(PORT ,() =>{
        console.log(`App is listening to port: ${PORT}`);
    
    });
    

 })
  .catch((error)=>{
    console.log(error);

  });




