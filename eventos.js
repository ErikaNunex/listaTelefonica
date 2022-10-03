let API_URL = 'http://localhost:3000/contato'

/** Adiciona um novo contato levando em consideração os valores dos inputs declarados no fomulario do arquivo html */
function adicionarNovoContato(){
    event.preventDefault();
    
    let informcoes ={
        nome: nome.value,
        sobrenome: sobrenome.value,
        cell: cell.value,
        cidade: cidade.value,
    };

    fetch(API_URL, {
       method: 'POST',
       body:JSON.stringify(informcoes),
       headers: {
        'Content-Type': 'application/json'
       }
    })
    .then(response => response.json())
    .then(response => atualizarContato());
}

/** atualiza os dados na API*/ 
function atualizarContato (){
    fetch(API_URL)
        .then(response => response.json())
        .then(function(lista){
            lista.forEach(function
              (cadaItem){  
               listaDeContatos.innerHTML+= `
            <tr>
                <td>${cadaItem.id}</td>
                <td>${cadaItem.nome}</td>
                <td>${cadaItem.sobrenome}</td>
                <td>${cadaItem.cell}</td>
                <td>${cadaItem.cidade}</td>
                <td>`
            })
        }
)}
atualizarContato()