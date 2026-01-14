<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Prerequisites

- [Node.js](https://nodejs.org/)  v22.17.1
- Docker (for development environment)

## Settings

1. Copie o arquivo de variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```
2. Edite o `.env` conforme necessário.

## Main Commands

- Start in development mode:
  ```bash
  docker compose up
  ```
- Lint:
  ```bash
  npm run lint
  ```
- Format code:
  ```bash
  npm run format
  ```
- Fix lint problems automatically:
  ```bash
  npm run lint:fix
  ```

## Command to perform a commit

  ```bash
  npm run commit
  ```

## Tests

- Unit tests:
  ```bash
  npm run test
  ```
- Integration tests (e2e):
  ```bash
  npm run test:e2e
  ```
- Coverage tests:
  ```bash
  npm run test:cov
  ```

## Code Standards

- Follow the [Conventional Commits](https://www.conventionalcommits.org/) standard.
- Use ESLint and Prettier to maintain code standards.
- Commits and PRs must be reviewed by at least one person on the team.

## Contribution

1. Create a branch for your feature or fix (`git checkout -b feature/feature-name`).
2. Commit your changes (`npm run commit`).
3. Push to the branch (`git push origin feature/feature-name`).
4. Open a Pull Request.

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
