const db = require('../db');

// Funções sql da tabela professor do banco de dados

async function buscarProfessores(){
    const resultado = await db.query('SELECT * FROM public.professor')
    return resultado.rows
}

async function deletarProfessor(event, id){
    const resultado = await db.query('DELETE FROM public.professor WHERE ID = $1', [id])
    return resultado.rows
}

async function adicionarProfessor(event, nome, disciplina, telefone) {
    const resultado = await db.query('INSERT INTO public.professor (nome, disciplina, telefone) VALUES ($1, $2, $3)', [nome, disciplina, telefone])
    return resultado.rows
    
}

async function alterarProfessor(event, id, nome, disciplina, telefone){
    const resultado = await db.query('UPDATE professor SET nome = $1, disciplina = $2, telefone = $3 WHERE id = $4', [nome, disciplina, telefone, id])
    return resultado.rows
}

module.exports = {
    buscarProfessores,
    deletarProfessor,
    adicionarProfessor,
    alterarProfessor
}