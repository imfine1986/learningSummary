/**
 * Created by zhangshuibo on 15/6/29.
 */

module.exports.index = function (req, res) {

    res.render('sys/index',{
        layout:'sys_main'
    });
};