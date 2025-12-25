# Contributing to lambda-local-runner

Thank you for your interest in contributing to lambda-local-runner! We welcome contributions from the community.

## Getting Started

1. **Fork the repository** and clone it locally
2. **Install dependencies**: `npm install`
3. **Make your changes** in a new branch
4. **Build the project**: `npm run build`
5. **Run linting**: `npm run lint`
6. **Format your code**: `npm run format`

## Development Workflow

### Prerequisites
- Node.js >= 18
- npm

### Setup
```bash
git clone https://github.com/asudbury/lambda-local-runner.git
cd lambda-local-runner
npm install
```

### Building
```bash
npm run build
```

### Linting and Formatting
```bash
# Check for linting issues
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

### Testing
```bash
npm test
```

### Documentation
```bash
# Generate TypeDoc documentation
npm run typedoc
```

## Commit Message Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages. This leads to more readable messages that are easy to follow when looking through the project history.

### Commit Message Format
```
<type>(<scope>): <subject>
```

### Types
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (white-space, formatting, etc)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvement
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

### Examples
```
feat: add support for custom port configuration
fix: resolve CORS issue with OPTIONS requests
docs: update README with CLI usage examples
```

## Git Hooks

This project uses Husky for git hooks:
- **pre-commit**: Runs linting and build before each commit
- **commit-msg**: Validates commit message format using commitlint

## Pull Request Process

1. **Update documentation** if you're changing functionality
2. **Ensure all tests pass** and linting is clean
3. **Update the README.md** if needed with details of changes
4. **Follow the commit message guidelines** above
5. **Link any relevant issues** in your PR description

## Code Style

- We use ESLint and Prettier for code formatting
- Run `npm run format` before committing
- TypeScript strict mode is enabled
- Follow existing code patterns and conventions

## Questions?

Feel free to open an issue if you have questions or need help!

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.
