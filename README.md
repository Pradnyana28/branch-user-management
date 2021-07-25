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

```bash
docker run -e 'JWT_SECRET_KEY=Yx$83(js)a#UgH' \
-e 'MONGODB_HOST=localhost' \
-e 'MONGODB_PORT=27018' \
-e 'MONGODB_INIT_ROOT_USERNAME=admin' \
-e 'MONGODB_INIT_ROOT_PASSWORD=root' \
-e 'MONGO_INITDB_DATABASE=bonsai' \
-e 'MONGO_INITDB_USERNAME=dekjon' \
-e 'MONGO_INITDB_PASSWORD=DontLookBack' \
-p 3010:3010 kadekpradnyana/bonsai-user-mgmt
```