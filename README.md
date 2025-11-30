This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Authentication

To run the authentication system locally, a PostgreSQL database is required.

Start the database using the Docker Compose file provided in the project root:

```bash
docker-compose up -d
```

Initialize the database schema for Better Auth by running:

```bash
npx @better-auth/cli migrate
```

This will create all the necessary tables and structures that Better Auth needs to function correctly.

---

## EditorConfig & VS Code Settings

This project uses a strict `.editorconfig` to ensure consistent code style across all editors and platforms. Most formatting rules (indentation, line endings, trailing whitespace, etc.) are enforced automatically if you have the [EditorConfig extension](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) installed in VS Code.

Additionally, the repository includes a `.vscode/settings.json` file to avoid conflicts between VS Code's built-in formatting and EditorConfig:

```json
{
  "editor.formatOnSave": true,
  "files.trimTrailingWhitespace": false,
  "files.insertFinalNewline": false,
  "files.eol": "\n"
}
```

- No further VS Code settings are required—just make sure the EditorConfig extension is enabled.
- These settings ensure that formatting is always consistent, regardless of individual developer/editor preferences.
