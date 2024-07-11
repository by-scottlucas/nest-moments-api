# NestJS - Nest Moments API

Este projeto é uma API desenvolvida para o aplicativo Moments, que permite aos usuários registrar seus momentos mais inesquecíveis. 


## Introdução

A API é responsável pelo processo de autenticação e operações CRUD, como adicionar, exibir, atualizar ou excluir um momento no aplicativo.

Link do repositório do aplicativo: [Ionic Moments](https://github.com/by-scottlucas/ionic-moments.git)


## Estrutura do Projeto

- `src/decorators`: Contém os decoradores personalizados utilizados no projeto.

- `src/enums`: Contém as enumerações usadas para definir constantes específicas do projeto, como papéis de usuários.

- `src/guards`: Contém os guardiões (guards) que são usados para proteger rotas e recursos, controlando o acesso com base em regras definidas.

- `src/interceptors`: Contém os interceptores que permitem modificar ou inspecionar as solicitações e respostas da API.

- `src/resources/auth`: Contém os recursos relacionados à autenticação, incluindo serviços e controladores.

- `src/resources/moment`: Contém os recursos relacionados aos momentos, como serviços e controladores para operações CRUD.

- `src/resources/user`: Contém os recursos relacionados aos usuários, incluindo serviços e controladores para gerenciamento de usuários.

### Pré-requisitos

Ao clonar o repositório, é necessário baixar as dependências do projeto. Abra um novo terminal no diretório do projeto e digite o comando:

```bash
npm install
```

Para executar o projeto em ambiente de desenvolvimento, basta digitar o seguinte comando no terminal:

```bash
npm run start:dev
```

## Documentação

É possivel acessar documentação da API em modo desenvolvimento acessando: http://localhost:3000/api

## Tecnologias utilizadas

* TypeScript
* NestJS
* JWT
* Swagger
* TypeORM

## Autor

Este projeto foi desenvolvido por Lucas Santos Silva, profissional com formação técnica em Informática (Suporte) e Informática para Internet.

## Licença

Este projeto está licenciado sob a [Licença MIT](./LICENSE).