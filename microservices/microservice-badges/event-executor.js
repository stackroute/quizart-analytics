const Asynchrony = require('asynchrony-di');
const async = require('async');

function EventExecutor(event) {
  this.event = event;

  this.execute = function execute(awardBadge) {
    async.waterfall([
      function createContext(callback) { return callback(null, {asynchrony: new Asynchrony()}); },
      function retrieveListOfCountersForEvent(context, callback) {
        this.retrieveCounters(event.eventType,function(err, counters) {
          context.counters = counters;
          callback(null, context);
        });
      }.bind(this),
      function addCountersToAsynchrony(context, callback) {
        async.each(context.counters, function(counter, callback) {
          console.log('Counter: ', counter);
          this.getCounterEvaluator(counter, event.eventData, function(err, counterEvaluator) {
            context.asynchrony.add(counter, counterEvaluator);
            callback();
          });
        }.bind(this), function(err) {
          callback();
        });
      }.bind(this)
    ],function(err, result) {
      if(err) { /* Handle Error */ return; }
      awardBadge({badgeId: 'goodHabit'});
    });

    // TODO: Add counters to asynchrony
    // TODO: Retrieve a list of badges to evaluate for this event
    // TODO: Retrieve a list of additional counters required by the badges
    // TODO: Invoke Badges
  }
}

EventExecutor.prototype.retrieveCounters = function(eventType, callback) {
  // TODO: Retrieve Counters
  console.log('TODO: INSIDE EventExecutor.prototype.retrieveCounters');
}

EventExecutor.prototype.getCounterEvaluator = function(counter, callback) {
  // TODO: Construct Counter evaluator and return.
  console.log('TODO: INSIDE EventExecutor.prototype.getCounterEvaluator');
};

module.exports = EventExecutor;
