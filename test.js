const fs = require('fs');
const path = require('path');

// Define the path to your .env file
const envFilePath = path.resolve(__dirname, 'env.test');

// Read the file content
const envConfig = fs.readFileSync(envFilePath, 'utf-8');

// Split file content by new lines and set each as an environment variable
envConfig.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    process.env[key.trim()] = value.trim();
  } else if (key && !value) {
    throw new Error(`Environment variable ${key.trim()} is missing a value in the .env file.`);
  }
});

// Throw an exception if a specific variable is not found
const requiredVariables = ['PUBLIC_KEY', 'SECRET_KEY'];

requiredVariables.forEach(variable => {
  if (!process.env[variable]) {
    throw new Error(`Missing required environment variable: ${variable}`);
  }
});

// Initialize the SDK
const zru = require('./lib/zru')(process.env.PUBLIC_KEY, process.env.SECRET_KEY);

// Create a Transaction
zru.transaction.create({
    currency: "EUR",
    products: [{
        amount: 1,
        product_id: "c8325bb3-c24e-4c0c-b0ff-14fe89bf9f1f"
    }]
}, function (error, transaction) {
    if (error) {
        console.error('Error:', error);
        return;
    }
    console.log('Transaction:', transaction);
    console.log('Transaction Token:', transaction.token); // Transaction token
});

// Alternatively, create a transaction with product details
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

// List Available Plans
zru.plan.list(function (error, planPaginator) {
    if (error) {
        console.error('Error:', error);
        return;
    }
    console.log('Plans:', planPaginator.results); // List of plans
    console.log('Total Plans:', planPaginator.count); // Total number of plans
    console.log('Next Page URL:', planPaginator.next); // URL for next page
});

// Retrieve, Modify, and Save a Product
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

// Create and Delete a Tax
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

// Handle Notifications
const event = zru.notification.constructEvent(
    '{"status": 1, "type": 1}', zru // Raw JSON request received from ZRU
);

console.log('Event Status:', event.status);
console.log('Event Type:', event.type);
console.log('Event Signature:', event.check_signature());