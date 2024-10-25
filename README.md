
# ZRU NodeJS SDK

## Overview

The ZRU NodeJS SDK provides seamless integration with the ZRU API, enabling developers to easily manage transactions, products, plans, taxes, and notifications in their applications.

## Installation

Install the SDK using npm:

```bash
npm install --save zru
```

## Supported Features

- **ES5, ES6, ES8, and TypeScript**: The SDK is compatible with modern JavaScript standards and includes support for `async/await`, Promises, and traditional callbacks.
- **JSON Responses**: All API responses are returned in JSON format.
- **Promise and Callback Support**: All methods support both Promises and Callbacks, providing flexibility in how you handle API responses.

## Quick Start Example

### Initialize the SDK

```javascript
const zru = require('zru')('PUBLIC_KEY', 'SECRET_KEY');
```

### Create a Transaction

```javascript
zru.transaction.create({
    currency: "EUR",
    products: [{
        amount: 1,
        product_id: "PRODUCT-ID"
    }]
}, function (error, transaction) {
    if (error) {
        console.error('Error:', error);
        return;
    }
    console.log('Transaction:', transaction);
    console.log('Transaction Token:', transaction.token); // Transaction token
});
```

Alternatively, create a transaction with product details:

```javascript
zru.transaction.create({
    currency: "EUR",
    products: [{
        amount: 1,
        product: {
            name: "Product",
            price: 5
        }
    }]
}, function (error, transaction) {
    if (error) {
        console.error('Error:', error);
        return;
    }
    console.log('Transaction:', transaction);
    console.log('Transaction Token:', transaction.token);
});
```

### List Available Plans
```javascript
zru.plan.list(function (error, planPaginator) {
    if (error) {
        console.error('Error:', error);
        return;
    }
    console.log('Plans:', planPaginator.results); // List of plans
    console.log('Total Plans:', planPaginator.count); // Total number of plans
    console.log('Next Page URL:', planPaginator.next); // URL for next page
});
```

### Retrieve, Modify, and Save a Product
```javascript
zru.product.get("PRODUCT-ID", function (error, product) {
    if (error) {
        console.error('Error:', error);
        return;
    }
    console.log('Product:', product);
});

zru.product.change("PRODUCT-ID", { price: 10 }, function (error, product) {
    if (error) {
        console.error('Error:', error);
        return;
    }
    console.log('Updated Product:', product);
});
```

### Create and Delete a Tax

```javascript
zru.tax.create({
    name: "Tax",
    percent: 5
}, function (error, tax) {
    if (error) {
        console.error('Error:', error);
        return;
    }
    console.log('Created Tax:', tax);
});

zru.tax.delete("TAX-ID", function (error, tax) {
    if (error) {
        console.error('Error:', error);
        return;
    }
    console.log('Deleted Tax:', tax);
});
```

### Handle Notifications

```javascript
const event = zru.notification.constructEvent(
    request.rawBody, zru // Raw JSON request received from ZRU
);

console.log('Event Status:', event.status);
console.log('Event Type:', event.type);
console.log('Event Signature:', event.checkSignature());
```
