var context = require('../../context');
var mesh = context.mesh;

var controller = {};

controller.createToken = function(req, res) {
  mesh.act('role:jwt,cmd:generate', req.body, function(err, response) {
    console.log("===============inside authenticate controller========");
    if(err) { console.log('===== ERR: ', err, ' ====='); return res.status(500).send(); }
    if(response.response !== 'success') { return res.status(403).send(); }

    return res.status(201).json({token: response.token});
  });

   mesh.act('role:badges,cmd:login', {eventName:'Login',eventType:'successLogin'}, function(err, response) {

      console.log("=========Inside badge action========");
      console.log(response);
      return res.status(200).json(response.answer);
    });
};

exports = module.exports = controller;