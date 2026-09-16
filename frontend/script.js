const API_URL = 'http://localhost:3000/api/usuarios'
const listaUsuarios = document.getElementById('listaUsuarios')

const form = document.getElementById("formUsuario")
const nomeImput = document.getElementById("nome")
const emailImput = document.getElementById("email")
const botaoImput = document.getElementById("botaoSalvar")

async function carregarUsuarios() {
        try {
            const resposta = await fetch(API_URL);
            if (!resposta.ok){
                throw new Error (`Erro HTTP: ${resposta.status}`); 
        }
        const data = await resposta.json();
        listaUsuarios.innerHTML = "";

        data.forEach(usuario =>{
                const linha = document.createElement("tr")
                
                linha.innerHTML = `<td>${usuario.id}</td><td>${usuario.nome}</td><td>${usuario.email}</td>`;
                
                listaUsuarios.appendChild(linha);
        })


        }
    catch (erro) {
            console.error('Erro:', erro);

    }
};

form.addEventListener("submit", async (evento) => {//inicia a leitura do botao
    evento.preventDefault();    //nao deixa a pagina atualizar

    const nome = nomeImput.value;
    const email = emailImput.value;

    const usuario = {
        nome,
        email
    };

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });
    carregarUsuarios();
});





//inicia já com nossa listagem
carregarUsuarios();
