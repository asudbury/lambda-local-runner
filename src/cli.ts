#!/usr/bin/env node

import { runLambdaLocally, runMultipleLambdas } from './index';
import path from 'path';
import fs from 'fs';

interface CLIArgs {
  port?: number;
  routes?: string;
  single?: string;
}

function parseArgs(): CLIArgs {
  const args = process.argv.slice(2);
  const cli: CLIArgs = {};

  args.forEach((arg) => {
    if (arg.startsWith('--port=')) cli.port = Number(arg.split('=')[1]);
    else if (arg.startsWith('--single=')) cli.single = arg.split('=')[1];
    else if (arg.startsWith('--routes=')) cli.routes = arg.split('=')[1];
  });

  return cli;
}

function loadModule(modulePath: string) {
  const fullPath = path.isAbsolute(modulePath) ? modulePath : path.join(process.cwd(), modulePath);

  if (
    !fs.existsSync(fullPath) &&
    !fs.existsSync(fullPath + '.js') &&
    !fs.existsSync(fullPath + '.ts')
  ) {
    console.error(`Module not found: ${fullPath}`);
    process.exit(1);
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mod = require(fullPath);
  return mod.default || mod.handler || mod;
}

async function main() {
  const args = parseArgs();

  if (args.single) {
    const handler = loadModule(args.single);
    runLambdaLocally(handler, { port: args.port });
    return;
  }

  if (args.routes) {
    const routes = args.routes.split(',').map((r) => {
      const [pathStr, modulePath] = r.split(':');
      const handler = loadModule(modulePath);
      return { path: pathStr, handler };
    });
    runMultipleLambdas({ port: args.port, routes });
    return;
  }

  console.error('Please provide either --single=module or --routes=path:module,...');
  process.exit(1);
}

main();
