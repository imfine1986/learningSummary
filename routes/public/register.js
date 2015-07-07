/**
 * Created by zhangshuibo on 15/6/30.
 */

var db = require('../../lib/db');

module.exports.index = function (req,res) {

    res.render('register',{
        layout:'public',
        message:req.session.message,
        title:'注册'
    });
    delete req.session.message;
};


module.exports.signUp = function (req, res) {
    var body = req.body;

    verification(body, function (err) {
        if(err != ''){
            req.session.message = err;
            return res.redirect('/register');
        }
        delete body.again_password;

        db.executeSql('insert into user set ?',body, function (err, row) {
            if(err){
                req.session.message = err;
                return res.redirect('/register');
            }
            req.session.message = '注册成功';
            return res.redirect('/');

        })
    });

};

function verification(data,callback){
    if(data == undefined || data.length <=0){
        return callback('没有数据')
    }
    if(data.username == undefined || data.username == ''){
        return callback('用户名为空')
    }
    if(data.email == undefined || data.email == ''){
        return callback('邮箱为空')
    }
    if(data.password == undefined || data.password == ''){
        return callback('密码为空')
    }
    if(data.again_password == undefined || data.again_password == ''){
        return callback('再次输入密码为空')
    }
    if(data.password != data.again_password){
        return callback('两次输入的密码不相同')
    }
    return callback('');
}