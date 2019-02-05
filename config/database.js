let products = [];
let count = 1;

module.export.products = {};

/**
 * Get all the products.
 */
module.export.products.getAll = () => {
     return products;
};

/**
 * Add product.
 */
module.export.products.add = (product) => {
     product.id = count++;
     products.push(product);
};

/**
 * Find product by name.
 */
module.export.products.findByName = (name) => {
     let product = null;

     for (const p of products) {
          if (p.name === name) {
               return p;
          }
     }

     return product;
};