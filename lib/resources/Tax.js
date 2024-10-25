'use strict';

var ZRUResource = require('../ZRUResource');
var zruResourceMethod = ZRUResource.method;

module.exports = ZRUResource.extend({

    create: zruResourceMethod({
        method: 'POST',
        path: 'tax/'
    }),

    list: zruResourceMethod({
        method: 'GET',
        path: 'tax/'
    }),

    get: zruResourceMethod({
        method: 'GET',
        path: 'tax/{resource_id}/',
        urlParams: ['resource_id'],
        required: ['resource_id']
    }),

    change: zruResourceMethod({
        method: 'PATCH',
        path: 'tax/{resource_id}/',
        urlParams: ['resource_id'],
        required: ['resource_id']
    }),

    delete: zruResourceMethod({
        method: 'DELETE',
        path: 'tax/{resource_id}/',
        urlParams: ['resource_id'],
        required: ['resource_id']
    })

});
