const db = require('../db');

async function buscarDisciplinas() {
    let resultado = await db.query(`
    SELECT disciplina.id, disciplina.nome, disciplina.id_professor, professor.nome AS professor
    FROM disciplina
    JOIN professor ON professor.id = disciplina.id_professor
    ORDER BY professor.id`)
    return resultado.rows;
}

async function deletarDisciplina(event, id){
    let resultado = await db.query('delete from disciplina where id = $1', [id]);
    return resultado.rows;
}

async function alterarDisciplina(event, id, id_professor, nome) {
    let resultado = await db.query('update disciplina set id_professor = $1, nome = $2 where id = $3', [id_professor, nome, id]);
    return resultado.rows;
}

async function adicionarDisciplina(event, nome, id_professor) {
    let resultado = await db.query('insert into disciplina (nome, id_professor) values ($1, $2)', [nome, id_professor]);
    return resultado.rows;
}

async function filtrarAluno(event, filtro){
    const resultado = await db.query('select * from aluno where nome ilike $1', [`%${filtro}%`])
    return resultado.rows
}

module.exports = {
    buscarDisciplinas,
    deletarDisciplina,
    alterarDisciplina,
    adicionarDisciplina
}