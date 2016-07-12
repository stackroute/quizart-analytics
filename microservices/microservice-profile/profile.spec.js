var should = require('should');

var seneca = require('seneca');

const baseMicroservice = seneca();
const profileMicroservice = seneca();
const consumerMicroservice = seneca();

const profile = {
  username:"SomeName",
  name:"SomeName",
  imageLink:"http://lorempixel.com/600/337/nature/",
  age:"25",
  country:"SomeCountry",
  totalGames:"5",
  }

describe('Setup', function() {
  this.timeout(5000)
  it('Mesh Base', function(done) {
    baseMicroservice.use('mesh', {base:true});
    baseMicroservice.ready(done);
  });

  it('Profile Microservice', function(done) {
    profileMicroservice.use('.', {
      mongoUrl: 'mongodb://localhost:27017/profile-test'
    });

    profileMicroservice.use('mesh', {auto:true, pin: 'role:profile,cmd:*'});

    profileMicroservice.ready(done);
  });

  it('Consumer Microservice', function(done) {
    consumerMicroservice.use('mesh');
    consumerMicroservice.ready(done);
  });
});

describe('Before', function() {
  it('Clear profile collection', function(done) {
    consumerMicroservice.act('role:profile,cmd:dangerouslyDeleteAllProfiles', function(err, response) {
      if(err) { return done(err); }
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      done();
    });
  });
});
var createdProfileId;

describe('Profile Microservice API', function() {
  this.timeout(5000)
  it('Retrieve profile by username', function(done) {
    consumerMicroservice.act('role:tournaments,cmd:getProfile',{username:"SomeName"},function(err, response) {
      if(err) {return done(err);}
      response.should.have.property('response');
      response.response.should.be.exactly('success');
      response.should.have.property('entity');
      response.entity.should.have.property('_id');
      createdProfileId = response.entity._id;
      response.entity.should.have.property('username');
      response.entity.username.should.be.exactly(profile.username);
      response.entity.should.have.property('name');
      response.entity.name.should.be.exactly(profile.name);
      response.entity.should.have.property('imageLink');
      response.entity.imageLink.should.be.exactly(profile.imageLink);
      response.entity.should.have.property('age');
      response.entity.age.should.be.exactly(profile.age);
      response.entity.should.have.property('country');
      response.entity.country.should.be.exactly(profile.country);
      response.entity.should.have.property('totalGames');
      response.entity.totalGames.should.be.exactly(profile.totalGames);
      done();
    })
  });




});

// describe('Edit Profile', function() {
//   it('Edit Profile', function(done) {
//     const editProfileRequest = {
//       username: profile.username,
//       }
//
//     consumerMicroservice.act('role:profile,cmd:editProfile', editProfileRequest, function(err, response) {
//       if(err) { return done(err); }
//       response.should.have.property('response');
//       response.response.should.be.exactly('success');
//       done();
//     });
//   });
//
//   it('Edit profile of different user', function(done) {
//     const editProfileRequest = {
//       username: 'username',
//     }
//
//     consumerMicroservice.act('role:profile,cmd:editProfile', editProfileRequest, function(err, response) {
//       if(err) { return done(err); }
//       response.should.have.property('response');
//       response.response.should.be.exactly('fail');
//       done();
//     });
//   });
// });
//
// describe('Delete Profile', function() {
//   it('Delete profile', function(done) {
//     consumerMicroservice.act('role:profile,cmd:delete', profile, function(err, response) {
//       if(err) { return done(err); }
//       response.should.have.property('response');
//       response.response.should.be.exactly('success');
//       done();
//     });
//   });
// });

describe('Teardown', function() {
  it('consumerMicroservice', function(done) {
    consumerMicroservice.close(done);
  });

  it('profileMicroservice', function(done) {
    profileMicroservice.close(done);
  });

  it('baseMicroservice', function(done) {
    baseMicroservice.close(done);
  });
});
