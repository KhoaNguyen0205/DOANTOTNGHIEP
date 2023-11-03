/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState, useRef } from "react";

export default function AddProduct() {
  const [selectedImages, setSelectedImages] = useState([null, null, null]);
  const [images, setImages] = useState([null, null, null]);
  const [zoomImageIndex, setZoomImageIndex] = useState(0); 

  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
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

  return (
    <div className="add-form">
      <form onSubmit={handleSubmit}>
        <div className="add-img">
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
                    <button onClick={() => handleRemoveImage(index)}>Remove</button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="zoom-img">
            {selectedImages[zoomImageIndex] && (
              <img
                src={images[zoomImageIndex]}
                className="img-show"
                alt="Preview"
              />
            )}
          </div>
        </div>
        <div className="add-description">
          <div className="brand-name">
            <div className="brand">
              <input type="radio" name="brand" value="Nike" onChange={ev => setBrand(ev.target.value)} />
              <label htmlFor="nike">
                <img src="https://i.pinimg.com/originals/33/e6/3d/33e63d5adb0da6b303a83901c8e8463a.png" width="100" />
              </label>
              <input type="radio" name="brand" value="Adidas" onChange={ev => setBrand(ev.target.value)} />
              <label htmlFor="adidas">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/2000px-Adidas_Logo.svg.png" width="80" />
              </label>
              <input type="radio" name="brand" value="Puma" onChange={ev => setBrand(ev.target.value)} />
              <label htmlFor="puma">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/88/Puma-Logo.png" width="80" />
              </label>
            </div>
          </div>
          <input type="text" className="sneaker-name" placeholder="Name" required value={name} onChange={ev => setName(ev.target.value)} />
          <textarea type="text" className="sneaker-des" placeholder="Description" required value={description} onChange={ev => setDescription(ev.target.value)} />
          <div className="price-quantity">
            <input type="text" className="sneaker-price" placeholder="Price" required value={price} onChange={ev => setPrice(ev.target.value)} />
            <input type="number" className="sneaker-quantity" placeholder="Quantity" required value={quantity} onChange={ev => setQuantity(ev.target.value)} />
            
          </div>
          <button type="submit">POST</button>
        </div>
      </form>
    </div>
  );
}
