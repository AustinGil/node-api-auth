const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const userController = require('../controllers/userController');

// Authenticating each request before passing off to controller.
router.route('/sign-up')
	.post(validateBody(schemas.authSchema), userController.signUp);

router.route('/sign-in')
	.post(validateBody(schemas.authSchema), passport.authenticate('local', { session: false }), userController.signin);

router.route('/secret')
	.get(passport.authenticate('jwt', { session: false }), userController.secret);

module.exports = router;