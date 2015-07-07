/**
 * Created by zhangshuibo on 15/6/29.
 */

var express = require('express');

var sys_index = require('../routes/sys/index');

var router = express.Router();

router.get('/index',sys_index.index);

module.exports = router;