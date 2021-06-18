# Estirency
[![ESTIRENCY](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/jc7qvw/master&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/jc7qvw/runs)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/78c26a5e77a447349ccf3b79ebaf8dd2)](https://www.codacy.com/gh/Karol-Witkowski/Estirency/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Karol-Witkowski/Estirency&amp;utm_campaign=Badge_Grade)

<p align="center"><code><a href="https://karol-witkowski.github.io/Estirency/#/home"><img height="90" title="Estirency logo" src="public\logo.png" alt="Estirency logo"></a></code></p>

<p align="center"><a href="https://karol-witkowski.github.io/Estirency/#/home"><b>Estirency</b></a> goal is to present actual and historical exchange rates. Select base currency, desired currency and type amount of cash - <a href="https://karol-witkowski.github.io/Estirency/#/home"><b>Estirency</b></a> will display actual rates right away. Historical data is presented on the chart.</p>

## Contents

- [Demo](#demo)
- [Technologies](#technologies)
- [Features](#features)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Running Locally](#running-locally)
- [Tests](#tests)
  - [Unit](#unit-tests)
  - [E2E](#e2e-tests)
- [Available scripts](#available-scripts)

<hr>
<br>

## Demo

<p align="center">You can try <a href="https://karol-witkowski.github.io/Estirency/#/home"><b>Estirency</b></a> by yourself. Here is a link to the website hosted by GitHub.</p>

<p align="center"><a href="https://karol-witkowski.github.io/Estirency/#/home"><b>Estirency demo</b></a></p>


<p align="center"><code><a href="https://karol-witkowski.github.io/Estirency/#/home"><img height="400" src="src\assets\usageexample.gif" alt="usage example"></a></code></p>
<hr>
<br>

## Technologies

| Technology | Description | Link |
|-|-|-|
| Sass | Preprocessor that helps write maintainable CSS | https://sass-lang.com/ |
| Vue.js | Versatile Progressive Javascript Framework for building user interfaces | https://vuejs.org/ |
| Jest | A comprehensive JavaScript testing solution | https://jestjs.io/ |
| Cypress | E2E Testing Framework that runs in a browser | https://www.cypress.io/ |
<hr>
<br>

## Features

- Track exchange rates

- Convert between major currencies

- Display historical exchange rate data
<hr>
<br>

## Installation

### Prerequisites

>To run the application install Node.js and Vue CLI. To do so follow instructions on official websites.

- [NodeJS](https://nodejs.org/) - version 14 and higher
- [Vue-CLI](https://cli.vuejs.org/)

### Running Locally

1. Clone the repository

```console
git clone git@github.com:Karol-Witkowski/Estirency.git
cd Gemverse
```

2. Install dependencies

Run npm install to install required node modules.

- Install dependencies for the project root folder

```console
npm install
```

3. Run the application

Run npm serve to start the application


```console
npm run serve
```

Visit application on: [localhost:8080](http://localhost:8080/).
<hr>
<br>

## Tests

### Unit tests

Unit tests written using [Vue Test Utils](https://vue-test-utils.vuejs.org/) with [Jest](https://jestjs.io/). To run tests open the terminal and run the code below:

```console
npm run test:unit
```

### E2E tests

E2E tests are written in [Cypress](https://www.cypress.io/). Those tests simulate the real user scenario and interact with dummy data. To run E2E tests open the terminal and run the code below:

Open Cypress Test Runner:
```console
npm run test:cypress-open
```

Run all tests headlessly in the Electron browser:
```console
npm run test:cypress-run
```
<hr>
<br>

## Available scripts

Lint and fix files:

```console
npm run lint
```

Run client tests with Jest:

```console
npm run test:unit
```

Launch Cypress in interactive mode with a GUI:

```console
npm run test:e2e-open
```

Run client E2E tests in headless mode with Cypress:

```console
npm run test:e2e-run
```

Deploy on Gh-pages:

```console
npm run gh-pages-deploy
```

Initialize Vue UI and project manager:

```console
npm run ui
```

Run client development server with Hot-Module-Replacement:

```console
npm run serve
```

Produce a client production-ready bundle in the dist/ directory:

```console
npm run build
```

### Server scripts

Start and reload the application automatically:

```console
npm run dev:watch
```

Run and reload server tests with Jest Start automatically:

```console
npm run test:watch
```

Insert initial data into a database:

```console
npm run db:seed
```
