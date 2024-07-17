import React, { useState } from 'react';

function UpdateProduct() {
  const [productId, setProductId] = useState('');
  const [fieldToUpdate, setFieldToUpdate] = useState('title');
  const [newValue, setNewValue] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  // const idArray =['3', '4', '6', '7'];
  // const flag =0;
  // const idList = idArray.map((item) => <p>{item}</p>)
  
  const handleUpdateProduct = (e) => {
    e.preventDefault();

    if (!productId || !newValue) {
      setError('Enter both product ID and new value to update.');
      return;
    }

    fetch(`https://dummyjson.com/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        [fieldToUpdate]: newValue
      })
    })
    .then(res => {
        if (!res.ok) {
           setError('Failed to update product.');
           setResponse(null);
           throw new Error('Failed to update product.');
        }
         else{
        return res.json();
        }
    })
      .then(data => {
        console.log(data);
        setResponse(data);
        setError(null);
      })
      
      .catch(err => {
        console.error(err);
        setError('Failed to update product.');
        setResponse(null);
      });
      //if id = 3 4 6 7 => flag = 1
      // else flag = 0
  };

  const stringifiedObj = JSON.stringify(response, null, 2)
console.log(fieldToUpdate);
  return (
    <div>
      <h1>Update Product</h1>
      <form onSubmit={handleUpdateProduct}>
        <div>
          <label>Product ID:</label>
          <input
            type="number"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Enter Product ID"
            required
          />
        </div>
        <div>
          <label>Field to Update:</label>
          <select
            value={fieldToUpdate}
            onChange={(e) => setFieldToUpdate(e.target.value)}
          >
            <option id='1' value="title">Title</option>
            <option id='2' value="description">Description</option>
            <option id='3' value="price">Price</option>
            <option id='4' value="stock">Stock</option>
            <option id='5' value="brand">Brand</option>

            <option id='6' value="discountPercentage">Discount Percentage</option>
            <option id='7' value="rating">Rating</option>
            
            <option id='8' value="thumbnail">Thumbnail</option>
            <option id='9' value="images">Image</option>
            <option id='10' value="category">Category</option>
            
            {/* price stock discountpercentage rating     are all numbers and should just inter a number */}

          </select>
        </div>
        <div>
          <label>New Value:</label>
          {fieldToUpdate === "price" || fieldToUpdate === "stock"||fieldToUpdate === "discountPercentage"||fieldToUpdate === "rating" ? (
        <input type="number"  placeholder="Enter New Value" title='Enter numbers' value={newValue}
            onChange={(e) => setNewValue(e.target.value)}/>
      ) : (
        <input type="text"    title='Enter texts' placeholder="Enter New Value" value={newValue}
            onChange={(e) => setNewValue(e.target.value)}/>)}

        </div>
        <button type="submit">Update Product</button>
      </form>
      {response && (
        <div>
          <h2>Product Updated Successfully!</h2>
          <pre>{stringifiedObj}</pre>
        </div>
        
      )}

      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default UpdateProduct;
