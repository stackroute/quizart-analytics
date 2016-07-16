
const router = require('express').Router();
twitterController  = require('./twitter.auth.controller');
router.get('/twitter/authUrl',twitterController.getRequestToken);
router.get('/twitter/success',twitterController.getAccessToken);

exports = module.exports = router;
