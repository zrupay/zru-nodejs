'use strict';

var ZRUResource = require('../ZRUResource');
var zruResourceMethod = ZRUResource.method;

module.exports = ZRUResource.extend({

    create: zruResourceMethod({
        method: 'POST',
        path: 'shipping/'
    }),

    list: zruResourceMethod({
        method: 'GET',
        path: 'shipping/'
    }),

    get: zruResourceMethod({
        method: 'GET',
        path: 'shipping/{resource_id}/',
        urlParams: ['resource_id'],
        required: ['resource_id']
    }),

    change: zruResourceMethod({
        method: 'PATCH',
        path: 'shipping/{resource_id}/',
        urlParams: ['resource_id'],
        required: ['resource_id']
    }),

    delete: zruResourceMethod({
        method: 'DELETE',
        path: 'shipping/{resource_id}/',
        urlParams: ['resource_id'],
        required: ['resource_id']
    })

});
