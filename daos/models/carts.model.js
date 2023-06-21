const mongoose = require('mongoose');


const CartsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
    carts: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        count: {
          type: Number,
          required: true
        }
      }
    ],
    default: []
  }

});

CartsSchema.pre('findOne', function (next) {
  this.populate('user'); 
  this.populate('carts.product');
  next();
});

const Cart = mongoose.model('Cart', CartsSchema);
module.exports = Cart;