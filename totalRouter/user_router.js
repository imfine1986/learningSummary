/**
 * Created by zhangshuibo on 15/6/29.
 */

var express = require('express');

var user_index = require('../routes/user/index');

var router = express.Router();

router.get('/index',user_index.index);

module.exports = router;