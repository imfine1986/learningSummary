/**
 * Created by zhangshuibo on 15/6/30.
 */

$(function () {

    if($.trim(message) != ''){
        alert_error(message);
    }

    //$('#loginForm').submit(function () {
    //    var button = $(this).find('button[type="submit"]');
    //    button.attr('disabled',true);
    //    var username = $('#username').val();
    //    var password = $('#password').val();
    //
    //    if($.trim(username) == ''){
    //        alert_error('用户名不能为空');
    //        button.attr('disabled',false);
    //        return false;
    //    }
    //    if($.trim(password) == ''){
    //        alert_error('密码不能为空');
    //        button.attr('disabled',false);
    //        return false;
    //    }
    //    return true;
    //});
});