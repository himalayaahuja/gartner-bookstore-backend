<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest] Sample bookstore monorepo that allows users to browse through books via paging, filter via title, author (words only search)
ratings filter and price range filtering with user login functionality and add to cart feature.

## Requirements
Node : 18.16.0, NPM version : 9.5.1, standalone mongodb installed on your machine (currently using 6.0.5)

## Installation to set up locally
1. clone the repository
2. run the following command in project root directory first

```bash
$ npm install
```
3. cd into project's `gartner-bookstore-frontend` directory and run the following command again

```bash
$ npm install
```
4. Back in the project root directory i.e `gartner-bookstore-backend` create a .env file in project root directory from the given .env.example file and provide values to the defined variables
5. Make sure we have a valid mongodb uri mentioned in .env file (including a fresh database name like `gartner-bookstore`) and the mongodb instance running
6. Import the books data from the file `books.json` using the following command from your terminal make sure to run the command from the same directory as the one `books.json` is in.: 

```bash
$ mongoimport books.json -d gartner-bookstore -c books --jsonArray --drop
```
make sure the database name in .env uri is same as the one referenced in above command viz `gartner-bookstore`

8. Seed user data into the database by running  the following command from project root directory

```bash
$ npx nestjs-command add-user:seed
```
   

## Running the app in production mode on your machine

1. Back into the project root directory i.e `gartner-bookstore-backend`, run the following commands in succession

```bash
# building backend and frontend apps first
$ npm run build:prod

# running in production mode
$ npm run start:prod
```
2. Open browser at address `http://localhost:3000`

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
