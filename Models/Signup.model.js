const {Schema,model}= require('mongoose');
const UserSchema = new Schema({
name:String,
email:{
type:String,
 unique:true,
 require:true
},
password:{
    type:String,
    require:true
}


});

const UserModel = model('mock',UserSchema)
module.exports=UserModel;