const mongoose = require('mongoose');
var validator = require('validator');
const bcrypt=require("bcryptjs");
const jwt = require('jsonwebtoken');




const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    password:{
        type:String,
        required:true,
    },
    cpassword:{
        type:String,
        required:true,
    },
    tokens:[{
        token:{
            type:String,
            required:true,
        }
    }]

})


//generating tokens

userSchema.methods.generateAuthToken = async function(){

    try{
        const token = jwt.sign({ _id:this._id.toString() }, process.env.SECRET_KEY);
        // const token=jwt.signin({_id:this._id.toString()},"mynameisshubhamprakashmynameisshubhamprakash");
        this.tokens=this.tokens.concat({token:token});
        console.log(token);
        await this.save();
        return token;
    }catch(error){
        // res.send(`token error ${error}`);
     console.log(error);
    }

}

//convert password to hash

userSchema.pre("save",async function(next){
if(this.isModified("password"))
{
    this.password = await bcrypt.hash(this.password,10);

// this.cpassword = undefined;
}
    next();
})


// we need a collection
const User = mongoose.model("User",userSchema)
module.exports = User;