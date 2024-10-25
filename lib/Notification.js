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

    is_transaction() {
      return this.json_body.type === TYPE_TRANSACTION;
    },

    is_subscription() {
      return this.json_body.type === TYPE_SUBSCRIPTION;
    },

    is_authorization() {
      return this.json_body.type === TYPE_AUTHORIZATION;
    },

    transaction() {
      return this.is_transaction() ? this.zru.Transaction.get(this.json_body.id) : null;
    },

    subscription() {
      return this.is_subscription() ? this.zru.Subscription.get(this.json_body.id) : null;
    },

    authorization() {
      return this.is_authorization() ? this.zru.Authorization.get(this.json_body.id) : null;
    },

    sale() {
      return this.json_body.sale_id ? this.zru.Sale.get(this.json_body.sale_id) : null;
    },

    is_status_done() {
      return this.json_body.status === STATUS_DONE;
    },

    is_status_cancelled() {
      return this.json_body.status === STATUS_CANCELLED;
    },

    is_status_expired() {
      return this.json_body.status === STATUS_EXPIRED;
    },

    is_status_pending() {
      return this.json_body.status === STATUS_PENDING;
    },

    is_subscription_waiting() {
      return this.json_body.subscription_status === SUBSCRIPTION_STATUS_WAIT;
    },

    is_subscription_active() {
      return this.json_body.subscription_status === SUBSCRIPTION_STATUS_ACTIVE;
    },

    is_subscription_paused() {
      return this.json_body.subscription_status === SUBSCRIPTION_STATUS_PAUSED;
    },

    is_subscription_stopped() {
      return this.json_body.subscription_status === SUBSCRIPTION_STATUS_STOPPED;
    },

    is_authorization_active() {
      return this.json_body.authorization_status === AUTHORIZATION_STATUS_ACTIVE;
    },

    is_authorization_removed() {
      return this.json_body.authorization_status === AUTHORIZATION_STATUS_REMOVED;
    },

    is_sale_get() {
      return this.json_body.sale_action === SALE_GET;
    },

    is_sale_hold() {
      return this.json_body.sale_action === SALE_HOLD;
    },

    is_sale_void() {
      return this.json_body.sale_action === SALE_VOID;
    },

    is_sale_capture() {
      return this.json_body.sale_action === SALE_CAPTURE;
    },

    is_sale_refund() {
      return this.json_body.sale_action === SALE_REFUND;
    },

    is_sale_settle() {
      return this.json_body.sale_action === SALE_SETTLE;
    },

    is_sale_escrow_rejected() {
      return this.json_body.sale_action === SALE_ESCROW_REJECTED;
    },

    is_sale_error() {
      return this.json_body.sale_action === SALE_ERROR;
    },

    check_signature() {
      const dict_obj = { ...this.json_body };
      const sorted_keys = get_sorted_keys(dict_obj);

      let text_to_sign = '';
      sorted_keys.forEach((key) => {
        if (dict_obj[key] === null || NOTIFICATION_SIGNATURE_IGNORE_FIELDS.includes(key) || key.startsWith('_')) {
          return;
        }
        text_to_sign += clean_value(dict_obj[key]);
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
function get_sorted_keys(dict_obj) {
  return Object.keys(dict_obj).sort();
}

// Helper function to clean values by replacing specific characters and stripping spaces
function clean_value(value) {
  const valueStr = String(value);
  const chars_to_replace = /<>"'()\\/;
  return valueStr.replace(new RegExp(`[${chars_to_replace}]`, 'g'), ' ').trim();
}

// Helper function to calculate SHA256 hash
function sha256(text) {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}

module.exports = Notification;