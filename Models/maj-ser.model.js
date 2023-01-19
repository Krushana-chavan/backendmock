const {Schema,model}= require('mongoose');
const UserSchema = new Schema({
name:String,


});

const MajModel= model('maj',UserSchema)
module.exports=MajModel;