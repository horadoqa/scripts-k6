import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1, // Apenas um usuário virtual
    iterations: 79, // Número total de iterações (de 2 a 80)
};

let currentId = 2; // Inicializa o ID atual

export default function () {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (currentId <= 80) { // Verifica se o ID atual está dentro do intervalo
        const res = http.del(`http://localhost:5000/api/usuarios/${currentId}`, null, { headers: headers });

        // Log do status code
        console.log(`Status Code para ID ${currentId}: ${res.status}`);

        check(res, {
            'status é 200 ou 404': (r) => r.status === 200 || r.status === 404,
        });

        currentId++; // Incrementa o ID atual

        sleep(1); // Pausa de 1 segundo entre as requisições
    }
}
