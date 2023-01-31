# CacGenerator

[![CICD-dev](https://github.com/tw-bc-group/certification-management/actions/workflows/dev.yml/badge.svg)](https://github.com/tw-bc-group/certification-management/actions/workflows/dev.yml) [![CICD-prod](https://github.com/tw-bc-group/certification-management/actions/workflows/prod.yml/badge.svg)](https://github.com/tw-bc-group/certification-management/actions/workflows/prod.yml)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.3.

## Init local env variables
1. create `env.local` file in the root directory.
2. add env variables for local development.
3. eg: `LC_APP_ID=LC_APP_ID_PLACEHOLDER` and `LC_APP_KEY=LC_APP_KEY_PLACEHOLDER`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## deployment to prod
1. fill in environment.prod.ts
2. npm run build:prod # build prod dist locally
3. scp to service nginx folder

## Irita testnet config
1. Denom Id:
   thoughtworks165779e87abe418baeac6aef3a213135
2. Denom Name: Certificate

You can search for the corresponding certificate on the test chain by denomId

## Create a new secret env var
1. Crate secrets var `TEST_NEW_VAR` in the github. [Creating encrypted secrets for a repository](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository)
2. Add new secrets var `TEST_NEW_VAR` to the `envVars` for `webpack.partial.js`.
3. Add new secrets var `TEST_NEW_VAR` to the `secretEnv` for `src/environments/secret-env.ts`
4. Add new secrets var `TEST_NEW_VAR` to the Build step for `CICD` workflows(dev、prod)
5. In local development, we can add new secrets var `TEST_NEW_VAR` value to the `env.local`.
