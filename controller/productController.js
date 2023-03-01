const Product = require("../models/product");

//Show list of Product
const index = (req, res, next) => {
  Product.find()
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((error) => {
      res.status(400).json({
        message: "An error Ocurred!",
      });
    });
};

//show a product
const show = (req, res, next) => {
  const productID = req.body.productID;

  Product.findById(productID)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(400).json({ message: "An error occured" });
    });
};

//add a product
const store = (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
  });

  product
    .save()
    .then((response) => {
      res.status(200).json({ message: "Product added successfully!" });
    })
    .catch((error) => {
      res.status(400).json({
        message: "An error occured!",
      });
    });
};

//update a product
const update = (req, res, next) => {
  const productID = req.body.productID;

  const updateData = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
  };
  Product.findByIdAndUpdate(productID, { $set: updateData })
    .then(() => {
      res.status(200).json({ message: "Product updated successfully!" });
    })
    .catch((error) => {
      res.status(400).json({ message: "An error occured" });
    });
};

//delete a product

const destroy = (req, res, next) => {
  const productID = req.body.productID;

  Product.findByIdAndRemove(productID)
    .then(() => {
      res.status(200).json({ message: "Product deleted successfully!" });
    })
    .catch((error) => {
      res.status(400).json({ message: "An error occured" });
    });
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
