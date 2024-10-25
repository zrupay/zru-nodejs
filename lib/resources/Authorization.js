'use strict';

var ZRUResource = require('../ZRUResource');
var zruResourceMethod = ZRUResource.method;

module.exports = ZRUResource.extend({

    create: zruResourceMethod({
        method: 'POST',
        path: 'authorization/'
    }),

    list: zruResourceMethod({
        method: 'GET',
        path: 'authorization/'
    }),

    get: zruResourceMethod({
        method: 'GET',
        path: 'authorization/{resource_id}/',
        urlParams: ['resource_id'],
        required: ['resource_id']
    }),

    charge: zruResourceMethod({
        method: 'POST',
        path: 'authorization/{resource_id}/charge/',
        urlParams: ['resource_id'],
        required: ['resource_id']
    }),

    remove: zruResourceMethod({
        method: 'POST',
        path: 'authorization/{resource_id}/remove/',
        urlParams: ['resource_id'],
        required: ['resource_id']
    })

});
