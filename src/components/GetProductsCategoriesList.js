import React, { useEffect, useState } from 'react';

function ProductList() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => {
        if (!res.ok) {
          throw new Error('Not Found');
        }
        return res.json();
      })
      .then(data => {
        console.log(data); 
        setCategories(data);
      })
      .catch(error => {
        console.error('Error: ', error);
        setError(error.message);
      });
  }, []);
  
  return (
    <div>
      <h1>Categories List</h1>
      {error && <p>Error: {error}</p>}
      <label>Category:</label>
      <span class="spanen">&nbsp;</span>

      <select>
  <option>1</option>
  <option>1</option>
  <option>1</option>
  <option>2</option>
  <option>1</option>
  <option>1</option>

</select>

      <select label='Category' name='Category' value="Category" > 

        {categories.map((category, index) => (
            <option key={index}>
              {category.name}
            </option>
        ))}
      </select>
    </div>
  );
}



export default ProductList;
