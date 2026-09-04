fetch('http://localhost:3000/api/mensagem')
    .then(response => response.json())
    .then(data => {
        const msn = document.getElementById('texto');
        const mns = document.getElementById('text');
        msn.innerHTML = (data.mensagem)
        mns.innerHTML = (data.sub)
    });