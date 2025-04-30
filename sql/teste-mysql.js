import sql from 'k6/x/sql';

// Conexão com o banco de dados MySQL
const db = sql.open('mysql', 'usuario:senha@tcp(localhost:3306)/nome_do_banco');

export default function () {
    // aqui virão nossos comandos!
}

export function teardown() {
    db.close(); // fecha a conexão após o teste
}