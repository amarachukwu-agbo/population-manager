[![CircleCI](https://circleci.com/gh/amarachukwu-agbo/population-manager.svg?style=svg)](https://circleci.com/gh/amarachukwu-agbo/population-manager)
[![Maintainability](https://api.codeclimate.com/v1/badges/c9b7bc07d746f5b9835b/maintainability)](https://codeclimate.com/github/amarachukwu-agbo/population-manager/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c9b7bc07d746f5b9835b/test_coverage)](https://codeclimate.com/github/amarachukwu-agbo/population-manager/test_coverage)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/hyperium/hyper/master/LICENSE)

# population-manager
An API that manages population records in locations

## Hosting
* The API is hosted on https://amara-population-manager.herokuapp.com/api/v1/
and is documented [here] (https://documenter.getpostman.com/view/5174456/S1ETSHNC)

## Technologies used
* [JavaScript](https://www.javascript.com/) - A programming language for the web
* [NodeJS](https://nodejs.org/en/) - A Javascript runtime environment built using Chrome's v8 engine that makes it possible to run JavaScript on the server.
* [ExpressJS](https://expressjs.com/) - A lightweight JavaScript framework that lets you organize web applications in an MVC architecture on the server-side. It helps with handling routing, requests and views.
* [Sequelize](http://docs.sequelizejs.com/) - A promise-based ORM for SQL databases compatible with NodeJS. It supports relations, read replication and more.
* [Postgres](https://www.postgresql.org/) - A robust open-source relational database system built on SQL standards.

## Features
* Users can be created
* All users can be retrieved
* A single user can be retrieved
* Users can send sms to other users
* Users can be deleted; all sms related to them are deleted as well
* Users can retrieve a single sms
* Users can retrieve all sms sent to and by them

## Installation and setup
1. Install [`NodeJS`](https://nodejs.org/en/download/)
2. Install [`Postgres`](https://www.postgresql.org/download/)
3. Clone the repository using the command
    ```
    git clone https://github.com/amarachukwu-agbo/population-manager.git
    ```
4. Change directory to the project's folder using the command
    ```
    cd population-manager
    ```
5. Install project's dependencies using the command
    ```
    yarn
    ```
6. Set up Postgres. Add database configuration for development and test as specified in `/config/config.js` using the sample .env file as a guide.

7. Run database migrations to create the models in the database using the command
    ```
    sequelize db:migrate
    ```
9. Start the application
    * Start the server with ```
    yarn start:dev```
10. Open Postman and access any of the endpoints specified in the doc

## License
This project is licensed under the [MIT License](https://github.com/amarachukwu-agbo/population-manager/blob/develop/LICENSE)
