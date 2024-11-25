import "../../styles/products/product-card.css";
import Rating from "../general/Rating";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="img">
        <img src={ product.image } alt="product.png" />
      </div>
      <p className="title">{ product.title }</p>
      <Rating rating={ product.rating.rate }/>
      <p className="price">{ '$' + product.price.toFixed(2) }</p>
    </div>
  );
}
 
export default ProductCard;