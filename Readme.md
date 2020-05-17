# Projeto Nova Escola

## Especificações
- Node: v12.16.1
- Yarn: v1.22
- Express: v4.17.1
- Typescript: v3.8.3
- tsrynge: v4.1.0
- Typeorm: v0.2.24
- Jest: v25
- Supertest: v4.0
- MySql v5.7
- Docker

**Instalação**
1. Dependências do projeto:
  Com o terminal aberto na pasta api do projeto rode o comando:
  ```
  yarn install
  ```
2. Para o ambiente mysql foi utilizado o Docker.
  Caso deseje utilizar o docker basta rodar o comando abaixo e o ambiente será criado.
  ```
  docker run -d -p 3306:3306 --name projetoNovaEscola -e "MYSQL_DATABASE=novaescola" -e "MYSQL_ROOT_PASSWORD=novaescola" mysql:5.7
  ```
  Nome Container:
  - projetoNovaEscola
  
  Para iniciar o container rode o comando:
  ```
  docker start projetoNovaEscola
  ```
  Caso opte por não utilizar o docker, basta seguir as instruções no final do arquivo.

3. Criar e popular Tabela
  Foi utilizada uma abordagem code-first, portanto não há arquivos sql. Basta rodar as migrations dentro do projeto:
  - yarn typeorm migration:run
  Esse comando irá:
  1. Criar e popular a tabela clients no banco de dados novaescola.
  2. Criar o banco de dados novaescola_testes e a tabela clients.

  Caso opte por não utilizar o docker, basta informar as configurações de seu ambiente dentro do arquivo ormconfig.json na raiz do projeto e criar o database novaescola (novaescola_testes será criado pela migration)

**Rodando o projeto**
```
yarn dev:server
```

O servidor será iniciado na porta 3333

**Rotas**
Arquivo de rotas está disponível na raiz do projeto e pode ser importado no postman.

**Rodando os Testes**
```
yarn test
```

Foi criado um repositório fake para o módulo de clientes que não interage com o banco de dados.
Isso testa as funcionalidades de um serviço de forma isolada, sem nenhuma interferencia externa linha por linha de código.
Há também um teste para as requisições e interação com o banco de dados.
Ele testa a resposta das rotas. Todo tratamento de erros é feita nos testes unitários.


#### Definições para criação da base de dados:
**Banco de dados Principal:**
  - database: novaescola
  - host: localhost
  - porta: 3306
  - username: root
  - password: novaescola
  
O banco de dados de teste é criado automaticamente.
