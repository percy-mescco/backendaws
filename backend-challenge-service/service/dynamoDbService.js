'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.saveItem = (callback, item, tableName) => {
    let params = {
        TableName: tableName,
        Item: item
    };

    let onSave = (err, data) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, {
                statusCode: 200,
                body: JSON.stringify(params.Item)
            });
        }
    };

    dynamoDb.put(params, onSave);
};

module.exports.getItems = (callback, tableName) => {
    let params = {
        TableName: tableName
    };

    let onScan = (err, data) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, {
                statusCode: 200,
                body: JSON.stringify({
                    todos_grabados: data.Items
                })
            });
        }
    };

    dynamoDb.scan(params, onScan);
};