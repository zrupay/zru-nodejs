'use strict';

var ZRUResource = require('../ZRUResource');
var zruResourceMethod = ZRUResource.method;

module.exports = ZRUResource.extend({

    create: zruResourceMethod({
        method: 'POST',
        path: 'transaction/'
    }),

    list: zruResourceMethod({
        method: 'GET',
        path: 'transaction/'
    }),

    get: zruResourceMethod({
        method: 'GET',
        path: 'transaction/{resource_id}/',
        urlParams: ['resource_id'],
        required: ['resource_id']
    })

});
