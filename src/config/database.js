let products = [];
let count = 1;

module.exports.products = {};

/**
 * Get all the products.
 */
module.exports.products.getAll = () => {
     return products;
};

/**
 * Add product.
 */
module.exports.products.add = (product) => {
     product.id = count++;
     products.push(product);
};

/**
 * Find product by name.
 */
module.exports.products.findByName = (name) => {
     let product = null;

     for (const p of products) {
          if (p.name === name) {
               return p;
          }
     }

     return product;
};