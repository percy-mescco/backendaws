'use strict';
const https = require('https');
const dynamoDbService = require('./service/dynamoDbService.js');
const convert = require('./helper/convert.js');
const TABLE_NAME = process.env.NEW_TABLE;

module.exports.submit = (event, context, callback) => {
    return functionAsyncHttpsCustomize(context).then((data) => {
        dynamoDbService.saveItem(callback, data, TABLE_NAME);
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    });
};

module.exports.list = (event, context, callback) => {
    dynamoDbService.getItems(callback, TABLE_NAME);
};

async function functionAsyncHttpsCustomize(context) {
    let options = {
        host: 'swapi.py4e.com',
        path: '/api/people/?format=json',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return await functionHttpsRequest(context, options);
}

function functionHttpsRequest(context, options) {
    return new Promise((resolve, reject) => {        
        let req = https.request(options, (res) => {
            let body = '';
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function() {
                try {
                    body = JSON.parse(body);
                    body.id = context.awsRequestId;
                    body = convert.translate(body, "ES");
                } catch (e) {
                    reject(Error(e));
                }
                resolve(body);
            });
        });
        req.end();
    });
};