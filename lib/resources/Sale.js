'use strict';

var ZRUResource = require('../ZRUResource');
var zruResourceMethod = ZRUResource.method;

module.exports = ZRUResource.extend({

    list: zruResourceMethod({
        method: 'GET',
        path: 'sale/'
    }),

    get: zruResourceMethod({
        method: 'GET',
        path: 'sale/{resource_id}/',
        urlParams: ['resource_id'],
        required: ['resource_id']
    }),

    refund: zruResourceMethod({
        method: 'POST',
        path: 'sale/{resource_id}/refund/',
        urlParams: ['resource_id'],
        required: ['resource_id']
    }),

    capture: zruResourceMethod({
        method: 'POST',
        path: 'sale/{resource_id}/capture/',
        urlParams: ['resource_id'],
        required: ['resource_id']
    }),

    void: zruResourceMethod({
        method: 'POST',
        path: 'sale/{resource_id}/void/',
        urlParams: ['resource_id'],
        required: ['resource_id']
    })

});
