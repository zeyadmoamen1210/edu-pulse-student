const middleware = {}

middleware['auth'] = require('..\\middleware\\auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['goToHome'] = require('..\\middleware\\goToHome.js')
middleware['goToHome'] = middleware['goToHome'].default || middleware['goToHome']

export default middleware
