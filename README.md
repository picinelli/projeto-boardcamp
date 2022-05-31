<div id="top"></div>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/picinelli/projeto-boardcamp">
    <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f5fa-fe0f.svg" alt="Logo" width="100">
  </a>

<h3 align="center">Projeto - BoardCamp (BACK-END)</h3>
  <h4 align="center"> 
	🚀 Concluído! 🚀
  </h4>
  <p align="center">
    API de uma Locadora de Jogos de Tabuleiro.
    <br />
    <a href="https://github.com/picinelli/projeto-boardcamp/tree/main/src"><strong>Código JS»</strong></a>
</div>

<!-- ABOUT THE PROJECT -->

## ✅ Requisitos

- [x] Geral
    - [x]  Versionamento usando Git é obrigatório, crie um **repositório público** no seu perfil do GitHub.
    - [x]  Faça *commits* a cada funcionalidade implementada.
- CRUD de Categorias [Create|Read]
    - Formato de uma categoria (tabela `categories`)
        
        ```jsx
        {
          id: 1,
          name: 'Estratégia',
        }
        ```
        
    - Listar categorias
        - Rota: **GET** `/categories`
        - **Response**: lista de todas as categorias cada no formato acima:
            
            ```jsx
            [
              {
                id: 1,
                name: 'Estratégia',
              },
              {
                id: 2,
                name: 'Investigação',
              }
            ]
            ```
            
    - Inserir categoria
        - **Rota:** **POST** `/categories`
        - **Request:** *body* no formato
            
            ```jsx
            {
              name: 'Investigação'
            }
            ```
            
        - **Response**: status 201, sem dados
        - **Regras de Negócio**
            - `name` não pode estar vazio ⇒ nesse caso, deve retornar **status 400**
            - `name` não pode ser um nome de categoria já existente ⇒ nesse caso deve retornar **status 409**
- CRUD de Jogos [Create|Read]
    - Formato de um jogo (tabela `games`)
        
        ```jsx
        {
          id: 1,
          name: 'Banco Imobiliário',
          image: 'http://',
          stockTotal: 3,
          categoryId: 1,
          pricePerDay: 1500,
        }
        ```
        
    - Listar jogos
        - **Rota**: **GET** `/games`
        - **Response:** lista dos jogos encontrados, seguindo o formato abaixo (incluindo o nome da categoria conforme destacado)
            
            ```jsx
            [
              {
                id: 1,
                name: 'Banco Imobiliário',
                image: 'http://',
                stockTotal: 3,
                categoryId: 1,
                pricePerDay: 1500,
                categoryName: 'Estratégia'
              },
              {
                id: 2,
                name: 'Detetive',
                image: 'http://',
                stockTotal: 1,
                categoryId: 2,
                pricePerDay: 2500,
                categoryName: 'Investigação'
              },
            ]
            ```
            
        - **Regras de Negócio**
            - Caso seja passado um parâmetro `name` na **query string** da requisição, os jogos devem ser filtrados para retornar somente os que começam com a string passada (*case insensitive*). Exemplo:
                - Para a rota `/games?name=ba`, deve ser retornado uma array somente com os jogos que comecem com "ba", como "Banco Imobiliário", "Batalha Naval", etc
    - Inserir um jogo
        - **Rota**: **POST** `/games`
        - **Request**: *body* no formato:
            
            ```jsx
            {
              name: 'Banco Imobiliário',
              image: 'http://',
              stockTotal: 3,
              categoryId: 1,
              pricePerDay: 1500,
            }
            ```
            
        - **Response:** status 201, sem dados
        - **Regras de Negócio**
            - `name` não pode estar vazio; `stockTotal` e `pricePerDay` devem ser maiores que 0; `categoryId` deve ser um id de categoria existente; ⇒ nesses casos, deve retornar **status 400**
            - `name` não pode ser um nome de jogo já existente ⇒ nesse caso deve retornar **status 409**
