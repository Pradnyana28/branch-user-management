# Bonsai: User Management Service

## Description

This service is responsible to user management via Rest API and RPC Communication

## Service Dependencies

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Build Docker Image

```bash
make build-image
```

## Run Auth Management Image

Make sure docker network with name bonsai-network already exist

```bash
docker run -it --rm --network bonsai-network --name user-service \
-h user-service-host -d \
-e 'JWT_SECRET_KEY=Yx$83(js)a#UgH' \
-e 'MONGODB_HOST=bonsaidb' \
-e 'MONGODB_PORT=27017' \
-e 'MONGO_INITDB_DATABASE=users' \
-e 'MONGO_INITDB_USERNAME=dekjon' \
-e 'MONGO_INITDB_PASSWORD=Dontlookback' \
-p 3010:3010 -p 4010:4010 kadekpradnyana/bonsai-user-mgmt
```