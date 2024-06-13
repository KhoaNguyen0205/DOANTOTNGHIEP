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
const cron = require('node-cron');
const Chat = require('./models/Chat');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Comment = require('./models/Comments.jsx')
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'ngockhoangockhoangockhoa';



app.use(express.json());
app.use(cookieParser());
app.use('/Images-Sneaker', express.static(__dirname + '/Images-Sneaker'));
app.use('/Images-Comments', express.static(__dirname + '/Images-Comments'));

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

io.on('connection', (socket) => {
    console.log('A clinet connected');

    socket.on('confirmed', (orderId) => {
        Order.findById(orderId)
            .then((order) => {
                if (order.confirmed) {
                    io.emit('newOrder', {
                        message: 'Admin, Bạn có đơn hàng cần xác nhận',
                    });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    });
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

//---forgot password---//
app.post('/api/forgot-pass', async (req, res) => {
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ error: 'Email does not exist' });
        }

        sendForgotPassEmail(existingUser.email, existingUser._id);
        return res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

function sendForgotPassEmail(customerEmail, customerId) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ad.ksneaker2502@gmail.com',
            pass: 'abacvfcpsiqialfy'
        }
    });
    const mailOptions = {
        from: 'Admin K-sneaker',
        to: customerEmail,
        subject: 'CẢNH BÁO BẢO MẬT!!',
        html: `<p>Xin chào ${customerEmail}</p>.
            <p>Chúng tôi nhận được yêu cầu lấy lại mật khẩu cho tài khoản ${customerEmail}</p>.
            <p>Vui lòng xác nhận nếu là bạn. Hãy nhấn vào link bên dưới </p>.
            <a href="http://localhost:5173/reset-pass/${customerId}">Đặt lại mật khẩu</a>
            <h3>Lưu ý: Nếu bạn không yêu cầu đặt lại mật khẩu. Hãy bỏ qua Email này. Xin cảm ơn </h3>.`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response)
        }
    });
}

app.get('/api/user/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await User.findById(id));
})

app.put('/api/user/:id', async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    const userDoc = await User.findById(id);

    console.table(userDoc.email)
    userDoc.set({
        password: bcrypt.hashSync(password, bcryptSalt),
    });
    await userDoc.save();
    res.json('success')
})

//---end forgot pass--////


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

app.get('/user-favorite', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        if(!id){
            return;
        }else{
            res.json(await Favorite.find({ user: id }))   
        }
    });
});

