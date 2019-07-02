
# BAMAZON

## Table of Contents 
1. [Overview](#overview)
2. [Installation](#installation)
3. [Customer View](#customer)
4. [Manager View](#manager)
5. [Supervisor View](#supervisor)

<a name="overview"></a>
## Overview 

BAMAZON is a Node.js command line interface that utilizez MySQL database to create a virtual store experience. Users can take on the role of either customer, manager, or supervisor and interact with the store through different commands. 

<a name="installation"></a>
## Installation

### Step 1: Git Clone

Clone Bamazon to your local git repo like the following:

> git clone git@github.com:sajadgzd/bamazon.git

The Bamazon project and its files should now be in your project folder.

### Step 2: Install Dependencies

Install the following dependencies listed in the `package.json` file: 

 - [inquirer](https://www.npmjs.com/package/inquirer)
 - [mysql](https://www.npmjs.com/package/mysql)
 - [console.table](https://www.npmjs.com/package/console.table)
 - [dotenv](https://www.npmjs.com/package/dotenv)

> npm install

Once completed, you will see a `node_modules` folder in your local repo.

The dependencies should now be in the local `node_modules` folder.

### Step 3: Set up MySQL database 

 - Open the `schema.sql` file via MySQL 
 - OR you can open `schema.sql` via VS Code and copy paste the code into MySQL 

<a name="customer"></a>
## Customer View

 1. Open up `terminal`
 2. Use bash command `cd` to direct to your local repo folder 
 3. In `terminal` enter `node bamazonCustomer.js`
 4. You will see `connected as id ` in your terminal window to indicate successful connection to MySQL 
 
 
```javascript
	connection.connect(function(err) {
	  if (err) throw err;
	  console.log("connected as id " + connection.threadId); 
	  purchase();
	});
```

5. Enter the `Item Id` (table's first column) of the product you wish to purchase 
6. Then you will be prompted to enter the quantity of products you wish to purchase
7. Next either your purchase total or an alert of insufficient inventory will display
8. After each `purchase`, you can choose to continue or exit by using the up and down arrow keys on your keyboard (exit early with `ctrl + c`)
9. If you select no, connection to your MySQL ends

``` javascript
 connection.end()
```

![Demo for Customer View](/assets/cust.gif)


<a name="manager"></a>
## Manager View
 1. Open up `terminal`
 2. Use bash command `cd` to direct to your local repo folder 
 3. In `terminal` enter `node bamazonManager.js`
 4. You will see `connected as id ` in your terminal window to indicate successful connection to MySQL 

```javascript
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId); 
  manage();
});
```

 5. You will then be prompted 4 options:
	- View Products 
	- View Low Inventory 
	- Add to Inventory
	- Add New Products
 6. View Low Inventory option displays items with quantity < 5 
 7. Add New Products will prompt the user to select a department. Note that this a `rawlist` so option selection must be done through the number keys.
 8. After each `manage`, you can choose to continue or exit by using the up and down arrow keys on your keyboard (exit early with `ctrl + c`)
 9. If you select no, connection to your MySQL ends
![Demo for Manager View](/assets/manager.gif)


<a name="supervisor"></a>
## Supervisor View
 1. Open up `terminal`
 2. Use bash command `cd` to direct to your local repo folder 
 3. In `terminal` enter `node bamazonSupervisor.js`
 4. You will see `connected as id ` in your terminal window to indicate successful connection to MySQL 

```javascript
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId); 
  supervise();
});
```

5. You will be prompted 2 options: 
	- View Sales by Departments 
	- Add New Departments
6. View Sales by Departments give you an overview of the PnL of each department. Note that Sales and Pnl are not part of our table in MySQL. Instead, they are created on the fly 
8. After each `supervise`, you can choose to continue or exit by using the up and down arrow keys on your keyboard (exit early with `ctrl + c`)
9. If you select no, connection to your MySQL ends
![Demo for Supervisor View](/assets/super.gif)

 