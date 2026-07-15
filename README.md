# King's College London prototype kit

A lightweight prototype kit for building and testing King's College London service journeys. It follows the same broad shape as the NHS prototype kit: a small Node app, central routes, shared templates, static assets, example journeys and a resettable session data store.

## Run the kit

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For a production-style run, use:

```bash
npm start
```

## Project structure

```text
app.js                         Express app entry point
app/config.js                  Service name, port and environment config
app/routes.js                  Prototype routes and form handlers
app/data/session-data-defaults.js
app/views/layout.njk           KCL branded shared layout
app/views/examples/            Example journey pages
assets/logo/kcl-logo.svg       King's College London logo used by the layout
public/styles/main.css         Prototype kit styles
test/app.test.js               Route and session smoke tests
```

## Create a page

1. Add a Nunjucks template in `app/views`.
2. Add a route in `app/routes.js`.
3. Use `request.session.data` to store temporary prototype answers.
4. Use `/prototype-admin/reset?returnPage=/` to clear prototype data.

## Branding

The kit uses the supplied King's College London logo from `assets/logo/kcl-logo.svg` and a KCL-inspired palette led by the logo red. Keep prototypes close to the King's content style: clear headings, direct calls to action, accessible forms and enough whitespace for scanning.

## Test

```bash
npm test
```
