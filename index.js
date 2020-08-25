
import express from "express";
import parser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import env from "node-env-file";

import TestModel from "./models/Test";
import Test from "./models/Test";

env(__dirname + '/.env');

const PORT = process.env.PORT || 3000;

const USER = process.env.DB_USER;
const PW = process.env.DB_PW;
const DB_LOCATION = process.env.DB_LOCATION;
const DB_TABLE = process.env.DB_TABLE;

const connection = `mongodb+srv://${USER}:${PW}@${DB_LOCATION}/${DB_TABLE}?retryWrites=true&w=majority`;

mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true }, (err, data) => {
    if(err){
        console.log("DB CONNECTION ERROR", err);
        return;
    }

    console.log("DB IS CONNECTED!")
});

const app = new express();

app.use(cors());
app.options('*', cors());

// parse application/x-www-form-urlencoded
app.use(parser.urlencoded({ extended: false }));

// parse application/json
app.use(parser.json());

app.get("/", (req, res) => {
    return res.json({content:"some content"});
});

app.get("/test", (req, res) => {

    TestModel.find(null, (err, data) => {
        if(err) {
            console.log("DB READ ERROR", err);
            return next(err);
        }

        // console.log("DB select success");
        return res.json(data);
    });

    // return res.json({content:"this path works"});
});

app.post("/test", (req, res, next) => {
    // just return
    console.log("request body", req.body, req);

    TestModel.create(req.body, (err, data) => {
        if(err) {
            console.log("DB ERROR", err);
            return next(err);
        }

        // console.log("DB entry success");
        return res.json(data);
    });
});

app.listen(PORT);

console.log("Hello, world, again!", `Listening on port ${PORT}`);
