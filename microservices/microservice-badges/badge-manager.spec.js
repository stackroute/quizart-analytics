const should = require('should');
const EventExecutor = require('./event-executor');
const Event = require('./event1');

describe('Test Badge', function() {
  before(function(done) {
    EventExecutor.prototype.retrieveCounters = function(eventType, callback) {
      const eventData = require('./data/events');
      const eventMap = {};
      eventData.forEach(function(event) {
        eventMap[event.eventType] = event;
      });
      callback(null, eventMap[eventType].counters);
    };
    EventExecutor.prototype.retrieveBadges = function(eventType, callback) {
      const eventData = require('./data/events');
      const eventMap = {};
      eventData.forEach(function(event) {
        eventMap[event.eventType] = event;
      });
      callback(null, eventMap[eventType].badges);
    }
    EventExecutor.prototype.getCounterEvaluator = function(counter, eventData, callback) {
      return callback(null, [function() {
        return 5;
      }]);
    }
    EventExecutor.prototype.getBadgeEvaluator = function(badge, awardBadge, callback) {
      return callback(null, ['consLogin', function(consLogin) {
        awardBadge(badge);
      }]);
    }
    done();
  });
  it('Good Habit Badge', function(done) {
    const event = new Event('successLogin','sarahconnor',{loginTime: new Date()});
    const eventExecutor = new EventExecutor(event);
    eventExecutor.execute(function(badgeId) {
      badgeId.should.have.property('badgeId');
      badgeId.badgeId.should.be.exactly('goodHabit');
      done();
    });
  });
  after(function(done) {
    done();
  });
});
