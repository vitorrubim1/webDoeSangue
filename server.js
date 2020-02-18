//servidor
const express = require ("express");
const server = express();

//configurando o servidor para apresentar arquivos estáticos
server.use(express.static('public')) //adicionando arquivos estáticos a pasta public

// configurando a template engine
const nunjucks = require("nunjucks");
nunjucks.configure("./", {
    express: server
})

server.get("/", function(req, res){
    return res.render("index.html") //renderizando o html
});

//configurando a porta 3000
server.listen(3000, function(){
    console.log("rodando...")
});