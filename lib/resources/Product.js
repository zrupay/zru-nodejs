'use strict';

var ZRUResource = require('../ZRUResource');
var zruResourceMethod = ZRUResource.method;

module.exports = ZRUResource.extend({

    create: zruResourceMethod({
        method: 'POST',
        path: 'product/'
    }),

    list: zruResourceMethod({
        method: 'GET',
        path: 'product/'
    }),

    get: zruResourceMethod({
        method: 'GET',
        path: 'product/{resource_id}/',
        urlParams: ['resource_id'],
        required: ['resource_id']
    }),

    change: zruResourceMethod({
        method: 'PATCH',
        path: 'product/{resource_id}/',
        urlParams: ['resource_id'],
        required: ['resource_id']
    }),

    delete: zruResourceMethod({
        method: 'DELETE',
        path: 'product/{resource_id}/',
        urlParams: ['resource_id'],
        required: ['resource_id']
    })

});
