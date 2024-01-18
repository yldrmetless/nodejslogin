const express = require("express")
const path = require("path")
const bcrypt = require("bcrypt")
const patient = require("./models/patient")
const user = require("./models/user")

const app = express()

require("./config")()

app.use(express.json())


app.use(express.urlencoded({extended: false}))

app.set("view engine", "ejs")

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("login")
})

app.get("/signup", (req, res) => {
    res.render("signup")
})

//Register
app.post("/signup", async (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password
    }

    const existing_user = await user.findOne({email: data.email})
    if(existing_user){
        res.send("User already exists. Please choose a different email")
    }
    else{
        const salt_rounds = 10;
        const hashed_password = await bcrypt.hash(data.password, salt_rounds)

        data.password = hashed_password

        const user_data = await user.insertMany(data)
        console.log(user_data);
    }
})








app.get('/index', async (req, res) => {
    const data =await patient.find({})
    console.log(data)
    res.render('index',{
        data: data
    })
})



//login

app.post("/index", async(req, res) => {
    try{
        const check = await user.findOne({email: req.body.email})
        if(!check){
            res.send("User cannot found")
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password)

        if(isPasswordMatch){
            res.render("index")
        }
        else{
            req.send("wrong password")
        }
    }
    catch{
        res.send("wrong details")
    }
})





app.listen(3000, () => {
    console.log("Server is running");
})