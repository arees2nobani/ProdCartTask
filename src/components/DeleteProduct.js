import React, {useState} from 'react'

function DeleteProduct() {
    const [product, setProduct] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const deleteProductByID = () => {

    fetch(`https://dummyjson.com/products/${product}`, {
        method: 'DELETE',
      })


      .then(res => {
        if (!res.ok) {
           throw new Error('Failed to Delete product.');
        }
        return res.json();
    })
      .then(data => {
        console.log(data);
        setResponse(data);
        setError(null);
      })
      
      .catch(err => {
        console.error(err);
        setError('Failed to Delete product.');
        setResponse(null);
      });
      
    };

    return(

        <div>
          <h1>Delete Product By ID</h1>
          <input
            type="number"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="Enter Product ID"
          />
          <button onClick={deleteProductByID}>Delete Product</button>

        {response && (
        <div>
          <h2>Product Deleted Successfully!</h2>
        </div>
        
      )}

          {error && <p>Error: {error}</p>}
          </div>
    
    );

}

export default DeleteProduct;
