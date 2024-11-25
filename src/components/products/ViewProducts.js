import "../../styles/products/view-products.css";

import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ProductCard from "./ProductCard";

const ViewProducts = ({ products }) => {
  const { key } = useParams();
  const categoriesElem = useRef();
  const [filterBy, setFilterBy] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const buttons = categoriesElem.current.children;

    const handleButtonClick = (index) => {
      return () => {
        if (buttons[index].classList.contains('selected')) {
          buttons[index].classList.remove('selected');
          setFilterBy(null);
        } 
        else {
          Array.from(buttons).forEach((button, idx) => {
            if (idx === index) {
              button.classList.add('selected');
            }
            else {
              button.classList.remove('selected');
            }
          });
          setFilterBy(buttons[index].textContent);
        }
      };
    };

    Array.from(buttons).forEach((button, index) => {
      button.addEventListener('click', handleButtonClick(index));
    });

    return () => {
      Array.from(buttons).forEach((button, index) => {
        button.removeEventListener('click', handleButtonClick(index));
      })
    }
  }, [])

  useEffect(() => { 
    let updatedProducts = products;

    if (filterBy) {
      updatedProducts = products.filter((product) => product.category === filterBy)
    }

    if(key){
      updatedProducts = updatedProducts.filter((product) => {
        return product.title.toLowerCase().includes(key.toLowerCase())
      })
    }

    setFilteredProducts(updatedProducts);
  }, [filterBy, key])
    
  return (
    <div className="view-products container">
      <h1>All Products</h1>

      <div ref={categoriesElem} className="categories">
        <button>men's clothing</button>
        <button>jewelery</button>
        <button>electronics</button>
        <button>women's clothing</button>
      </div>

      <div className="products-grid">
        {
          filteredProducts.map((product) => (
            <Link key={product.id} to={`/product-details/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          )) }
      </div>
      <p style={{"textAlign": "center"}}>{ filteredProducts.length? "" : "No Products to show! Try adjusting your search filters." }</p>
    </div>
  );
};

export default ViewProducts;