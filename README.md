## Visão Geral

Transactor-app é uma aplicação em React Native de gerencionamento de clientes e transações. O aplicativo mantém uma lista de clientes, onde cada cliente é capaz de realizar compras e pagamentos com valores diversos, assim, o usuário pode armazenar e lembrar das transações de seus clientes.

### Funcionalidades

O Aplicativo permite você:

- Cadastrar clientes e editá-los;
- Manter o saldo dos clientes atualizado;
- Buscar clientes pelo nome;
- Listar transações, ordenadas por data e hora;
- Filtrar transações por tipo (compra ou pagamento)
- Cadastrar compras e pagamentos de um cliente específico;
- Remover transações;

## Instalação

A aplicação foi criada com a plataforma [Expo](https://docs.expo.dev/introduction/expo/) e escrita em Javascript. Primeiro devemos instalar as dependências com:

```sh
$ npm install
```

e então rodar o projeto usando o Expo:

```sh
$ npx expo start
```

## Tecnologias Utilizadas

Tecnologias utilizadas no desenvolvimento:

- [SQlite](https://docs.expo.dev/versions/latest/sdk/sqlite/) para persistência local de dados;
- [React Navigation](https://reactnavigation.org/) para gerenciar a navegação;
- [React Native Paper](https://callstack.github.io/react-native-paper/) como `lib` de componentes, seguindo o Material Design da Google;
- [Zustand](https://github.com/pmndrs/zustand) como `store` de gerenciamento de estados;

## Screenshots

### Telas de clientes e transações

|                                              Lista de Clientes                                              	|                                                Lista de Transações                                                	|
|:-----------------------------------------------------------------------------------------------------------:	|:-----------------------------------------------------------------------------------------------------------------:	|
| ![Consumers List](https://github.com/carlosferreirahd/transactor-app/blob/master/readme/consumers-list.png) 	| ![Transactions List](https://github.com/carlosferreirahd/transactor-app/blob/master/readme/transactions-list.png) 	|

### Funcionalidades de Transações

|                                                Adicionar Transação                                                	|                                                  Remover Transação                                                 	|                                                  Filtrar Transação                                                 	|
|:-----------------------------------------------------------------------------------------------------------------:	|:------------------------------------------------------------------------------------------------------------------:	|:------------------------------------------------------------------------------------------------------------------:	|
| ![Adicionar Transação](https://github.com/carlosferreirahd/transactor-app/blob/master/readme/add-transaction.gif) 	| ![Remover Transação](https://github.com/carlosferreirahd/transactor-app/blob/master/readme/delete-transaction.gif) 	| ![Filtrar Transação](https://github.com/carlosferreirahd/transactor-app/blob/master/readme/filter-transaction.gif) 	|
