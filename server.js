const express = require("express")
const app = express()
const port = 9000
var cors = require('cors')
const mongoose = require('mongoose')

app.use(express.json())
app.use(cors())

const multer = require('multer')

const mystorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/Uploads')
  },
  filename: function (req, file, cb) 
  {
    const fname = Date.now() + file.originalname;
    cb(null, fname)
  }
})

const upload = multer({ storage:mystorage})

mongoose.connect('mongodb://127.0.0.1:27017/mydb')
.then(()=>console.log('mongodb connected successfully')).catch((e)=>console.log("Unable to connect to mongodb"+e.message))

const registerSchema = mongoose.Schema({name:String,phone:String,username:{unique:true,type:String},password:String},{versionKey:false})
const registerModel = mongoose.model("register",registerSchema,"register")
app.post("/api/register",async(req,res)=>{
    const newRecord = registerModel({name:req.body.pname,phone:req.body.phone,username:req.body.uname,password:req.body.pass})
    const result = await newRecord.save();
    console.log(result)
    if(result)
    {
        res.send({success:true})
    }
    else{
        res.send({success:false})
    }
})

app.get("/api/searchuser",async(req,res)=>{
    try{
    const result = await registerModel.findOne({username:req.query.em})
    if(result===null)
    {
        res.send({success:0})
    }
    else{
        res.send({success:1,udata:result})
    }
    }
    catch(e){
        res.send({success:-1})
        console.log(e.message)
    }
})
app.get("/api/listofusers",async(req,res)=>{
    try{
    const result = await registerModel.find()
    if(result===null)
    {
        res.send({success:0})
    }
    else{
        res.send({success:1,udata:result})
    }
    }
    catch(e){
        res.send({success:-1})
        console.log(e.message)
    }
})
app.delete("/api/deluser/:userid",async(req,res)=>{
    try{
    const result = await registerModel.deleteOne({_id:req.params.userid})

    if(result.deletedCount===1)
    {
        res.send({success:1})
    }
    else{
        res.send({success:0})
    }
    }
    catch(e){
        res.send({success:-1})
        console.log(e.message)
    }
})

//category apis
const CategorySchema = mongoose.Schema({catname:String,picname:String},{versionKey:false});
const categoryModel = mongoose.model("category",CategorySchema,"category")
app.post('/api/savecategory', upload.single('pic'), async(req, res, next) => {
  try{
    var imagename = "defaultpic.png";
    if(req.file)
    {
        imagename = req.file.filename;
    }
    const newrecord = categoryModel({catname:req.body.catname,picname:imagename})
    const result = await newrecord.save();
    if(result)
    {
        res.send({success:1})
    }
    else{
        res.send({success:0})
    }
  }
  catch(e)
  {
    res.send({success:-1})
    console.log(e.message)
  }
})


app.get("/api/getallcat", async(req, res) => {
    try {
        const result = await categoryModel.find()
        if (result.length === 0) {
            res.send({ success: 0 })
        }
        else {
            res.send({ success: 1, cdata: result })
        }
    }
    catch (e) {
        res.send({ success: -1 })
        console.log(e.message)
    }
})

//product api
const ProductSchema = mongoose.Schema({catid:String,prodname:String,rate:Number,discount:Number,stock:Number,featured:String,description:String,picname:String,addedon:Date},{versionKey:false})
const ProductModel = mongoose.model('product',ProductSchema,'product')
app.post('/api/saveproduct', upload.single('pic'), async(req, res) => {
  try{
    var imagename = "defaultpic.png";
    if(req.file)
    {
        imagename = req.file.filename;
    }
    const newrecord = ProductModel({catid:req.body.cid,prodname:req.body.pname,rate:req.body.rate,discount:req.body.disc,stock:req.body.stock,featured:req.body.feat,description:req.body.description,picname:imagename,addedon:new Date()})
    const result = await newrecord.save();
    if(result)
    {
        res.send({success:1})
    }
    else{
        res.send({success:0})
    }
  }
  catch(e)
  {
    res.send({success:-1})
    console.log(e.message)
  }
})
app.listen(port,()=>{
    console.log('server running from port 9000')
})