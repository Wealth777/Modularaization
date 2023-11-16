const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
let userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    mail: {type:String, required:true, unique:true},   
    password: String,
    checked:Boolean,
})

let saltRound = 10

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, saltRound, (err, hash)=>{
        if (err) {
            console.log(err);
        }else{
         console.log(hash);
         this.password = hash;
         next()
        }   
    })
})

userSchema.methods.compareUser = async function (password) {
    try{
        let checkpassword = await bcrypt.compare(password, this.password)
        return checkpassword

    }catch(err){
        console.log(err);
        return false
    }
   }
let userModel = mongoose.model("users", userSchema )

module.exports = userModel