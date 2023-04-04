const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const _ = require("lodash");
const { response } = require("express");
const axios = require("axios");
const port = 3000;

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// -----------------------------------mongoDB-----------------------------------
// mongoose.connect(
//   "mongodb://Arm:123456ABCD@ac-3frmzjv-shard-00-00.zid9ysy.mongodb.net:27017,ac-3frmzjv-shard-00-01.zid9ysy.mongodb.net:27017,ac-3frmzjv-shard-00-02.zid9ysy.mongodb.net:27017/?ssl=true&replicaSet=atlas-12mhlm-shard-0&authSource=admin&retryWrites=true&w=majority",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     dbName: "SE_Database",
//   }
// );

// mongoose.connection.on("error", (err) => {
//   console.log("err", err);
// });
// mongoose.connection.on("connected", (err, res) => {
//   console.log("mongoose is connected");
// });

const MongoClient = require("mongodb").MongoClient;
let url =
  "mongodb://Arm:123456ABCD@ac-3frmzjv-shard-00-00.zid9ysy.mongodb.net:27017,ac-3frmzjv-shard-00-01.zid9ysy.mongodb.net:27017,ac-3frmzjv-shard-00-02.zid9ysy.mongodb.net:27017/?ssl=true&replicaSet=atlas-12mhlm-shard-0&authSource=admin&retryWrites=true&w=majority";

app.get("/api", (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("SE_Database");
    dbo.collection("users").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result[0]);
      res.json(result)
      db.close();
    });
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("SE_Database");
  dbo.collection("users").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result[0]);
    // res.json(result)
    db.close();
  });
});

// const connection = mongoose.connection;
// connection.on("open", async function () {
//   const collection = connection.db.collection("users");
//   collection.find({}).toArray(function (err, data) {
//     if (err) throw err;
//     console.log(data);
//     // res.send(data);
//   });
// });