app.post('/api/add-voucher', async (req, res) => {
    const { title, valueVoucher, status, description } = req.body;

    try {
        const newVoucher = new Voucher({
            title: title,
            valueVoucher: valueVoucher,
            status: status,
            description: description,
        });
        await newVoucher.save();
        return res.status(201).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
app.get('/api/voucher', async (req, res) => {
    res.json(await Voucher.find())
})

app.post('/api/order', async (req, res) => {
    const userData = await getUserDataFromReq(req);
    const { id } = req.params;
    const { productId, quantity, size, addVoucher, totalPrice, address, nameOfCus, PhNb, paymentMethod } = req.body;

    try {
        const newOrder = new Order({
            user: userData.id,
            productId, quantity, size, addVoucher, totalPrice, address, nameOfCus, PhNb,
            paymentMethod, approve: false, adminCheck: false, success: false, canceled: false,
            confirmed: false,
        });
        const savedOrder = await newOrder.save();

        sendConfirmationEmail(nameOfCus, userData.email, productId, savedOrder._id);

        return res.status(201).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


function sendConfirmationEmail(customerName, customerEmail, productId, newOrderID) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ad.ksneaker2502@gmail.com',
            pass: 'abacvfcpsiqialfy'
        }
    });
    const mailOptions = {
        from: 'admin K-Sneakers',
        to: customerEmail,
        subject: 'XÁC NHẬN ĐƠN HÀNG',
        html: `<p>Xin chào ${customerName},</p>
               <p>Cảm ơn bạn đã đặt hàng trên K-Sneaker. Hãy nhấp vào đường link sau để xác nhận đơn hàng:</p>
               <a href="http://localhost:5173/confirm-order/${newOrderID}">Xác nhận đơn hàng</a>
               <h3>Lưu ý: Văn bản xác thực chỉ có hiệu lực trong 1h. Cảm ơn quý khách</h3>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

eventEmitter.once('orderSuccess', async (orderData) => {
    try {

        const product = await Product.findById(orderData.productId);

        if (product) {
            console.log('Product quantity before:', product.quantity);

            if (orderData.confirmed) {
                product.quantity -= orderData.quantity;
                await product.save();
                console.log('Product quantity after confirmation:', product.quantity);
            } else {
                console.log('Order not confirmed. No quantity change.');
            }
        } else {
            console.log('Product not found.');
        }
    } catch (error) {
        console.log('Error processing order success event:', error);
    }
});

app.get('/api/confirm-order/:newOrderID', async (req, res) => {
    const { newOrderID } = req.params;

    try {
        const order = await Order.findOneAndUpdate(
            { _id: newOrderID, confirmed: false },
            { $set: { confirmed: true } },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ error: 'Order not found or already confirmed.' });
        }

        const productId = order.productId;
        eventEmitter.emit('orderSuccess', {
            productId: productId,
            quantity: order.quantity,
            confirmed: order.confirmed,
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

cron.schedule('*/1 * * * *', async () => { // Chạy mỗi phút
    try {
        const oneMinuteAgo = new Date(Date.now() - 60 * 1000); // 1 phút trước
        // const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000); // 1 tiếng trước
        const deletedOrders = await Order.find({ confirmed: false, createdAt: { $lt: oneMinuteAgo } }); // Sử dụng find thay vì deleteMany

        for (const order of deletedOrders) {
            console.log('Deleting unconfirmed order:', order._id);
            const user = await User.findById(order.user);
            if (user) {
                console.log('User found:', user);
                sendMailNoticeDeleteOrder(user.name, user.email)
            } else {
                console.log('User not found');
            }
            // Tiến hành xóa đơn hàng
            await Order.deleteOne({ _id: order._id });
        }

        console.log('Unconfirmed orders older than 1 minute processed successfully.');
    } catch (error) {
        console.error('Error processing unconfirmed orders:', error);
    }
});


function sendMailNoticeDeleteOrder(customerName, customerEmail) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ad.ksneaker2502@gmail.com',
            pass: 'abacvfcpsiqialfy'
        }
    });
    const mailOptions = {
        from: 'admin K-Sneakers',
        to: customerEmail,
        subject: 'THÔNG BÁO HUỶ ĐƠN HÀNG',
        html: `<p>Xin chào ${customerName},</p>
               <p>Cảm ơn bạn đã lựa chọn K-Sneaker:</p>
               <p>Hệ thống đã huỷ đơn hàng của bạn vì bạn chưa xác nhận đặt hàng trong vòng 1 tiếng.</p>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}




app.put('/order/:id', async (req, res) => {
    const { id } = req.params;
    const { approve, adminCheck, success, canceled } = req.body;
    try {
        const newOrder = await Order.findByIdAndUpdate(id, { approve, adminCheck, success, canceled }, { new: true });
        if (!newOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(newOrder);
        
        const productId = newOrder.productId;
        eventEmitter.emit('orderDelete', {
            productId: productId,
            quantity: newOrder.quantity,
            canceled: newOrder.canceled
        });

        // In thông tin của đơn hàng vừa thay đổi
        console.log('Thông tin của đơn hàng vừa thay đổi:');
        console.log(newOrder);
        console.log(newOrder.quantity)
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong on the server');
    }
});

eventEmitter.on('orderDelete', async (orderData) => {
    try {
        const product = await Product.findById(orderData.productId);
        if (!product) {
            return console.log('Product not found.');
        }
        
        if (orderData.canceled) {
            product.quantity += orderData.quantity;
            await product.save();
            console.log('Product quantity after cancellation:', product.quantity);
        } else {
            console.log('Order not canceled. No quantity change.');
            console.log(product);
        }
    } catch (error) {
        console.log('Error processing order cancellation event:', error);
    }
});

app.put('/api/inventory/product/:id', (req, res) => {
    const { id } = req.params;
    const { iventory } = req.body;
    Product.findByIdAndUpdate(id, { iventory }, { new: true })
        .then(inventoryCheck => {
            res.json(inventoryCheck)
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Something wrong on server')
        })
})

//--Notification--//

//#1 notification if have a new order
app.get('/api/notification/new-order', async (req, res) => {
    try {
        const newOrders = await Order.find({ confirmed: true, approve: false, canceled: false });
        res.json(newOrders);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách đơn hàng mới:', error);
        res.status(500).json({ error: 'Lỗi server' });
    }
})
//#2 notification if out of stock
app.get('/api/notification/out-of-stock', async (req, res) => {
    try {
        const stockOut = await Product.find({ quantity: { $lte: 15 } });
        res.json(stockOut);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm hết hàng:', error);
        res.status(500).json({ error: 'Lỗi server' });
    }
})

//#3 notification if overStock
app.get('/api/notification/overStock', async (req, res) => {
    try {
        // Lấy ngày hiện tại
        const currentDate = new Date();
        // Lấy ngày và tháng hiện tại
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth();

        // Kiểm tra xem có phải từ ngày 31/3 đến ngày 20/4, 31/7 đến ngày 20/8, hoặc 30/11 đến ngày 20/12 không
        if ((currentMonth === 2 && currentDay >= 21) ||  // Tháng 3, ngày từ 31 trở đi
            (currentMonth === 3 && currentDay <= 30) ||  // Tháng 4, ngày đến 20
            (currentMonth === 6 && currentDay >= 31) ||  // Tháng 7, ngày từ 31 trở đi
            (currentMonth === 7 && currentDay <= 30) ||  // Tháng 8, ngày đến 20
            (currentMonth === 10 && currentDay >= 30) || // Tháng 11, ngày từ 30 trở đi
            (currentMonth === 11 && currentDay <= 31)) { // Tháng 12, ngày đến 20
            // Nếu là khoảng thời gian cần kiểm tra, lấy danh sách sản phẩm có số lượng lớn hơn 50
            const inventoryProducts = await Product.find({
                quantity: { $gt: 50 },
                iventory: false
            });
            res.json(inventoryProducts);
        } else {
            // Nếu không, trả về thông báo không phải ngày kiểm tồn kho
            res.json({ message: 'Không phải ngày kiểm tồn kho' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi máy chủ' });
    }
});



//--End-notification--//

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

app.get('/api/cart/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Cart.findById(id));
})

app.delete('/api/delete/cart/:id', async (req, res) => {
    const id = req.params.id;
    await Cart.findByIdAndRemove(id).exec();
    res.send('deleted');
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
    const { brand, name, description, price,
        quantity, gender, category } = req.body;
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
        iventory: false,
    });

    try {
        await newProduct.save();
        res.json({ success: true, imagePaths: imagePaths });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong on the server' });
    }
});

app.put('/api/product/:id', upload.array('images', 3), async (req, res) => {
    const productId = req.params.id;
    const { brand, name, description, price, quantity, gender, category } = req.body;
    const imagePaths = [];

    if (req.files) {
        req.files.forEach((file) => {
            imagePaths.push(file.path);
        });
    }
    try {
        let product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        } else {
            product.brand = brand;
            product.gender = gender;
            product.category = category;
            product.name = name;
            product.description = description;
            product.price = price;
            product.quantity = quantity;
            product.iventory = false

            if (imagePaths.length > 0) {
                product.imagePaths = imagePaths;
            }

        }
        await product.save();
        res.json({ success: true, imagePaths: product.imagePaths });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong on the server' });
    }
});

app.delete('/api/product/:id', async (req, res) => {
    const id = req.params.id;
    await Product.findByIdAndRemove(id).exec();
    res.send('delete');
});

app.get('/api/product', async (req, res) => {
    res.json(await Product.find());
})

app.get('/api/product/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Product.findById(id))
})



app.get('/user-cart', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Cart.find({ user: id }))
    });
});

