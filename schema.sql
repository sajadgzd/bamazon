DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL, 
	department_name VARCHAR(100) NOT NULL, 
	price DECIMAL(11, 2) NOT NULL, 
	stock_quantity INTEGER NOT NULL, 
    PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
    VALUES("Rolex", "Watch", 10000, 50),
        ("Printed Summer Tee", "Tops", 120, 100), 
        ("Matte Black Blazer", "Tops", 300, 50), 
        ("Distressed Jeans", "Bottoms", 250, 100), 
        ("Classic Tanks", "Tops", 40, 500), 
        ("Panerai", "Watch", 20000, 30), 
        ("Printed Shorts", "Bottoms", 80, 100), 
        ("Button Down Shirt", "Tops", 140, 60), 
        ("Classic Trousers", "Bottoms", 180, 200),      
        ("Frat Tanks", "Tops", 60, 200); 
        

ALTER TABLE products
  ADD product_sales INTEGER NOT NULL DEFAULT 0;

SELECT * FROM products;

CREATE TABLE departments (
	department_id INTEGER AUTO_INCREMENT NOT NULL, 
    department_name VARCHAR(100) NOT NULL, 
    over_head_costs DECIMAL(11, 2) NOT NULL DEFAULT 0,
    PRIMARY KEY (department_id)
); 

INSERT INTO departments(department_name, over_head_costs)
VALUES("Watch", 20000), ("Tops", 10000), ("Bottoms", 10000), ("Other", 5000);

SELECT * FROM departments;