var inquirer = require('inquirer');
var mysql = require('mysql');
var table = require('console.table');
require("dotenv").config();
var values = [];
var departmentArr = [];

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
    supervise();
});

function continueSupervise() {
    inquirer.prompt([{
        type: "list",
        name: "repeat",
        message: "Would you like to do something else?",
        choices: ["YES", "NO"]
    }]).then(function(response) {
        if (response.repeat === "NO") {
            console.log("Exit Executive System.")
            connection.end()
        } else {
            supervise();
        }
    });
};

function supervise() {
    inquirer.prompt([{
        type: "list",
        name: "actions",
        message: "What would you like to do?",
        choices: ["View Sales by Departments", "Create New Departments"]
    }]).then(function(response) {
        if (response.actions === "View Sales by Departments") {
            viewDepartments();
        } else if (response.actions === "Create New Departments") {
            addDepartment();
        }
    });
}

function viewDepartments() {
    var Query = "SELECT departments.department_id, departments.over_head_costs, departments.department_name,";
    Query += " SUM(products.product_sales) AS total_sales FROM departments LEFT JOIN products ON departments.department_name = ";
    Query += "products.department_name GROUP BY departments.department_id, departments.over_head_costs, departments.department_name ";
    connection.query(Query, function(err, res) {
        if (err) throw err;
        // console.log(res)
        values = []
        for (var i = 0; i < res.length; i++) {
            var profit = res[i].total_sales - res[i].over_head_costs;
            values.push([res[i].department_id, res[i].department_name, "$" + res[i].total_sales, "$" + res[i].over_head_costs, "$" + profit]);
        };
        // console.log(values)
        console.table(['Department ID', 'Department Name', 'Sales', 'Over Head Costs', 'Total Profit'], values);
        continueSupervise();

    });
}

function addDepartment() {
    connection.query("SELECT * FROM departments", function(err, res) {
        if (err) throw err;
        departmentArr = [];
        for (var i = 0; i < res.length; i++) {
            departmentArr.push(res[i].department_name);
        };
        inquirer.prompt([{
                type: "input",
                name: "departmentName",
                message: "What is the name of this new department?"
            },
            {
                type: "input",
                name: "overHead",
                message: "What is the over head costs of this department?",
                validate: function(value) {
                    if (!isNaN(value)) {
                        return true
                    } else {
                        return false
                    }
                }
            }
        ]).then(function(response) {
            if (!departmentArr.includes(response.departmentName)) {
                connection.query('INSERT INTO departments SET ?', {
                        department_name: response.departmentName,
                        over_head_costs: response.overHead
                    },
                    function(error, results) {
                        if (error) throw error;
                        console.log(response.departmentName + " has been added with department_id of " + results.insertId)
                        continueSupervise();
                    });
            } else {
                console.log("This department already exist. Duplicate departments are not allowed")
                continueSupervise();
            }
        });
    });
}