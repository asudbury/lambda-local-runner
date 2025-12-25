/**
 * @packageDocumentation
 *
 * Run one or more AWS Lambda handlers locally via Express.
 *
 * @remarks
 * - Converts Express requests to APIGatewayProxyEvent
 * - Invokes your Lambda handler
 * - Sends back APIGatewayProxyResult
 *
 * Supports:
 * - Single Lambda (runLambdaLocally)
 * - Multiple Lambdas at different paths (runMultipleLambdas)
 */

import express from 'express';
import bodyParser from 'body-parser';
import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';

/**
 * Options for a single Lambda.
 */
export interface LocalRunnerOptions {
  /** Port for the server (default: 8200 or process.env.PORT) */
  port?: number;
  /** Enable CORS headers (default: true) */
  enableCors?: boolean;
}

/**
 * Lambda route definition for multiple Lambdas.
 */
export interface LambdaRoute<TResult extends APIGatewayProxyResult = APIGatewayProxyResult> {
  /** Path to serve, e.g., '/users' */
  path: string;
  /** Lambda handler for this path */
  handler: Handler<APIGatewayProxyEvent, TResult>;
  /** Enable CORS headers for this route (default: true) */
  enableCors?: boolean;
}

/**
 * Options for running multiple Lambda handlers.
 */
export interface MultiLambdaOptions {
  /** Port for the server (default: 8200 or process.env.PORT) */
  port?: number;
  /** Array of Lambda routes */
  routes: LambdaRoute[];
}

/**
 * Internal: Creates the Express route wrapper for a Lambda handler.
 */
function createLambdaHandler<TResult extends APIGatewayProxyResult>(
  handler: Handler<APIGatewayProxyEvent, TResult>,
  enableCors = true
) {
  return async (req: express.Request, res: express.Response) => {
    try {
      if (req.method === 'OPTIONS' && enableCors) {
        res.set({
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*',
        });
        return res.status(204).end();
      }

      let body: string | null;
      if (req.body === undefined || req.body === null) {
        body = null;
      } else if (typeof req.body === 'string') {
        body = req.body;
      } else {
        body = JSON.stringify(req.body);
      }

      const event: APIGatewayProxyEvent = {
        path: req.path,
        httpMethod: req.method,
        body,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        headers: req.headers as any,
        isBase64Encoded: false,
        multiValueHeaders: {},
        multiValueQueryStringParameters: {},
        pathParameters: {},
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        queryStringParameters: req.query as any,
        requestContext: {
          accountId: 'local',
          apiId: 'local',
          authorizer: {},
          protocol: 'HTTP/1.1',
          httpMethod: req.method,
          identity: {
            sourceIp: req.ip,
            userAgent: req.get('user-agent') ?? '',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any,
          path: req.path,
          stage: 'local',
          requestId: 'local',
          requestTimeEpoch: Date.now(),
          resourceId: 'local',
          resourcePath: req.path,
        },
        resource: req.path,
        stageVariables: {},
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await handler(event, {} as any, () => {});

      // Type guard: only proceed if response is defined and has statusCode
      if (!response || typeof response !== 'object' || typeof response.statusCode !== 'number') {
        return res.status(500).json({
          message: 'Lambda did not return a valid APIGatewayProxyResult',
        });
      }

      res.status(response.statusCode);
      if (response.headers) res.set(response.headers);

      if (enableCors) {
        res.set({
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*',
        });
      }

      if (!response.body) return res.end();

      if (response.isBase64Encoded) {
        return res.end(Buffer.from(response.body, 'base64'));
      }

      return res.send(response.body);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Local Lambda error',
        error: err instanceof Error ? err.message : err,
      });
    }
  };
}

/**
 * Run a **single Lambda handler** locally.
 *
 * @param lambdaHandler - Lambda handler function
 * @param options - Optional configuration
 */
export function runLambdaLocally<TResult extends APIGatewayProxyResult>(
  lambdaHandler: Handler<APIGatewayProxyEvent, TResult>,
  options: LocalRunnerOptions = {}
) {
  const PORT = options.port || Number(process.env.PORT) || 8200;
  const enableCors = options.enableCors ?? true;

  const app = express();
  app.use(bodyParser.json());

  app.all('/*', createLambdaHandler(lambdaHandler, enableCors));

  app.listen(PORT, () => {
    console.info(`Local Lambda server running on port ${PORT}...`);
  });
}

/**
 * Run **multiple Lambda handlers** on different paths locally.
 *
 * @param options - Configuration options
 */
export function runMultipleLambdas(options: MultiLambdaOptions) {
  const PORT = options.port || Number(process.env.PORT) || 8200;
  const app = express();
  app.use(bodyParser.json());

  options.routes.forEach(({ path, handler, enableCors = true }) => {
    app.all(path, createLambdaHandler(handler, enableCors));
  });

  app.listen(PORT, () => {
    console.info(
      `Local Lambda server running on port ${PORT} with ${options.routes.length} route(s)...`
    );
  });
}
