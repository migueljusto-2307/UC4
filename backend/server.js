const express=require('express');//iniciamos o express
const cors=require('cors');//iniciamos o roteamento do cors
const fs = require('fs');//inserimos edição de arquivos

const app=express();//definimos o app para utilizar o express()

const PORT=3000;//definimos a porta do back
const ARQUIVO = "./dados.json"; //definimos o arquivo que os dados serão persistidos

app.use(cors());//ativamos o app para usar o cors
app.use(express.json());//ativamos o app para utilizar estruturas json

//funcoes auxiliares 
function leituraUsuarios(){
    const dados = fs.readFileSync(ARQUIVO , "utf-8")
    return JSON.parse(dados);
}

function salvarUsuarios(usuarios){
    fs.writeFileSync(ARQUIVO, JSON.stringify(usuarios, null, 2));
}


//Get: listar todos
app.get('/api/usuarios', (req, res) => {
    const usuarios = leituraUsuarios();
    res.json(usuarios);
});



app.get('/api/usuarios/:id', (req, res) => {
    const usuarios = leituraUsuarios();
    const id = Number(req.params.id);
    const usuario = usuarios.find(usuario => usuario.id === id);
    if (!usuario){
        return res.status(404).json({
            mensagem: "Usuário não encontrado"
        });
    }
    res.json(usuario);
});

//POST: criar
app.post('/api/usuarios', (req, res) => {
    const {nome, email} = req.body;//leitura do req do body

    if(!nome || !email) { //valida campo para nao vir vazio
        return res.status(400).json({
            mensagem: "Nome e email são obrigatórios"
        });
    }

    const usuarios = leituraUsuarios();
    const novoUsuario = {id: Date.now(), nome, email};//fazemos os objetivo do novo usario
 
    usuarios.push(novoUsuario);//adicionamos ao final da lista de usuarios

    salvarUsuarios(usuarios);//salvamos o usuario no arquivo

    res.status(201).json(novoUsuario);//retorna sucesso ao criar novo usuario
});

//PUT: editar

app.put('/api/usuarios/:id', (req, res) => {
    const {nome, email} = req.body;// pega a infromacao do corpo da requisicao
    const usuarios = leituraUsuarios();//funcao de leitura 
    const id = Number(req.params.id);

    const usuario = usuarios.find(usuario => usuario.id === id);
    //find vai procurar na funcao se usuario id e igual em tipo e valor do id passado pelo front
    usuario.nome = nome;
    usuario.email = email;
    
    salvarUsuarios(usuarios);

    res.json(usuario);
}


)





app.listen(PORT, () => {
    console.log(`Servidor atualizado em http://localhost:${PORT}`);
});

