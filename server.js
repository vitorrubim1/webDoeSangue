//servidor
const express = require ("express");
const server = express();

//configurando o servidor para apresentar arquivos estáticos
server.use(express.static('public')) //adicionando arquivos estáticos a pasta public

//habilitando o body do form
server.use(express.urlencoded({ extended: true }));


//configurando a conexão com o banco de dados
const Pool = require("pg").Pool //(pool) mantém a conexão ativa
const db = new Pool({
    user: 'postgres',
    password: '1234',
    host: 'localhost',
    port: '5432',
    database: 'doe',
});



// configurando a template engine (que permite enviar dados pro front-end)
const nunjucks = require("nunjucks");
nunjucks.configure("./", {
    express: server,
    noCache: true, //rejeitando o cache
});



//PEGANDO DADO DO FORMULÁRIO
server.post("/", function(req, res){
    //req (requisiçao), buscando ao submitar
    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood;

    if (name == "" || email == "" || blood == ""){
        return res.send("TODO OS CAMPOS SÃO OBRIGATÓRIOS !!!")
    }
        const query = `
            INSERT INTO donors ("name", "email", "blood") 
            VALUES ($1, $2, $3)`; //esse metódo de por os values traz segurança
    
        const values = [name, email, blood];
    
        db.query(query, values, function(err){
            if(err) return res.send ("Erro ao inserir no BD");
    
            //após enviar os dados, o usuário é redirecionado para a pag inicial
            return res.redirect("/");
    
        }) //pode fazer o insert aq direto.
      
});

server.get("/", function(req, res){
    
    db.query("SELECT * FROM donors", function(err, result){
        if (err)  return res.send("Erro ao buscar dados do banco");
   
        const donors = result.rows;
        return res.render("index.html", { donors } ); //renderizando o html e passando o array
    });

});

//configurando a porta 3000
server.listen(3000, function(){
    console.log("rodando...")
});