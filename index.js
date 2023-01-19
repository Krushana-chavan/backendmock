require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const UserModel = require("./Models/Signup.model");
const bcrypt = require("bcrypt");
const app = express();
const jwt=require("jsonwebtoken");
const CriModel = require("./Models/cri-ser.model");
const MajModel = require("./Models/maj-ser.model");
const MedModel = require("./Models/med-ser.model");
const LowModel = require("./Models/low-ser.model");

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
}
    })


    app.post("/cri-ser",async(req,res)=>{
      try{
        let {data} = req.body;
        let savedata = new CriModel({data})
        save.savedata()
        res.sendStatus(201).send("data saved succefully")
      }catch(err){
        console.log(err)
      }
    }
    )
    app.post("/maj-ser",async(req,res)=>{
      try{
        let {data} = req.body;
        let savedata = new MajModel({data})
        save.savedata()
        res.sendStatus(201).send("data saved succefully")
      }catch(err){
        console.log(err)
      }
    }
    )
    app.post("/med-ser",async(req,res)=>{
      try{
        let {data} = req.body;
        let savedata = new MedModel({data})
        save.savedata()
        res.sendStatus(201).send("data saved succefully")
      }catch(err){
        console.log(err)
      }
    }
    )
    app.post("/low-ser",async(req,res)=>{
      try{
        let {data} = req.body;
        let savedata = new LowModel({data})
        save.savedata()
        res.sendStatus(201).send("data saved succefully")
      }catch(err){
        console.log(err)
      }
    }
    )
    app.get("/low-ser",async(req,res)=>{
      try{
       let data =  await LowModel.find({})
       res.send(data).sendStatus(201)
      }catch(err){
        console.log(err)
      }
    }
    )
    app.get("/med-ser",async(req,res)=>{
      try{
       let data =  await MedModel.find({})
       res.send(data).sendStatus(201)
      }catch(err){
        console.log(err)
      }
    }
    )
    app.get("/maj-ser",async(req,res)=>{
      try{
       let data =  await MajModel.find({})
       res.send(data).sendStatus(201)
      }catch(err){
        console.log(err)
      }
    }
    )
    app.get("/cri-ser",async(req,res)=>{
      try{
       let data =  await CriModel.find({})
       res.send(data).sendStatus(201)
      }catch(err){
        console.log(err)
      }
    }
    )
mongoose.connect(process.env.db_url).then(() => {
  app.listen(8080, () => {
    console.log("server statrted on port 8080");
});
});