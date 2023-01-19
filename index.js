require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const UserModel = require("./Models/Signup.model");
const bcrypt = require("bcrypt");
const app = express();
const jwt=require("jsonwebtoken");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    } else {
      const user = new UserModel({
        email: email,
        password: hash,
      });
      user
        .save()
        .then((result) => {
          res.status(201).json({
            message: "User created",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
    }
  });
});


app.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const user=await UserModel.findOne({email});
    
    if(user){
        const hashed_pass=user.password;
        const user_id=user._id;
        bcrypt.compare(password,hashed_pass,function(err,result){
            if(err){
                res.send({msg:"Something went wrong try after sometime"})
            }
            if(result){
                const token=jwt.sign({user_id:user_id,email:email},process.env.SECRET_KEY)
            res.send({msg:"Login succesfull",token})
            }else{
                res.send({msg:"Login Failed"})
            }
        }
)
}else{
    res.send("email was not specified!")
}
    })

mongoose.connect(process.env.db_url).then(() => {
  app.listen(8080, () => {
    console.log("server statrted on port 8080");
});
});