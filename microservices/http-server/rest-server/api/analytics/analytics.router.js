const router = require('express').Router();
const analyticsController = require('./analytics.controller');
const context = require('../../context');

// /api/v1/analytics
router.post('/',analyticsController.create);

router.get('/user/favtopicsfilter',analyticsController.favtopicsFilter);

router.get('/user/:userid/favtopics',analyticsController.favTopics);

router.get('/user/winlossfilter',analyticsController.winlossFilter);

router.get('/user/:userid/winloss',analyticsController.winLoss);



exports = module.exports = router;