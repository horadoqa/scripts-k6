import http from 'k6/http';
import { check } from 'k6';
import { readJSON } from 'k6/x/file';

export const options = {
    vus: 10, // número de usuários virtuais
    duration: '30s', // duração do teste
};

export default function () {
    // Lendo o arquivo JSON com os dados
    const dados = readJSON('dados.json');

    // Configurando os headers
    const headers = {
        'Authorization': `Bearer ${dados.token}`,
        'User': dados.usuario,
        'X-Api-Key': dados['chave-api'],
        'Content-Type': 'application/json',
    };

    // Fazendo a requisição HTTP
    const res = http.get('https://seu-endpoint-api.com', { headers: headers });

    // Verificando se a requisição foi bem-sucedida
    check(res, {
        'status é 200': (r) => r.status === 200,
    });
}
