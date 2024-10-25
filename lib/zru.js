'use strict';

/*
 Thanks to https://github.com/stripe/stripe-node
 */

ZRU.DEFAULT_HOST = 'api.zrupay.com';
ZRU.DEFAULT_PORT = '443';
ZRU.DEFAULT_BASE_PATH = '/v1';
ZRU.DEFAULT_RESPONSE_FORMAT = '.json';
ZRU.DEFAULT_API_VERSION = null;

// Use node's default timeout:
ZRU.DEFAULT_TIMEOUT = require('http').createServer().timeout;

ZRU.PACKAGE_VERSION = require('../package.json').version;

ZRU.USER_AGENT = {
    bindings_version: ZRU.PACKAGE_VERSION,
    lang: 'node',
    lang_version: process.version,
    platform: process.platform,
    publisher: 'zru',
    uname: null
};

ZRU.USER_AGENT_SERIALIZED = null;

var exec = require('child_process').exec;

var resources = {
    Product: require('./resources/Product'),
    Plan: require('./resources/Plan'),
    Tax: require('./resources/Tax'),
    Shipping: require('./resources/Shipping'),
    Coupon: require('./resources/Coupon'),
    Transaction: require('./resources/Transaction'),
    Subscription: require('./resources/Subscription'),
    Authorization: require('./resources/Authorization'),
    Sale: require('./resources/Sale'),
    Currency: require('./resources/Currency'),
    Gateway: require('./resources/Gateway'),
    PayData: require('./resources/PayData')
};

ZRU.ZRUResource = require('./ZRUResource');
ZRU.resources = resources;

function ZRU(key, secretKey) {
    if (!(this instanceof ZRU)) {
        return new ZRU(key, secretKey);
    }

    this._api = {
        auth: null,
        host: ZRU.DEFAULT_HOST,
        port: ZRU.DEFAULT_PORT,
        basePath: ZRU.DEFAULT_BASE_PATH,
        version: ZRU.DEFAULT_API_VERSION,
        timeout: ZRU.DEFAULT_TIMEOUT,
        agent: null,
        dev: false
    };

    this._prepResources();
    this.setApiKey(key, secretKey);
    this.setResponseFormat(ZRU.DEFAULT_RESPONSE_FORMAT);


    this.notification = require('./Notification');
}

ZRU.prototype = {

    setHost: function (host, port, protocol) {
        this._setApiField('host', host);
        if (port) {
            this.setPort(port);
        }
        if (protocol) {
            this.setProtocol(protocol);
        }
    },

    setProtocol: function (protocol) {
        this._setApiField('protocol', protocol.toLowerCase());
    },

    setPort: function (port) {
        this._setApiField('port', port);
    },

    setResponseFormat: function (format) {
        this._setApiField('format', format);
    },

    setApiKey: function (key, secretKey) {
        if (key && secretKey) {
            this._setApiField('key', key + ':' + secretKey);
        }
    },

    setTimeout: function (timeout) {
        this._setApiField(
          'timeout',
          timeout === null ? ZRU.DEFAULT_TIMEOUT : timeout
        );
    },

    setHttpAgent: function (agent) {
        this._setApiField('agent', agent);
    },

    _setApiField: function (key, value) {
        this._api[key] = value;
    },

    getApiField: function (key) {
        return this._api[key];
    },

    getResponseFormat: function (key) {
        return this._api[key];
    },

    getConstant: function (c) {
        return ZRU[c];
    },

    // Gets a JSON version of a User-Agent and uses a cached version for a slight
    // speed advantage.
    getClientUserAgent: function (cb) {
        if (ZRU.USER_AGENT_SERIALIZED) {
            return cb(ZRU.USER_AGENT_SERIALIZED);
        }
        this.getClientUserAgentSeeded(ZRU.USER_AGENT, function (cua) {
            ZRU.USER_AGENT_SERIALIZED = cua;
            cb(ZRU.USER_AGENT_SERIALIZED);
        });
    },

    // Gets a JSON version of a User-Agent by encoding a seeded object and
    // fetching a uname from the system.
    getClientUserAgentSeeded: function (seed, cb) {
        exec('uname -a', function (err, uname) {
            var userAgent = {};
            for (var field in seed) {
                userAgent[field] = encodeURIComponent(seed[field]);
            }

            // URI-encode in case there are unusual characters in the system's uname.
            userAgent.uname = encodeURIComponent(uname) || 'UNKNOWN';

            cb(JSON.stringify(userAgent));
        });
    },

    _prepResources: function () {
        for (var name in resources) {
            this[
            name[0].toLowerCase() + name.substring(1)
              ] = new resources[name](this);
        }
    }
};

module.exports = ZRU;
// expose constructor as a named property to enable mocking with Sinon.JS
module.exports.ZRU = ZRU;
