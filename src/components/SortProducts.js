import React, { useEffect, useState } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [order, setOrder] = useState([]);


    // sortby title price id     and order asc / desc
  useEffect(() => {
    fetch(`https://dummyjson.com/products?sortBy=${sorting}&order=${order}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setProducts(data.products);
      });
      
  },[sorting, order] );
  
  return (
    <div>
      <h1>Products List</h1>
      {/* add a list to choose what to sort by (title or price or id) and in what order (asc or desc) */}

        <select value={sorting} onChange={(e) => setSorting(e.target.value)}>
                <option value="title">title</option>
                <option value="price">price</option>
                <option value="id">id</option>
        </select>
        
            
        <select value={order} onChange={(e) => setOrder(e.target.value)}>
                <option value="asc">asc</option>
                <option value="desc">desc</option>
        </select>
        

      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.title} - ${product.price} - {product.category}
          </li>
        ))}
      </ul>
    </div>
  );
}

  

export default ProductList;
