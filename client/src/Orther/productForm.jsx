import  { useState } from 'react';

function ProductForm() {
  const [formData, setFormData] = useState({
    brand: '',
    name: '',
    description: '',
    price: '',
    quantity: '',
    gender: '',
    category: '',
    images: [] // Chứa các tập tin hình ảnh được chọn
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Error posting product data');
      }
      
      // Đặt lại dữ liệu sau khi gửi thành công
      setFormData({
        brand: '',
        name: '',
        description: '',
        price: '',
        quantity: '',
        gender: '',
        category: '',
        images: []
      });

      // Xử lý phản hồi hoặc điều hướng đến trang khác nếu cần
    } catch (error) {
      console.error('Error:', error);
      // Xử lý lỗi nếu cần
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event) => {
    // Xử lý việc chọn hình ảnh và cập nhật vào state
    const selectedFiles = Array.from(event.target.files);
    setFormData({ ...formData, images: selectedFiles });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Brand:
        <input type="text" name="brand" value={formData.brand} onChange={handleChange} />
      </label>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Description:
        <textarea name="description" value={formData.description} onChange={handleChange} />
      </label>
      <label>
        Price:
        <input type="number" name="price" value={formData.price} onChange={handleChange} />
      </label>
      <label>
        Quantity:
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
      </label>
      <label>
        Gender:
        <input type="text" name="gender" value={formData.gender} onChange={handleChange} />
      </label>
      <label>
        Category:
        <input type="text" name="category" value={formData.category} onChange={handleChange} />
      </label>
      <label>
        Images:
        <input type="file" name="images" onChange={handleImageChange} multiple />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ProductForm;
