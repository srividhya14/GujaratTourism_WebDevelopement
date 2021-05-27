const express=require("express");
const bodyParser=require("body-parser");
var app=express();

const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/userDB",{ useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended:true}));

const userSchema=new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    mobile:Number
   
   });

const User=mongoose.model("User",userSchema);

app.get("/",function(req,res){
   res.sendFile(__dirname+"/signup.html");
});

app.get("/fail",function(req,res){
    res.sendFile(__dirname+"/unsucess.html");
 });

app.get("/login",function(req,res){
    res.sendFile(__dirname+"/login.html");
 });
 
app.use("/", express.static(__dirname + "/"));
app.post("/",function(req,res){
    console.log("Welcome");
    const uname=req.body.username;
    const pw=req.body.pwd;
    const em=req.body.email;
    const mo=req.body.mobile;

    const newuser=new User({
      
    username:uname,
    password:pw,
    email:em,
    mobile:mo

    }); 

  
  
  User.insertMany([newuser],function(err){
     if(err)
     {
         console.log(err);
     }
     else
     {
      res.redirect('http://localhost:3000/login');
     }
  });
  


});

app.post("/login",function(req,res){
    console.log("Welcome to Login Page");
    const uname=req.body.username;
    const pw=req.body.pwd;
    
    User.find({$and:[{ username:uname, password:pw}]}, function (err,doc) {
        if (doc.length==0||err){
            /*res.send("Login Unsuccessfull!!Sign Up First!");*/
            res.redirect('http://localhost:3000/fail');
        }
        else{
           res.redirect("ticket.html");
        }
    });
  


});

app.post("/fail",function(req,res){
    console.log("Welcome");
    const uname=req.body.username;
    const pw=req.body.pwd;
    const em=req.body.email;
    const mo=req.body.mobile;

    const newuser=new User({
      
    username:uname,
    password:pw,
    email:em,
    mobile:mo

    }); 

  
  
  User.insertMany([newuser],function(err){
     if(err)
     {
         console.log(err);
     }
     else
     {
        res.send("You signed up Successfully");
     }
  });
  


});



app.listen(3000,function(req,res){
   console.log("Server is listening on port 3000");
});
