'use strict';

var utils = require('./utils');

module.exports = _Error;

/**
 * Generic Error Class to wrap any errors returned by ZRU-node
 */
function _Error() {
    this.populate.apply(this, arguments);
    this.stack = (new Error(this.message)).stack;
}

// Extend Native Error
_Error.prototype = Object.create(Error.prototype);

_Error.prototype.type = 'GenericError';
_Error.prototype.populate = function (type, message) {
    this.type = type;
    this.message = message;
};

_Error.extend = utils.protoExtend;

/**
 * Create subclass of internal Error klass
 * (Specifically for errors returned from ZRU's REST API)
 */
var ZRUError = _Error.ZRUError = _Error.extend({
    type: 'ZRUError',
    populate: function (raw) {
        // Move from prototype def (so it appears in stringified obj)
        this.type = raw.type;

        this.stack = (new Error(raw.message)).stack;
        this.rawType = raw.type;
        this.code = raw.code;
        this.param = raw.param;
        this.message = raw.message;
        this.detail = raw.detail;
        this.jsonBody = raw.jsonBody;
        this.resource = raw.resource;
        this.resourceId = raw.resourceId;
        this.raw = raw;
    }
});

/**
 * Helper factory which takes raw ZRU errors and outputs wrapping instances
 */
ZRUError.generate = function () {
    return new _Error('Generic', 'Unknown Error');
};

// Specific ZRU Error types:
_Error.InvalidRequestError = ZRUError.extend({type: 'InvalidRequestError'});
_Error.BadUseError = ZRUError.extend({type: 'BadUseError'});
_Error.ConnectionError = ZRUError.extend({type: 'ConnectionError'});
_Error.APIError = ZRUError.extend({type: 'APIError'});
