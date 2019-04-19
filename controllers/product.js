const Product = require('../models/Product');
const Category = require('../models/Category');

module.exports.addGet = (req, res) => {
    Category.find().then((categories) => {
        res.render('product/add', { categories: categories });
    });
}

module.exports.addPost = async (req, res) => {
    //console.log(req)
    let productObj = req.body;
    productObj.image = req.file.destination + '/' + req.file.filename;

    let product = await Product.create(productObj);
    let category = await Category.findById(product.category);
    category.products.push(product._id);
    category.save();
    res.redirect('/');
}

module.exports.editGet = (req, res) => {
    let id = req.params.id;
    Product.findById(id).then(product => {
        if (!product) {
            res.status(404).send('Not found');
            return;
        }

        Category.find().then((categories) => {
            res.render('product/edit', {
                product: product,
                categories: categories
            });
        });
    });
}

module.exports.editPost = async (req, res) => {
    let id = req.params.id;
    let editedProduct = req.body;

    let product = await Product.findById(id);
    if (!product) {
        res.redirect(`/?error=${encodeURIComponent('Product was not found!')}`);
        return;
    }
    product.name = editedProduct.name;
    product.description = editedProduct.description;
    product.price = editedProduct.price;
    if (req.file) {
        product.image = req.file.destination + '\\' + req.file.originalname;
    }

    // First we check if the category is changed.
    if (product.category.toString() !== editedProduct.category) {
        // If so find the "current" and "next" category.
        Category.findById(product.category).then((currentCategory) => {
            Category.findById(editedProduct.category).then((nextCategory) => {
                let index = currentCategory.products.indexOf(product._id);
                if (index >= 0) {
                    // Remove product specified from current category's list of products
                    currentCategory.products.splice(index, 1);
                }
                currentCategory.save();
                // Add product's refference to the "new" category.
                nextCategory.products.push(product._id);
                nextCategory.save();

                product.category = editedProduct.category;

                product.save().then(() => {
                    res.redirect(`/?success=${encodeURIComponent('Product was edited successfully!')}`);
                });
            });
        });
    } else {
        product.save().then(() => {
            res.redirect(`/?success=${encodeURIComponent('Product was edited successfully!')}`);
        });
    }
}

module.exports.deleteGet = (req, res) => {
	let id = req.params.id;

	Product.findById(id).then((product) => {
		if (!product) {
			res.redirect(
				`/?error=${encodeURIComponent('Product was not found!')}`
			);
			return;
		}

		res.render('product/delete', {
			product: product
		});

	}).catch(() => {
		res.sendStatus(404);
	});
};

module.exports.deletePost = (req, res) => {
	let id = req.params.id;

	Product.findByIdAndRemove(id).then((removedProduct) => {
		Category
			.update({ _id: removedProduct.category }, { $pull: { products: removedProduct._id } })
			.then((result) => {
				let imageName = removedProduct.image.split('\\').pop();
				
				fs.unlink(`./content/images/${imageName}`, (err) => {
					if (err) {
						console.log(err);
						res.sendStatus(404);
						return;
					}

					res.redirect(
						`/?success=${encodeURIComponent('Product was deleted successfully!')}`
					);
				});
			}).catch(() => {
				res.redirect(
					`/?error=${encodeURIComponent('Product was not found!')}`
				);
			});
	});
};

module.exports.buyGet = (req, res) => {
    let productId = req.params.id;
    Product.findById(productId).then((product) => {
        res.render('product/buy', { product });
    });
}
