const express = require('express')

const router = express.Router()

router.get('/', (request, response) => {
  response.render('index', {
    pageTitle: 'Home'
  })
})

router.get('/examples/start-page', (request, response) => {
  response.render('examples/start-page', {
    pageTitle: 'Apply for a programme'
  })
})

router.get('/examples/programme-details', (request, response) => {
  response.render('examples/programme-details', {
    pageTitle: 'Programme details'
  })
})

router.post('/examples/programme-details', (request, response) => {
  request.session.data = {
    ...request.session.data,
    programmeLevel: request.body.programmeLevel,
    studyMode: request.body.studyMode,
    startYear: request.body.startYear
  }

  response.redirect('/examples/check-answers')
})

router.get('/examples/check-answers', (request, response) => {
  response.render('examples/check-answers', {
    pageTitle: 'Check your answers'
  })
})

router.get('/prototype-admin/reset', (request, response) => {
  const returnPage = request.query.returnPage || '/'

  request.session.destroy(() => {
    response.redirect(returnPage)
  })
})

module.exports = router
