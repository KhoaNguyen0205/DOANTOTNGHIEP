/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Admin from "./Admin";
import { faAdd, faCubesStacked, faEdit, faFilter, faRectangleList, faTrash, faUserCircle, faX } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { UserContext } from "../userContext";
import UpdateProduct from "./updateProduct";

export default function AmdinProduct() {

    const { user } = useContext(UserContext);

    const [addPrd, setAddPrd] = useState(false);
    const [updatePrd, setUpdatePrd] = useState(false);

    const [products, setProducts] = useState([]);
    const [selectedImages, setSelectedImages] = useState([null, null, null]);
    const [images, setImages] = useState([null, null, null]);
    const [zoomImageIndex, setZoomImageIndex] = useState(0);
    const [brand, setBrand] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [gender, setGender] = useState('male');
    const [category, setCategory] = useState('');
    const fileInputRefs = [useRef(null), useRef(null), useRef(null)];
    const [selectedItem, setSelectedItem] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [productById, setProductById] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const chooseItem = (item) => {
        setSelectedItem(item);
    };

    useEffect(() => {
        axios.get('/api/product').then(response => {
            setProducts(response.data);

        })
    }, [products])

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/api/product/${id}`).then(response => {
            const { data } = response;
            setName(data.name);
            setPrice(data.price);
            setQuantity(data.quantity);
            setCategory(data.category);
            setDescription(data.description);
            setSelectedImages(data.imagePaths)
        })
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!brand || !name || !description || !price || !quantity || selectedImages.some(image => !image)) {
            alert('Please fill in all fields and select images.');
            return;
        }
    
        const formData = new FormData();
        formData.append("brand", brand);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("gender", gender);
        formData.append("category", category);
    
        selectedImages.forEach((image, index) => {
            if (image) {
                formData.append(`images`, image);
            }
        });
    
        if (id) {
            axios
                .put(`/api/product/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((response) => {
                    console.log(response.data);
                    alert('Updated successfully');
                    window.location.reload();
                })
                .catch((error) => {
                    console.error(error);
                    alert('Update failed');
                });
        } else {
            axios
                .post('/api/product', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((response) => {
                    console.log(response.data);
                    alert('Created successfully');
                    window.location.reload();
                })
                .catch((error) => {
                    console.error(error);
                    alert('Creation failed');
                });
        }
    };
    
    const deleteProduct = (id) => {
        axios.delete(`http://localhost:4000/api/product/${id}`)
            .then(response => {
                console.log(response.data);
                alert('Delete Place Successful');
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleImageChange = (index, ev) => {
        const file = ev.target.files[0];

        const newSelectedImages = [...selectedImages];
        newSelectedImages[index] = file;

        setSelectedImages(newSelectedImages);

        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const newImages = [...images];
                newImages[index] = e.target.result;
                setImages(newImages);
            };

            reader.readAsDataURL(file);
        }

        setZoomImageIndex(index);
    };
    const handleRemoveImage = (index) => {
        const newSelectedImages = [...selectedImages];
        newSelectedImages[index] = null;

        setSelectedImages(newSelectedImages);

        const newImages = [...images];
        newImages[index] = null;
        setImages(newImages);

        if (zoomImageIndex === index) {
            setZoomImageIndex(0);
        }
    };

    function showAddPrd() {
        setAddPrd(true);
    }
    function hideAddPrd() {
        setAddPrd(false);
        navigate('/adminpage/product')
        window.location.reload();
    }

    function showUpdatePrd() {
        setUpdatePrd(true);
    }
    function hideUpdatePrd() {
        setUpdatePrd(false)
        navigate('/adminpage/product')
    }


    return (
        <>
            <Admin />
            {user ? (
                <div className="admin-content-container">
                    <div className="product-above">
                        <button className="btn-product-above" onClick={hideAddPrd}>Product</button>
                        <button className="btn-product-above" onClick={showAddPrd}><FontAwesomeIcon icon={faAdd} /> Add Product</button>
                    </div>
                    <div className="product-below">
                        {addPrd ? (
                            <form onSubmit={handleSubmit}>
                                {id && (
                                    <b className="text-red-500">
                                        You need check data Category,Gender,Brnad and ImgPath before update Product!!
                                    </b>
                                )}
                                <div className="add-product">
                                    <div className="product-info">
                                        <div className="admin-product-name">
                                            <b>Product Name:</b>
                                            <input value={name} onChange={ev => setName(ev.target.value)} type="text" />

                                        </div>
                                        <div className="product-category-gender">
                                            <div className="select-category">
                                                <b>Category:</b>
                                                <select name="" onChange={ev => setCategory(ev.target.value)}>
                                                    <option value="">Chose Category</option>
                                                    <option value="Sneaker"     >Sneaker</option>
                                                    <option value="Clothes"       >Clothes</option>
                                                    <option value="Accessories" >Accessories</option>
                                                </select>
                                            </div>
                                            <div className="select-gender">
                                                <b>Gender:</b>
                                                <select name="gender" onChange={ev => setGender(ev.target.value)}>
                                                    <option value="male"    >Male</option>
                                                    <option value="female"  >Female</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="admin-product-brand-price-quantity">
                                            <div className="admin-product-brand">
                                                <b>Brand:</b>
                                                <select name="brand" onChange={ev => setBrand(ev.target.value)} >
                                                    <option value="">Brand</option>
                                                    <option value="Nike"  >Nike</option>
                                                    <option value="Jordan">Jordan</option>
                                                    <option value="Adidas">Adidas</option>
                                                    <option value="Puma"  >Puma</option>
                                                    <option value="NB">NB</option>
                                                    <option value="Crocs">Crocs</option>
                                                    <option value="Converse">Converse</option>
                                                </select>
                                            </div>
                                            <div className="admin-product-price">
                                                <b>Price:</b>
                                                <input type="text" value={price} onChange={ev => setPrice(ev.target.value)} />
                                            </div>
                                            <div className="admin-product-quantity">
                                                <b>Quantity:</b>
                                                <input type="text" value={quantity} onChange={ev => setQuantity(ev.target.value)} />
                                            </div>
                                        </div>
                                        <div className="product-description">
                                            <b>Description:</b>
                                            <textarea name="" id="" cols="30" rows="10" value={description} onChange={ev => setDescription(ev.target.value)} />
                                        </div>
                                    </div>
                                    <div className="product-images">
                                        <b>Product images:</b>
                                        <div className="add-img">
                                            <div className="zoom-img">
                                                {selectedImages[zoomImageIndex] && (
                                                    <img
                                                        src={images[zoomImageIndex]}
                                                        className="img-show"
                                                        alt="Preview"
                                                    />
                                                )}
                                            </div>
                                            <div className="info-img">
                                                {selectedImages.map((selectedImage, index) => (
                                                    <div className="img" key={index}>
                                                        {!selectedImage && (
                                                            <label className="custom-file-upload">
                                                                <span>Select Image</span>
                                                                <input
                                                                    type="file"
                                                                    onChange={(ev) => handleImageChange(index, ev)}
                                                                    ref={fileInputRefs[index]}
                                                                    style={{ display: "none" }}
                                                                />
                                                            </label>
                                                        )}
                                                        {selectedImage && (
                                                            <div className="image-preview">
                                                                <img
                                                                    src={images[index]}
                                                                    className="img-show"
                                                                    alt="Preview"
                                                                    onClick={() => setZoomImageIndex(index)}
                                                                />
                                                                <div className="hideImg" onClick={() => handleRemoveImage(index)}>
                                                                    <FontAwesomeIcon icon={faX} />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <b style={{ color: "red" }}> *You need add 3 images for your product</b>
                                        </div>
                                        <div className="add-product-button">
                                            <button >Add Product</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <div className="admin-product-manage">
                                <div className="minimap-product-manage">
                                    <div className="minimap-item"><FontAwesomeIcon icon={faRectangleList} /> Totoal Product:<b> {products.length}</b></div>
                                    <div className="minimap-item">Out of stock</div>
                                    <div className="minimap-item"><FontAwesomeIcon /><FontAwesomeIcon icon={faCubesStacked} />Inventory</div>
                                    <div className="minimap-item"><FontAwesomeIcon icon={faUserCircle} />Customer</div>
                                </div>
                                <div className="under-product-manage">
                                    <div className="data-product-manage">
                                        <div className="data-product-filter">
                                            <b>Products</b>
                                            <input placeholder="Search by name" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
                                            <div>
                                                <b><FontAwesomeIcon icon={faFilter} />Filter: </b>
                                                <select onChange={(e) => chooseItem(e.target.value)}>
                                                    <option value="">All products</option>
                                                    <option value="Sneaker">Sneaker</option>
                                                    <option value="Accessories">Accessories</option>
                                                    <option value="Clothes">Clothes</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="data-product-title">
                                            <div className="--product-img">Image</div>
                                            <div className="--product-name">Name</div>
                                            <div className="--product-price">Price</div>
                                            <div className="--product-quantity">Quantity</div>
                                            <div className="--product-gender">Gender</div>
                                            <div className="--product-time">Time</div>
                                            <div className="--product-edit"></div>
                                        </div>
                                        <div className="product-manage-list-product">
                                            {products.length > 0 && products
                                                .filter(product =>
                                                    (selectedItem === '' || product.category === selectedItem) &&
                                                    (searchKeyword === '' || product.name.toLowerCase().includes(searchKeyword.toLowerCase()))
                                                )
                                                .map(product => (
                                                    <div key={product} className="product-manage--product" >
                                                        <div className="--product-img">
                                                            <img src={'http://localhost:4000/' + product.imagePaths[0]} alt="" />
                                                        </div>
                                                        <div className="--product-name">
                                                            {product.name}
                                                        </div>
                                                        <div className="--product-price">
                                                            {product.price}
                                                        </div>
                                                        <div className="--product-quantity">
                                                            {product.quantity}
                                                        </div>
                                                        <div className="--product-gender">
                                                            {product.gender}
                                                        </div>
                                                        <div className="--product-time">
                                                            {new Date(product.createdAt).toLocaleDateString()}
                                                        </div>
                                                        <div className="--product-edit">
                                                            <Link to={'/adminpage/product/' + product._id} title="edit" onClick={showAddPrd} >
                                                                <FontAwesomeIcon style={{ color: '#56FF45' }} icon={faEdit} />
                                                            </Link>
                                                            <div title="delete" onClick={() => deleteProduct(product._id)}>
                                                                <FontAwesomeIcon style={{ color: '#FF6E54' }} icon={faTrash} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                        {updatePrd && (
                                            <div className="overlay">
                                                <div className="update-product-container">
                                                    <div className="hide-update-product" onClick={hideUpdatePrd}>
                                                        <FontAwesomeIcon icon={faX} />
                                                    </div>
                                                    <div className="update-product-body">
                                                        <UpdateProduct/>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="potential-customer">
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="content"> LOGIN to conitnue</div>
            )}
        </>
    )
}