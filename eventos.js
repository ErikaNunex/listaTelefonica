let API_URL = 'http://localhost:3000'

/** Adiciona um novo contato levando em consideração os valores dos inputs declarados no fomulario do arquivo html */
function adicionarNovoContato(){
    event.preventDefault();
    
    let informacoes ={
        nome: nome.value,
        sobrenome: sobrenome.value,
        cell: cell.value, 
        cidade: cidade.value,
    };

    fetch(API_URL + '/contato', {
       method: 'POST',
       body:JSON.stringify(informacoes),
       headers: {
        'Content-Type': 'application/json'
       }
    })
    .then(response => response.json())
    .then(response => atualizarContato());
    formAdd.resert();
}

/** Busca os dados na API para serem editados na função editarContato
 * @param id: o id de cada contato é usado pra identificar o contato que está sendo buscado
 */
function buscarParaEditar(id){
    fetch(API_URL+'/contato/'+id)
        .then(resposta => resposta.json()) 
        .then(itens =>{
            inputEditarId.value = itens.id;
            inputEditarNome.value = itens.nome;
            inputEditarSobrenome.value = itens.sobrenome;
            inputEditarCell.value = itens.cell;
            inputEditarCidade.value = itens.cidade;
        });

}

/**Edita os dados coletados na gunção buscarParaEditar */
function editarContato(){
    event.preventDefault();
    
    let dados = {
        nome:inputEditarNome.value,
        sobrenome:inputEditarSobrenome.value,
        cell:inputEditarCell.value,
        cidade:inputEditarCidade.value,
    };
    fetch(API_URL+'/contato/'+inputEditarId.value,{
        method: 'PATCH',
        body: JSON.stringify(dados),
        headers:{
            'Content-Type':'application/json'
        }
    })
        .then(resposta => resposta.json())
        .then(() => atualizarContato());
        let x = document.querySelector('[data-bs-dismiss="offcanvas"]');
        x.dispatchEvent(new Event('click'));
        
}

/**exclui todas as informações dos contatos 
 * @param id: Identifica de qual contato deve ser exclídas as informações
*/
async function excluirContato(id){
    let resposta = confirm('voce tem certeza?')
    if(resposta !== true){
     return;
    }
    await fetch(API_URL+'/contato/'+id,{
         method:'DELETE'
     });
     atualizarContato()
 }

/** atualiza os dados na API*/ 
function atualizarContato (){ 
    fetch(API_URL + '/contato')
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

                <td><button onclick="buscarParaEditar(${cadaItem.id})"data-bs-toggle="offcanvas" 
                data-bs-target="#offcanvasEditar"class="btn btn-warning btn-md">Editar</button>

                <button class="btn btn-danger" onclick=excluirContato(${cadaItem.id})>Excluir</button></td>
            </tr>`
            })
        }
)}
atualizarContato()