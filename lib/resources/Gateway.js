'use strict';

var ZRUResource = require('../ZRUResource');
var zruResourceMethod = ZRUResource.method;

module.exports = ZRUResource.extend({

    list: zruResourceMethod({
        method: 'GET',
        path: 'gateway/'
    }),

    get: zruResourceMethod({
        method: 'GET',
        path: 'gateway/{resource_id}/',
        urlParams: ['resource_id'],
        required: ['resource_id']
    })

});
