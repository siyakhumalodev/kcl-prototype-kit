const assert = require('node:assert/strict')
const test = require('node:test')

const request = require('supertest')

const createApp = require('../app')

test('renders the KCL branded home page', async () => {
  const response = await request(createApp())
    .get('/')
    .expect(200)

  assert.match(response.text, /King's College London/)
  assert.match(response.text, /Build King's College London service prototypes quickly/)
})

test('stores example answers in session data', async () => {
  const agent = request.agent(createApp())

  await agent
    .post('/examples/programme-details')
    .type('form')
    .send({
      programmeLevel: 'Postgraduate taught',
      studyMode: 'Full time',
      startYear: '2027'
    })
    .expect(302)
    .expect('Location', '/examples/check-answers')

  const response = await agent
    .get('/examples/check-answers')
    .expect(200)

  assert.match(response.text, /Postgraduate taught/)
  assert.match(response.text, /Full time/)
  assert.match(response.text, /2027/)
})
