'use strict';

var ZRUResource = require('../ZRUResource');
var zruResourceMethod = ZRUResource.method;

module.exports = ZRUResource.extend({

    create: zruResourceMethod({
        method: 'POST',
        path: 'plan/'
    }),

    list: zruResourceMethod({
        method: 'GET',
        path: 'plan/'
    }),

    get: zruResourceMethod({
        method: 'GET',
        path: 'plan/{resource_id}/',
        urlParams: ['resource_id'],
        required: ['resource_id']
    }),

    change: zruResourceMethod({
        method: 'PATCH',
        path: 'plan/{resource_id}/',
        urlParams: ['resource_id'],
        required: ['resource_id']
    }),

    delete: zruResourceMethod({
        method: 'DELETE',
        path: 'plan/{resource_id}/',
        urlParams: ['resource_id'],
        required: ['resource_id']
    })

});
