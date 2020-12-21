const mongoose = require("mongoose")

// creating a database
mongoose.connect("mongodb+srv://shub:wbXHMEOedRE47MKV@cluster0.nqtuk.mongodb.net/login?retryWrites=true&w=majority",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection sucessful");
}).catch((error)=>{
console.log(error);
})