//The first should ask them the ID of the product they would like to buy.
//The second message should ask how many units of the product they would like to buy.

// Imports express into our app and sets it up for use
const inquirer = require('inquirer');
const mysql = require('mysql');



// Connection to the database
const db = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'Charlotte215!',
    database: 'Bamazon'
});

//The first should ask them the ID of the product they would like to buy.
//The second message should ask how many units of the product they would like to buy.

// Connect to the database
db.connect() 

//Initial kickoff
const main = function() {
    console.log('Welcome to Bamazon \n\r');
    printProducts();
}

// Display the products on the console screen and prompt the user
const printProducts = function() {
    db.query('SELECT * FROM products', function(err, results, fields) {
        results.forEach(record => {
            console.log(`${record.item_id} - ${record.product_name} [${record.price}]`);
        });
        console.log(''); 
        placeOrder();
    });
};

// Entry from user
const placeOrder = function() {
    inquirer.prompt([{
        type: 'input',
        name: 'item_id',
        message: 'Enter which product to purchase:',
        validate: isValidNumber,
        filter: Number
    },
    {
        type: 'input',
        name: 'stock_quantity',
        message: 'Enter the Quantity:',
        validate: isValidNumber,
        filter: Number
    }]).then(answers => {
        const itemNo = answers.item_id;
        const quantity = answers.stock_quantity;

        db.query(`SELECT * FROM products WHERE item_id = ${itemNo}`, function(error, results) {
            if(error) throw error;
            
            // If empty then error and display the products.
            if(results.length === 0) {
                console.log('ERROR: An item with the ID you specified does not exist. Please enter a valid item number.');
                printProducts();
            } else {
                const productData = results[0];
                if(quantity <= productData.stock_quantity) {
                    console.log(`The item "${productData.product_name}" is available in the quantity "${quantity}".`);

                    const stockLevel = productData.stock_quantity - quantity
                    const orderTotal = productData.price * quantity

                    db.query(`UPDATE products SET stock_quantity = ${stockLevel} WHERE item_id = ${itemNo}`, function (error, results) {
                        if(error) throw error;
                        console.log(`\n\r Order Submitted Successfully.\n Order Total: $${orderTotal}\n`);
                        exit(0);
                    });
                } else {
                    console.log(`The item "${productData.product_name}" is not available in the requested quantity. Please select a different quantity.`);
                    printProducts();
                }
            }
        });
    })
}


// Validation of a postive non-zero Number
const isValidNumber = function(value) {
    const number = Number.isInteger(parseFloat(value));
    const sign = Math.sign(value);

    if(number && sign === 1) {
        return true;
    } else {
        return false;
    }
}

// RUNTIME
main();