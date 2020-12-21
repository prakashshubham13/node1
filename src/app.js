require('dotenv').config();
const express=require("express");
const app=express();
const port=process.env.PORT || 3000;
require("./db/conn");
const path=require("path");
const hbs = require("hbs");
const User =require('./models/models/register');
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

// const createToken = async()=>{
//     const token=await jwt.signin({_id:"5fe0af0f2ec387677c79166a"},"mynameisshubhamprakash",{expiresIn:"2 seconds"});
//     console.log(token);

//     const userver=await jwt.verify(token,"mynameisshubhamprakash")
// }

// setting path
const staticpath = path.join("__dirname","../public");
const templatespath = path.join("__dirname","../templates/views");
const partialspath = path.join("__dirname","../templates/partials");

console.log(process.env.SECRET_KEY)

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(staticpath))
app.set("view engine","hbs");
app.set("views",templatespath);
hbs.registerPartials(partialspath);


//routing
app.get("/",(req,res)=>{
    res.render("index");
});

app.post("/register",async(req,res)=>{

    try{
        const name=req.body.name;
        const password=req.body.password;
        const cpassword=req.body.cpassword;

        if(password===cpassword)
        {
        const userDetail=new User({
            name,
            password,
            cpassword
        })

//hashpassword

        const token = await userDetail.generateAuthToken();
        console.log(token);

        const userde=await userDetail.save();
        res.status(201).render("index");
    }
}
catch(error){
res.send(`there is${error}`);
console.log(error);
}
});

app.post("/login",async(req,res)=>{
    try{
        const name=req.body.name;
        const password=req.body.password;

       const username=await User.findOne({name:name});
       const ismatch=bcrypt.compare(password,username.password);
       const token = await username.generateAuthToken();
       if(ismatch)
       {
       res.status(201).render("home");
       }
       else
       res.send("password galat h");

    }catch(error){
        res.status(400).send(error)
    }
})

//create server
app.listen(port,()=>{
    console.log("running");
})
