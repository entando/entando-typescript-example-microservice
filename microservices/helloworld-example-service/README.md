# Entando Microservice Example
Example Microservice built using Typescript and Node.js

# Development

## Project Structure
```
> src            -> Source Folder
> src/api        -> API Controllers
> src/utils      -> Utils functions
> tests          -> Unit and Integration Tests
> coverage       -> Jest coverage report is generated here
> build          -> Typescript build folder
> dist           -> Minified distribution package folder
> package.json   -> App Manifest
```

## Run
Run app in development mode using default port `8080`
```
yarn dev
```

## Build
To build this package and run it in production we use [trace-pkg](https://github.com/FormidableLabs/trace-pkg) to optimize the generated files.

```
$ yarn build && yarn start
```

> Note: Current package size is `1.2MB` zipped and `4.8MB` unzipped.

## Lint
Lint and code style validation:

```
yarn lint
```

## Test
This project uses `Jest` to run test suites.

```
yarn test
```

### Coverage Report
Check `coverage` folder for more details.

```
 PASS  tests/app/router/hello.test.ts
  User can create a Hello World message
    ✓ tests create a hello world message successfully (41 ms)
    ✓ tests create a hello world message without authorization token (3 ms)
  User can update a Hello World message
    ✓ tests update a hello world message successfully (2 ms)
    ✓ tests update a hello world message without authorization token (2 ms)
  User can retrieve a Hello World message
    ✓ tests retrieving a hello world message successfully (3 ms)
    ✓ tests retrieving a hello world message without authorization token (2 ms)
  User can delete a Hello World message
    ✓ tests deleting a hello world message successfully (2 ms)
    ✓ tests deleting a hello world message without authorization token (1 ms)

------------------------|---------|----------|---------|---------|------------------------------
File                    | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------------------|---------|----------|---------|---------|------------------------------
All files               |   81.02 |       72 |    73.8 |   81.02 |
 src                    |   79.16 |    55.55 |   66.66 |   79.16 |
  index.ts              |       0 |        0 |       0 |       0 | 1-15
  server.ts             |     100 |     62.5 |     100 |     100 | 35-52
 src/api/hello          |   62.96 |    76.92 |   54.54 |   62.96 |
  hello.router.ts       |   62.96 |    76.92 |   54.54 |   62.96 | 3,10-13,16,19-23,31-34,50-54
 src/api/hello/request  |     100 |      100 |     100 |     100 |
  CreateHelloRequest.ts |     100 |      100 |     100 |     100 |
  UpdateHelloRequest.ts |     100 |      100 |     100 |     100 |
  index.ts              |     100 |      100 |     100 |     100 |
 src/error              |   73.68 |    63.63 |   66.66 |   73.68 |
  errors.ts             |   73.68 |    63.63 |   66.66 |   73.68 | 8,10-14,22-25
 src/middleware         |   94.64 |    65.38 |   78.57 |   94.64 |
  errorHandler.ts       |     100 |       60 |     100 |     100 | 6-8
  keycloak.ts           |   96.29 |    54.54 |   66.66 |   96.29 | 5
  validator.ts          |    87.5 |       80 |   83.33 |    87.5 | 5,10
 src/utils              |     100 |     87.5 |     100 |     100 |
  loadRouters.ts        |     100 |     87.5 |     100 |     100 | 4
------------------------|---------|----------|---------|---------|------------------------------
Test Suites: 1 passed, 1 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        2.96 s, estimated 3 s
Ran all test suites.
✨  Done in 3.78s.
```