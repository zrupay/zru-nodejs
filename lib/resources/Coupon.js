'use strict';

var ZRUResource = require('../ZRUResource');
var zruResourceMethod = ZRUResource.method;

module.exports = ZRUResource.extend({

    create: zruResourceMethod({
        method: 'POST',
        path: 'coupon/'
    }),

    list: zruResourceMethod({
        method: 'GET',
        path: 'coupon/'
    }),

    get: zruResourceMethod({
        method: 'GET',
        path: 'coupon/{resource_id}/',
        urlParams: ['resource_id'],
        required: ['resource_id']
    }),

    change: zruResourceMethod({
        method: 'PATCH',
        path: 'coupon/{resource_id}/',
        urlParams: ['resource_id'],
        required: ['resource_id']
    }),

    delete: zruResourceMethod({
        method: 'DELETE',
        path: 'coupon/{resource_id}/',
        urlParams: ['resource_id'],
        required: ['resource_id']
    })

});
