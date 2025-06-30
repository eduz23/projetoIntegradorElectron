const db = require('../db')

async function buscarNota(){
    let result = await db.query(`
        SELECT 
            nota.id,
            nota.id_aluno,
            aluno.nome AS aluno,
            nota.id_disciplina,
            disciplina.nome AS disciplina,
            nota.nota
        FROM nota 
        JOIN aluno ON nota.id_aluno = aluno.id 
        JOIN disciplina ON nota.id_disciplina = disciplina.id
    `);
    return result.rows;
}


async function deletarNota(event, id){
    let result = await db.query('delete from nota where id = $1', [id])
    return result.rows
}

async function alterarNota(event, id, id_aluno, id_disciplina, nota) {
    let result = await db.query('update nota set id_aluno = $1, id_disciplina = $2, nota = $3 where id = $4', [id_aluno, id_disciplina, nota, id])
    return result.rows
}

async function adicionarNota(event, id_aluno, id_disciplina, nota) {
    let result = await db.query('insert into nota (id_aluno, id_disciplina, nota) values ($1, $2, $3)', [id_aluno, id_disciplina, nota])
    return result.rows
}

async function filtrarNota(event, filtro) {
    let result = await db.query(`SELECT 
            nota.id,
            nota.id_aluno,
            aluno.nome AS aluno,
            nota.id_disciplina,
            disciplina.nome AS disciplina,
            nota.nota
        FROM nota 
        JOIN aluno ON nota.id_aluno = aluno.id 
        JOIN disciplina ON nota.id_disciplina = disciplina.id
        where aluno.nome ilike $1`, [`%${filtro}%`])

    return result.rows
}

async function calcularMedia(nome) {
        let resultado = await db.query(`
            SELECT 
                aluno.nome AS aluno,
                ROUND(AVG(nota.nota), 1) AS media
            FROM nota
            JOIN aluno ON nota.id_aluno = aluno.id
            WHERE aluno.nome ILIKE $1
            GROUP BY aluno.nome
        `, [`%${nome}%`])

        return resultado.rows
}

module.exports = {
    buscarNota,
    deletarNota,
    alterarNota,
    adicionarNota,
    filtrarNota,
    calcularMedia
}