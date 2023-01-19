const {Schema,model}= require('mongoose');
const UserSchema = new Schema({
name:String,


});

const LowModel= model('low',UserSchema)
module.exports=LowModel;