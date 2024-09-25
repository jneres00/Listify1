//Criar tarefas

/*<label class="todo__item">
<input type="checkbox">
<div>teste de item 2</div>
<input type="button" value="x">
</label>*/


/*Simular Banco de Dados*/
//let banco = [
   // {'tarefa': 'Estudar JS', 'status': ''},
    //{'tarefa': 'netflix', 'status': 'checked'},
    //{'tarefa': 'teste1', 'status': 'checked'}
//];


//Pegar infos do Local Storage e retorna o que tem lá
const getBanco = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem ('todoList', JSON.stringify(banco));

/*Criar item*/
const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
    <input type = "checkbox" ${status} data-indice=${indice}>
    <div>${tarefa}</div>
    <input type= "button" value= "x" data-indice=${indice}>
     `
    ;
    document.getElementById('todoList').appendChild(item);

}

/*Limpar tarefas*/
const limparTarefas = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

/*Função para atualizar tela quando o banco é modificado*/
const atualizarTela = () => {
    limparTarefas()
    const banco = getBanco();
    banco.forEach ((item, indice) => criarItem (item.tarefa, item.status, indice));
}

atualizarTela();

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value
    if (tecla === 'Enter') {
        const banco = getBanco();
        banco.push ({'tarefa': texto, 'status': ''});
        setBanco(banco);
        atualizarTela();
        
        /*Limpar tarefa*/
        evento.target.value = '';
    }
}

/*Apagar item do banco de dados*/
const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice (indice, 1);
    setBanco(banco);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
}
const clickItem = (evento) => {
    const elemento = evento.target;
    console.log (elemento);
    /*Elemento pra saber onde clicou*/
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    }else if (elemento.type ==='checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem (indice);
        }
    }

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela()