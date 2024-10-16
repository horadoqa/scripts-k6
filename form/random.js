import http from 'k6/http';
import { check, fail } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

export const options = {
    stages: [
      { duration: '10s', target: 10 },
      { duration: '10s', target: 10 },
      { duration: '10s', target: 0 },
    ],
};

const csvData = new SharedArray('csvData', function () {
    return papaparse.parse(open('urls.csv'), { header: true }).data;
});

function request(config, rota) {
    const url = 'https://g1.globo.com/' + rota;
    const response = http.get(url);
    console.log(`URL: ${url} | Status Code: ${response.status}`);
    return response;
}

export default function (config) {
    const rota = csvData[Math.floor(Math.random() * csvData.length -1)];

    if (typeof rota !== "undefined") {
        const response = request(config, rota.rota);

        if (!check(response, {
            "step: response code was 200": (res) => res.status == 200,
        })) {
            fail(`Falha na requisição: ${rota.rota}`);
        }
    }
}
