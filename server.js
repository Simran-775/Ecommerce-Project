const express = require("express")
const bcrypt = require('bcrypt');
const app = express()
const port = 9000

const mongoose = require('mongoose')
const fs = require('fs')
app.use(express.json())

const cors = require("cors");
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const { v4: uuidv4 } = require('uuid');
var jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
require('dotenv').config()

function verifyToken(req, res, next) {
    try {
        const token = req.cookies.authToken;  // get cookie from client
        console.log("authToken from cookies:", token);

        if (token) { //check if authToken expired or not
            try
            {
                const decoded = jwt.verify(token,process.env.JWT_SKEY);
                req.utype = decoded.role; // attach role to request
                req.userId = decoded._id;
                return next()
            }
            catch(e)
            {
                return res.status(401).send({ success: 0, msg: "Invalid Token" })
            }
        }

        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken)
        {
            return res.status(401).send({ success: 0, msg: "No refresh Token Login again" })
        }
        try{
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SKEY)
            const newAuthToken = jwt.sign({id:decoded._id,role:decoded.role},process.env.JWT_SKEY,{ expiresIn: "1m"})
            res.cookie("authToken",token, {
                    httpOnly: true,
                    secure: false, // can be true when u deploy with https
                    sameSite: "lax",
                    maxAge: 1*60*1000,
                });
            req.utype = decoded.role; // attach role to request
            req.userId = decoded._id;
            next()

        }
        catch(e)
        {
            return res.status(401).send({ success: 0, msg: "Invalid Refresh Token" })
        }
}


function verifyadmin(req,res,next)
{
    if(req.utype==="admin")
    {
        next()
    }
    else{
        return res.status(401).send({success:-2})
    }
}
const transporter = nodemailer.createTransport(
    {
        host: "smtp.hostinger.com",
        port: 465,
        secure: true, // true for port 465, false for other ports
        auth: {
            user: `${process.env.SMTP_UNAME}`,
            pass: `${process.env.SMTP_PASS}`
        },
    }
)
const multer = require('multer')
const { flushSync } = require("react-dom")
const { resourceLimits } = require("worker_threads")

const mystorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/Uploads')
    },
    filename: function (req, file, cb) {
        const fname = Date.now() + file.originalname;
        cb(null, fname)
    }
})

const upload = multer({ storage: mystorage })

mongoose.connect('mongodb://127.0.0.1:27017/mydb')
    .then(() => console.log('mongodb connected successfully')).catch((e) => console.log("Unable to connect to mongodb" + e.message))

const registerSchema = mongoose.Schema({ name: String, phone: String, username: { unique: true, type: String }, password: String, usertype: String, actStatus: Boolean, token: String }, { versionKey: false })
const registerModel = mongoose.model("register", registerSchema, "register")
app.post("/api/register", async (req, res) => {
    try {
        const acttoken = uuidv4();
        const encryp_pass = bcrypt.hashSync(req.body.pass, 10);
        const newRecord = registerModel({ name: req.body.pname, phone: req.body.phone, username: req.body.uname, password: encryp_pass, usertype: "normal", actStatus: false, token: acttoken })
        const result = await newRecord.save();
        console.log(result)
        if (result) {
            const mailOptions = {
                from: 'class@gtbinstitute.com',//transporter username email
                to: req.body.uname,//any email id of admin or where you want to receive email
                replyTo: req.body.email,
                subject: 'Activation Mail Belle Multipurpose Website',
                html: `Dear ${req.body.pname}<br/><br/>
                    Thanks for signing up on our website. BUt you'll be needed to verify your account so please click on following link to activate your account:-<br/><br/>
                    <a href='http://localhost:3000/activateaccount?code=${acttoken}'>Activate<a/>`
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    res.send({ success: 2 });
                }
                else {
                    console.log('Email sent: ' + info.response);
                    res.send({ success: 1 });
                }
            })
        }
        else {
            res.send({ success: 0 })
        }
    }
    catch (e) {
        res.send({ success: -1 })
        console.log(e.message)
    }

})

