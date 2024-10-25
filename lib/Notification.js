'use strict';

const crypto = require('crypto');

var Notification = {
  constructEvent: function (payload, zru) {
    const event = JSON.parse(payload);
    return NotificationData(event, zru);
  },
};

function NotificationData(json_body, zru) {
  const NOTIFICATION_SIGNATURE_PARAM = 'signature';
  const NOTIFICATION_SIGNATURE_IGNORE_FIELDS = ['fail', 'signature'];

  const TYPE_TRANSACTION = 'P';
  const TYPE_SUBSCRIPTION = 'S';
  const TYPE_AUTHORIZATION = 'A';

  const STATUS_DONE = 'D';
  const STATUS_CANCELLED = 'C';
  const STATUS_EXPIRED = 'E';
  const STATUS_PENDING = 'N';

  const SUBSCRIPTION_STATUS_WAIT = 'W';
  const SUBSCRIPTION_STATUS_ACTIVE = 'A';
  const SUBSCRIPTION_STATUS_PAUSED = 'P';
  const SUBSCRIPTION_STATUS_STOPPED = 'S';

  const AUTHORIZATION_STATUS_ACTIVE = 'A';
  const AUTHORIZATION_STATUS_REMOVED = 'R';

  const SALE_GET = 'G';
  const SALE_HOLD = 'H';
  const SALE_VOID = 'V';
  const SALE_CAPTURE = 'C';
  const SALE_REFUND = 'R';
  const SALE_SETTLE = 'S';
  const SALE_ESCROW_REJECTED = 'E';
  const SALE_ERROR = 'I';

  const result = {
    json_body: json_body,
    zru: zru,

    isTransaction() {
      return this.json_body.type === TYPE_TRANSACTION;
    },

    isSubscription() {
      return this.json_body.type === TYPE_SUBSCRIPTION;
    },

    isAuthorization() {
      return this.json_body.type === TYPE_AUTHORIZATION;
    },

    transaction() {
      return this.isTransaction() ? this.zru.Transaction.get(this.json_body.id) : null;
    },

    subscription() {
      return this.isSubscription() ? this.zru.Subscription.get(this.json_body.id) : null;
    },

    authorization() {
      return this.isAuthorization() ? this.zru.Authorization.get(this.json_body.id) : null;
    },

    sale() {
      return this.json_body.sale_id ? this.zru.Sale.get(this.json_body.sale_id) : null;
    },

    isStatusDone() {
      return this.json_body.status === STATUS_DONE;
    },

    isStatusCancelled() {
      return this.json_body.status === STATUS_CANCELLED;
    },

    isStatusExpired() {
      return this.json_body.status === STATUS_EXPIRED;
    },

    isStatusPending() {
      return this.json_body.status === STATUS_PENDING;
    },

    isSubscriptionWaiting() {
      return this.json_body.subscription_status === SUBSCRIPTION_STATUS_WAIT;
    },

    isSubscriptionActive() {
      return this.json_body.subscription_status === SUBSCRIPTION_STATUS_ACTIVE;
    },

    isSubscriptionPaused() {
      return this.json_body.subscription_status === SUBSCRIPTION_STATUS_PAUSED;
    },

    isSubscriptionStopped() {
      return this.json_body.subscription_status === SUBSCRIPTION_STATUS_STOPPED;
    },

    isAuthorizationActive() {
      return this.json_body.authorization_status === AUTHORIZATION_STATUS_ACTIVE;
    },

    isAuthorizationRemoved() {
      return this.json_body.authorization_status === AUTHORIZATION_STATUS_REMOVED;
    },

    isSaleGet() {
      return this.json_body.sale_action === SALE_GET;
    },

    isSaleHold() {
      return this.json_body.sale_action === SALE_HOLD;
    },

    isSaleVoid() {
      return this.json_body.sale_action === SALE_VOID;
    },

    isSaleCapture() {
      return this.json_body.sale_action === SALE_CAPTURE;
    },

    isSaleRefund() {
      return this.json_body.sale_action === SALE_REFUND;
    },

    isSaleSettle() {
      return this.json_body.sale_action === SALE_SETTLE;
    },

    isSaleEscrowRejected() {
      return this.json_body.sale_action === SALE_ESCROW_REJECTED;
    },

    isSaleError() {
      return this.json_body.sale_action === SALE_ERROR;
    },

    checkSignature() {
      const dict_obj = { ...this.json_body };
      const sorted_keys = getSortedKeys(dict_obj);

      let text_to_sign = '';
      sorted_keys.forEach((key) => {
        if (dict_obj[key] === null || NOTIFICATION_SIGNATURE_IGNORE_FIELDS.includes(key) || key.startsWith('_')) {
          return;
        }
        text_to_sign += cleanValue(dict_obj[key]);
      });

      text_to_sign += this.zru.secretKey;
      const signature = sha256(text_to_sign);

      return signature === dict_obj[NOTIFICATION_SIGNATURE_PARAM];
    },
  };
  
  for (const key in json_body) {
    result[key] = json_body[key];
  }
  return result;
}

// Helper function to sort keys in the dictionary
function getSortedKeys(dict_obj) {
  return Object.keys(dict_obj).sort();
}

// Helper function to clean values by replacing specific characters and stripping spaces
function cleanValue(value) {
  const valueStr = String(value);
  const chars_to_replace = /<>"'()\\/;
  return valueStr.replace(new RegExp(`[${chars_to_replace}]`, 'g'), ' ').trim();
}

// Helper function to calculate SHA256 hash
function sha256(text) {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}

module.exports = Notification;