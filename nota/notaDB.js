const db = require('../db')

async function buscarNota(){
    let result = await db.query('select * from nota order by id')
    return result.rows
}

async function deletarNota(event, id){
    let result = await db.query('delete from nota where id = $1', [id])
    return result.rows
}

async function alterarNota(event, id, id_aluno, id_disciplina, nota) {
    let result = await db.query('update nota set id_aluno = $1, id_disciplina = $2, nota = $3 where id = $1', [id_aluno, id_disciplina, nota, id])
    return result.rows
}

async function adicionarNota(event, id_aluno, id_disciplina, nota) {
    let result = await db.query('insert into nota (id_aluno, id_disciplina, nota) values ($1, $2, $3)', id_aluno, id_disciplina, nota)
}

module.exports = {
    buscarNota,
    deletarNota,
    alterarNota,
    adicionarNota
}