app.post("/api/login", async (req, res) => {
    try {
        const result = await registerModel.findOne({ username: req.body.uname })
        if (result === null) {
            res.send({ success: 0 })
        }
        else {
            if (bcrypt.compareSync(req.body.pass, result.password)) {
                const token = jwt.sign({id:result._id, role:result.usertype},process.env.JWT_SKEY, {expiresIn:"1m"})
                const refreshToken = jwt.sign({id:result._id, role:result.usertype},process.env.JWT_REFRESH_SKEY, {expiresIn:"7d"})

                const respdata = { _id: result._id, name: result.name, username: result.username, usertype: result.usertype, actStatus: result.actStatus}
                res.cookie("authToken",token, {
                    httpOnly: true,
                    secure: false, // can be true when u deploy with https
                    sameSite: "lax",
                    maxAge: 1*60*1000,
                });
                res.cookie("refreshToken",refreshToken, {
                    httpOnly: true,
                    secure: false, // can be true when u deploy with https
                    sameSite: "lax",
                    maxAge: 7*24*60*60*1000,
                });
                 
                res.send({ success: 1, udata: respdata })
            }
            else {
                res.send({ success: 0 })
            }
        }
    }
    catch (e) {
        res.send({ success: -1 })
        console.log(e.message)
    }
})

app.put('/api/activateaccount', async (req, res) => {
    try {
        const result = await registerModel.updateOne({ token: req.body.code }, { actStatus: true })
        if (result) {
            res.send({ success: 1 })
        }
        else {
            res.send({ success: 0 })
        }
    }
    catch (e) {
        res.send({ success: -1 })
        console.log(e.message)
    }
})

app.put("/api/changepassword", verifyToken, async (req, res) => {
    try {
        const result = await registerModel.findOne({ username: req.body.uname })
        if (result === null) {
            res.send({ success: 0 })
        }
        else {
            if (bcrypt.compareSync(req.body.cpass, result.password)) {
                const encrypt_pass = bcrypt.hashSync(req.body.newpass, 10)
                const uptresult = await registerModel.updateOne({ username: req.body.uname }, { password: encrypt_pass })
                if(uptresult.modifiedCount===1)
                {
                    res.clearCookie("authToken")
                    res.clearCookie("refreshToken")
                }
                res.send({ success: 1 })
            }
            else {
                res.send({ success: 0 })
            }
        }
    }
    catch (e) {
        res.send({ success: -1 })
    }
})

app.get("/api/searchuser", async (req, res) => {
    try {
        const result = await registerModel.findOne({ username: req.query.em }).select("-password")
        if (result === null) {
            res.send({ success: 0 })
        }
        else {
            res.send({ success: 1, udata: result })
        }
    }
    catch (e) {
        res.send({ success: -1 })
        console.log(e.message)
    }
})
app.get("/api/listofusers",verifyToken, verifyadmin, async (req, res) => {
    try {
        const result = await registerModel.find()
        if (result === null) {
            res.send({ success: 0 })
        }
        else {
            res.send({ success: 1, udata: result })
        }
    }
    catch (e) {
        res.send({ success: -1 })
        console.log(e.message)
    }
})
app.delete("/api/deluser/:userid", async (req, res) => {
    try {
        const result = await registerModel.deleteOne({ _id: req.params.userid })

        if (result.deletedCount === 1) {
            res.send({ success: 1 })
        }
        else {
            res.send({ success: 0 })
        }
    }
    catch (e) {
        res.send({ success: -1 })
        console.log(e.message)
    }
})

