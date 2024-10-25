'use strict';

var ZRUResource = require('../ZRUResource');
var zruResourceMethod = ZRUResource.method;

module.exports = ZRUResource.extend({

    list: zruResourceMethod({
        method: 'GET',
        path: 'currency/'
    }),

    get: zruResourceMethod({
        method: 'GET',
        path: 'currency/{resource_id}/',
        urlParams: ['resource_id'],
        required: ['resource_id']
    })

});
