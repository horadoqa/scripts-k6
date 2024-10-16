import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

export const options = {
    vus: 1, // Apenas um usuário virtual
    iterations: 20, // Número total de iterações
};

// Carrega o JSON usando a função `open()`
const usuarios = new SharedArray('usuarios', function () {
    return JSON.parse(open('users.json'));
});

export default function () {
    const index = __ITER;  // __ITER indica a iteração atual
    const usuario = usuarios[index];  // Pega um usuário baseado no índice

    const headers = {
        'Content-Type': 'application/json',
    };

    const body = JSON.stringify({
        name: usuario.name,  // Corrigido para 'name'
        email: usuario.email,
        telefone: usuario.telefone,
    });

    const res = http.post('http://localhost:5000/api/cadastro', body, { headers: headers });

    console.log(`Status da requisição para ${usuario.name}: ${res.status}`);

    check(res, {
        'status é 201 ou 409': (r) => r.status === 201 || r.status === 409, // Aceita 201 e 409
    });

    sleep(1); // Pausa de 1 segundo entre as requisições
}
