const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const Product = require('./models/Product');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const Favorite = require('./models/Favorite');
const Cart = require('./models/Cart');
const Voucher = require('./models/Voucher');
const Order = require('./models/Order');
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

const nodemailer = require('nodemailer');

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'ngockhoangockhoangockhoa';



app.use(express.json());
app.use(cookieParser());
app.use('/Images-Sneaker', express.static(__dirname + '/Images-Sneaker'));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

mongoose.connect('mongodb+srv://ngockhoa2k2:70Vtta9W5p87avDp@cluster0.nthbrkn.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connect with MongoDB is success')
        app.listen(3000, () => {
            console.log('NODEJS API is running on port 4000')
        });
    }).catch((error) => {
        console.log(error)
    })

//create and manage account customer
function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        });
    });
};

app.post('/register', async (req, res) => {
    const { name, email, password, dob, gender } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(409).json({ error: 'Email is already in use' });
    }
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
            dob,
            gender,
        });
        res.json(userDoc);
    } catch (error) {
        console.log(error.message);
        res.status(200).json({ message: error.message })
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id,
                name: userDoc.name
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            });
        } else {
            res.status(422).json('pass not ok');
        }
    } else {
        res.json('not found');
    }
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        console.log(token, "token")
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, _id } = await User.findById(userData.id);
            res.json({ name, email, _id });
        });
    } else {
        res.json(null);
    }
});
//



app.post('/add-to-favorite', async (req, res) => {
    const { productId } = req.body;
    const existingProduct = await Favorite.findOne({ productId });
    if (existingProduct) {
        return res.status(409).json({ error: ' This product had on yor Favorite' });
    }
    try {
        const userData = await getUserDataFromReq(req);
        const FavoriteItem = new Favorite({
            user: userData.id,
            productId,
        });
        await FavoriteItem.save();

        return res.status(201).json({ success: true, message: 'Product added to Favorite' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/add-voucher', async(req,res) => {
        const {title, valueVoucher, status, description} = req.body;
        
        try {
            const newVoucher = new Voucher({
                title: title,
                valueVoucher: valueVoucher,
                status: status,
                description: description,
            });
            await newVoucher.save();
            return res.status(201).json({ success: true});
        } catch (error) {
            console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
        }
})
app.get('/api/voucher', async (req, res) => {
    res.json(await Voucher.find())
})


app.post ('/api/order', async(req,res) => {
    const userData = await getUserDataFromReq(req);
    const {id} = req.params;
    const {productId, quantity,size,addVoucher,totalPrice,address,nameOfCus,PhNb,paymentMethod} = req.body;

    try {

        const newOrder = new Order ({
            user: userData.id,
            productId, quantity,size,addVoucher,totalPrice, address, nameOfCus,PhNb, 
            paymentMethod, approve:false,adminCheck:false, success:false,cancled:false
        });
        await newOrder.save();

        eventEmitter.emit('orderSuccess', {
            productId: productId,
            quantity: quantity
        });

        return res.status(201).json({ success: true});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


app.put('/order/:id', (req,res) => {
    const {id} = req.params;
    const {approve,success,cancled} = req.body;
    Order.findByIdAndUpdate(id, {approve,success,cancled} , {new: true})
        .then(newOrder => {
            res.json(newOrder)
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('sothing wrong on server')
        })
})



app.post('/api/add/:id/to-cart', async (req, res) => {
    const userData = await getUserDataFromReq(req);
    const quantity = req.body.quantity;
    const size = req.body.size;
    const DataID = req.params.id;

    try {
        const existingCartItem = await Cart.findOne({
            user: userData.id,
            productId: DataID,
        })
        if (existingCartItem) {
            existingCartItem.quantity += parseInt(quantity);
            await existingCartItem.save();
            res.json(existingCartItem)
        } else {                                    
            const newCartDoc = await Cart.create({
                user: userData.id,
                productId: DataID,
                quantity,
                size,
            })
            res.json(newCartDoc);
        }
    } catch (error) {   
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get('/api/cart/:id', async(req, res) => {
    const {id} = req.params;
    res.json(await Cart.findById(id));
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
    const { brand, name, description, price, quantity, gender, category } = req.body;
    const imagePaths = [];

    if (req.files) {
        req.files.forEach((file) => {
            imagePaths.push(file.path);
        });
    }
    const newProduct = new Product({
        brand: brand,
        gender: gender,
        category: category,
        name: name,
        description: description,
        price: price,
        quantity: quantity,
        imagePaths: imagePaths,
    });

    try {
        await newProduct.save();
        res.json({ success: true, imagePaths: imagePaths });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong on the server' });
    }
});

eventEmitter.on('orderSuccess', async(orderData) => {
    try {
        const product = await Product.findById(orderData.productId);
        product.quantity -= orderData.quantity;

        await product.save();
    } catch (error) {
        console.log('Error')
    }
})

app.get('/api/product', async (req, res) => {
    res.json(await Product.find());
})

app.get('/api/product/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Product.findById(id))
})

app.get('/user-favorite', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Favorite.find({ user: id }))
    });
});

app.get('/user-cart', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Cart.find({ user: id }))
    });
});

app.get('/api/order', async ( req,res) => {
    res.json(await Order.find());
})

app.get('/user-order', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Order.find({ user: id }))
    });
});

app.get('/api/user', async (req,res) => {
    res.json(await User.find());
})




app.get('/test', (req, res) => {
    res.json('test ok!!!!!')
});

app.listen(4000);
//"70Vtta9W5p87avDp"