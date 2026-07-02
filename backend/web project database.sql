CREATE DATABASE ecommerce_dB;
SHOW DATABASES;
USE ecommerce_db;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255),
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10,2),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
SHOW TABLES;
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
INSERT INTO categories (name)
VALUES 
('Skincare'),
('Clothes'),
('Footwear'),
('Makeup');
ALTER TABLE products
ADD category_id INT;
ALTER TABLE products
ADD FOREIGN KEY (category_id) REFERENCES categories(id);
INSERT INTO products (name, description, price, image, stock, category_id)
VALUES 
('Vitamin C Serum', 'Brightens skin and removes dark spots', 1200.00, 'vitamin_c.jpg', 15, 1),
('Hydrating Face Wash', 'Deep cleansing gentle face wash for daily use', 700.00, 'facewash.jpg', 20, 1),
('Undereye cream', 'Brighter eyes,smoother skin,zero tiredness', 1600.00, 'under_eye_cream.jpg', 25, 1),
('Sunblock SPF 50', 'Protects skin from UV rays and sun damage', 1500.00, 'sunblock.jpg', 18, 1),

('Casual T-Shirt', 'Soft cotton printed t-shirt for daily wear', 900.00, 'tshirt.jpg', 30, 2),
('Denim Jacket', 'Stylish blue denim jacket for all seasons', 2500.00, 'jacket.jpg', 12, 2),
('Hoodie', 'Warm winter hoodie with premium fabric', 2000.00, 'hoodie.jpg', 20, 2),
('Formal Shirt', 'Elegant office wear formal shirt', 1800.00, 'formal_shirt.jpg', 15, 2),

('Running Shoes', 'Comfortable shoes for running and sports', 3200.00, 'running_shoes.jpg', 10, 3),
('Sneakers', 'Trendy street style sneakers', 2800.00, 'sneakers.jpg', 14, 3),
('Sandals', 'Lightweight summer sandals', 1200.00, 'sandals.jpg', 25, 3),
('Formal Shoes', 'Leather shoes for office and events', 3500.00, 'formal_shoes.jpg', 8, 3),

('Matte Lipstick', 'Long lasting red matte lipstick', 2900.00, 'lipstick.jpg', 22, 4),
('Foundation', 'Smooth skin tone foundation base', 1600.00, 'foundation.jpg', 18, 4),
('Compact Powder', 'Oil control face compact powder', 1200.00, 'compact.jpg', 20, 4),
('Eyeliner', 'Waterproof black eyeliner',1500.00, 'eyeliner.jpg', 30, 4);

CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT DEFAULT 1
);



DESCRIBE products;
SELECT * FROM categories;
SELECT * FROM products;

DESCRIBE orders;

SELECT * FROM cart;
ALTER TABLE orders
ADD COLUMN customer_name VARCHAR(100),
ADD COLUMN phone VARCHAR(20),
ADD COLUMN city VARCHAR(50),
ADD COLUMN address TEXT;

SELECT * FROM cart;