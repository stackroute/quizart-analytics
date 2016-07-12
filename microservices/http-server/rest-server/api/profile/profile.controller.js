var controller = {};

var context = require('../../context');
var mesh = context.mesh;

controller.getProfile = function(req, res) {
  console.log("username in controller",req.param("username"));
  const ProfileData = {
    username :req.param("username")
  };
  console.log("ProfileData in getProfile controller:",ProfileData);
  mesh.act('role:profile,cmd:getProfile',ProfileData,function(err, response) {
    if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send(); }
    if(response.response !== 'success') { return res.status(404).send(); }
    console.log("response.profile inside controller====",response.profile);
    return res.status(201).json(response.profile);
  });
};

controller.editProfile = function(req, res) {
    const getProfileData = req.body;
    mesh.act('role:profile,cmd:editProfile',getProfileData,function(err, response) {
      if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send(); }
      if(response.response !== 'success') { return res.status(404).send(); }
      return res.status(201).json(response.entity);
  });
};

exports = module.exports = controller;