- CRUD de Clientes [Create|Read|Update]
    - Formato de um cliente (tabela `customers`)
        
        ```jsx
        {
          id: 1,
          name: 'João Alfredo',
          phone: '21998899222',
          cpf: '01234567890',
          birthday: '1992-10-05'
        }
        ```
        
    - Listar clientes
        - **Rota: GET** `/customers`
        - **Response:** lista com todos os clientes
            
            ```jsx
            [
              {
                id: 1,
                name: 'João Alfredo',
                phone: '21998899222',
                cpf: '01234567890',
                birthday: '1992-10-05'
              },
              {
                id: 2,
                name: 'Maria Alfreda',
                phone: '21998899221',
                cpf: '12345678910',
                birthday: '1994-12-25'
              },
            ]
            ```
            
        - **Regras de Negócio**
            - Caso seja passado um parâmetro `cpf` na **query string** da requisição, os clientes devem ser filtrados para retornar somente os com CPF que comecem com a string passada. Exemplo:
                - Para a rota `/customers?cpf=012`, deve ser retornado uma array somente com os clientes que o CPF comece com "012", como "01234567890", "01221001200", etc
    - Buscar um cliente por id
        - **Rota: GET** `/customers/:id`
        - **Response:** somente o objeto do usuário com o id passado:
            
            ```sql
            {
              id: 1,
              name: 'João Alfredo',
              phone: '21998899222',
              cpf: '01234567890',
              birthday: '1992-10-05'
            }
            ```
            
        - **Regras de Negócio:**
            - Se o cliente com id dado não existir, deve responder com **status 404**
    - Inserir um cliente
        - **Rota:** **POST** `/customers`
        - **Request:** *body* no formato a abaixo
            
            ```sql
            {
              name: 'João Alfredo',
              phone: '21998899222',
              cpf: '01234567890',
              birthday: '1992-10-05'
            }
            ```
            
        - **Response:** status 201, sem dados
        - **Regras de negócio**
            - `cpf` deve ser uma string com 11 caracteres numéricos; `phone` deve ser uma string com 10 ou 11 caracteres numéricos; `name` não pode ser uma string vazia; `birthday` deve ser uma data válida; ⇒ nesses casos, deve retornar **status 400**
            - `cpf` não pode ser de um cliente já existente; ⇒ nesse caso deve retornar **status 409**
    - Atualizar um cliente
        - **Rota:** **PUT** `/customers/:id`
        - **Request:** *body* no formato abaixo
            
            ```sql
            {
              name: 'João Alfredo',
              phone: '21998899222',
              cpf: '01234567890',
              birthday: '1992-10-05'
            }
            ```
            
        - **Response:** status 200, sem dados
        - **Regras de negócio:**
            - `cpf` deve ser uma string com 11 caracteres numéricos; `phone` deve ser uma string com 10 ou 11 caracteres numéricos; `name` não pode ser uma string vazia; `birthday` deve ser uma data válida ⇒ nesses casos, deve retornar **status 400**
            - `cpf` não pode ser de um cliente já existente ⇒ nesse caso deve retornar **status 409**
