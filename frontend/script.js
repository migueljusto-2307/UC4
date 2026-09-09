async function dataConsumo() {
    try {
        const resposta = await fetch('http://localhost:3000/api/mensagem')
        if (!resposta.ok){
            throw new Error (`Erro HTTP: ${resposta.status}`); 
        }
        const data = await resposta.json();
        const msn = document.getElementById('texto');
        msn.innerHTML = (data.mensagem)
        const mns = document.getElementById('text');
        mns.innerHTML = (data.sub)
    }
    catch (erro) {
        console.error('Erro:', erro)
    }
}
dataConsumo()
