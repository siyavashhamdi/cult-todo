# Project todo-siya

## Setup microservices

Note: Before running the following scripts, make sure that you have created `.env` file with default values of `.env.example` file in each microservice.

```bash
cd microservices/api
npm ci
npm run start:dev
```

```bash
cd microservices/admin
npm ci
# npm run generate # Run it first time or when GRAPHQL API Changes.
npm run start:dev
```

### Tests

```bash
cd microservices/admin
npm run test:dev
```
