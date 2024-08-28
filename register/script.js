import http from "k6/http";
import { sleep, check } from "k6";

import uudi from './libs/uuid.js';

export default function () {
  const loginUrl = "https://serverest.dev/login";

  const loginPayload = JSON.stringify({
    email: "fulano@qa.com",
    password: "teste",
  })

  const loginHeaders = {
    headers: { "Content-Type": "application/json" },
  }

  const loginRes = http.post(loginUrl, loginPayload, loginHeaders)
  const token = loginRes.json("authorization")

  check(token, {
    "token is retrieved": (t) => t !== undefined && t !== "",
  })

  const url = "https://serverest.dev/usuarios";
  
  const payload = JSON.stringify({
    nome: "Fulano da Silva",
    email: `${uudi.v4()}@qa.com.br`,
    password: "teste",
    administrador: "true"
  })

  const headers = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`,
    },
  }

  const res = http.post(url, payload, headers)

  check(res, {
    "status should be 201": (r) => r.status === 201,
    'valida mensagem de sucesso': (r) => r.json('message') === 'Cadastro realizado com sucesso',
    'valida ID de cadastro': (r) => r.json('_id') !== undefined && r.json('_id').length > 0
  });

  // console.log(res.body)
  sleep(1)
}