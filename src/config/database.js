const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '/database.json');

module.exports.products = {};

/**
 * Get all the products.
 */
module.exports.products.getAll = getProducts;

/**
 * Add product.
 */
module.exports.products.add = (product) => {
     // Get products from database
     let products = getProducts();
     product.id = products.length + 1;
     products.push(product);

     // Save products in database;
     saveProducts(products);
};

/**
 * Find product by name.
 */
module.exports.products.findByName = (name) => {
     return getProducts()
          .filter(p => p.name.toLowerCase().includes(name));
};

/**
 * Read the data from the file,
 * parse it from json and 
 * return it as a result
 */
function getProducts() {
     // Check if the db file is not existing
     if (!fs.existsSync(dbPath)) {
          fs.writeFileSync(dbPath, '[]');
          return [];
     }

     let json = fs.readFileSync(dbPath).toString() || '[]';
     let products = JSON.parse(json);

     return products;
}

/**
 * Function that accept collection of products
 * which will overwrite currently saved (in the file)
 * collection and save it in json format:
 * @param {*} products Collection of products.
 */
function saveProducts(products){
     let json = JSON.stringify(products);
     fs.writeFileSync(dbPath,json);
} 