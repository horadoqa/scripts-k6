import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

// 📌 Configuração do teste: duração 5 minutos
export const options = {
    duration: '5m',
    vus: 1, // Ajuste se quiser mais carga
};

// Carrega somente o array "usuarios" do JSON
const usuarios = new SharedArray('usuarios', function () {
    const data = JSON.parse(open('./usuarios.json'));

    if (!data.usuarios || !Array.isArray(data.usuarios)) {
        throw new Error("O arquivo usuarios.json precisa conter a propriedade 'usuarios' como array.");
    }

    return data.usuarios; // Retorna somente o array
});

// Função para pegar um usuário aleatório
function getRandomUser() {
    return usuarios[Math.floor(Math.random() * usuarios.length)];
}

export default function () {

    const u = getRandomUser(); // <-- usuário randômico

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

    sleep(1); // pequena pausa entre execuções
}
