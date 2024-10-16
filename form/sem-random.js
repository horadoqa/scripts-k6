import http from 'k6/http';
import { check, fail } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

// Configuração de opções do teste
export const options = {
    stages: [
      { duration: '10s', target: 10 },
      { duration: '10s', target: 10 },
      { duration: '10s', target: 0 },
    ],
};

// Carrega o arquivo CSV e converte para JSON usando papaparse
const csvData = new SharedArray('csvData', function () {
    return papaparse.parse(open('urls.csv'), { header: true }).data;
});

// Função principal que executa as requisições
export default function () {
    // Calcula qual URL deve ser usada com base no número de iteração global (__ITER)
    const rotaIndex = __ITER % csvData.length; // Garante que todas as URLs sejam usadas
    const linha = csvData[rotaIndex]; // Seleciona a linha correspondente
    const rota = linha.rota;          // Extrai a coluna 'rota' do CSV

    // Construção da URL
    const url = `https://g1.globo.com/${rota}`;
    const response = http.get(url);

    // Log da requisição
    console.log(`Requisição para URL: ${url} | Status: ${response.status}`);

    // Verificação do status da resposta
    check(response, {
        'status é 200': (r) => r.status === 200,
    });

    // Falha no teste se o status não for 200
    if (response.status !== 200) {
        fail(`Falha na requisição para a URL: ${rota}`);
    }
}
