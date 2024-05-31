<br />

<p align="center"><strong>studio-monorepo</strong> is a production grade monorepo ready to be scaled and distributed. Authentication is handled through JWT cookies from browser clients and through RPC calls between microservices on the same machine (locally) or within the same network namespace (kubernetes cluster).</p>

<br />

<p align="center">This example provides business logic and data persistence for a potential app client to assist content creators in generating beat sheets as outlines to help guide new projects. OpenAI integration was added to help these creators discover new paths and possibilities in their creation process.</p>

<br />

## Features

- NestJS monorepo
- 2 microservices
  - Auth microservice
    - User Model
  - Beatsheets microservice
    - Act Model
    - Beat Model
    - Beatsheet Model
    - Prompt Model
- MongoDB
  - Mongoose ODM
- Docker
  - Containers for each service + database
- AI
  - OpenAI integration to suggest next beat/act

> [!NOTE]
> Requests made to the Beatsheets microservice are authenticated through the Auth microservice via RPC (TCP)

<br />

## System Requirements

### pnpm

pnpm: https://pnpm.io/installation

### Docker Desktop

docker & docker-compose: https://www.docker.com/products/docker-desktop/

<br />

## Installation

```bash
$ git clone git@github.com:eric-vandenberg/studio-monorepo.git
$ cd studio-monorepo
$ pnpm install
```

<br />

## Setup before Run

```bash
# Auth microservice .env
$ mv apps/auth/.env.template apps/auth/.env

# Beatsheets microservice .env
$ mv apps/beatsheets/.env.template apps/beatsheets/.env
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
- Beatsheets Swagger Docs
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

3. Create a new beat sheet

```bash
# POST /beatsheet - Create a new beatsheet
# http://localhost:3000/api#/beatsheets/BeatsheetsController_createBeatsheet
{
  "title": "A music video for Lewis Capaldi's song: Someone You Loved",
  "beats": []
}
```

<br />

```json
{
  "_id": "665968148593f199b518461a",
  "createdAt": "2024-05-31T05:49:22.174Z",
  "updatedAt": "2024-05-31T06:49:24.875Z",
  "title": "A music video for Lewis Capaldi's song: Someone You Loved",
  "userId": "6654e5736a61f06524a9a0f3",
  "beats": []
}
```

<br />

4. Add a new beat to a specific beatsheet

```bash
# POST /beatsheet/{id}/beat - Add a new beat to a specific beatsheet
# http://localhost:3000/api#/beats/BeatsheetsController_createBeat
# param `id` = 665968148593f199b518461a
{
  "description": "Opening Image",
  "acts": []
}
```

<br />

```json
{
  "_id": "6659684a8593f199b518461d",
  "createdAt": "2024-05-31T05:49:22.174Z",
  "updatedAt": "2024-05-31T06:05:02.096Z",
  "description": "Opening Image",
  "acts": []
}
```

<br />

5. Add a new act to a specific beat

```bash
# POST /beatsheet/{id}/beat/{beatId}/act - Add a new act to a specific beat
# http://localhost:3000/api#/acts/BeatsheetsController_createAct
# param `id` = 665968148593f199b518461a
# param `beatId` = 6659684a8593f199b518461d
{
  "description": "A train approaches a solitary man as he stands next to the tracks, earbuds in his ears.",
  "duration": 4000,
  "cameraAngle": "wide"
}
```

<br />

```json
{
  "_id": "6659688e8593f199b5184623",
  "createdAt": "2024-05-31T05:49:22.174Z",
  "updatedAt": "2024-05-31T05:49:22.174Z",
  "description": "A train approaches a solitary man as he stands next to the tracks, earbuds in his ears.",
  "duration": 4000,
  "cameraAngle": "wide"
}
```

<br />

6. Add another beat to the beatsheat

```bash
# POST /beatsheet/{id}/beat - Add a new beat to a specific beatsheet
# http://localhost:3000/api#/beats/BeatsheetsController_createBeat
# param `id` = 665968148593f199b518461a
{
  "description": "Theme Stated",
  "acts": []
}
```

<br />

```json
{
  "_id": "665972f4afd5c407ca563937",
  "createdAt": "2024-05-31T06:45:27.034Z",
  "updatedAt": "2024-05-31T06:50:11.666Z",
  "description": "Theme Stated",
  "acts": []
}
```

<br />

7. Add a new act to the second beat

```bash
# POST /beatsheet/{id}/beat/{beatId}/act - Add a new act to a specific beat
# http://localhost:3000/api#/acts/BeatsheetsController_createAct
# param `id` = 665968148593f199b518461a
# param `beatId` = 665972f4afd5c407ca563937
{
  "description": "While the theme isn’t explicitly stated, the visuals tell the story of coping with lost love and discovering life in the aftermath.",
  "duration": 1000,
  "cameraAngle": "wide"
}
```

<br />

```json
{
  "_id": "66597323afd5c407ca56393e",
  "createdAt": "2024-05-31T06:45:27.034Z",
  "updatedAt": "2024-05-31T06:45:27.034Z",
  "description": "While the theme isn’t explicitly stated, the visuals tell the story of coping with lost love and discovering life in the aftermath.",
  "duration": 1000,
  "cameraAngle": "wide"
}
```

<br />

8. Create a prompt to suggest next beat or act

```bash
# POST /openai/prompt - Create a prompt to suggest next beat or act
# http://localhost:3000/api#/openai/OpenaiController_createPrompt
{
  "role": "system",
  "content": "You are a talented screenwriter who creates popular music videos."
}
```

<br />

```json
{
  "_id": "66597371afd5c407ca563946",
  "createdAt": "2024-05-31T06:45:27.034Z",
  "updatedAt": "2024-05-31T06:45:27.034Z",
  "role": "system",
  "content": "You are a talented screenwriter who creates popular music videos."
}
```

<br />

9. Get suggestion for next beat or act

```bash
# GET /openai/prompt - Get suggestion for next beat or act
# http://localhost:3000/api#/openai/OpenaiController_suggestNext
# param `promptId` = 66597371afd5c407ca563946
# param `id` = 665968148593f199b518461a
```

<br />

```json
{
  "id": "chatcmpl-9UsWLDvKNeZb9ypmboobHv3vHVuBK",
  "object": "chat.completion",
  "created": 1717146445,
  "model": "gpt-4-0613",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Set-Up: \n\nAct 1: The video starts with shots of Lewis Capaldi alone in his apartment, the remnants of a recently ended relationship still very visible: a half-empty wardrobe, a women's bracelet on the side table, their framed photo turned face-down.\n\nAct 2: He is seen aimlessly wandering the city - passing by “their” favorite cafe, sitting on “their” bench in the park - feeling haunted by her memory at every turn. \n\nAct 3: Intermixed with these real-world shots are dreamlike sequences. He pursues a phantom version of his lost lover through a crowd, tries to hold onto a fading hand in an ethereal white space.\n\nAct 4: At this point, we get a flashback sequence showing the happier times in their relationship - passionate kisses, laughter, shared dreams."
      },
      "logprobs": null,
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 106,
    "completion_tokens": 168,
    "total_tokens": 274
  },
  "system_fingerprint": null
}
```

<br />

> [!TIP]
> This walkthrough was based on a [beat sheet](https://savethecat.com/beat-sheets/someone-you-loved-beat-sheet) created by Cory Miles

<br />

## Test

> [!IMPORTANT]
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

studio-monorepo is [MIT licensed](LICENSE).

<br />

## Future Enhancements

- Kubernetes orchestration with Helm
- CI/CD CodePipeline
- Unit tests / E2E tests
