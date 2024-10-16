import csv

# Gerando uma lista de dados fictícios
dados = [
    {'nome': 'Ana Silva', 'email': 'ana.silva@email.com', 'telefone': '(11) 91234-5678'},
    {'nome': 'Bruno Santos', 'email': 'bruno.santos@email.com', 'telefone': '(21) 92345-6789'},
    {'nome': 'Carla Oliveira', 'email': 'carla.oliveira@email.com', 'telefone': '(31) 93456-7890'},
    {'nome': 'Diego Pereira', 'email': 'diego.pereira@email.com', 'telefone': '(41) 94567-8901'},
    {'nome': 'Elisa Costa', 'email': 'elisa.costa@email.com', 'telefone': '(51) 95678-9012'}
]

# Definindo o caminho do arquivo
caminho_arquivo = 'dados_usuarios.csv'

# Salvando os dados em um arquivo CSV, separados por ponto e vírgula
with open(caminho_arquivo, mode='w', newline='', encoding='utf-8') as arquivo_csv:
    escritor_csv = csv.DictWriter(arquivo_csv, fieldnames=['nome', 'email', 'telefone'], delimiter=';')
    escritor_csv.writeheader()
    escritor_csv.writerows(dados)

print(f'Dados salvos no arquivo: {caminho_arquivo}')
