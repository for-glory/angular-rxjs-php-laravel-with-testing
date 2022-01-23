# GoReact Applicant Project

This is the take-home project for Software Engineers applying to work at GoReact. This same project is used for all Software Engineer positions. Make sure you follow the directions for the specific position you're applying for.

## Running the project

This project requires you to have Docker installed as well as PHP 8 with Composer and Node.js v16. (or even better if you have `nvm` installed you can use the `.nvmrc` file in this project to set your Node version) To run this project, run the following commands in two separate terminal windows:

```shell
# Terminal 1 - API
$ cd api
$ composer install
$ ./vendor/bin/sail up

# Terminal 2 - Client
$ cd client
$ npm install
$ npm start
```

The API sail command will spin up Laravel and MySQL in docker containers. The API will be available at `localhost:8000`. The Client command will use the Angular CLI to serve the Angular application, which you can access at `localhost:4200`.

## Running Tests

Part of your project is fixing broken tests and adding new tests. You can run your API tests like so:

```shell
# API tests
$ cd api
$ ./vendor/bin/phpunit # TODO: Probably need to run from within docker container
```

You can run your Client tests in watch mode with the following commands:

```shell
# Client Tests
$ cd client
$ npm test
```

## Project Requirements

Check the [REQUIREMENTS](./REQUIREMENTS.md) document to get the list of you need to do for your position application.
