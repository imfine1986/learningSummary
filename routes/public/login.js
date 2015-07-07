/**
 * Created by zhangshuibo on 15/6/29.
 */

var passport = require('passport');

module.exports.index = function (req, res) {

    res.render('login',{
        layout:'public',
        message:req.session.message,
        title:'登录'
    });
    delete req.session.message;
};

module.exports.loginIn = function (req, res) {

    passport.authenticate('local-login', function (err, user) {
        if(err){
            req.session.message = err;
            return res.redirect('/');
        }
        if(!user){
            req.session.message = '没有查找到用户';
            return res.redirect('/');
        }
        req.logIn(user, function (err) {
            if(err){
                req.session.message = err;
                return res.redirect('/');
            }
            //设置session
            req.session.user = user;
            //todo 根据用户类型跳转到不同的主页
            res.redirect('/user/index');
        });
    })(req,res);

};

module.exports.loginOut = function (req, res) {
    delete req.session.user;
    res.redirect('/');
};