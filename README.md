# lambda-local-runner

> Run one or more AWS Lambda handlers locally via Express

[![npm version](https://img.shields.io/npm/v/lambda-local-runner.svg)](https://www.npmjs.com/package/lambda-local-runner)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)

Perfect for **local development**, **testing**, and **integration** of AWS Lambda functions without deploying to AWS.

## 📚 DeepWiki Project Knowledge Base

> **Explore the full documentation, architecture, and deep technical notes for this project on DeepWiki:**
>
> [![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/asudbury/lambda-local-runner)
>
> - Comprehensive guides, diagrams, and design decisions
> - Contributor onboarding and advanced usage tips
> - Maintainer notes, troubleshooting, and best practices
>
> **This is the canonical knowledge base for the project. If you're contributing, maintaining, or deploying, start here!**

## ✨ Features

✅ **Single or multiple Lambda handlers** - Run one or many handlers simultaneously  
✅ **Automatic CORS support** - Built-in CORS headers, configurable per route  
✅ **CLI tool included** - No code needed for simple use cases  
✅ **AWS services compatible** - Works with S3, DynamoDB, etc. (with credentials)  
✅ **Full TypeScript support** - Written in TypeScript with complete type definitions  
✅ **Express-based** - Familiar, battle-tested HTTP server  
✅ **TypeDoc documentation** - Comprehensive API documentation

## 📦 Installation

```bash
npm install lambda-local-runner
# or globally
npm install -g lambda-local-runner
```

**Requirements:**
- Node.js 18 or higher
- AWS credentials (if your Lambda interacts with AWS services)

## 🚀 Quick Start

### Single Lambda (Programmatic)

```typescript
import { runLambdaLocally } from 'lambda-local-runner';
import { handler } from './myLambda';

runLambdaLocally(handler, { port: 3000, enableCors: true });
```

### Multiple Lambdas (Programmatic)

```typescript
import { runMultipleLambdas } from 'lambda-local-runner';

runMultipleLambdas({
  port: 4000,
  routes: [
    { path: '/users', handler: userHandler },
    { path: '/orders', handler: orderHandler },
  ],
});
```

### CLI Usage

```bash
# Single Lambda
lambda-local-runner --single=./myLambda.ts --port=3000

# Multiple Lambdas
lambda-local-runner --routes=/users:./users.ts,/orders:./orders.ts --port=4000

# Or with npx (no global install needed)
npx lambda-local-runner --single=./myLambda.ts --port=3000
```

## 📖 Detailed Usage

### Programmatic API

#### `runLambdaLocally(handler, options?)`

Run a single Lambda handler on all routes (`/*`).

**Parameters:**
- `handler`: Your AWS Lambda handler function
- `options`: Optional configuration
  - `port`: Port number (default: 8200 or `process.env.PORT`)
  - `enableCors`: Enable CORS headers (default: true)

**Example:**
```typescript
import { runLambdaLocally } from 'lambda-local-runner';

const myHandler = async (event) => ({
  statusCode: 200,
  body: JSON.stringify({ message: 'Hello World' }),
});

runLambdaLocally(myHandler, { port: 3000 });
```

#### `runMultipleLambdas(options)`

Run multiple Lambda handlers on different paths.

**Parameters:**
- `options.port`: Port number (default: 8200 or `process.env.PORT`)
- `options.routes`: Array of route configurations
  - `path`: Route path (e.g., `/users`)
  - `handler`: Lambda handler function
  - `enableCors`: Enable CORS for this route (default: true)

**Example:**
```typescript
import { runMultipleLambdas } from 'lambda-local-runner';
import { userHandler } from './handlers/users';
import { orderHandler } from './handlers/orders';

runMultipleLambdas({
  port: 4000,
  routes: [
    { path: '/users', handler: userHandler },
    { path: '/orders', handler: orderHandler, enableCors: false },
  ],
});
```

### CLI Usage

The CLI tool provides a quick way to run Lambda handlers without writing any code.

**Options:**
- `--single=<path>`: Path to a single Lambda handler file
- `--routes=<path:module,...>`: Comma-separated list of path:module pairs
- `--port=<number>`: Port number (default: 8200)

**Examples:**
```bash
# Single handler
lambda-local-runner --single=./dist/handlers/myLambda.js --port=3000

# Multiple handlers
lambda-local-runner --routes=/api/users:./dist/users.js,/api/orders:./dist/orders.js --port=4000

# Using npx (recommended for project dependencies)
npx lambda-local-runner --single=./myLambda.ts
```

### Adding to Your Project

Add a script to your `package.json`:

```json
{
  "scripts": {
    "dev:lambda": "lambda-local-runner --single=./dist/handler.js --port=3000"
  }
}
```

Then run:
```bash
npm run dev:lambda
```

## 🔐 AWS Credentials

⚠️ **Important**: If your Lambda code interacts with AWS services (S3, DynamoDB, etc.), you must provide AWS credentials locally.

### Option 1: Environment Variables

```bash
export AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY
export AWS_SECRET_ACCESS_KEY=YOUR_SECRET_KEY
export AWS_REGION=us-east-1
```

### Option 2: AWS Credentials File

Create `~/.aws/credentials`:
```ini
[default]
aws_access_key_id = YOUR_ACCESS_KEY
aws_secret_access_key = YOUR_SECRET_KEY
region = us-east-1
```

### Option 3: Use `.env` File

Create a `.env` file in your project:
```
AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=YOUR_SECRET_KEY
AWS_REGION=us-east-1
```

Then load it with a package like `dotenv` before running your handler.

## 📚 API Documentation

Full API documentation is available via TypeDoc:

- **Generate locally**: `npm run typedoc` (outputs to `docs/` folder)
- **View online**: Visit the [GitHub Pages site](https://asudbury.github.io/lambda-local-runner)

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Start for Contributors

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Make your changes
4. Run linting: `npm run lint`
5. Build: `npm run build`
6. Commit with [conventional commit messages](https://www.conventionalcommits.org/)

### Development Commands

```bash
npm run build         # Compile TypeScript
npm run lint          # Lint code
npm run lint:fix      # Fix linting issues
npm run format        # Format code with Prettier
npm test              # Run tests
npm run typedoc       # Generate documentation
```

## 📄 License

MIT © Adrian Sudbury

See [LICENSE](LICENSE) for details.

## 🐛 Issues & Support

- **Bug reports**: [GitHub Issues](https://github.com/asudbury/lambda-local-runner/issues)
- **Questions**: [GitHub Discussions](https://github.com/asudbury/lambda-local-runner/discussions)
- **Documentation**: [DeepWiki Knowledge Base](https://deepwiki.com/asudbury/lambda-local-runner)

## 🌟 Related Projects

- [aws-lambda-local](https://github.com/ashiina/lambda-local) - Another local Lambda runner
- [serverless-offline](https://github.com/dherault/serverless-offline) - Serverless Framework offline plugin
- [AWS SAM CLI](https://github.com/aws/aws-sam-cli) - AWS's official local Lambda testing tool

