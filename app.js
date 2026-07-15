const path = require('node:path')

const express = require('express')
const session = require('express-session')
const nunjucks = require('nunjucks')

const config = require('./app/config')
const sessionDataDefaults = require('./app/data/session-data-defaults')
const routes = require('./app/routes')

function createApp() {
  const app = express()
  const viewsPath = path.join(__dirname, 'app', 'views')

  nunjucks.configure(viewsPath, {
    autoescape: true,
    express: app,
    noCache: config.isDevelopment
  })

  app.set('view engine', 'njk')
  app.set('views', viewsPath)

  app.use(express.urlencoded({ extended: false }))
  app.use(session({
    name: 'kcl-prototype-kit',
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: config.isProduction
    }
  }))
  app.use('/assets', express.static(path.join(__dirname, 'assets')))
  app.use('/public', express.static(path.join(__dirname, 'public')))

  app.use((request, response, next) => {
    request.session.data = {
      ...sessionDataDefaults,
      ...request.session.data
    }

    response.locals.serviceName = config.serviceName
    response.locals.currentPath = request.path
    response.locals.data = request.session.data
    next()
  })

  app.use(routes)

  app.use((request, response) => {
    response.status(404).render('404', {
      pageTitle: 'Page not found'
    })
  })

  return app
}

if (require.main === module) {
  const app = createApp()

  app.listen(config.port, () => {
    console.log(`${config.serviceName} running at http://localhost:${config.port}`)
  })
}

module.exports = createApp
