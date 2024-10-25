'use strict';

var ZRUResource = require('../ZRUResource');
var zruResourceMethod = ZRUResource.method;

module.exports = ZRUResource.extend({

    get: zruResourceMethod({
        method: 'GET',
        path: 'pay/{resource_id}/',
        urlParams: ['resource_id'],
        required: ['resource_id']
    }),

    card: zruResourceMethod({
        method: 'POST',
        path: 'pay/{resource_id}/card/{gateway_code}/',
        urlParams: ['resource_id', 'gateway_code'],
        required: ['resource_id', 'gateway_code']
    }),

    share: zruResourceMethod({
        method: 'POST',
        path: 'pay/{resource_id}/share/',
        urlParams: ['resource_id'],
        required: ['resource_id']
    })

});
