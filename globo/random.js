import http from 'k6/http';
import { check, fail } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

export const options = {
    stages: [
      { duration: '10s', target: 10 },
      { duration: '60s', target: 10 },
      { duration: '10s', target: 0 },
    ],
};

// Carregar dados do CSV de forma compartilhada
const csvData = new SharedArray('csvData', function () {
    return papaparse.parse(open('urls.csv'), { header: true }).data;
});

// Função de requisição
function request(rota) {
    const url = rota;
    const response = http.get(url);
    console.log(`URL: ${url} | Status Code: ${response.status}`);
    return response;
}

// Função principal que é chamada a cada iteração
export default function () {
    // Selecionando um URL aleatório
    const rota = csvData[Math.floor(Math.random() * csvData.length)];

    if (rota && rota.rota) {  // Verifica se 'rota' e 'rota.rota' existem
        const response = request(rota.rota);

        // Verificando se o código de status é 200
        if (!check(response, {
            "step: response code was 200": (res) => res.status == 200,
        })) {
            fail(`Falha na requisição: ${rota.rota}`);
        }
    }
}
