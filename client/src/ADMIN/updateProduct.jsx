/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export default function UpdateProduct() {

    const { id } = useParams(); // Trích xuất id từ đối tượng params


    const [formData, setFormData] = useState({
        brand: '',
        name: '',
        description: '',
        price: 0,
        quantity: 0,
        gender: '',
        category: '',
        imageFiles: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prevData) => ({
            ...prevData,
            imageFiles: files,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { brand, name, description, price, quantity, gender, category, imageFiles } = formData;

        const formDataToSend = new FormData();
        formDataToSend.append('brand', brand);
        formDataToSend.append('name', name);
        formDataToSend.append('description', description);
        formDataToSend.append('price', price);
        formDataToSend.append('quantity', quantity);
        formDataToSend.append('gender', gender);
        formDataToSend.append('category', category);
        imageFiles.forEach((file) => {
            formDataToSend.append('imageFiles', file);
        });

        try {
            const response = await axios.put(`/api/product/${id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            alert("sucess")
        } catch (error) {
            console.error(error);
            alert('faile')
        }
    };

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" required />
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
                    <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
                    <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" required />
                    <input type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" required />
                    <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
                    <input type="file" name="imageFiles" onChange={handleImageChange} multiple />
                    <button type="submit">Update Product</button>
                </form>
            </div>

        </>
    )
}