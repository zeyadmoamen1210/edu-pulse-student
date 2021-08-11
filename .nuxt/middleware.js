const middleware = {}

middleware['auth'] = require('..\\middleware\\auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['goToHome'] = require('..\\middleware\\goToHome.js')
middleware['goToHome'] = middleware['goToHome'].default || middleware['goToHome']

middleware['parent'] = require('..\\middleware\\parent.js')
middleware['parent'] = middleware['parent'].default || middleware['parent']

export default middleware
