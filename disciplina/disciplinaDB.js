const db = require('../db');

async function buscarMateria() {
    let resultado = await db.query('select * from disciplina order by id');
    return resultado.rows;
}

async function deletarMateria(event, id){
    let resultado = await db.query('delete from disciplina where id = $1', [id]);
    return resultado.rows;
}

async function alterarMateria(event, id, nome, id_professor) {
    let resultado = await db.query('update materias set nome = $1, id_professor = $2,  = $3 where id = $4', [nome, descricao, id_curso, id]);
    return resultado.rows;
}

async function adicionarMateria(event, nome, descricao, id_curso) {
    let resultado = await db.query('insert into materias (nome, descricao, id_curso) values ($1, $2, $3)', [nome, descricao, id_curso]);
    return resultado.rows;
}

module.exports = {
    buscarMateria,
    deletarMateria,
    alterarMateria,
    adicionarMateria
}