DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL(10 ,2) NOT NULL,
    stock_qunatity INTEGER NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price,stock_qunatity)
    Values
    ('Paper Towels', 'Paper Products', 36.00, 4),
    ('Dunkin Donuts Coffee', 'Coffee', 25.00,2),
    ('Cottonelle Toilet Paper', 'Bathroom Products', 18.99, 1),
    ('Cinnomon Toast Crunch Cereal', 'Breakfast', 4.59, 1),
    ('Kraft Macaroni and Cheese', 'Pasta', 4.50,3),
    ('Clorax Disinfecting wipes', 'Cleaning', 10.59, 2),
    ('Glad Trashbags', 'Cleanin', 11.62, 200),
    ('Coke', 'Drinks', 4.68, 150),
    ('American Cheese', 'Dairy', 2.99, 23),
    ('Yoplait strawberry yougurt', 'Dairy', 2.79, 46);

    SELECT * FROM products;