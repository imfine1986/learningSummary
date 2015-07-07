/**
 * Created by zhangshuibo on 15/6/30.
 */

var mysql = require('mysql');
var setting = require('../config/settings');

var pool = mysql.createPool(setting.mysql);
/**
 *
 * @param sql
 * @param value 数组或json
 * @param callback
 */
module.exports.executeSql = function (sql,value,callback) {
    
    pool.getConnection(function (err, connection) {
        if(err){
            console.log('err:',err);
            connection.release();
            return callback(err,null);
        }

        console.log('connection as id ', connection.threadId);

       var query = connection.query(sql,value, function (err, rows) {
            connection.release();

            return callback(err,rows)
        });
        console.log('sql:',query.sql);
    });
};

module.exports.executeSqlByTransactions = function (sql, value, callback) {
    pool.getConnection(function (err, connection) {
        if(err){
            console.log('err:',err);
            connection.rollback(function () {
                return callback(err,null);
            });
        }
        
        var query = connection.query(sql,value, function (err,rows) {
            if(err){
                console.log('err:',err);
                connection.rollback(function () {
                    return callback(err,null);
                });
            }

            connection.commit(function (cerr) {
                if(cerr){
                    console.log('err:',cerr);
                    connection.rollback(function () {
                        return callback(err,null);
                    });
                }
                return callback(err,rows);
            });
        });

        console.log('sql:',query.sql);
    });
};
//用于自己按需求定制transactions等操作
module.exports.pool = pool;