import express from "express"
import cors from "cors"
import mongoose from "mongoose"
// const express=require("express")
// const app=express()
// const mclient=require("mongodb").MongoClient;
// const myurl="mongodb+srv://surendra:surendra@cluster0.dmeqqa9.mongodb.net/?retryWrites=true&w=majority"
const myurl="mongodb+srv://youtube:youtube@cluster0.mfapo6s.mongodb.net/surendra?retryWrites=true&w=majority"

const port=9002;
// mclient.connect(myurl)
// .then((client)=>{
//   let dbobj=client.db('mydatabase')
// })
// .catch(()=>{
//   console.log("Error has occured ")
// })


const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect(myurl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("suri", userSchema)

//Routes
app.post("/login", (req, res)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message:true, user: user})
            } else {
                res.send({ message: false})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}) 

app.post("/register", (req, res)=> {
    const { name, email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) 

app.listen(port,() => {
    console.log("BE started at port",port)
})