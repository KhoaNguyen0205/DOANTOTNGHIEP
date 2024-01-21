/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Admin from "./Admin";
import { faEyeSlash, faFaceRollingEyes, faUsersViewfinder, faX } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { UserContext } from "../userContext";

export default function AmdinProduct() {

    const { user } = useContext(UserContext);

    const [addPrd, setAddPrd] = useState(false);

    const [selectedImages, setSelectedImages] = useState([null, null, null]);
    const [images, setImages] = useState([null, null, null]);
    const [zoomImageIndex, setZoomImageIndex] = useState(0);
    const [brand, setBrand] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [gender,setGender] = useState('');
    const [category,setCategory] = useState('');
    const fileInputRefs = [useRef(null), useRef(null), useRef(null)];

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
        formData.append("gender",gender);
        formData.append("category",category);

        selectedImages.forEach((image, index) => {
            if (image) {
                formData.append(`images`, image);
            }
        });

        axios
            .post('/api/product', formData)
            .then((response) => {
                console.log(response.data);
                alert('Successfully');
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
                alert('Failed');
            });
    };

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
        setAddPrd(false)
    }
    return (
        <>
            <Admin />
            {user ? (
                <div className="admin-product-container">
                    <div className="product-above">
                        <h2>Product Management</h2>
                        <button onClick={hideAddPrd}>Product</button>
                        <button onClick={showAddPrd}>Add Product</button>
                    </div>
                    <div className="product-below">
                        {addPrd ? (
                            <form onSubmit={handleSubmit}>
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
                                                <option value="Shirt"       >Shirt</option>
                                                <option value="Accessories" >Accessories</option>
                                            </select>
                                        </div>
                                        <div className="select-gender">
                                            <b>Gender:</b>
                                            <select name="gender" onChange={ev => setGender(ev.target.value)}>
                                                <option value="male"    >Male</option>
                                                <option value="famale"  >Famale</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="admin-product-brand-price-quantity">
                                        <div className="admin-product-brand">
                                            <b>Brand:</b>
                                            <select name="brand"onChange={ev => setBrand(ev.target.value)} >
                                                <option value="">Brand</option>
                                                <option value="Nike"  >Nike</option>
                                                <option value="Jordan">Jordan</option>
                                                <option value="Adidas">Adidas</option>
                                                <option value="Puma"  >Puma</option>
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
                            <div>
                                <h1>Product</h1>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </>
    )
}