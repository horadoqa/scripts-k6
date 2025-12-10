import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

// Importa o k6-reporter diretamente da URL (sem npm)
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// 📌 Executar por 5 minutos
export const options = {
    duration: '30s',
    vus: 1
};

// Carrega o JSON com os usuários
const usuarios = new SharedArray('usuarios', function () {
    const data = JSON.parse(open('./usuarios.json'));

    if (!data.usuarios || !Array.isArray(data.usuarios)) {
        throw new Error("O arquivo usuarios.json precisa conter a propriedade 'usuarios' como array.");
    }

    return data.usuarios;
});

// Função que retorna usuário aleatório
function getRandomUser() {
    return usuarios[Math.floor(Math.random() * usuarios.length)];
}

// Teste principal
export default function () {
    const u = getRandomUser();

    const payload = JSON.stringify({
        email: u.email,
        password: u.password
    });

    const headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    };

    const res = http.post('https://serverest.dev/login', payload, { headers });

    check(res, {
        "status 200": (r) => r.status === 200,
    });

    console.log(`Email: ${u.email} | Password: ${u.password} | Status: ${res.status}`);

    sleep(1);
}

// 📄 Gera relatório HTML ao final
export function handleSummary(data) {
    return {
        "relatorio.html": htmlReport(data),
    };
}
