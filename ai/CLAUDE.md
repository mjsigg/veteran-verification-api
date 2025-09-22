
# veteran-verification-api

Default to using Bun instead of Node.js.

- Use `bun <file>` instead of `node <file>` or `ts-node <file>`
- Use `bun test` instead of `jest` or `vitest`
- Use `bun install` instead of `npm install` or `yarn install` or `pnpm install`
- Use `bun run <script>` instead of `npm run <script>` or `yarn run <script>` or `pnpm run <script>`
- Bun automatically loads .env, so don't use dotenv.

## APIs

- `Bun.serve()` supports WebSockets, HTTPS, and routes. Don't use `express`.
- `bun:sqlite` for SQLite. Don't use `better-sqlite3`.
- `Bun.redis` for Redis. Don't use `ioredis`.
- `Bun.sql` for Postgres. Don't use `pg` or `postgres.js`.
- `WebSocket` is built-in. Don't use `ws`.
- Prefer `Bun.file` over `node:fs`'s readFile/writeFile
- Bun.$`ls` instead of execa.

## Testing

Use `bun test` to run tests.

```ts#index.test.ts
import { test, expect } from "bun:test";

test("hello world", () => {
  expect(1).toBe(1);
});
```

## Current Project Structure

Minimal VA Veteran Confirmation API integration:

```ts#src/index.ts
// Bare minimum API for VA veteran verification
// POST /api/verify - Takes veteran data, returns confirmation
```

## Scripts

- `bun run dev` - Start development server with hot reloading
- `bun run start` - Start production server

## VA API Integration

This project integrates with the VA Veteran Confirmation API for veteran status verification.

### Key Documentation Files
- `ai/va-api-schema.md` - Complete API schema and data models
- `ai/va-api-notes.md` - Research notes and implementation guidance
- `ai/field-validation-rules.md` - Input validation requirements
- `ai/example-requests.md` - API request/response examples

### Important Schema Notes
- **Required Fields**: firstName, lastName, birthDate, streetAddressLine1, city, state, zipCode, country
- **No SSN Required**: The API does not use SSN (privacy benefit)
- **Address Critical**: Physical address required for veteran matching
- **Sandbox Behavior**: Only birthDate and zipCode used for matching in sandbox
- **Rate Limit**: 60 requests per minute

## Environment Variables

Required environment variables:
- `VA_API_VETERAN_CONFIRMATION` - Your VA API key
- `VA_API_CLIENT_NAME` - Your client identifier (e.g., "SoloSigg")
