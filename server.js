const express = require ("express");
const server = express();

server.get("/", function(req, res){
    return res.send("Hello world!")
});

server.listen(3000, function(){
    console.log("rodando...")
});