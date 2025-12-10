import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

export const options = {
    duration: '5m',
    vus: 1,
    ext: {
        loadimpact: {
            projectID: 1234567,
            name: "Login Test"
        },
        influxdb: {
            // Para enviar métricas para o InfluxDB
            address: "http://influxdb:8086",
            database: "k6"
        }
    }
};

// Carrega usuários
const usuarios = new SharedArray('usuarios', () => {
    const data = JSON.parse(open('/k6/usuarios.json'));
    return data.usuarios;
});

function getRandomUser() {
    return usuarios[Math.floor(Math.random() * usuarios.length)];
}

export default function () {
    const u = getRandomUser();

    const res = http.post("https://serverest.dev/login", JSON.stringify({
        email: u.email,
        password: u.password
    }), { headers: { "Content-Type": "application/json" } });

    check(res, { "status 200": r => r.status === 200 });

    console.log(`Email: ${u.email} | Status: ${res.status}`);

    sleep(1);
}
