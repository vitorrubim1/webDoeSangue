//servidor
const express = require ("express");
const server = express();

//configurando o servidor para apresentar arquivos estáticos
server.use(express.static('public')) //adicionando arquivos estáticos a pasta public

//habilitando o body do form
server.use(express.urlencoded({ extended: true }));

// configurando a template engine (que permite enviar dados pro front-end)
const nunjucks = require("nunjucks");
nunjucks.configure("./", {
    express: server,
    noCache: true, //rejeitando o cache
});

//LISTA DE DOADORES
const donors = [
    {
        name: "Vitor Rubim",
        blood: "AB+",
    },
    {
        name: "Elzo Passos",
        blood: "B+",
    },
    {
        name: "Maria Consolação",
        blood: "A+",
    },
    {
        name: "Enzo Rubim",
        blood: "O+",
    },
]

//PEGANDO DADO DO FORMULÁRIO
server.post("/", function(req, res){
    //req (requisiçao), buscando ao submitar
    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood;

    //push (colocar) o valor dentro do array
    donors.push ({
        name: name,
        blood: blood
    });

    //após enviar os dados, o usuário é redirecionado para a pag inicial
    return res.redirect("/");
});

server.get("/", function(req, res){
    return res.render("index.html", { donors } ) //renderizando o html e passando o array
});

//configurando a porta 3000
server.listen(3000, function(){
    console.log("rodando...")
});