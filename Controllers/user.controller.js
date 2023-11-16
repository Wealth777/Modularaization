const userModel = require("../Models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const SECRET = "secret"

const userWelcome = (req, res) => {
    res.send(`<h1>Hello there! Welcome to users route</h1>`)
    console.log('Welcome to users route');
}

const userSignup = (req, res) => {

    console.log(req.body);

    let user = new userModel(req.body)
    user.save().then((user) => {
        console.log("User saved");
        if (user) {
            res.send({ status: true, message: "User created successfully" })
        }
        
    })
        .catch((err) => {
            console.log("Error creating user", err);
            res.send({ errstatus: false, errmessage: "Error creating user" })
        })
}

const userLogin = (req, res) => {
    // res.send(`<h1>Hello, welcome to users  login</h1>`)
    console.log('Welcome to users signin');

    const  email = req.body.email 
    const password = req.body.password
    userModel.findOne({ mail: email })
        .then( async (user) => {
            if (!user) {
                console.log("User not found");
                console.log(user);
                res.send({ status: false, message: "User not found" })
            }
            else {
                console.log(user)
                console.log("User found");
                try{
                    let verifypassord = await user.compareUser(password)
                    if(verifypassord){
                        console.log("Password matched");
                        let token = jwt.sign({ email }, SECRET, {expiresIn: '1h'})
                        res.send({ status: true, message: "User logged in successfully", token: token })
                    }
                    else{
                        console.log("Password not matched");
                        res.send({ status: false, message: "Password not matched" })
                    }
                }catch(err){
                    console.log("Error comparing password", err);
                    res.send({ status: false, message: "Error comparing password" })
                }
                
                if (user.password === password) {
                    console.log("Password matched");
                    let token = jwt.sign({ email }, SECRET, {expiresIn: '1h'})
                    res.send({ status: true, message: "User logged in successfully", token: token })
                }
                else {
                    console.log("Password not matched");
                    res.send({ errstatus: false, errmessage: "Password not matched" })
                }
            }
        }).catch((err) => {
            console.log("Error logging in user", err);
            res.send({ errstatus: false, errmessage: "Error logging in user" })
        })

}

const userDashboard = (req, res) => {
    // res.send(`<h1>Hello, welcome to Dashboard</h1>`)
    console.log('Welcome to Dashboard');
    let token = req.header.authorization.split(' ')[1]
    jwt.verify(token, SECRET, (err, result) => {
        if (err) {
            console.log("Error verifying token", err);
            res.send({ errstatus: false, errmessage: "Error verifying token" })
        }else {
            console.log(result);
            res.send({ status: true, message: "User logged in successfully", token: token })
        }
    })

}

module.exports = { userWelcome, userLogin, userSignup, userDashboard }