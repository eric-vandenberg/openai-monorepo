## Features

- NestJS monorepo
- 2 microservices
  - Auth microservice
    - User Model
  - Prompts microservice
    - Prompt Model
- MongoDB
  - Mongoose ODM
- Docker
  - Containers for each service + database
- AI
  - OpenAI integration

> [!NOTE]
> Requests made to the Prompts microservice are authenticated through the Auth microservice via RPC (TCP)

<br />

## System Requirements

### pnpm

pnpm: https://pnpm.io/installation

### Docker Desktop

docker & docker-compose: https://www.docker.com/products/docker-desktop/

<br />

## Installation

```bash
$ git clone git@github.com:eric-vandenberg/openai-monorepo.git
$ cd openai-monorepo
$ pnpm install
```

<br />

## Setup before Run

> [!IMPORTANT]
> Add an [OpenAI API key](https://platform.openai.com/api-keys) with access to a model (gpt-4)

<br />

```bash
# apps/prompts/.env
OPENAI_API_KEY=sk-proj-2Dr7z.....ar4ts
OPENAI_MODEL=gpt-4
```

<br />

```bash
# Auth microservice .env
$ mv apps/auth/.env.template apps/auth/.env

# Prompts microservice .env
$ mv apps/prompts/.env.template apps/prompts/.env
```

<br />

## Running the app

```bash
# development watch mode
$ docker-compose up
```

<br />

## API Documentation

- Auth Swagger Docs
  - http://localhost:3001/api
- Prompts Swagger Docs
  - http://localhost:3000/api

<br />

## ✨ Walkthrough ✨

<br />

1. Create your user

```bash
# POST /users - Create a new user
# http://localhost:3001/api#/users/UsersController_createUser
{
  "email": "your.email@example.com",
  "password": "Password!123"
}
```

<br />

2. Login with your user

```bash
# POST /auth/login - Login as user
# http://localhost:3001/api#/auth/AuthController_login
{
  "email": "your.email@example.com",
  "password": "Password!123"
}
```

<br />

3. Create a prompt

```bash
# POST /openai/prompt - Create a prompt
# http://localhost:3000/api#/openai/OpenaiController_createPrompt
{
  "role": "system",
  "content": "You are a talented screenwriter who creates popular music videos."
}
```

<br />

## Test

> [!NOTE]
> Unit & E2E tests are still under construction 🏗️

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

<br />

## License

openai-monorepo is [MIT licensed](LICENSE).

<br />

## Future Enhancements

- Kubernetes orchestration with Helm
- CI/CD CodePipeline
- Unit tests / E2E tests
