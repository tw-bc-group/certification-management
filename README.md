# CacGenerator

[![CICD-dev](https://github.com/tw-bc-group/certification-management/actions/workflows/dev.yml/badge.svg)](https://github.com/tw-bc-group/certification-management/actions/workflows/dev.yml) [![CICD-prod](https://github.com/tw-bc-group/certification-management/actions/workflows/prod.yml/badge.svg)](https://github.com/tw-bc-group/certification-management/actions/workflows/prod.yml)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.3.

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
