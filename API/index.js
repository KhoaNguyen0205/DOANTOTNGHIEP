const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer')
const bcrypt = require('bcryptjs')  
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser'); 
const Product = require('./models/Product');
const { default: mongoose } = require('mongoose');
const User = require('./models/User')


const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'ngockhoangockhoangockhoa'; 

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

mongoose.connect('mongodb+srv://ngockhoa2k2:70Vtta9W5p87avDp@cluster0.nthbrkn.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('Connect with MongoDB is success')
    app.listen(3000, ()=> {
        console.log('NODEJS API is running on port 4000')
    });
}).catch((error) => {
    console.log(error)
})

function getUserDataFromReq(req){
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if(err) throw err;
            resolve(userData);
         });
    });
};


app.post('/register', async(req,res) => {
    const {name,email,password,dob,sex} = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(409).json({ error: 'Email is already in use' });
    }
    try {
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt),
            dob,
            sex,
        });
        res.json(userDoc);
    } catch (error) {
        console.log(error.message);
        res.status(200).json({message: error.message})
    }
});

app.post('/login' , async (req , res) => { 
    const {email,password} = req.body; 
    const userDoc = await User.findOne({email});
    if(userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if(passOk) {
          jwt.sign({
              email:userDoc.email, 
              id:userDoc._id, 
              name: userDoc.name
          }, jwtSecret,{},(err,token) => {
              if(err) throw err;
              res.cookie('token', token).json(userDoc);
          });
      }else{    
          res.status(422).json('pass not ok');
      }
    }else{
      res.json('not found');
    }
  });

app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    if(token) { 
        console.log(token, "token")
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if(err) throw err;
           const {name,email,_id} = await User.findById(userData.id);
            res.json({name,email,_id});
        });
    }else {
        res.json(null);
    }
});

app.post('/product', async (req,res)=> {
    const {brand,name,images,description,price,quantity} = req.body;
   try {
    const productDoc = await Product.create({
        brand,name,images,description,price,quantity,
    }); 
    res.json(productDoc);
   } catch (error) {
    console.log(error.message);
        res.status(200).json({message: error.message})
   };   
})

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'Images-Sneaker/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post('/api/product', upload.array('images', 3), async (req, res) => {
    const { brand, name, description, price, quantity } = req.body;
    const imagePaths = [];

    if (req.files) {
        req.files.forEach((file) => {
            imagePaths.push(file.path);
        });
    }

    const newProduct = new Product({
        brand: brand,
        name: name,
        description: description,
        price: price,
        quantity: quantity,
        imagePaths: imagePaths,
    });

    try {
        await newProduct.save();
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong on the server' });
    }
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
 });
 

app.get('/test', (req,res) =>{
    res.json('test ok!!')
});

app.listen(4000);
//"70Vtta9W5p87avDp"