# SETUP

## Executar o docker-compose

```bash
docker-compose up -d  
```

## Listar as imagens


```bash
docker images                                
REPOSITORY        TAG       IMAGE ID       CREATED         SIZE
grafana/k6        1.4.2     82bb722da596   2 weeks ago     75.1MB
grafana/grafana   latest    d65277dbf54f   3 weeks ago     746MB
influxdb          1.8       899f8d89099b   16 months ago   307MB
```

## Listar os containers

```bash
docker container ls
CONTAINER ID   IMAGE                    COMMAND                  CREATED          STATUS          PORTS                    NAMES
2a8c8191cfc8   grafana/k6:1.4.2         "tail -f /dev/null"      14 minutes ago   Up 14 minutes                            k6
534b0b7d0d49   grafana/grafana:latest   "/run.sh"                14 minutes ago   Up 14 minutes   0.0.0.0:3000->3000/tcp   grafana
ffd45d6103f3   influxdb:1.8             "/entrypoint.sh infl…"   14 minutes ago   Up 14 minutes   0.0.0.0:8086->8086/tcp   influxdb
```

## Verificar a imagem do K6

```bash
docker exec -it k6 k6 version           
```

## Conectar o Grafana ao InfluxDB:

- URL: http://influxdb:8086
- Database: k6
- Usuário: admin
- Senha: admin123

Dashboards vão receber métricas do k6 em tempo real.

## Criar o Dashboard

- Logar no grafana: [localhost:3000](http://localhost:3000/)
- Importar o dashboard: 2587
- Informar o Datasource: InfluxDB

## Executar o k6

```bash
docker exec -it k6 k6 run /k6/login-test.js --out influxdb=http://admin:admin123@influxdb:8086/k6
```

Desligar o docker-compose

```bash
docker-compose down -v
```

Remover todas as imagens

```bash
docker rmi $(docker images -a -q)
```

docker image prune -f


## Adicionando novo script na pasta k6

Entre no container:

```bash
docker exec -it k6 /bin/sh
```

Confirme que o arquivo está lá:

```bash
ls /k6
```

## Execute o k6 com o novo script:

```bash
docker exec -it k6 k6 run /k6/healthcheck.js --out influxdb=http://admin:admin123@influxdb:8086/k6
```