const Asynchrony = require('asynchrony-di');
const async = require('async');

function EventExecutor(event) {
  this.execute = function execute(awardBadge) {
    async.waterfall([
        function createContext(callback) {
          const context = {};
          callback(null, context);
        },
        function(context, callback) {
          async.parallel([
            setCountersInContext.bind(this,event.eventType),
            retrieveBadgeEvaluators.bind(this,event.eventType)
          ], function(err,callback) {
            callback(null, context);
          });
        },
        function(context, callback) {
          async.series([
              setCountersRequiredByBadgesInContext.bind(this,context.badgeEvaluators, context),
              addCountersIntoAsynchrony.bind(this,context.counters,context.asynchrony),
              evaluateBadgesInAsynchrony.bind(this,context.badgeEvaluators, context.asynchrony)
            ], callback);
        }
      ]);
  }
}

EventExecutor.prototype.retrieveCounters = function(eventType, callback) {
  // TODO: Retrieve Counters
  console.log('TODO: INSIDE EventExecutor.prototype.retrieveCounters');
}

EventExecutor.prototype.retrieveBadges = function(eventType, callback) {
  // TODO: Retrieve Badges
  console.log('TODO: INSIDE EventExecutor.prototype.retrieveBadges');
}

EventExecutor.prototype.getCounterEvaluator = function(counter, eventData, callback) {
  // TODO: Construct Counter evaluator and return.
  console.log('TODO: INSIDE EventExecutor.prototype.getCounterEvaluator');
};

EventExecutor.prototype.getBadgeEvaluator = function(badge, badgeAwardedFunction, callback) {
  // TODO: Construct Badge evaluator and return.
  console.log('TODO: INSIDE EventExecutor.prototype.getCounterEvaluator');
}

function setCountersInContext(eventType, callback) {

}
function retrieveBadgeEvaluators(context, callback) {

}
function setCountersRequiredByBadgesInContext(callback) {

},
function addCountersIntoAsynchrony(callback) {

},
function evaluateBadgesInAsynchrony(callback) {

}

module.exports = EventExecutor;
