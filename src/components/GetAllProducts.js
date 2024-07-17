import React, { useEffect, useState } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setProducts(data.products);
      });
      
  }, []);
  
  return (
    <div>
      <h1>Products List</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.title} - ${product.price} - {product.category}
            {/* {product.ALL} */}
            {/* {product.id} -  */}
          </li>
        ))}
      </ul>
    </div>
  );
}

  

export default ProductList;
