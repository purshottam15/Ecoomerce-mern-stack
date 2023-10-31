const mongoose = require('mongoose');

// Define the schema for the "product" object
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      discountPercentage: {
        type: Number,
        required: true,
        min:0,
        max:100,


      },
      rating: {
        type: Number,
        default:0
      },
      stock: {
        type: Number,
        
      },
      brand: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      thumbnail: {
        type: String,
        required: true,
      },
      images: {
        type: [String],
        required: true,
      },
      userId:{
        type:String,
        required:true
      },
      productId:{
        type:String

      },
      quantity:{
        type:Number,
        default:1
      }
     
  
});

// Define the schema for the "user" object
const userSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  email: String,
  name: String,
});

// Define the schema for the "userAddress" object
const userAddressSchema = new mongoose.Schema({
  name: String,
  phone: String,
  street: String,
  city: String,
  state: String,
  pincode: String,
});

// Define the schema for the main order document
const orderSchema = new mongoose.Schema({
  products: [productSchema],
  user: userSchema,
  userAddress: userAddressSchema,
  payment: String,
  totalAmount: Number,
  status: String,
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  
});

// Create a model for the order schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
