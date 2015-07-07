/**
 * Created by zhangshuibo on 15/6/29.
 */

var localStrategy = require('passport-local').Strategy;

var db = require('../lib/db');

module.exports = function (passport) {
    
    passport.serializeUser(function (user, done) {
        done(null,user.id);
    });

    passport.deserializeUser(function (id, done) {
        findUserById(id, function (err,user) {
            done(err,user);
        })
    });

    passport.use('local-login',new localStrategy(function (username, password, done) {
        process.nextTick(function () {
            findUserByUsername(username, function (err, user) {
                if(err){
                    return done(err);
                }
                if(!user){
                    return done(null,false,{message:'用户信息不存在'})
                }
                if(user.password != password){
                    return done(null,false,{message:'密码错误'})
                }
                return done(null,user);
            })
        });
    }));

    function findUserById(id,callback){
        //通过id到数据库中查询是否有用户
        
        db.executeSql('select * from user where id=?', [id], function (err, rows) {
            if(err){
                return callback('用户信息不存在 ',err)
            }
            callback(null,rows);
        });

    }

    function findUserByUsername(username,callback){
        //通过username查找用户信息
        db.executeSql('select * from user where username=?', [username], function (err, rows) {
            if(err){
                return callback('用户信息不存在 ',err)
            }
            callback(null,rows[0]);
        });
    }
};