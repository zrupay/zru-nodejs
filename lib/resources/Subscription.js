'use strict';

var ZRUResource = require('../ZRUResource');
var zruResourceMethod = ZRUResource.method;

module.exports = ZRUResource.extend({

    create: zruResourceMethod({
        method: 'POST',
        path: 'subscription/'
    }),

    list: zruResourceMethod({
        method: 'GET',
        path: 'subscription/'
    }),

    get: zruResourceMethod({
        method: 'GET',
        path: 'subscription/{resource_id}/',
        urlParams: ['resource_id'],
        required: ['resource_id']
    })

});
