const mongoose=require('mongoose');

const cartSchema=new mongoose.Schema({
   
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
     
     

})


const virtual=cartSchema.virtual('id');
virtual.get(function(){
    return this._id
})
cartSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(doc,ret){delete ret._id}
})



const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;