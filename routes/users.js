const express = require('express');
const router = require('express-promise-router');
const passport = require('passport');
const passportConf = require('../passport');

const { validateBody, schema } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');

// Authenticating each request before passing off to controller.
router.route('/sign-up')
	.post(validateBody(schemas.authSchema), UsersController.signup);

router.route('/sign-in')
	.post(validateBody(schemas.authSchema), passport.authenticate('local', { session: false }), UsersController.signin);

router.route('/secret')
	.get(passport.authenticate('jwt', { session: false }), UsersController.secret);

module.exports = router;