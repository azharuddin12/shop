import "../../styles/home/hero.css"
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero">
      <div className="container">
        <div className="left-section">
          <h1>Find clothes that matches your style</h1>
          <p>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
          <Link to="/view-products">
            <button>Shop Now</button>
          </Link>
        </div>

        <div className="right-section">
          <img src={require("../../images/hero.png")} alt="hero.png" className="hero-img"/>
          <img src={require("../../images/star-1.png")} alt="star-1.png" className="star-1"/>
          <img src={require("../../images/star-2.png")} alt="star-2.png" className="star-2"/>
        </div>
      </div>
    </div>
  );
}
 
export default Hero;