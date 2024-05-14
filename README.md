## Prerequisite

1. You need to have `NodeJS` ([AdonisJS](https://adonisjs.com/) needs `Node.js >= 20.6`)
2. Docker

## Setup

1. Clone the repo with `git clone`
   <br>
   In the root folder in terminal:
2. Run `npm install` to install dependencies
3. Run Docker and then run `docker-compose up -d` to run containers (`redis`,`mysql`,`phpmyadmin`)
4. Run `npm run dev` to start server
5. Run `node ace migration:run` and `node ace db:seed` to run migrations and to seed

## Endpoints

To see routes run `node ace list:routes` or look into `start/routes.ts`

## Tests

To run tests run `node ace test`

## Notes

1. `Luxon`(time library) and `VineJs`(validation) are acting weird when working with ISO 8601 date format. I think its a bug. But this is the reason you will see some weird conversion in the code base as well as some weird types.
2. There are only tests for get sleep entries, login, register and get stats. I didnt want to write tests for all of the endpoints as this is purely showcase project. This includes unit tests.
3. I have stored only current week averages. But of course it is possible to store previous week averages in the DB and then pull them directly from DB. This of course introduces some complexity if previous sleep entries can be updated or delete because we need to recalculate those previous averages.
4. Speaking of recalculating averages, if any current week sleep entry is deleted or updated I am recalculating entire week average from DB. This can of course can be optimized.
5. There are multiple places that can be further optimized but it depends on project direction/C-level decisions.
