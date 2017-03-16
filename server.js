"use strict";
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

app.use("/public", express.static("public"));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, function(){
    console.log("hello from " + PORT)
});
