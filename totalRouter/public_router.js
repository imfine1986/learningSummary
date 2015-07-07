/**
 * Created by zhangshuibo on 15/6/29.
 */
var express = require('express');

var login = require('../routes/public/login');
var register = require('../routes/public/register');

var router = express.Router();



router.get('/',login.index);
router.post('/loginIn',login.loginIn);
router.get('/loginOut',login.loginOut);

router.get('/register',register.index);
router.post('/register',register.signUp);

module.exports = router;