- CRUD de Aluguéis [Create|Read|Update|Delete]
    - Formato de um aluguel (tabela `rentals`)
        
        ```jsx
        {
          id: 1,
          customerId: 1,
          gameId: 1,
          rentDate: '2021-06-20',    // data em que o aluguel foi feito
          daysRented: 3,             // por quantos dias o cliente agendou o aluguel
          returnDate: null,          // data que o cliente devolveu o jogo (null enquanto não devolvido)
          originalPrice: 4500,       // preço total do aluguel em centavos (dias alugados vezes o preço por dia do jogo)
          delayFee: null             // multa total paga por atraso (dias que passaram do prazo vezes o preço por dia do jogo)
        }
        ```
        
    - Listar aluguéis
        - **Rota: GET** `/rentals`
        - **Response:** lista com todos os aluguéis, contendo o `customer` e o `game` do aluguel em questão em cada aluguel
            
            ```jsx
            [
              {
                id: 1,
                customerId: 1,
                gameId: 1,
                rentDate: '2021-06-20',
                daysRented: 3,
                returnDate: null, // troca pra uma data quando já devolvido
                originalPrice: 4500,
                delayFee: null,
                customer: {
                 id: 1,
                 name: 'João Alfredo'
                },
                game: {
                  id: 1,
                  name: 'Banco Imobiliário',
                  categoryId: 1,
                  categoryName: 'Estratégia'
                }
              }
            ]
            ```
            
        - **Regras de Negócio**
            - Caso seja passado um parâmetro `customerId` na **query string** da requisição, os aluguéis devem ser filtrados para retornar somente os do cliente solicitado. Exemplo:
                - Para a rota `/rentals?customerId=1`, deve ser retornado uma array somente com os aluguéis do cliente com id 1
            - Caso seja passado um parâmetro `gameId` na **query string** da requisição, os aluguéis devem ser filtrados para retornar somente os do jogo solicitado. Exemplo:
                - Para a rota `/rentals?gameId=1`, deve ser retornado uma array somente com os aluguéis do jogo com id 1
    - Inserir um aluguel
        - **Rota:** **POST** `/rentals`
        - **Request:** *body* no formato
            
            ```jsx
            {
              customerId: 1,
              gameId: 1,
              daysRented: 3
            }
            ```
            
        - **Response:** status 201, sem dados
        - **Regras de Negócio**
            - Ao inserir um aluguel, os campos `rentDate` e `originalPrice` devem ser populados automaticamente antes de salvá-lo:
                - `rentDate`: data atual no momento da inserção
                - `originalPrice`: `daysRented` multiplicado pelo preço por dia do jogo no momento da inserção
            - Ao inserir um aluguel, os campos `returnDate` e `delayFee` devem sempre começar como `null`
            - Ao inserir um aluguel, deve verificar se `customerId` se refere a um cliente existente. Se não, deve responder com **status 400**
            - Ao inserir um aluguel, deve verificar se `gameId` se refere a um jogo existente. Se não, deve responder com **status 400**
            - `daysRented` deve ser um número maior que 0. Se não, deve responder com **status 400**
            - Ao inserir um aluguel, deve-se validar que existem jogos disponíveis, ou seja, que não tem alugueis em aberto acima da quantidade de jogos em estoque. Caso contrário, deve retornar **status 400**
    - Finalizar aluguel
        - **Rota:** **POST** `/rentals/:id/return`
        - **Response:** status 200, sem dados
        - **Regras de Negócio**
            - Ao retornar um aluguel, o campo `returnDate` deve ser populado com a data atual do momento do retorno
            - Ao retornar um aluguel, o campo `delayFee` deve ser automaticamente populado com um valor equivalente ao número de dias de atraso vezes o preço por dia do jogo no momento do retorno. Exemplo:
                - Se o cliente aluguel no dia **20/06** um jogo por **3 dias**, ele deveria devolver no dia **23/06**. Caso ele devolva somente no dia **25/06**, o sistema deve considerar **2 dias de atraso**. Nesse caso, se o jogo custava **R$ 15,00** por dia, a `delayFee` deve ser de **R$ 30,00** (3000 centavos)
            - Ao retornar um aluguel, deve verificar se o `id` do aluguel fornecido existe. Se não, deve responder com **status 404**
            - Ao retornar um aluguel, deve verificar se o aluguel já não está finalizado. Se estiver, deve responder com **status 400**
    - Apagar aluguel
        - **Rota:** **DELETE** `/rentals/:id`
        - **Response:** status 200, sem dados
        - **Regras de Negócio**
            - Ao excluir um aluguel, deve verificar se o `id` fornecido existe. Se não, deve responder com **status 404.**
            - Ao excluir um aluguel, deve verificar se o aluguel já não está finalizado (ou seja, `returnDate` já está preenchido). Se não estiver finalizado, deve responder com **status 400.**

## ☑️ Bônus

