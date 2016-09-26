const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  "question": {type: String},
  "image" : {type: String},
  "correctIndex" : {type: Number},
  "lastEdited" : {type: Date},
  "createdOn" : {type: Date},
  "topicId" : [{type: String}],
  "frequency" : {type: Number},
  "correctRatio" : {type: String},
  "timesUsed" : {type: String},
  "difficultyLevel" : {type: Number},
  "options" : [{type: String}],
  "patternId" : {type: String},
  "googleResultScore" : {type: Number},
  "wikiPageView" : {type: Number}
},{collection: 'questionBank'});

QuestionSchema.statics.retrieveQuestions = function(topicId, numberOfQuestions, callback) {
  const o = {};
  o.map = function() {
    emit(this.topicId,this);
  };
  o.reduce = function(key, values) {
    return {value: values};
  };
  o.limit = numberOfQuestions;
  this.mapReduce(o,(err, result) => {
    if(err) { return callback(err); }
    return callback(err, result[0].value.value);
  });
}

module.exports = mongoose.model('questionBank', QuestionSchema);
