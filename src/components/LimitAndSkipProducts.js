import React, { useState } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [firstProduct, setFirstProductId] = useState('');
  const [secondProduct, setSecondProductId] = useState('');


  

  const fetchProductById = () => {
// ${firstProduct}
// ${secondProduct}

    fetch(`https://dummyjson.com/products?limit=${firstProduct}&skip=${secondProduct}&select=title,price`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setProducts(data.products);
      });
      
  };

  
  return (
    <div>
      <h1>Products List</h1>
      <input
        type="number"
        value={firstProduct}
        onChange={(e) => setFirstProductId(e.target.value)}
        placeholder="Enter Limit Number"
      />
            <input
        type="number"
        value={secondProduct}
        onChange={(e) => setSecondProductId(e.target.value)}
        placeholder="Enter skip Number"
      />
      <button onClick={fetchProductById}>Get Product</button>

      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.title} - ${product.price} 
          </li>
        ))}
      </ul>
    </div>
  );
}

  

export default ProductList;
