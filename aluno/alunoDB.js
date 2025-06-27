const db = require('../db');

async function buscarAlunos() {
    const resultado = await db.query('SELECT * FROM aluno order by id')
    return resultado.rows;

}

async function deletarAluno(event,id){    
    const resultado = await db.query('DELETE FROM aluno WHERE ID = $1',[id]);
    return resultado.rows;

}

async function alterarAluno(event, id, nome, idade, cpf) {
    const resultado = await db.query('UPDATE aluno SET nome = $1, idade = $2, cpf = $3, WHERE id = $4', [nome, idade, cpf, id])
    return resultado.rows
}

async function adicionarAluno(event, nome, idade, cpf){
    const resultado = await db.query('INSERT INTO public.aluno (nome, idade, cpf) VALUES ($1, $2, $3)', [nome, idade, cpf])
    return resultado.rows
}

async function filtrarAluno(event, filtro){
    const resultado = await db.query('select * from aluno where nome ilike $1', [`%${filtro}%`])
    return resultado.rows
}

module.exports = {
    buscarAlunos,
    deletarAluno,
    alterarAluno,
    adicionarAluno,
    filtrarAluno
}