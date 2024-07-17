import React, {useState} from 'react';

function AddNewProduct() {
const [product, setProduct] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    discountPercentage: '',
    rating: '',
    stock: '',
    tags: '',
    brand: '',
    sku: '',
    weight: '',
    width: '',
    height: '',
    depth: '',
    warrantyInformation: '',
    shippingInformation: '',
    availabilityStatus: '',
    returnPolicy: '',
    minimumOrderQuantity: '',
    thumbnail: '',
    images: ''
});

const [response, setResponse] = useState(null);
const [error, setError] = useState(null);

const handleChange = (e) => {
    setProduct({
        ...product, [e.target.name]: e.target.value
    });
};

const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: product.title,
          description: product.description,
          category: product.category,
          price: parseFloat (product.price),
          discountPercentage: parseFloat (product.discountPercentage),
          rating: parseFloat (product.rating),
          stock: parseInt (product.stock),
          tags: product.tags.split(',').map(tag => tag.trim()),
          brand: product.brand,
          sku: product.sku,
          weight: parseFloat (product.weight),
          width: parseFloat (product.width),
          height: parseFloat (product.height),
          depth: parseFloat (product.depth),
          warrantyInformation: product.warrantyInformation,
          shippingInformation: product.shippingInformation,
          availabilityStatus: product.availabilityStatus,
          returnPolicy: product.returnPolicy,
          minimumOrderQuantity: parseInt (product.minimumOrderQuantity),
          thumbnail: product.thumbnail,
          images: product.images.split(',').map(img => img.trim())

        })
      })
      .then(res => res.json())
      
      .then(data => {
        console.log(data);
        setResponse(data);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      });
        
      
};

return(
    <div>
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
            <input 
                type='text' 
                name='title' 
                value={product.title} 
                onChange={handleChange} 
                placeholder='Enter Title' 
                required
            />

            <input 
                type='text' 
                name='description' 
                value={product.description} 
                onChange={handleChange} 
                placeholder='Enter Description' 
                required
            />

            <input 
                type='text' 
                name='category' 
                value={product.category} 
                onChange={handleChange} 
                placeholder='Enter Category' 
                required
            />

            <input 
                type='number' 
                name='price' 
                value={product.price} 
                onChange={handleChange} 
                placeholder='Enter Price' 
                required
            />

            <input 
                type='number' 
                name='discountPercentage' 
                step={0.01}
                value={product.discountPercentage} 
                onChange={handleChange} 
                placeholder='Enter Discount Percentage' 
                required
            />

            <input 
                type='number' 
                name='rating' 
                step={0.01}
                value={product.rating} 
                onChange={handleChange} 
                placeholder='Enter Rating' 
                required
            />

            <input 
                type='number' 
                name='stock' 
                value={product.stock} 
                onChange={handleChange} 
                placeholder='Enter stock' 
                required
            />

            <input 
                type='text' 
                name='tags' 
                value={product.tags} 
                onChange={handleChange} 
                placeholder='Enter Tages (comma separated)' 
                required
            />

            <input 
                type='text' 
                name='brand' 
                value={product.brand} 
                onChange={handleChange} 
                placeholder='Enter Brand' 
                required
            />

            <input 
                type='text' 
                name='sku' 
                value={product.sku} 
                onChange={handleChange} 
                placeholder='Enter Sku' 
                required
            />

            <input 
                type='number' 
                name='weight' 
                value={product.weight} 
                onChange={handleChange} 
                placeholder='Enter Weight' 
                required
            />

            <input 
                type='number' 
                name='width' 
                value={product.width} 
                onChange={handleChange} 
                placeholder='Enter Width' 
                required
            />

            <input 
                type='number' 
                name='height' 
                value={product.height} 
                onChange={handleChange} 
                placeholder='Enter Height' 
                required
            />

            <input 
                type='number' 
                name='depth' 
                value={product.depth} 
                onChange={handleChange} 
                placeholder='Enter Depth' 
                required
            />

            <input 
                type='text' 
                name='warrantyInformation' 
                value={product.warrantyInformation} 
                onChange={handleChange} 
                placeholder='Enter Warranty Information' 
                required
            />

            <input 
                type='text' 
                name='shippingInformation' 
                value={product.shippingInformation} 
                onChange={handleChange} 
                placeholder='Enter shipping Information' 
                required
            />

            <input 
                type='text' 
                name='availabilityStatus' 
                value={product.availabilityStatus} 
                onChange={handleChange} 
                placeholder='Enter Availability Status' 
                required
            />

            <input 
                type='text' 
                name='returnPolicy' 
                value={product.returnPolicy} 
                onChange={handleChange} 
                placeholder='Enter Return Policy' 
                required
            />

            <input 
                type='number' 
                name='minimumOrderQuantity' 
                value={product.minimumOrderQuantity} 
                onChange={handleChange} 
                placeholder='Enter Minimum Order Quantity' 
                required
            />

            <input 
                type='text' 
                name='thumbnail' 
                value={product.thumbnail} 
                onChange={handleChange} 
                placeholder='Enter thumbnail ' 
                required
            />

            <input 
                type='text' 
                name='images' 
                value={product.images} 
                onChange={handleChange} 
                placeholder='Enter Image URL' 
                required
            />

            <button type="submit">Add Product</button>
        </form>
            {response && (
                <div>
                    <h2>Product Added Successfully!</h2>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}

            {error && <p>Error: {error}</p>}
    </div>
);

}

export default AddNewProduct;