const resetPassSchema = mongoose.Schema({ username: String, expTime: Date, token: String }, { versionKey: false })
const resetPassModel = mongoose.model("resetPass", resetPassSchema, "resetPass")
app.get("/api/forgotpassword", async (req, res) => {
    const passtoken = uuidv4();
    const currentDateUTC = new Date(); // Get the current date in UTC
    const ISTOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds (5 hours 30 minutes)
    const fifteenminsoffset = 15 * 60 * 1000;
    const expirytime = new Date(currentDateUTC.getTime() + ISTOffset + fifteenminsoffset); // Convert to IST

    try {
        const result = await registerModel.findOne({ username: req.query.un })
        if (result === null) {
            res.send({ success: 0 })
        }
        else {
            const newrecord = resetPassModel({ username: req.query.un, expTime: expirytime, token: passtoken })
            const result2 = await newrecord.save()
            if (result2) {
                const mailOptions = {
                    from: 'class@gtbinstitute.com',//transporter username email
                    to: req.query.un,//any email id of admin or where you want to receive email
                    subject: 'Reset Password Mail from Belle Multipurpose Website',
                    html: `Dear ${result.name}<br/><br/>
                    Click on the following link to reset your password :- br/><br/>
                    <a href='http://localhost:3000/resetpassword?code=${passtoken}'> Reset Password <a/>`
                }

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                        res.send({ success: 2 });
                    }
                    else {
                        console.log('Email sent: ' + info.response);
                        res.send({ success: 1 });
                    }
                })

            }
            else {
                res.send({ success: 0 })
            }
        }
    }
    catch (e) {
        res.send({ success: -1 })
        console.log(e.message)
    }
})

app.get('/api/checktoken',async(req,res)=>
{
    const currentDateUTC = new Date(); // Get the current date in UTC
    const ISTOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds (5 hours 30 minutes)
    const currTime = new Date(currentDateUTC.getTime() + ISTOffset); // Convert to IST
    try{
        const result = await resetPassModel.findOne({token:req.query.token})
        if(result===null)
        {
            res.send({ success: 0 })
        }
        else{
            if(currTime<=result.expTime)
            {
                res.send({ success: 1 })
            }
            else{
                res.send({ success: 0})
            }
        }
    }
    catch(e)
    {
        res.send({ success: -1 })
        console.log(e.message)
    }
})

app.put('/api/resetpassword',async(req,res)=>
{
    try{
        const result = await resetPassModel.findOne({token:req.body.token})
        if(result===null)
        {
            res.send({ success: 0 })
        }
        else{
            const encrypt_pass = bcrypt.hashSync(req.body.newpass, 10)
            const uptresult = await registerModel.updateOne({ username: result.username }, { password: encrypt_pass })
            if(uptresult.modifiedCount===1)
            {
                res.send({ success: 1 })
            }
            else
            {
                res.send({ success: 0 })
            }
        }
    }
    catch(e)
    {
        res.send({ success: -1 })
        console.log(e.message)
    }
})
//category apis
const CategorySchema = mongoose.Schema({ catname: String, picname: String }, { versionKey: false });
const categoryModel = mongoose.model("category", CategorySchema, "category")
app.post('/api/savecategory', upload.single('pic'), async (req, res, next) => {
    try {
        var imagename = "defaultpic.png";
        if (req.file) {
            imagename = req.file.filename;
        }
        const newrecord = categoryModel({ catname: req.body.catname, picname: imagename })
        const result = await newrecord.save();
        if (result) {
            res.send({ success: 1 })
        }
        else {
            res.send({ success: 0 })
        }
    }
    catch (e) {
        res.send({ success: -1 })
        console.log(e.message)
    }
})