- Paginação
    - **GET** /categories, /games, /customers, /rentals
        - Caso seja passado um parâmetro `offset` na **query string** da requisição, deve-se obter somente os registros no banco após o offset determinado. Ex: se for passado `offset=20` e existirem 100 produtos no banco, só devem ser retornados os 80 últimos (do 21º ao 100º)
        - Caso seja passado um parâmetro `limit` na query string da requisição, deve-se limitar a quantidade de registros retornados a esse limite no máximo. Ex: se for passado `limit=30` e existirem 100 produtos no banco, só devem ser retornados os 30 primeiros
        - Caso tanto `limit` quanto `offset` sejam passados, ambos devem ser aplicados. Ex: se for passado `offset=20&limit=30`, caso existam 100 produtos no banco, só devem ser retornados os produtos do 21º ao 50º.
- Ordenação
    - **GET** /categories, /games, /customers, /rentals
        - Caso seja passado um parâmetro `order` na **query string** da requisição, deve-se retornar os registros ordenados pela coluna passada em ordem ascendente. Ex: se for passado `order=name`, os registros devem ser ordenados alfabeticamente pela coluna `name`
        - Caso seja passado também um parâmetro `desc` na **query string**, deve-se inverter esta ordem para descendente. Ex: se for passado `order=name&desc=true`, os registros devem ser ordenados alfabeticamente invertidos pela coluna `name`
- Filtragem por data
    - **GET** /rentals
        - Caso seja passado um parâmetro `status` na **query string** da requisição, os aluguéis devem ser filtrados para retornar somente aqueles que estão naquele estado. Exemplo:
            - Para a rota `/rentals?status=open`, deve ser retornado uma array somente com os aluguéis não finalizados
            - Para a rota `/rentals?status=closed`, deve ser retornado uma array somente com os aluguéis finalizados
        - Caso seja passado um parâmetro `startDate` na **query string** da requisição, os aluguéis devem ser filtrados para retornar somente os que foram feitos a partir daquela data. Exemplo:
            - Para a rota `/rentals?startDate=2021-06-10`, deve ser retornado uma array somente com os aluguéis com `rentDate` maior ou igual a `2021-06-10`
- Cálculo de faturamento
    - **GET** /rentals/metrics
        - Implemente a nova rota acima que deve calcular:
            - `revenue`: o total de receita da loja (somando todos os preços e taxas recebidas nos aluguéis)
            - `rentals`: a quantidade total de aluguéis
            - `average`: e a média de receita por aluguel (divisão do total da receita pela quantidade de aluguéis)
        - Por exemplo, se em toda a história a loja teve de faturamento 1 milhão de reais, que vieram de 50 mil aluguéis, o retorno da rota deveria ser: (em centavos)
        
            ```jsx
            {
            	revenue: 100000000,
            	rentals: 50000,
            	average: 2000
            }
            ```
           
        - Caso seja passado um parâmetro `startDate` e/ou `endDate` na **query string** da requisição, as métricas devem ser filtradas para retornar somente dados referentes aos aluguéis com `rentDate` dentro desse período (a partir da `startDate` inclusive e/ou até a endDate inclusive)
- Quantidade de aluguéis
    - **GET** /games, /customers
        - Sem aumentar o número de queries feitas no banco, adicione nos retornos das rotas acima, em uma propriedade `rentalsCount`, a quantidade de aluguéis já feitos para aquele cliente ou daquele jogo. Ex: se um jogo já foi alugado 10 vezes, em cada jogo deve ser incluído um campo `rentalsCount: 10`


### Tecnologias Utilizadas

![Nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

<!-- CONTACT -->

### Contato

[![LinkedIn][linkedin-shield]][linkedin-url]
[![Mail][mail-shield]][mail-url]

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=blue
[linkedin-url]: https://www.linkedin.com/in/pedro-ivo-brum-cinelli//
[mail-shield]: https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white
[mail-url]: mailto:cinelli.dev@gmail.com
