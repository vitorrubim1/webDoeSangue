//servidor
const express = require ("express");
const server = express();
const xlsxtojson = require("xlsx-to-json");
const xlstojson = require("xls-to-json");


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
    const image = req.body.image;
    const description = req.body.description;

    if (name == "" || image == "" || description == ""){
        return res.send("TODO OS CAMPOS SÃO OBRIGATÓRIOS !!!")
    }
        const query = `
            INSERT INTO pokemons ("name", "image", "description") 
            VALUES ($1, $2, $3)`; //esse metódo de por os values traz segurança
    
        const values = [name, image, description];
    
        db.query(query, values, function(err){
            if(err) return res.send ("Erro ao inserir no BD");
    
            //após enviar os dados, o usuário é redirecionado para a pag inicial
            return res.redirect("/");
    
        }) //pode fazer o insert aq direto.
      
});

server.get("/", function(req, res){
    
    db.query("SELECT * FROM pokemons", function(err, result){
        if (err)  return res.send("Erro ao buscar dados do banco");
   
        const pokemons = result.rows;
        return res.render("index.html", { pokemons } ); //renderizando o html e passando o array
    });

});

server.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
});
// configuration
server.use(express.static(__dirname + '/public'));                
server.use('/public/uploads',express.static(__dirname + '/public/uploads'));       

server.get('/', function (req, res) {
  res.send('Hello World')
})

server.post('/api/xlstojson', function(req, res) {
	xlsxtojson({
		input: "./excel-to-json.xlsx",  // input xls 
	    output: "output.json", // output json 
	    lowerCaseHeaders:true
	}, function(err, result) {
	    if(err) {
	      res.json(err);
	    } else {
	      res.json(result);
	    }
	});
});

//configurando a porta 3000
server.listen(3000, function(){
    console.log("run...")
});