import "../../styles/home/products-overview.css"

import { Link } from "react-router-dom";
import ProductCard from "../products/ProductCard";

const ProductsOverview = ({ className, heading, products }) => {
  return (
    <div className={ className + " container"}>
      <h1>{ heading }</h1>
      <div className="products">
        {
          products.map((product) => {
            return (
              <Link key={product.id} to={`/product-details/${product.id}`}>
                <ProductCard product={ product }/>
              </Link>
            )
          })
        }
      </div>
      <Link to={"/view-products/"}>
        <div className="to-center">
          <button>View all</button>
        </div>
      </Link>
    </div>
  );
}
 
export default ProductsOverview;