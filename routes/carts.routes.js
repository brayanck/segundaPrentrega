const router = require("express").Router();
const Cart = require("../daos/models/carts.model");
const Product = require("../daos/models/products.model")


router.get("/:cid", async (req, res) => {
  try {
    let carrito = req.params.cid;
    let carro = await Cart.findOne({ _id: carrito });
    res.render("cart", {carro});
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    let carrito = req.params.cid;
    let producto = req.params.pid;
    const cart = await Cart.findOne({ _id: carrito });
    if (cart) {
      const updatedCart = await Cart.findOneAndUpdate(
        { _id: carrito },
        { $pull: { carts: { _id: producto } } },
        { new: true }
      );
      res.json(updatedCart);
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});
router.delete("/:cid", async (req, res) => {
  try {
    let carrito = req.params.cid;
    const result = await Cart.updateOne(
      { _id: carrito },
      { $set: { carts: [] } }
    );
    res.json(result);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});
router.put("/:cid", async (req, res) => {
  try {
    let carrito = req.params.cid;
    let products = req.body;
    const result = await Cart.updateOne(
      { _id: carrito },
      { $set: { carts: products } }
    );
    res.json(result);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});
router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const count = req.body.count;
    const carrito = req.params.cid;
    const producto = req.params.pid;

    const carro = await Cart.findOne({ _id: carrito });
    const product = await Product.findOne({ _id: producto });

    if (carro && product) {
      const cartItem = carro.carts.find((item) =>{ 
        if(item.product._id.toString() === producto.toString()){
          return true
        }
      });
      if (cartItem) {
        const updatedCart = await Cart.findOneAndUpdate(
          { _id: carrito, "carts.product": producto },
          { $inc: { "carts.$.count": count } }, // Utilizamos $set en lugar de $inc
          { new: true }
        );
        return res.json(updatedCart);
      } else {
        const updatedCart = await Cart.findByIdAndUpdate(
          carrito,
          { $push: { carts: { product: product._id, count } } },
          { new: true }
        );
        return res.json(updatedCart);
      }
    } else {
      res.json("El producto o el carrito no existen");
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const carritoId = req.params.cid;
    const productoId = req.params.pid;

    const cart = await Cart.findOneAndUpdate(
      { _id: carritoId },
      {
        $push: {
          carts: { product: productoId, count: 1 },
        },
      },
      { new: true }
    );

    res.json(cart);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
