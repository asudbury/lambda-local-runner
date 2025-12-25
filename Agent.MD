# Agent Instructions for lambda-local-runner

This document provides GitHub Copilot and AI agents with context about the lambda-local-runner project to assist with code generation, reviews, and maintenance.

## Project Overview

**lambda-local-runner** is a TypeScript library that enables developers to run AWS Lambda handlers locally using Express. It's designed for local development, testing, and integration scenarios.

## Core Functionality

### Main Exports
- `runLambdaLocally()`: Run a single Lambda handler on a local Express server
- `runMultipleLambdas()`: Run multiple Lambda handlers on different paths

### Key Features
- Converts Express requests to `APIGatewayProxyEvent`
- Invokes Lambda handlers and returns `APIGatewayProxyResult`
- Built-in CORS support (enabled by default)
- CLI tool for running handlers without writing code

## Architecture

### Request Flow
1. Express server receives HTTP request
2. Request is converted to `APIGatewayProxyEvent`
3. Lambda handler is invoked with the event
4. Response is converted from `APIGatewayProxyResult` to HTTP response
5. CORS headers are added if enabled

### File Structure
- `src/index.ts`: Core library functions and types
- `src/cli.ts`: Command-line interface implementation
- `dist/`: Compiled JavaScript output (not committed)
- `docs/`: TypeDoc generated documentation

## Coding Standards

### TypeScript
- **Strict mode enabled**: All TypeScript strict checks are active
- **Target**: ES2020
- **Module**: ES2020
- Use explicit types where possible; avoid `any` except for AWS Lambda context/event compatibility

### Code Style
- **Linting**: ESLint with TypeScript plugin and Prettier
- **Formatting**: Prettier with 100-char line width, single quotes, semicolons
- Run `npm run lint:fix` and `npm run format` before committing

### Commit Messages
- Follow [Conventional Commits](https://www.conventionalcommits.org/)
- Format: `<type>(<scope>): <subject>`
- Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
- Validated by commitlint on commit

### Git Hooks (Husky)
- **pre-commit**: Runs lint and build
- **commit-msg**: Validates commit message format

## Dependencies

### Production Dependencies
- `express`: ^5.2.1 (HTTP server framework)
- `body-parser`: ^2.2.1 (Request body parsing)
- `aws-lambda`: ^1.0.7 (AWS Lambda types)

### Development Dependencies
- `typescript`: ^5.9.3
- `vitest`: ^4.0.16 (Testing framework)
- `typedoc`: ^0.28.15 (Documentation generation)
- `eslint`, `prettier`: Code quality tools
- `husky`, `commitlint`: Git hooks and commit validation

### Node.js Requirement
- **Minimum version**: Node.js 18+ (due to Express 5 and body-parser 2)

## Development Workflow

### Build
```bash
npm run build        # Compile TypeScript to dist/
```

### Linting & Formatting
```bash
npm run lint         # Check for issues
npm run lint:fix     # Auto-fix issues
npm run format       # Format code
npm run format:check # Check formatting
```

### Testing
```bash
npm test             # Run vitest
```

### Documentation
```bash
npm run typedoc      # Generate TypeDoc in docs/
```

## Important Patterns

### Error Handling
- Wrap handler execution in try-catch
- Return 500 status with error details on failure
- Validate response structure before sending

### CORS Handling
- Handle OPTIONS preflight requests
- Add CORS headers to responses when enabled
- Allow per-route CORS configuration in multi-lambda mode

### Dynamic Module Loading (CLI)
- Use `require()` for dynamic imports (Node.js limitation)
- Support both default and named exports
- Check for `.js`, `.ts`, and exact path matches

## Common Issues & Solutions

### Issue: Lambda handler doesn't return valid response
**Solution**: Ensure handler returns object with `statusCode`, `body`, and optional `headers`

### Issue: CORS errors in browser
**Solution**: Verify `enableCors` is true (default) and OPTIONS requests are handled

### Issue: AWS SDK errors
**Solution**: Ensure AWS credentials are configured locally (env vars or ~/.aws/credentials)

## Testing Guidelines

- Currently no test suite exists (vitest configured but no tests)
- When adding tests:
  - Place in `src/__tests__/` or co-locate with source files
  - Use `.test.ts` or `.spec.ts` naming convention
  - Mock AWS Lambda events and contexts
  - Test both single and multi-lambda scenarios

## Documentation Standards

- Use JSDoc comments for all public APIs
- Include `@param`, `@returns`, and `@example` tags
- Document any breaking changes prominently
- Keep README.md up to date with new features

## AI Agent Guidelines

When working on this codebase:
1. **Maintain backward compatibility** unless explicitly asked to make breaking changes
2. **Follow existing patterns** for error handling and CORS
3. **Update TypeDoc comments** when modifying public APIs
4. **Run linting and build** before committing changes
5. **Consider AWS Lambda compatibility** - don't break the event/response contract
6. **Preserve the `any` types** used for AWS Lambda compatibility (they're necessary)
7. **Update documentation** when adding features or changing behavior

## Future Enhancements

Potential improvements to consider:
- Add comprehensive test suite
- Support for Lambda proxy integration v2
- WebSocket support
- Environment variable loading (.env file support)
- Request/response logging options
- Hot reload for handler changes during development
