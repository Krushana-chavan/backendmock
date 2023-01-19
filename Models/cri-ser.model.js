const {Schema,model}= require('mongoose');
const UserSchema = new Schema({
name:String,


});

const CriModel= model('cri',UserSchema)
module.exports=CriModel;