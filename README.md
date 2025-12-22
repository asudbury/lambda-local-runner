# lambda-local-runner

Run one or more AWS Lambda handlers locally via Express. Perfect for **local development**, **testing**, and **integration**.

## Installation

```bash
npm install lambda-local-runner
# or globally
npm install -g lambda-local-runner
```

## Quick Start

### Single Lambda
```typescript
import { runLambdaLocally } from 'lambda-local-runner';
import { handler } from './myLambda';

runLambdaLocally(handler, { port: 3000, enableCors: true });
```

### Multiple Lambdas
```typescript
import { runMultipleLambdas } from 'lambda-local-runner';

runMultipleLambdas({
  port: 4000,
  routes: [
    { path: '/users', handler: userHandler },
    { path: '/orders', handler: orderHandler }
  ]
});
```

### CLI Usage
```bash
# Single Lambda (direct CLI)
lambda-local-runner --single=./myLambda.ts --port=3000

# Multiple Lambdas (direct CLI)
lambda-local-runner --routes=/users:./users.ts,/orders:./orders.ts --port=4000
```


### Run via npm script (in this repo only)
You can also run the CLI using the npm script provided in this repository:

```bash
# Single Lambda
npm start -- --single=./myLambda.ts --port=3000

# Multiple Lambdas
npm start -- --routes=/users:./users.ts,/orders:./orders.ts --port=4000
```

> **Note:** The above npm scripts only work in this repository. If you install lambda-local-runner in another project, see the next section.

### Usage from another project
If you install lambda-local-runner as a dependency in another project, you can:

- Use `npx lambda-local-runner ...` to run the CLI
- Or add your own npm script in your project's `package.json` that calls `lambda-local-runner`


---

## 📦 Using in Another Project

After installing `lambda-local-runner` as a dependency in your project:

### 1. Run with npx

```bash
npx lambda-local-runner --single=./myLambda.ts --port=3000
```

### 2. Add an npm script

Add this to your project's `package.json`:

```json
"scripts": {
  "lambda-local": "lambda-local-runner --single=./myLambda.ts --port=3000"
}
```

Then run:

```bash
npm run lambda-local
```

> **Tip:**
> - You can adjust the arguments as needed for your use case (e.g., use --routes for multiple handlers).
> - The CLI will be available as `lambda-local-runner` in your project's node_modules/.bin, so you can use it in any custom script or toolchain.
> - For TypeScript handlers, ensure you have a build step or use ts-node/register if needed.

## AWS Credentials Requirement

⚠️ **Important**: If your Lambda code interacts with AWS services (S3, DynamoDB, etc.), you must provide AWS credentials locally.

### Environment Variables
```bash
export AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY
export AWS_SECRET_ACCESS_KEY=YOUR_SECRET_KEY
export AWS_REGION=us-east-1
```

### Credentials File
Create `~/.aws/credentials`:
```
[default]
aws_access_key_id = YOUR_ACCESS_KEY
aws_secret_access_key = YOUR_SECRET_KEY
region = us-east-1
```



## 📚 Documentation

- **TypeDoc API Docs:**
  - Generate API documentation with `npm run typedoc` (output in the `docs/` folder).
  - You can publish these docs to GitHub Pages for easy sharing.

- **GitHub Pages:**
  - Host your generated TypeDoc documentation on GitHub Pages for public access.
  - See [GitHub Pages documentation](https://docs.github.com/en/pages) for setup instructions.

---

## Features

✅ Single or multiple Lambda handlers  
✅ Automatic CORS support  
✅ CLI tool included  
✅ Works with AWS services (with credentials)  
✅ TypeScript support  
✅ Full TypeDoc documentation

## License

MIT
