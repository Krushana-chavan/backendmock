const {Schema,model}= require('mongoose');
const UserSchema = new Schema({
name:String,


});

const MedModel= model('med',UserSchema)
module.exports=MedModel;