app.get("/api/getallcat", async (req, res) => {
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

app.delete("/api/delcategory/:userid", async (req, res) => {
    try {
        const result = await categoryModel.deleteOne({ _id: req.params.userid })

        if (result.deletedCount === 1) {
            res.send({ success: 1 })
        }
        else {
            res.send({ success: 0 })
        }
    }
    catch (e) {
        res.send({ success: -1 })
        console.log(e.message)
    }
})

app.put('/api/updatecategory', upload.single('pic'), async (req, res) => {
    try {
        var imagename;
        if (req.file) {
            imagename = req.file.filename;
            if (req.body.oldpicname !== "defaultpic.png") {
                fs.unlinkSync(`${req.file.destination}/${req.body.oldpicname}`)
            }
        }
        else {
            imagename = req.body.oldpicname;
        }

        const result = await categoryModel.updateOne({ _id: req.body.cid }, { catname: req.body.catname, picname: imagename })

        if (result) {
            res.send({ success: 1 })
        }
        else {
            res.send({ success: 0 })
        }
    }
    catch (e) {
        res.send({ success: -1 })
        console.log(e.message)
    }
})

// sub category api
const SubCatSchema = mongoose.Schema({ catid: { type: mongoose.Schema.Types.ObjectId, ref: 'category' }, subcatname: String, picname: String }, { versionKey: false });
const SubCatModel = mongoose.model("subCategory", SubCatSchema, "subCategory")
app.post('/api/savesubcategory', upload.single('pic'), async (req, res, next) => {
    try {
        var imagename = "defaultpic.png";
        if (req.file) {
            imagename = req.file.filename;
        }
        const newrecord = SubCatModel({ catid: req.body.cid, subcatname: req.body.subcatname, picname: imagename })
        const result = await newrecord.save();
        if (result) {
            res.send({ success: 1 })
        }
        else {
            res.send({ success: 0 })
        }
    }
    catch (e) {
        res.send({ success: -1 })
        console.log(e.message)
    }
})

app.get("/api/getsubcatbycat", async (req, res) => {
    try {
        const result = await SubCatModel.find({ catid: req.query.cid }).populate("catid")
        if (result.length === 0) {
            res.send({ success: 0 })
        }
        else {
            res.send({ success: 1, scatdata: result })
        }
    }
    catch (e) {
        res.send({ success: -1 })
        console.log(e.message)
    }
})

//product api
const ProductSchema = mongoose.Schema({ catid: { type: mongoose.Schema.Types.ObjectId, ref: 'category' }, subcatid: { type: mongoose.Schema.Types.ObjectId, ref: 'subCategory' }, prodname: String, rate: Number, discount: Number, stock: Number, featured: String, description: String, picname: String, addedon: Date }, { versionKey: false })
const ProductModel = mongoose.model('product', ProductSchema, 'product')
app.post('/api/saveproduct', upload.single('pic'), async (req, res) => {
    try {
        var imagename = "defaultpic.png";
        if (req.file) {
            imagename = req.file.filename;
        }

        const currentDateUTC = new Date(); // Get the current date in UTC
        const ISTOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds (5 hours 30 minutes)
        const currentDateIST = new Date(currentDateUTC.getTime() + ISTOffset); // Convert to IST

        const newrecord = ProductModel({ catid: req.body.cid, subcatid: req.body.scid, prodname: req.body.pname, rate: req.body.rate, discount: req.body.disc, stock: req.body.stock, featured: req.body.feat, description: req.body.description, picname: imagename, addedon: currentDateIST })
        const result = await newrecord.save();
        if (result) {
            res.send({ success: 1 })
        }
        else {
            res.send({ success: 0 })
        }
    }
    catch (e) {
        res.send({ success: -1 })
        console.log(e.message)
    }
})

app.get("/api/getprodsbycat", async (req, res) => {
    try {
        const result = await ProductModel.find({ catid: req.query.cid })
        if (result.length === 0) {
            res.send({ success: 0 })
        }
        else {
            res.send({ success: 1, pdata: result })
        }
    }
    catch (e) {
        res.send({ success: -1 })
        console.log(e.message)
    }
})

app.get("/api/getprodsbysubcat", async (req, res) => {
    try {
        const result = await ProductModel.find({ subcatid: req.query.scid }).populate("catid").populate("subcatid")
        if (result.length === 0) {
            res.send({ success: 0 })
        }
        else {
            res.send({ success: 1, pdata: result })
        }
    }
    catch (e) {
        res.send({ success: -1 })
        console.log(e.message)
    }
})

app.delete("/api/delprod/:userid", async (req, res) => {
    try {
        const result = await ProductModel.deleteOne({ _id: req.params.userid })
        if (result.deletedCount === 1) {
            res.send({ success: 1 })
        }
        else {
            res.send({ success: 0 })
        }
    }
    catch (e) {
        res.send({ success: -1 })
        console.log(e.message)
    }
})

app.put('/api/updateproduct', upload.single('pic'), async (req, res) => {
    try {
        var imagename;
        if (req.file) {
            imagename = req.file.filename;
            if (req.body.oldpicname !== "defaultpic.png") {
                fs.unlinkSync(`${req.file.destination}/${req.body.oldpicname}`)
            }
        }
        else {
            imagename = req.body.oldpicname;
        }

        const result = await ProductModel.updateOne({ _id: req.body.pid }, { catid: req.body.catid, prodname: req.body.prodname, rate: req.body.rate, discount: req.body.discount, stock: req.body.stock, featured: req.body.featured, description: req.body.description, picname: imagename })

        if (result) {
            res.send({ success: 1 })
        }
        else {
            res.send({ success: 0 })
        }
    }
    catch (e) {
        res.send({ success: -1 })
        console.log(e.message)
    }
})

app.get("/api/getproddetailsbyid", async (req, res) => {
    try {
        const result = await ProductModel.findOne({ _id: req.query.prodid })
        if (result === null) {
            res.send({ success: 0 })
        }
        else {
            res.send({ success: 1, pdata: result })
        }
    }
    catch (e) {
        res.send({ success: -1 })
        console.log(e.message)
    }
})

app.get("/api/searchproducts", async (req, res) => {
    try {
        const result = await ProductModel.find({ prodname: { $regex: '.*' + req.query.q, $options: 'i' } })
        if (result.length > 0) {
            res.send({ success: 1, pdata: result })
        }
        else {
            res.send({ success: 0 })
        }
    }
    catch (e) {
        res.send({ success: -1 })
        console.log(e.message)
    }

})

app.get("/api/getlatestprods", async (req, res) => {
    try {
        const result = await ProductModel.find().sort({ "addedon": -1 }).limit(8

        )
        if (result.length > 0) {
            res.send({ success: 1, pdata: result })
        }
        else {
            res.send({ success: 0 })
        }
    }
    catch (e) {
        res.send({ success: -1 })
        console.log(e.message)
    }

})

app.get("/api/getfeaturedprods", async (req, res) => {
    try {
        const result = await ProductModel.find({ "featured": "Yes" }).sort({ "addedon": -1 }).limit(8)
        if (result.length === 0) {
            res.send({ success: 0 })
        }
        else {
            res.send({ success: 1, pdata: result })
        }
    }
    catch (e) {
        res.send({ success: -1 })
        console.log(e.message)
    }
})

//cart api
const CartSchema = mongoose.Schema({ pid: String, pname: String, rate: Number, qty: Number, totalcost: Number, picname: String, username: String }, { versionKey: false })
const CartModel = mongoose.model("cart", CartSchema, "cart")
app.post("/api/savetocart", async (req, res) => {
    try {
        const newrecord = CartModel({ pid: req.body.pid, pname: req.body.prodname, rate: req.body.remcost, qty: req.body.qty, totalcost: req.body.tc, picname: req.body.picname, username: req.body.uname })
        const result = await newrecord.save()
        if (result) {
            res.send({ success: 1 })
        }
        else {
            res.send({ success: 0 })
        }
    }
    catch (e) {
        res.send({ success: -1 })
        console.log(e.message)
    }
})

app.get("/api/getcart", async (req, res) => {
    try {
        const result = await CartModel.find({ username: req.query.uname })
        if (result.lenght === 0) {
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

app.delete("/api/delfromcart/:prodid", async (req, res) => {
    try {
        const result = await CartModel.deleteOne({ _id: req.params.prodid })
        if (result.deletedCount === 1) {
            res.send({ success: 1 })
        }
        else {
            res.send({ success: 0 })
        }
    }
    catch (e) {
        res.send({ success: -1 })
        console.log(e.message)
    }
})

// order apis

const OrderSchema = mongoose.Schema({ address: String, pmode: String, carddetails: Object, username: String, billamt: Number, orderItems: [Object], status: String, orderDate: Date }, { versionKey: false })
const OrderModel = mongoose.model("finalorder", OrderSchema, "finalorder")
app.post("/api/saveorder", async (req, res) => {
    try {

        const items = await CartModel.find({ username: req.body.uname })
        const currentDateUTC = new Date(); // Get the current date in UTC
        const ISTOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds (5 hours 30 minutes)
        const currentDateIST = new Date(currentDateUTC.getTime() + ISTOffset); // Convert to IST
        const newrecord = OrderModel({ address: req.body.addr, pmode: req.body.pmode, carddetails: req.body.cardetails, username: req.body.uname, billamt: req.body.billamt, orderItems: items, status: "Order Confirmed", orderDate: currentDateIST })
        const result = await newrecord.save()
        if (result) {
            for (var x = 0; x < items.length; x++) {
                const updateresult = await ProductModel.updateOne({ _id: items[x].pid }, { $inc: { "stock": -items[x].qty } })
            }
            const delresult = await CartModel.deleteMany({ username: req.body.uname })
            res.send({ success: 1 })
        }
        else {
            res.send({ success: 0 })
        }
    }
    catch (e) {
        res.send({ success: -1 })
        console.log(e.message)
    }
})

app.get("/api/getorderdetails", async (req, res) => {
    try {
        const result = await OrderModel.findOne({ username: req.query.un }).sort({ "orderDate": -1 })
        if (result) {
            res.send({ success: 1, odata: result })

        }
        else {
            res.send({ success: 0 })
        }
    }
    catch (e) {
        res.send({ success: -1 })
        console.log(e.message)
    }
})

app.get("/api/getallorders", async (req, res) => {
    try {
        const result = await OrderModel.find().sort({ "orderDate": -1 })
        if (result.length > 0) {
            res.send({ success: 1, odata: result })

        }
        else {
            res.send({ success: 0 })
        }
    }
    catch (e) {
        res.send({ success: -1 })
        console.log(e.message)
    }
})

app.get("/api/getordersbydate", async (req, res) => {
    try {
        const inputDate = req.query.odate;
        const paymode = req.query.pmode;
        var result = ""
        const startOfDay = new Date(`${inputDate}T00:00:00.000Z`);
        const endOfDay = new Date(`${inputDate}T23:59:59.999Z`);

        if (paymode === undefined) {
            result = await OrderModel.find({ orderDate: { $gte: startOfDay, $lte: endOfDay } }).sort({ "orderDate": -1 })
        }
        else {
            result = await OrderModel.find({ orderDate: { $gte: startOfDay, $lte: endOfDay }, pmode: paymode }).sort({ "orderDate": -1 })
        }

        if (result.length > 0) {
            res.send({ success: 1, odata: result })

        }
        else {
            res.send({ success: 0 })
        }
    }
    catch (e) {
        res.send({ success: -1 })
        console.log(e.message)
    }
})

app.get("/api/fetchorderitems", async (req, res) => {
    try {
        const result = await OrderModel.findOne({ _id: req.query.oid })
        if (result) {
            res.send({ success: 1, items: result.orderItems })
        }
        else {
            res.send({ success: 0 })
        }
    }
    catch (e) {
        res.send({ success: -1 })
        console.log(e.message)
    }
})

app.put("/api/updatestatus", async (req, res) => {
    try {
        const result = await OrderModel.updateOne({ _id: req.body.orderid }, { status: req.body.newstatus })
        if (result.modifiedCount === 1) {
            res.send({ success: 1 })
        }
        else {
            res.send({ success: 0 })
        }
    }
    catch (e) {
        res.send({ success: -1 })
    }
})

app.post("/api/contactus", async (req, res) => {
    try {
        const mailOptions = {
            from: 'class@gtbinstitute.com',//transporter username email
            to: 'hello.simran05@gmail.com',//any email id of admin or where you want to receive email
            replyTo: req.body.email,
            subject: 'Message from Website - Contact Us Page ',
            html: `This is the query you have received from an user<br/>
        The details of the user are given as:-<b>Name:-</b> ${req.body.name}<br/><b>Phone:-</b> ${req.body.phone}<br/><b>Email:-</b> ${req.body.email}
        <br/><b>Message is :- </b><br/> ${req.body.msg}`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.send({ success: 0 });
            }
            else {
                console.log('Email sent: ' + info.response);
                res.send({ success: 1 });
            }
        })
    }
    catch (e) {
        res.send({ success: -1 })
        console.log(e.message)
    }
})

app.listen(port, () => {
    console.log('server running from port 9000')
})