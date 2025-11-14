# Environment Variables Setup

Required environment variables for deployment:

## Turso Database
- `TURSO_DATABASE_URL` - Your Turso database URL (libsql://your-database.turso.io)
- `TURSO_AUTH_TOKEN` - Your Turso authentication token

## Better Auth
- `AUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `BETTER_AUTH_URL` - Your production URL (https://your-app.vercel.app)

## Zitadel OAuth
- `ZITADEL_CLIENT_ID` - Your Zitadel client ID
- `ZITADEL_PROJECT_ID` - Your Zitadel project ID

## Public URL
- `PUBLIC_URL` - Your production URL (https://your-app.vercel.app)
