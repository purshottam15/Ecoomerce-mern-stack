const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address:{
    type:[Object]
  },
 
  role: {
    type:String,
    default:"user"

  },
});

const virtual=userSchema.virtual('id');
virtual.get(function(){
    return this._id
})
userSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(doc,ret){delete ret._id}
})


// Create a User model based on the userSchema
const User = mongoose.model('User', userSchema);

module.exports = User;
