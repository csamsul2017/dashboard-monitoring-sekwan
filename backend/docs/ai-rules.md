# Project Rules

## Tech Stack

- Node.js v24.16.0
- Express.js v5.2.1
- JavaScript (ES Module)
- Prisma ORM
- SQLite
- JWT Authentication
- bcrypt for password hashing
- Joi for validation

## Architecture

- Controllers only handle req/res.
- Services contain business logic.
- Routes define endpoints.
- Use existing middleware.
- Exceptions handle errors in a structured way

## Database

- Use Prisma for all queries.
- Do not write raw SQL unless requested.

## Security

- Store secrets in .env.
- Never hardcode secrets.
- Hash passwords using bcrypt.

## Negative Rules

- Do not create new folders.
- Do not modify unrelated files.
- Do not place business logic in controllers.
- Do not introduce new dependencies without permission.
