const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github').Strategy;

var User = require('../models/user');

const authConfig = require('./auth');

const options = {
    clientID        : authConfig.facebookAuth.clientId,
    clientSecret    : authConfig.facebookAuth.clientSecret,
    callbackURL     : authConfig.facebookAuth.callBackUrl,
    profileFields: ["email", "name"]
};

function callback(token, refreshToken, profile, done) {
// console.log(profile);
    process.nextTick( ()=> {
        const {id, first_name, last_name } = profile._json;
        User.findOne({'facebook.id': id}, (err,user)=> {
            if(err)
                return done(err,false);
            if(user){
                return done(null, user);
            }
            else{
                // return done(null, false);
                var newUser = new User();
                newUser.facebook.id = id;
                newUser.facebook.firstname = first_name;
                newUser.facebook.lastname = last_name;
                
                newUser.save( (err)=> {
                    if(err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });
    });

}

const githubOptions = {
    clientID        : authConfig.githubAuth.clientId,
    clientSecret    : authConfig.githubAuth.clientSecret,
    callbackURL     : authConfig.githubAuth.callBackUrl
};

function githubcallback(token, refreshToken, profile, done) {
    //  console.log(profile); id displayName username
        process.nextTick( ()=> {
            const {id, username, displayName } = profile;
            User.findOne({'github.id': id}, (err,user)=> {
                if(err)
                    return done(err,false);
                if(user){
                    return done(null, user);
                }
                else{
                    // return done(null, false);
                    var newUser = new User();
                    newUser.github.id = id;
                    newUser.github.username = username;
                    newUser.github.name = displayName;
                    
                    newUser.save( (err)=> {
                        if(err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    
    }
    

module.exports = function(passport){

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('facebook',new FacebookStrategy(options, callback));

    passport.use('github',new GitHubStrategy(githubOptions, githubcallback));

};