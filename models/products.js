const mongoose=require('mongoose');

const productsSchema=new mongoose.Schema({
   
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
     
     

})


const virtual=productsSchema.virtual('id');
virtual.get(function(){
    return this._id
})
productsSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(doc,ret){delete ret._id}
})



const Product = mongoose.model('Product', productsSchema);

module.exports = Product;