app.get('/api/order', async (req, res) => {
    res.json(await Order.find());
})

app.get('/api/order/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Order.findById(id));
})

app.get('/user-order', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Order.find({ user: id }))
    });
});

app.get('/api/user', async (req, res) => {
    res.json(await User.find());
})

//--------------Chat-------------//

//#1----Customer side
app.post('/api/chats', async (req, res) => {
    try {
        const userData = await getUserDataFromReq(req);
        const { content } = req.body;
        const receiver = '652f946bab172e1c97cce150'

        const newChat = new Chat({
            sender: userData.id,
            receiver,
            content,
        });
        const savedChat = await newChat.save();
        res.status(201).json(savedChat); // Return the created chat
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/user-send-chats', async (req, res) => {
    const { token } = req.cookies;
    const userData = getUserDataFromReq(req);
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Chat.find({ sender: id }))
    });
});

app.get('/user-receiver-chats', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Chat.find({ receiver: id }))
    });
});


//#2----Admin side
app.get('/api/customer/send/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Chat.find({ sender: id }));
});

app.get('/api/customer/receiver/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Chat.find({ receiver: id }));
})

app.post('/api/admin/chats/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { content } = req.body;
        const senderId = '652f946bab172e1c97cce150'
        const newChat = new Chat({
            sender: senderId,
            receiver: id,
            content,
        });
        const saveChat = await newChat.save();
        res.status(201).json(saveChat); // Return the created chat
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.get('/api/list/customer-on-chat', async (req, res) => {
    try {
        const chats = await Chat.find({}, 'sender receiver');

        // Tạo một Set để lưu trữ các ID sender và receiver duy nhất
        const uniqueIds = new Set();

        // Lặp qua mỗi bản ghi và thêm các ID vào Set
        chats.forEach(chat => {
            uniqueIds.add(chat.sender);
            uniqueIds.add(chat.receiver);
        });
        // Chuyển đổi Set thành mảng và gửi lại response
        res.json(Array.from(uniqueIds));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
app.get('/api/chats', async (req, res) => {
    res.json(await Chat.find());
})

//--------------Chat-------------//

//-------------Comments---------//

const storage2 = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'Images-Comments/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload2 = multer({ storage: storage2 });
app.post('/api/comment/:id', upload2.array('images', 3), async (req, res) => {
    const { content, rate } = req.body;
    const image = [];
    const { id } = req.params;
    const userData = await getUserDataFromReq(req);


    if (req.files) {
        req.files.forEach((file) => {
            image.push(file.path);
        });
    }

    const newComment = new Comment({
        user: userData.id,
        productId: id,
        content,
        rate,
        image: image
    });
    try {
        await newComment.save();
        res.json({ success: true, image: image })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong on the server' });
    }
})

app.get('/api/user-cmt', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Comment.find({ user: id }))
    });
})

app.get('/api/cmt', async (req, res) => {
    res.json(await Comment.find());
})

//-------------End-Comments---------//


app.get('/test', (req, res) => {
    res.json('test ok!!!!!')
});

app.listen(4000);
//"70Vtta9W5p87avDp"