/**
 * Created by zhangshuibo on 15/7/1.
 */

$(function () {

    if($.trim(message) != ''){
        alert_error(message);
    }
    $('#registerForm').submit(function () {
        var button = $(this).find('button[type="submit"]');
            button.attr('disabled',true);

        var password = $('#password').val();
        var again_password = $('#again_password').val();

        if($.trim(password) != $.trim(again_password)){
            alert_error('两次密码不同');
            button.attr('disabled',false);
            return false
        }

        return true;
    });
});