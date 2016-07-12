var controller = {};

var context = require('../../context');
var mesh = context.mesh;


controller.addAsFriend = function(req, res) {
    const friendsData = req.body;
    mesh.act('role:friend,cmd:addAsFriend',friendsData,function(err, response) {
      if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send(); }
      if(response.response !== 'success') { return res.status(404).send(); }
      return res.status(201).json(response.entity);
  });
};

exports = module.exports = controller;
