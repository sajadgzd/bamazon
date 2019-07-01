var inquirer = require('inquirer');
var mysql = require('mysql');
var table = require('console.table');
var values = [];
require("dotenv").config();



var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.HOST_KEY,
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    purchase();
});

function continueShop() {
    inquirer.prompt([{
        type: "list",
        name: "repeat",
        message: "Would you like to continue shopping?",
        choices: ["YES", "NO"]
    }]).then(function(response) {
        if (response.repeat === "NO") {
            console.log("Thank you for shopping with Bamazon! See you next time.")
            connection.end();
        } else {
            purchase();
        }
    });
};

function purchase() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // console.log(res);
        values = [];
        for (var i = 0; i < res.length; i++) {
            values.push([res[i].item_id, res[i].product_name, res[i].department_name, "$" + res[i].price])
        };
        // console.log(values);
        console.table(['Item ID', 'Item', 'Department', 'Price'], values);
        inquirer.prompt([{
                type: "input",
                name: "product",
                message: "What would you like to buy (Please enter Item ID)?",
                validate: function(value) {
                    if (!isNaN(value)) {
                        return true
                    } else {
                        return false
                    }
                }
            },
            {
                type: "input",
                name: "quantity",
                message: "How many would you like to buy?",
                validate: function(value) {
                    if (!isNaN(value)) {
                        return true
                    } else {
                        return false
                    }
                }
            }
        ]).then(function(response) {
            connection.query("SELECT * FROM products WHERE item_id=?", [response.product], function(err, res) {
                if (err) throw err;
                // console.log(res);
                if (response.quantity > res[0].stock_quantity) {
                    console.log("Sorry! We only have " + res[0].stock_quantity + " available for sale. Please re-Enter the quantity.")
                    purchase();
                } else {
                    var sales = res[0].price * response.quantity;
                    console.log("Your total is: $" + sales);
                    var newSales = res[0].product_sales + sales;
                    var newQuantity = res[0].stock_quantity - response.quantity;
                    connection.query(
                        "UPDATE products SET ? WHERE ?", [{
                                stock_quantity: newQuantity,
                                product_sales: newSales
                            },
                            {
                                item_id: response.product
                            }
                        ],
                        function(err, res) {
                            if (err) throw err;
                            console.log(res.affectedRows + " inventory updated");
                            continueShop();
                        }
                    );
                };
            });
        });
    });
};